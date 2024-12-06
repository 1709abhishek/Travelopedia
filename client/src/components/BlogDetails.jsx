import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import TopBlogs from "./TopBlogs";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/blogdetails.css";
import { getStoredToken, getStoredEmail } from "../services/CustomerServices";
import defaultImage from "../assets/default-image.jpg";
import ConfirmDialog from "./ConfirmDialog";

const BlogDetails = () => {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const navigate = useNavigate();
  const userEmail = getStoredEmail();

  useEffect(() => {
    // Fetch blog details
    const fetchBlogDetails = async () => {
      try {
        const token = getStoredToken();
        const response = await fetch(`http://localhost:8080/blogs/${blogId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });
        const data = await response.json();
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };
    fetchBlogDetails();
  }, [blogId]);

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

  if (!blog) {
    return <div>Loading...</div>;
  }

  const getImageSrc = (image) => {
    if (image) {
      console.log("image", image);
      return `data:image/jpeg;base64,${image}`;
    }
    return defaultImage;
  };

  if (!blog) {
    return <div>Loading...</div>;
  }

  const handleEditClick = () => {
    navigate(`/blogs/edit/${blogId}`);
  };

  const getUsername = (email) => {
    return email.split('@')[0];
  };

  const handleDeleteClick = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirmDelete = async () => {
    setShowConfirmDialog(false);
    const token = getStoredToken();
    try {
      const response = await fetch(`http://localhost:8080/blogs/delete/${blogId}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });

      if (response.ok) {
        navigate("/blogs");
      } else {
        console.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };

  return (
    <div className="blog-details-page">
      <Header />
      <div className="content">
        <div className="main-content">
          <div className="blog-details">
          <img src={getImageSrc(blog.image)} alt={blog.title} className="blog-details-image" />
            <h1 className="blog-details-title">{blog.title}</h1>
            <div className="blog-meta">
            <p className="blog-details-user">By {blog.userName}</p>
            {blog.userName === getUsername(userEmail) && (
              <div className="blog-actions">
                  <button className="edit-button" onClick={handleEditClick}>
                    Edit
                  </button>
                  <button className="delete-button" onClick={handleDeleteClick}>
                    Delete
                  </button>
                </div>
            )}
            </div>
            <p className="blog-details-date">{getTimeDifference(blog.createdAt)}</p>
            {/* <p className="blog-details-content">{blog.content}</p> */}
            <div className="blog-details-content">
              <ReactQuill value={blog.content} readOnly={true} theme="bubble" />
            </div>
            <div className="blog-details-tags">
              {JSON.parse(blog.tags).map((tag, index) => (
                <span key={index} className="blog-tag">{tag}</span>
              ))}
            </div>
            {/* {blog.userName === getUsername(userEmail) && (
              <button className="edit-button" onClick={handleEditClick}>
                Edit
              </button>
            )} */}
          </div>
        </div>
        <TopBlogs />
      </div>
      <Footer />
      <ConfirmDialog
        show={showConfirmDialog}
        message={`Are you sure you want to delete the blog "${blog.title}"?`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

export default BlogDetails;