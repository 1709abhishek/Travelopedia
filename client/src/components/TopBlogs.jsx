import React from "react";
import { Link } from "react-router-dom";
import "../styles/topblogs.css";
import l1 from "../assets/l6.jpg";
import l2 from "../assets/aan.jpeg";
import l3 from "../assets/l8.jpg";
import l4 from "../assets/indonesia.jpeg";
import l5 from "../assets/new_york.jpg";

const topBlogs = [
  {
    id: 1,
    title: "A Dream Trip to Switzerland: Friends, ...",
    image: l1,
    url: "./src/static/switzerland.html",
  },
  {
    id: 2,
    title: "A Journey Through the Mountains of Nepal",
    image: l2,
    url: "./src/static/switzerland.html",
  },
  {
    id: 3,
    title: "New York City: The City That ...",
    image: l5,
    url: "./src/static/new_york.html",
  },
  {
    id: 4,
    title: "Exploring Indonesia: A Journey Through ...",
    image: l4,
    url: "./src/static/Indonesia.html",
  },
  {
    id: 5,
    title: "Discovering the Wonders of Italy",
    image: l3,
    url: "./src/static/Italy.html",
  },
];

const TopBlogs = () => {
  const handleBlogClick = (url) => {
    window.open(url, "_blank");
  };
  return (
    <div className="top-blogs">
      <h2>Top Stories</h2>
      <div className="top-blogs-list">
        {topBlogs.map((blog) => (
          <div key={blog.id} className="top-blog-item">
            <img src={blog.image} alt={blog.title} className="top-blog-image" />
            <div className="top-blog-text">
              {blog.url ? (
                <a
                  href="#"
                  className="top-blog-link"
                  onClick={() => handleBlogClick(blog.url)}
                >
                  <h3>{blog.title}</h3>
                </a>
              ) : (
                <Link to={`/blogs/${blog.id}`} className="top-blog-link">
                  <h3>{blog.title}</h3>
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopBlogs;