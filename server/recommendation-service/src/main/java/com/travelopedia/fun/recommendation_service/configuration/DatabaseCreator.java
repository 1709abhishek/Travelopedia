package com.travelopedia.fun.recommendation_service.configuration;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class DatabaseCreator {

    private final String url = "jdbc:mysql://35.188.76.128/";
    private final String user = "root";
    private final String password = "Figureyourself";
    private final String dbName = "recommendationservicedb";

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