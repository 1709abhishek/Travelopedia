import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../styles/updateblogpage.css";
import { getStoredToken } from "../services/CustomerServices";

const UpdateBlogPage = () => {
  const { blogId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

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
        setTitle(data.title);
        setContent(data.content);
        setTags(JSON.parse(data.tags));
        setImage(data.image);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };
    fetchBlogDetails();
  }, [blogId]);

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
      const response = await fetch(`http://localhost:8080/blogs/update/${blogId}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        navigate(`/blogs/${blogId}`);
      } else {
        console.error("Failed to update blog");
      }
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const modules = {
    toolbar: [
      [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      ['bold', 'underline', 'strike'],        // toggled buttons
      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction
      [{ 'align': [] }],
      ['link'],
      ['clean']                                         // remove formatting button
    ]
  };

  const formats = [
    'size',
    'bold', 'underline', 'strike',
    'color', 'background',
    'list', 'bullet',
    'indent',
    'direction', 'align',
    'link'
  ];

  return (
    <div className="update-blog-page">
      <Header />
      <div className="update-content">
        {/* <h2>Update your blog</h2> */}
        <form onSubmit={handleSubmit} className="update-blog-form">
          <div className="form-group">
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
              {image ? image.name : " Share an image"}
              {"Share an image"}
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </div>
          <div className="button-group">
            <button type="button" className="update-cancel-button" onClick={() => navigate(`/blogs/${blogId}`)}>Cancel</button>
            <button type="submit" className="update-blog-button">Update Blog</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UpdateBlogPage;