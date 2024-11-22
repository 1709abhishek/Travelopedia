package com.travelopedia.fun.budget_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.travelopedia.fun.budget_service.beans.HotelRequest;
import com.travelopedia.fun.budget_service.beans.HotelResponse;
import com.travelopedia.fun.budget_service.beans.HotelListResponse;
import com.travelopedia.fun.budget_service.beans.HotelOffersResponse;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpMethod;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.HashMap;
import java.util.Map;

@Service
public class HotelService {

    @Autowired
    private AuthService authService;

    private final String hotelListUrl = "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city";
    private final String hotelOffersUrl = "https://test.api.amadeus.com/v3/shopping/hotel-offers";

    private static final Map<String, Double> EXCHANGE_RATES = new HashMap<>();

    static {
        EXCHANGE_RATES.put("INR", 0.012); // 1 INR = 0.012 USD
        EXCHANGE_RATES.put("EUR", 1.1);  // 1 EUR = 1.1 USD
        EXCHANGE_RATES.put("USD", 1.0);
    }

    private double convertToUSD(String currencyCode, double amount) {
        if (EXCHANGE_RATES.containsKey(currencyCode)) {
            return amount * EXCHANGE_RATES.get(currencyCode);
        } else {
            throw new IllegalArgumentException("Unsupported currency: " + currencyCode);
        }
    }

    public List<HotelResponse> getHotelCostItinerary(HotelRequest request) {
        String token = authService.getToken();

        // Step 1: Get hotel list by city
        List<String> hotelIds = getHotelIdsByCity(request.getCityCode(), token);

        // Step 2: Get hotel offers by hotel IDs
        return getHotelOffers(hotelIds, request, token);
    }

    private List<String> getHotelIdsByCity(String cityCode, String token) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);

        String url = hotelListUrl + "?cityCode=" + cityCode + "&radius=5&radiusUnit=KM&hotelSource=ALL";
        System.out.println("--------------------------------");
        System.out.println(hotelListUrl);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<HotelListResponse> response = restTemplate.exchange(url, HttpMethod.GET, entity, HotelListResponse.class);
        List<String> hotelIds = new ArrayList<>();

        if (response.getStatusCode().is2xxSuccessful()) {
            hotelIds = response.getBody().getData().stream()
                    .map(hotel -> hotel.getHotelId())
                    .limit(30)
                    .collect(Collectors.toList());
        }

        return hotelIds;
    }

    //https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=string&adults=1&checkInDate=2023-11-22&checkOutDate=2024-11-22&roomQuantity=1&priceRange=200-300&currency=USD&paymentPolicy=NONE&bestRateOnly=true
    private List<HotelResponse> getHotelOffers(List<String> hotelIds, HotelRequest request, String token) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);

        String hotelIdsParam = String.join(",", hotelIds);
        String url = hotelOffersUrl + "?hotelIds=" + hotelIdsParam +
                "&adults=" + request.getAdults() +
                "&checkInDate=" + request.getCheckInDate() +
                "&checkOutDate=" + request.getCheckOutDate() +
                "&roomQuantity=" + request.getRoomQuantity() +
                "&currency=USD" +
                "&paymentPolicy=NONE&boardType=ROOM_ONLY&bestRateOnly=true";

        System.out.println("--------------------------------");
        System.out.println(url);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<HotelOffersResponse> response = restTemplate.exchange(url, HttpMethod.GET, entity, HotelOffersResponse.class);

        List<HotelResponse> itineraryList = new ArrayList<>();

        if (response.getStatusCode().is2xxSuccessful()) {
            HotelOffersResponse hotelOffersResponse = response.getBody();
            if (hotelOffersResponse != null && hotelOffersResponse.getData() != null) {
                itineraryList = hotelOffersResponse.getData().stream()
                        .filter(HotelOffersResponse.HotelOfferData::isAvailable)
                        .map(offer -> {
                            HotelOffersResponse.Offer firstOffer = offer.getOffers().get(0);
                            String total = firstOffer.getPrice().getTotal();
                            double price = total != null ? Double.parseDouble(total) : 0.0;
                            return new HotelResponse(
                                    offer.getHotel().getName(),
                                    offer.getHotel().getHotelId(),
                                    offer.getHotel().getCityCode(),
                                    convertToUSD(firstOffer.getPrice().getCurrency(),price),
                                    offer.isAvailable(),
                                    firstOffer.getPrice().getCurrency()
                            );
                        })
                        .filter(itinerary -> itinerary.getPrice() > 0)
                        .collect(Collectors.toList());
            }
        }

        return itineraryList;
    }
}
