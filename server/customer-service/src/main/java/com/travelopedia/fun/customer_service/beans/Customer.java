package com.travelopedia.fun.customer_service.beans;

public class Customer {
    private int session;
    private String firstName;
    private String lastName;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String places;

    public Customer(String firstName, String lastName, String email, String phone, String address, int session, String places) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.name = firstName + " " + lastName;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.session = session;
        this.places = places;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
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

    public void setFirstName(String firstName) {
        this.firstName = firstName;
        this.name = firstName + " " + this.lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
        this.name = this.firstName + " " + lastName;
    }

    public void setName(String name) {
        // This method is no longer needed as name is derived from firstName and lastName
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
                "firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", address='" + address + '\'' +
                ", session=" + session +
                ", places='" + places + '\'' +
                '}';
    }
}
