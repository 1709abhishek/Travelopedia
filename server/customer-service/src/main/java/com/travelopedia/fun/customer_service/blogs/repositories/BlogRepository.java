package com.travelopedia.fun.customer_service.blogs.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.travelopedia.fun.customer_service.blogs.models.Blog;

public interface BlogRepository extends JpaRepository<Blog, Integer> {
    List<Blog> findByUserId(int userId);
}
