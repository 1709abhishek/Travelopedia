package com.travelopedia.fun.customer_service.blogs.controllers;

import com.travelopedia.fun.customer_service.accounts.service.AccountsService;
import com.travelopedia.fun.customer_service.blogs.models.Blog;
import com.travelopedia.fun.customer_service.blogs.models.BlogDTO;
import com.travelopedia.fun.customer_service.blogs.services.BlogService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

public class BlogControllerTests {

    @Mock
    private BlogService blogService;

    @Mock
    private AccountsService accountsService;

    @Mock
    private HttpServletRequest request;

    @InjectMocks
    private BlogController blogController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void createBlog_Success() throws IOException {
        Blog blog = new Blog();
        blog.setTitle("Test Title");
        blog.setContent("Test Content");
        blog.setTags("Test Tags");

        when(request.getHeader("Authorization")).thenReturn("Bearer token");
        when(accountsService.authenticateToken(anyString())).thenReturn("username");
        when(blogService.createBlog(any(Blog.class), anyString())).thenReturn(blog);

        ResponseEntity<Blog> response = blogController.createBlog("Test Title", "Test Content", "Test Tags", null, request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(blog, response.getBody());
    }

    @Test
    void updateBlog_Success() throws IOException {
        BlogDTO blogDTO = new BlogDTO();
        blogDTO.setTitle("Updated Title");

        when(request.getHeader("Authorization")).thenReturn("Bearer token");
        when(accountsService.authenticateToken(anyString())).thenReturn("username");
        when(blogService.updateBlog(anyInt(), any(Blog.class), anyString())).thenReturn(blogDTO);

        ResponseEntity<BlogDTO> response = blogController.updateBlog(1, "Updated Title", "Updated Content", "Updated Tags", null, request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(blogDTO, response.getBody());
    }

    @Test
    void getAllBlogs_Success() {
        List<BlogDTO> blogDTOs = Arrays.asList(new BlogDTO());

        when(request.getAttribute("jwtStatus")).thenReturn("valid");
        when(blogService.getAllBlogs()).thenReturn(blogDTOs);

        ResponseEntity<?> response = blogController.getAllBlogs(request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(blogDTOs, response.getBody());
    }

    @Test
    void getAllBlogs_InvalidJWT() {
        when(request.getAttribute("jwtStatus")).thenReturn("invalid");

        ResponseEntity<?> response = blogController.getAllBlogs(request);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Invalid JWT token", response.getBody());
    }

    @Test
    void getBlogById_Success() {
        BlogDTO blogDTO = new BlogDTO();

        when(request.getAttribute("jwtStatus")).thenReturn("valid");
        when(blogService.getBlogById(anyInt())).thenReturn(blogDTO);

        ResponseEntity<?> response = blogController.getBlogById(1, request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(blogDTO, response.getBody());
    }

    @Test
    void getBlogById_InvalidJWT() {
        when(request.getAttribute("jwtStatus")).thenReturn("invalid");

        ResponseEntity<?> response = blogController.getBlogById(1, request);

        assertEquals(HttpStatus.UNAUTHORIZED, response.getStatusCode());
        assertEquals("Invalid JWT token", response.getBody());
    }

    @Test
    void getBlogsByUserId_Success() {
        List<BlogDTO> blogDTOs = Arrays.asList(new BlogDTO());

        when(blogService.getBlogsByUserId(anyInt())).thenReturn(blogDTOs);

        ResponseEntity<List<BlogDTO>> response = blogController.getBlogsByUserId(1);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(blogDTOs, response.getBody());
    }

    @Test
    void deleteBlog_Success() {
        when(request.getHeader("Authorization")).thenReturn("Bearer token");
        when(accountsService.authenticateToken(anyString())).thenReturn("username");
        doNothing().when(blogService).deleteBlog(anyInt(), anyString());

        ResponseEntity<String> response = blogController.deleteBlog(1, request);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Blog deleted successfully", response.getBody());
    }
}