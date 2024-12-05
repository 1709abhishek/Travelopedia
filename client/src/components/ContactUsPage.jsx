import React, { useState } from "react";
import Header from "./Header.jsx";
import "../styles/about.css";
import videoBanner from "../assets/banner_video.mp4";
import Footer from "./Footer.jsx";

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="bg-gray-900">
      <header className="flex h-16 items-center justify-between bg-zinc-900">
        <h1 className="text-xl font-bold header-navbar">Travelopedia</h1>

        <Header></Header>
      </header>

      <div>
        <main>
          {/* Hero Section */}
          <section className="hero">
            <div className="hero-inner" id="section-0">
              {/* <img className="figure" src={banner} alt="Sample photograph of speed light" /> */}
              <div className="banner">
                <video
                  src={videoBanner}
                  type="video/mp4"
                  autoPlay
                  muted
                  loop
                  preload="auto"
                ></video>
              </div>
              <h2 className="hero__title">Contact Us</h2>
            </div>
          </section>

          {/* Contact Form Section */}
          <section className="contact-form p-4 flex justify-center items-center min-h-screen">
            <div className="w-full max-w-lg border border-gray-300 rounded-md p-8 bg-white shadow-md">
              <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700">Name:</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-lg font-medium text-gray-700">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-lg font-medium text-gray-700">Message:</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="mt-2 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-lg"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-lg font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Submit
                </button>
              </form>
            </div>
          </section>
        </main>
      </div>

      <hr className="divider bg-gray-900"></hr>
      
      {/* <!-- Footer --> */}
      <Footer></Footer>
    </div>
  );
}

export default ContactUsPage;
