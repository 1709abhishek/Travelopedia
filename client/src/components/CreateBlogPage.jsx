import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/createblogpage.css";
import { getStoredToken } from "../services/CustomerServices";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleTagInput = (e) => {
    if (e.key === "Enter" && tagInput.trim()) {
      setTags([...tags, tagInput.trim()]);
      setTagInput("");
      e.preventDefault();
    }
  };

  const handleTagRemove = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getStoredToken();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("tags", JSON.stringify(tags));
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch("http://localhost:8080/blogs/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const newBlog = await response.json();
        navigate(`/blogs/${newBlog.blogId}`);
      } else {
        console.error("Failed to create blog");
      }
    } catch (error) {
      console.error("Error creating blog:", error);
    }
  };
  const modules = {
    toolbar: [
      // [{ 'font': [] }],
      // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      ['bold', 'underline', 'strike'],        // toggled buttons
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      // [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
      // ['blockquote', 'code-block'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'align': [] }],
      ['link'],
      ['clean']                                         // remove formatting button
    ]
  };

  const formats = [
    // 'font',
    // 'header',
    'size',
    'bold', 'underline', 'strike',
    'color', 'background',
    // 'script', 'sub', 'super',
    // 'blockquote', 'code-block',
    'list', 'bullet',
    'indent',
    'direction', 'align',
    'link'
  ];

  return (
    <div className="create-blog-page">
      <Header />
      <div className="content">
        {/* <h2>Share your experience</h2> */}
        <form onSubmit={handleSubmit} className="create-blog-form">
          <div className="form-group">
            {/* <label htmlFor="title">Title</label> */}
            <input
              type="text"
              id="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="content">Content</label> */}
            {/* <textarea
              id="content"
              placeholder="Tell about your last trip..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            ></textarea> */}
            <ReactQuill
              value={content}
              onChange={setContent}
              placeholder="Tell about your last trip..."
              required
              modules={modules}
              formats={formats}
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="tags">Tags (comma separated)</label> */}
            <input
              type="text"
              id="tags"
              placeholder="Enter a tag and press Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagInput}
            />
            <div className="tags-container">
              {tags.map((tag, index) => (
                <span key={index} className="tag">
                  {tag}
                  <button type="button" onClick={() => handleTagRemove(index)}>
                    &times;
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="image" className="image-label">
              {image ? image.name : "Share an image"}
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          <button type="submit" className="create-blog-button">Share your experience</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default CreateBlog;