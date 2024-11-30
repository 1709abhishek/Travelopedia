package com.travelopedia.fun.budget_service.beans;

import java.util.List;

public class HotelOffersResponse {
    private List<HotelOfferData> data;

    public List<HotelOfferData> getData() {
        return data;
    }

    public void setData(List<HotelOfferData> data) {
        this.data = data;
    }

    public static class HotelOfferData {
        private String type;
        private Hotel hotel;
        private boolean available;
        private List<Offer> offers;

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public Hotel getHotel() {
            return hotel;
        }

        public void setHotel(Hotel hotel) {
            this.hotel = hotel;
        }

        public boolean isAvailable() {
            return available;
        }

        public void setAvailable(boolean available) {
            this.available = available;
        }

        public List<Offer> getOffers() {
            return offers;
        }

        public void setOffers(List<Offer> offers) {
            this.offers = offers;
        }
    }

    public static class Hotel {
        private String hotelId;
        private String name;
        private String cityCode;

        public String getHotelId() {
            return hotelId;
        }

        public void setHotelId(String hotelId) {
            this.hotelId = hotelId;
        }

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }

        public String getCityCode() {
            return cityCode;
        }

        public void setCityCode(String cityCode) {
            this.cityCode = cityCode;
        }
    }

    public static class Offer {
        private String id;
        private String checkInDate;
        private String checkOutDate;
        private Room room;
        private Price price;

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getCheckInDate() {
            return checkInDate;
        }

        public void setCheckInDate(String checkInDate) {
            this.checkInDate = checkInDate;
        }

        public String getCheckOutDate() {
            return checkOutDate;
        }

        public void setCheckOutDate(String checkOutDate) {
            this.checkOutDate = checkOutDate;
        }

        public Room getRoom() {
            return room;
        }

        public void setRoom(Room room) {
            this.room = room;
        }

        public Price getPrice() {
            return price;
        }

        public void setPrice(Price price) {
            this.price = price;
        }
    }

    public static class Room {
        private String type;
        private TypeEstimated typeEstimated;

        public String getType() {
            return type;
        }

        public void setType(String type) {
            this.type = type;
        }

        public TypeEstimated getTypeEstimated() {
            return typeEstimated;
        }

        public void setTypeEstimated(TypeEstimated typeEstimated) {
            this.typeEstimated = typeEstimated;
        }

        public static class TypeEstimated {
            private String category;
            private int beds;
            private String bedType;

            public String getCategory() {
                return category;
            }

            public void setCategory(String category) {
                this.category = category;
            }

            public int getBeds() {
                return beds;
            }

            public void setBeds(int beds) {
                this.beds = beds;
            }

            public String getBedType() {
                return bedType;
            }

            public void setBedType(String bedType) {
                this.bedType = bedType;
            }
        }
    }

    public static class Price {
        private String currency;
        private String base;
        private String total;

        public String getCurrency() {
            return currency;
        }

        public void setCurrency(String currency) {
            this.currency = currency;
        }

        public String getBase() {
            return base;
        }

        public void setBase(String base) {
            this.base = base;
        }

        public String getTotal() {
            return total;
        }

        public void setTotal(String total) {
            this.total = total;
        }
    }
}
