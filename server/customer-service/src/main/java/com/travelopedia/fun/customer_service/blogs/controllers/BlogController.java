package com.travelopedia.fun.customer_service.blogs.controllers;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.travelopedia.fun.customer_service.blogs.models.Blog;
import com.travelopedia.fun.customer_service.blogs.models.BlogDTO;
import com.travelopedia.fun.customer_service.blogs.services.BlogService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.travelopedia.fun.customer_service.accounts.service.AccountsService;


@RestController
@RequestMapping("/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @Autowired
    private AccountsService accountsService;

    @PostMapping("/create")
    public ResponseEntity<Blog> createBlog(
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("tags") String tags,
            @RequestParam(value = "image", required = false) MultipartFile image,
            HttpServletRequest request) throws IOException {
        String authorizationHeader = request.getHeader("Authorization");
        String username = accountsService.authenticateToken(authorizationHeader);
        
        // System.out.println("Username: " + username);
        Blog blog = new Blog();
        blog.setTitle(title);
        blog.setContent(content);
        blog.setTags(tags);
        if (image != null && !image.isEmpty()) {
            blog.setImage(image.getBytes());
        }

        Blog createdBlog = blogService.createBlog(blog, username);
        return ResponseEntity.ok(createdBlog);
    }

    // Update an existing blog
    // @PutMapping("/update/{blogId}")
    // public ResponseEntity<BlogDTO> updateBlog(@PathVariable int blogId, @RequestBody Blog updatedBlog, HttpServletRequest request) {
    //     String authorizationHeader = request.getHeader("Authorization");
    //     String username = accountsService.authenticateToken(authorizationHeader);
    //     BlogDTO blogDTO = blogService.updateBlog(blogId, updatedBlog, username);
    //     return ResponseEntity.ok(blogDTO);
    // }
    @PutMapping("/update/{blogId}")
    public ResponseEntity<BlogDTO> updateBlog(
            @PathVariable int blogId,
            @RequestParam("title") String title,
            @RequestParam("content") String content,
            @RequestParam("tags") String tags,
            @RequestParam(value = "image", required = false) MultipartFile image,
            HttpServletRequest request) throws IOException {
        String authorizationHeader = request.getHeader("Authorization");
        String username = accountsService.authenticateToken(authorizationHeader);

        Blog updatedBlog = new Blog();
        updatedBlog.setTitle(title);
        updatedBlog.setContent(content);
        updatedBlog.setTags(tags);
        if (image != null && !image.isEmpty()) {
            updatedBlog.setImage(image.getBytes());
        }

        BlogDTO blogDTO = blogService.updateBlog(blogId, updatedBlog, username);
        return ResponseEntity.ok(blogDTO);
    }

    // Get all blogs
    @GetMapping("/all")
    public ResponseEntity<?> getAllBlogs(HttpServletRequest request) {
        String jwtStatus = (String) request.getAttribute("jwtStatus");
        if ("invalid".equals(jwtStatus)) {
            System.out.println("Invalid JWT token");
            return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED).body("Invalid JWT token");
        }

        System.out.println("Control flow in getAllBlogs method");
        List<BlogDTO> blogDTOs = blogService.getAllBlogs();
        return ResponseEntity.ok(blogDTOs);
    }

    // Get a blog by its ID
    @GetMapping("/{blogId}")
    public ResponseEntity<?> getBlogById(@PathVariable int blogId, HttpServletRequest request) {
        System.out.println("Blog ID: " + blogId);
        String jwtStatus = (String) request.getAttribute("jwtStatus");
        if ("invalid".equals(jwtStatus)) {
            System.out.println("Invalid JWT token");
            return ResponseEntity.status(HttpServletResponse.SC_UNAUTHORIZED).body("Invalid JWT token");
        }

        BlogDTO blogDTO = blogService.getBlogById(blogId);
        return ResponseEntity.ok(blogDTO);
    }

    // Get blogs by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<BlogDTO>> getBlogsByUserId(@PathVariable int userId) {
        List<BlogDTO> blogDTOs = blogService.getBlogsByUserId(userId);
        return ResponseEntity.ok(blogDTOs);
    }

    // Delete a blog by its ID
    @DeleteMapping("/delete/{blogId}")
    public ResponseEntity<String> deleteBlog(@PathVariable int blogId, HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        String username = accountsService.authenticateToken(authorizationHeader);
        blogService.deleteBlog(blogId, username);
        return ResponseEntity.ok("Blog deleted successfully");
    }
}
