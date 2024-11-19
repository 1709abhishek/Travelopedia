package com.travelopedia.fun.customer_service.beans;

public class Customer {
    private int session;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String places;


    public Customer(String name, String email, String phone, String address, int session, String places) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.session = session;
        this.places = places;
    }


    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public int getSession() {
        return session;
    }

    public String getPlaces() {
        return places;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setSession(int session) {
        this.session = session;
    }

    public void setPlaces(String places) {
        this.places = places;
    }

    public String toString() {
        return "Customer{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", session=" + session +
                ", places='" + places + '\'' +
                '}';
    }


}
