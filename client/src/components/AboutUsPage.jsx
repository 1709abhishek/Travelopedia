import React, { useState } from "react";
import Header from "./Header.jsx";
import "../styles/about.css";
import videoBanner from "../assets/banner_video.mp4";
import Footer from "../components/Footer.jsx";

function AboutUsPage() {
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
              <h2 className="hero__title ">About Travelopedia</h2>
            </div>
          </section>

          {/* About Content Section */}
          <section className="content">
            <article className="content__inner">
              <h1 className="content__title">Travelopedia</h1>
              <p>
                Travelopedia was born from the shared passion of four friends who love to travel. Having visited numerous countries and experienced diverse cultures, they decided to create a platform to share their adventures and tips with fellow travel enthusiasts. 
              </p>
              <p>
                Our mission is to inspire and guide travelers by providing comprehensive travel guides, tips, and recommendations. Whether you're a seasoned traveler or planning your first trip, Travelopedia aims to be your go-to resource for all things travel.
              </p>
              <p>
                Join us as we explore the world, one destination at a time. 
              </p>
              <p>Happy travels!</p>
            </article>
          </section>
        </main>
      </div>

      <hr className="divider bg-gray-900"></hr>
      {/* <!-- Footer --> */}
      <Footer></Footer>
    </div>
  );
}

export default AboutUsPage;
