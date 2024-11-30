package com.travelopedia.fun.customer_service.configuration;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

@Component
public class DatabaseCreator {

    private final String url = "jdbc:mysql://localhost:3306/";
    private final String user = "root";
    private final String password = "Figureyourself";
    private final String dbName = "TravelopediaDB";

    @PostConstruct
    public void createDatabase() {
        try (Connection connection = DriverManager.getConnection(url, user, password);
             Statement statement = connection.createStatement()) {

            String sql = "CREATE DATABASE IF NOT EXISTS " + dbName;
            statement.executeUpdate(sql);
            System.out.println("Database created successfully!");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }
}