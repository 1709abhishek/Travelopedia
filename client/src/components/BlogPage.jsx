import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import TopBlogs from "./TopBlogs";
import "../styles/blogpage.css";
import { getStoredToken, getStoredUserId } from "../services/CustomerServices";
import defaultImage from "../assets/default-image.jpg";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("oldToRecent");

  useEffect(() => {
    // Fetch blogs
    const fetchBlogs = async () => {
      try {
        const token = getStoredToken();
        console.log("token", JSON.stringify(token));
        const response = await fetch("http://localhost:8080/blogs/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    if (sortOption === "showMyBlogs") {
      // Fetch user's blogs
      const fetchMyBlogs = async () => {
        try {
          const token = getStoredToken();
          const id = getStoredUserId();
          const response = await fetch(`http://localhost:8080/blogs/user/${id}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });
          const data = await response.json();
          setBlogs(data);
        } catch (error) {
          console.error("Error fetching user's blogs:", error);
        }
      };
      fetchMyBlogs();
    } else {
      // Fetch all blogs
      const fetchBlogs = async () => {
        try {
          const token = getStoredToken();
          const response = await fetch("http://localhost:8080/blogs/all", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`
            }
          });
          const data = await response.json();
          if (sortOption === "recentToOld") {
            data.reverse();
          }
          setBlogs(data);
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      };
      fetchBlogs();
    }
  }, [sortOption]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const filteredBlogs = blogs.filter((blog) => {
    const tags = JSON.parse(blog.tags).join(" ").toLowerCase();
    return (
      blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tags.includes(searchTerm.toLowerCase())
    );
  });

  const getImageSrc = (image) => {
    if (image) {
      console.log("image", image);
      return `data:image/jpeg;base64,${image}`;
    }
    return defaultImage;
  };

  const getFirst25Words = (htmlContent) => {
    const div = document.createElement("div");
    div.innerHTML = htmlContent;
    const textContent = div.textContent || div.innerText || "";
    const words = textContent.split(/\s+/).slice(0, 25).join(" ");
    return words;
  };

  const getTimeDifference = (date) => {
    const now = new Date();
    const blogDate = new Date(date);
    const diffInSeconds = Math.floor((now - blogDate) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(diffInSeconds / interval.seconds);
      if (count >= 1) {
        return count === 1
          ? `1 ${interval.label} ago`
          : `${count} ${interval.label}s ago`;
      }
    }

    return "just now";
  };

  return (
    <div className="blog-page">
      <Header />
      <div className="content">
        <div className="main-content">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search blogs..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <select value={sortOption} onChange={handleSortChange}>
              <option value="oldToRecent">Old to Recent</option>
              <option value="recentToOld">Recent to Old</option>
              <option value="showMyBlogs">Show My Blogs</option>
            </select>
            <Link to="/create-blog" className="create-blog-button">
              Write ✒️
            </Link>
          </div>
          <div className="blog-list">
            {filteredBlogs.map((blog) => (
              <Link to={`/blogs/${blog.blogId}`} className="blog-link" key={blog.id}>
                <div className="blog-item">
                  <div className="blog-text">
                  <p className="blog-date">{getTimeDifference(blog.createdAt)}</p>
                    <h3 className="blog-title">{blog.title}</h3>
                    <p className="blog-description" dangerouslySetInnerHTML={{ __html: getFirst25Words(blog.content) + "..." }}></p>
                    <div className="blog-meta">
                      <p className="blog-author">By {blog.userName}</p>
                      {/* <p className="blog-date">{getTimeDifference(blog.createdAt)}</p> */}
                    </div>
                    <div className="blog-tags">
                      {JSON.parse(blog.tags).map((tag, index) => (
                        <span key={index} className="blog-tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  <img src={getImageSrc(blog.image)} alt="Blog" className="blog-image" />
                </div>
              </Link>
            ))}
          </div>
        </div>
        <TopBlogs />
      </div>
      <Footer />
    </div>
  );
};

export default BlogPage;