package com.travelopedia.fun.budget_service.beans;

import java.util.List;

public class HotelListResponse {
    private List<HotelData> data;

    public List<HotelData> getData() {
        return data;
    }

    public void setData(List<HotelData> data) {
        this.data = data;
    }

    public static class HotelData {
        private String hotelId;
        private String name;
        private String chainCode;
        private String iataCode;
        private GeoCode geoCode;
        private Address address;
        private Distance distance;

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

        public String getChainCode() {
            return chainCode;
        }

        public void setChainCode(String chainCode) {
            this.chainCode = chainCode;
        }

        public String getIataCode() {
            return iataCode;
        }

        public void setIataCode(String iataCode) {
            this.iataCode = iataCode;
        }

        public GeoCode getGeoCode() {
            return geoCode;
        }

        public void setGeoCode(GeoCode geoCode) {
            this.geoCode = geoCode;
        }

        public Address getAddress() {
            return address;
        }

        public void setAddress(Address address) {
            this.address = address;
        }

        public Distance getDistance() {
            return distance;
        }

        public void setDistance(Distance distance) {
            this.distance = distance;
        }
    }

    public static class GeoCode {
        private double latitude;
        private double longitude;

        public double getLatitude() {
            return latitude;
        }

        public void setLatitude(double latitude) {
            this.latitude = latitude;
        }

        public double getLongitude() {
            return longitude;
        }

        public void setLongitude(double longitude) {
            this.longitude = longitude;
        }
    }

    public static class Address {
        private String countryCode;

        public String getCountryCode() {
            return countryCode;
        }

        public void setCountryCode(String countryCode) {
            this.countryCode = countryCode;
        }
    }

    public static class Distance {
        private double value;
        private String unit;

        public double getValue() {
            return value;
        }

        public void setValue(double value) {
            this.value = value;
        }

        public String getUnit() {
            return unit;
        }

        public void setUnit(String unit) {
            this.unit = unit;
        }
    }
}
