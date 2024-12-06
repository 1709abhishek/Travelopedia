package com.travelopedia.fun.customer_service.blogs.models;

import java.util.Date;
import lombok.Data;

@Data
public class BlogDTO {
    private Long blogId;
    private String title;
    private String content;
    private String tags;
    private Date createdAt;
    private Date updatedAt;
    private String userName;
    private byte[] image;
}