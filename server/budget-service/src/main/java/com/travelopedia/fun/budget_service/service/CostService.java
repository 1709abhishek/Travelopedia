package com.travelopedia.fun.budget_service.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.travelopedia.fun.budget_service.beans.ItineraryRequest;
import com.travelopedia.fun.budget_service.beans.ItineraryResponse;
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

@Service
public class CostService {

    @Autowired
    private AuthService authService;

    private final String hotelListUrl = "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city";
    private final String hotelOffersUrl = "https://test.api.amadeus.com/v3/shopping/hotel-offers";

    public List<ItineraryResponse> getCostItinerary(ItineraryRequest request) {
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
                    .collect(Collectors.toList());
        }

        return hotelIds;
    }

    //https://test.api.amadeus.com/v3/shopping/hotel-offers?hotelIds=string&adults=1&checkInDate=2023-11-22&checkOutDate=2024-11-22&roomQuantity=1&priceRange=200-300&currency=USD&paymentPolicy=NONE&bestRateOnly=true
    private List<ItineraryResponse> getHotelOffers(List<String> hotelIds, ItineraryRequest request, String token) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + token);

        String hotelIdsParam = String.join(",", hotelIds);
        String url = hotelOffersUrl + "?hotelIds=" + hotelIdsParam +
                "&adults=" + request.getAdults() +
                "&checkInDate=" + request.getCheckInDate() +
                "&checkOutDate=" + request.getCheckOutDate() +
                "&roomQuantity=" + request.getRoomQuantity() +
                "&currency=" + request.getCurrency() +
                "&paymentPolicy=NONE&boardType=ROOM_ONLY&bestRateOnly=true";

        System.out.println("--------------------------------");
        System.out.println(url);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<HotelOffersResponse> response = restTemplate.exchange(url, HttpMethod.GET, entity, HotelOffersResponse.class);

        List<ItineraryResponse> itineraryList = new ArrayList<>();

        if (response.getStatusCode().is2xxSuccessful()) {
            itineraryList = response.getBody().getData().stream()
                    .filter(offer -> offer.isAvailable()) // Only include available hotels
                    .map(offer -> new ItineraryResponse(
                            offer.getHotel().getName(),
                            offer.getHotel().getHotelId(),
                            offer.getHotel().getCityCode(),
                            Double.parseDouble(offer.getOffers().get(0).getPrice().getTotal()),
                            offer.isAvailable(),
                            offer.getOffers().get(0).getPrice().getCurrency()
                    ))
                    .collect(Collectors.toList());
        }

        return itineraryList;
    }
}