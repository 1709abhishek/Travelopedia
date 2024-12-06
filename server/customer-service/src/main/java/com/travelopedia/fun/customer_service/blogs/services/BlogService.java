package com.travelopedia.fun.customer_service.blogs.services;

import java.time.Instant;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.travelopedia.fun.customer_service.accounts.models.Account;
import com.travelopedia.fun.customer_service.accounts.repository.AccountsRepository;
import com.travelopedia.fun.customer_service.blogs.models.Blog;
import com.travelopedia.fun.customer_service.blogs.models.BlogDTO;
import com.travelopedia.fun.customer_service.blogs.repositories.BlogRepository;

@Service
public class BlogService {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private AccountsRepository accountsRepository;

    public Blog createBlog(Blog blog, String username) {
        // Fetch the user's details based on the username
        Account account = accountsRepository.findByEmail(username);
        System.out.println("Control flow in creteBlog service");
        // Set the userId field in the Blog object
        blog.setUser(account);
        blog.setTags(String.join(", ", blog.getTags().split(","))); // Convert tags array to comma-separated string
        blog.setCreatedAt(Date.from(Instant.now())); 
        blog.setUpdatedAt(Date.from(Instant.now()));
        return blogRepository.save(blog);
    }

    public BlogDTO updateBlog(int blogId, Blog updatedBlog, String username) {
        Optional<Blog> blogOptional = blogRepository.findById(blogId);
        if (blogOptional.isPresent()) {
            Blog blog = blogOptional.get();
            if (!blog.getUser().getEmail().equals(username)) {
                throw new RuntimeException("You do not have permission to update this blog");
            }

            blog.setTitle(updatedBlog.getTitle());
            blog.setContent(updatedBlog.getContent());
            blog.setTags(updatedBlog.getTags());
            blog.setUpdatedAt(new Date());
            if(updatedBlog.getImage() != null)
                blog.setImage(updatedBlog.getImage());
            Blog newupdatedBlog = blogRepository.save(blog);

            // Convert Blog entity to BlogDTO
            BlogDTO dto = new BlogDTO();
            dto.setBlogId((long) newupdatedBlog.getBlogId());
            dto.setTitle(newupdatedBlog.getTitle());
            dto.setContent(newupdatedBlog.getContent());
            dto.setTags(newupdatedBlog.getTags());
            dto.setCreatedAt(newupdatedBlog.getCreatedAt());
            dto.setUpdatedAt(newupdatedBlog.getUpdatedAt());
            dto.setUserName(extractUsernameFromEmail(blog.getUser().getEmail()));
            dto.setImage(newupdatedBlog.getImage());
            return dto;
        }
        throw new RuntimeException("Blog not found");
    }

    public List<BlogDTO> getAllBlogs() {
        List<Blog> blogs = blogRepository.findAll();
        return blogs.stream().map(blog -> {
            BlogDTO dto = new BlogDTO();
            dto.setBlogId((long) blog.getBlogId());
            dto.setTitle(blog.getTitle());
            dto.setContent(blog.getContent());
            dto.setTags(blog.getTags());
            dto.setCreatedAt(blog.getCreatedAt());
            dto.setUpdatedAt(blog.getUpdatedAt());
            dto.setUserName(extractUsernameFromEmail(blog.getUser().getEmail()));
            dto.setImage(blog.getImage());
            return dto;
        }).collect(Collectors.toList());
    }

    public BlogDTO getBlogById(int blogId) {
        Optional<Blog> blogOptional = blogRepository.findById(blogId);
        if (blogOptional.isPresent()) {
            Blog blog = blogOptional.get();
            BlogDTO dto = new BlogDTO();
            dto.setBlogId((long) blog.getBlogId());
            dto.setTitle(blog.getTitle());
            dto.setContent(blog.getContent());
            dto.setTags(blog.getTags());
            dto.setCreatedAt(blog.getCreatedAt());
            dto.setUpdatedAt(blog.getUpdatedAt());
            dto.setUserName(extractUsernameFromEmail(blog.getUser().getEmail()));
            dto.setImage(blog.getImage());
            return dto;
        }
        throw new RuntimeException("Blog not found");
    }

    public List<BlogDTO> getBlogsByUserId(int userId) {
        List<Blog> blogs = blogRepository.findByUserId(userId);
        return blogs.stream().map(blog -> {
            BlogDTO dto = new BlogDTO();
            dto.setBlogId((long) blog.getBlogId());
            dto.setTitle(blog.getTitle());
            dto.setContent(blog.getContent());
            dto.setTags(blog.getTags());
            dto.setCreatedAt(blog.getCreatedAt());
            dto.setUpdatedAt(blog.getUpdatedAt());
            dto.setUserName(extractUsernameFromEmail(blog.getUser().getEmail()));
            dto.setImage(blog.getImage());
            return dto;
        }).collect(Collectors.toList());
    }

    public void deleteBlog(int blogId, String username) {
        Optional<Blog> blogOptional = blogRepository.findById(blogId);
        if (blogOptional.isPresent()) {
            Blog blog = blogOptional.get();

            // Check if the blog belongs to the current user
            if (!blog.getUser().getEmail().equals(username)) {
                throw new RuntimeException("You do not have permission to delete this blog");
            }
            blogRepository.deleteById(blogId);
        }
    }
    private String extractUsernameFromEmail(String email) {
        if (email != null && email.contains("@")) {
            return email.split("@")[0];
        }
        return email;
    }
    

}
