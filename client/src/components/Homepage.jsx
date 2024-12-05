// import React from 'react';
import { Link } from "react-router-dom";
import videoBanner from "../assets/bgvid.mp4";
import l1 from "../assets/l1.jpg";
import l2 from "../assets/l2.jpg";
import l3 from "../assets/l3.jpg";
import l4 from "../assets/l4.jpg";
import l5 from "../assets/l5.jpg";
import l6 from "../assets/l6.jpg";
import l7 from "../assets/l7.jpg";
import l8 from "../assets/l8.jpg";
import l9 from "../assets/new_york.jpg";
import l10 from "../assets/LA.jpg";
import experience1 from "../assets/maldives.jpg";
import experience2 from "../assets/experience2.jpg";
import { Card } from "@/components/ui/card";
import Header from "../components/Header.jsx";
import "../styles/homepage.css";
import Footer from "./Footer.jsx";

const Homepage = () => {
  const features = [
    {
      icon: "fa-route",
      title: "Track Your Travels",
      description:
        "Log the places you've visited with a timeline, and visualize your travel statistics, including distance traveled and your global travel percentile.",
    },
    {
      icon: "fa-camera",
      title: "Capture Memories",
      description:
        "Showcase your top travel moments by uploading photos from your trips, creating a personal memoir of your adventures.",
    },
    {
      icon: "fa-compass",
      title: "Get Recommendations",
      description:
        "Receive AI-driven destination suggestions based on your travel history and wishlist, and plan your future itineraries with ease.",
    },
    {
      icon: "fa-map-marked-alt",
      title: "Document Spots",
      description:
        "Discover and document the best hotels, restaurants, and tourist spots at each destination, helping you and other travelers plan the perfect trip.",
    },
  ];

  return (
    <div className="homepage bg-gray-900">
      <div className="banner">
        <video
          src={videoBanner}
          type="video/mp4"
          autoPlay
          muted
          loop
          preload="auto"
        ></video>

        {/* Header */}
        <div className="content-home" id="home">
          <Header></Header>

          <div className="title">
            <h1 className="travelopedia">Travelopedia</h1>
            <p>
              Track Your Journeys, Relive Your Memories, and Explore New
              Adventures
            </p>
            <Link className="button" to="/log-trip">
              Log Trip
            </Link>
          </div>
        </div>
      </div>

      {/* <!-- Services --> */}
      <section className="w-full px-4 py-12 bg-gray-900">
        <div className="container mx-auto">
          <h3 className="text-center text-white text-3xl lg:text-4xl font-bold mb-12">
            What we do!
          </h3>
          <div className="flex flex-nowrap justify-between gap-6">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="flex-1 p-6 rounded-xl hover:shadow-lg transition-all duration-300 bg-white"
              >
                <div className="text-center about-box">
                  <h3 className="text-lg font-semibold mb-2 about-title">
                    {feature.title}
                  </h3>
                  <p className="text-sm about-description">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* <!-- Locations --> */}
      <section className="locations bg-gray-900" id="locations">
        <div className="package-title">
          <h2>Popular Locations</h2>
        </div>

        <div className="location-content">
          <a href="./locations.html#kashmir" target="_blank">
            <div className="col-content">
              <img src={l1} alt="" />
              <h5>India</h5>
              <p>Kashmir</p>
            </div>
          </a>

          <a href="./locations.html#istanbul" target="_blank">
            <div className="col-content">
              <img src={l2} alt="" />
              <h5>Turkey</h5>
              <p>Istanbul</p>
            </div>
          </a>

          <a href="./locations.html#paris" target="_blank">
            <div className="col-content">
              <img src={l3} alt="" />
              <h5>France</h5>
              <p>Paris</p>
            </div>
          </a>

          <a href="./locations.html#bali" target="_blank">
            <div className="col-content">
              <img src={l4} alt="" />
              <h5>Indonesia</h5>
              <p>Bali</p>
            </div>
          </a>

          <a href="./locations.html#dubai" target="_blank">
            <div className="col-content">
              <img src={l5} alt="" />
              <h5>United Arab Emirates</h5>
              <p>Dubai</p>
            </div>
          </a>

          <a href="./locations.html#geneva" target="_blank">
            <div className="col-content">
              <img src={l6} alt="" />
              <h5>Switzerland</h5>
              <p>Geneva</p>
            </div>
          </a>

          <a href="./locations.html#port-blair" target="_blank">
            <div className="col-content">
              <img src={l7} alt="" />
              <h5>Andaman & Nicobar</h5>
              <p>Port Blair</p>
            </div>
          </a>

          <a href="./locations.html#rome" target="_blank">
            <div className="col-content">
              <img src={l8} alt="" />
              <h5>Italy</h5>
              <p>Rome</p>
            </div>
          </a>

          <a href="./locations.html#rome" target="_blank">
            <div className="col-content">
              <img src={l10} alt="" />
              <h5>Los Angeles</h5>
              <p>USA</p>
            </div>
          </a>

          <a href="./locations.html#rome" target="_blank">
            <div className="col-content">
              <img src={l9} alt="" />
              <h5>New York</h5>
              <p>USA</p>
            </div>
          </a>
        </div>
      </section>

      {/* <!--Travel Stats--> */}
      <section className="stats py-5 bg-gray-900" id="stats">
        <div className="container py-lg-5 py-md-3">
          <div className="flex flex-wrap items-center lg:items-stretch lg:h-full">
            {/* Left Section */}
            <div className="w-full lg:w-1/2 text-center lg:text-left mb-4 lg:mb-0 p-5 flex items-center justify-center lg:justify-start">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Years in the Travel
                </h3>
                <p className="text-gray-400">
                  Join thousands of travelers worldwide and see how you compare!
                </p>
              </div>
            </div>

            {/* Right Section */}
            <div className="w-full lg:w-1/2 flex justify-around">
              {/* Stat 1 */}
              <div className="text-center">
                <h4 className="text-4xl font-bold text-white">10M+</h4>
                <p className="text-gray-400">Total Distance Traveled</p>
              </div>
              {/* Stat 2 */}
              <div className="text-center">
                <h4 className="text-4xl font-bold text-white">120+</h4>
                <p className="text-gray-400">Countries Explored</p>
              </div>
              {/* Stat 3 */}
              <div className="text-center">
                <h4 className="text-4xl font-bold text-white">25k</h4>
                <p className="text-gray-400">Trips Logged</p>
              </div>
            </div>
          </div>
          <div className="experience__container grid">
            <div className="experience__img grid">
              <div className="experience__overlay">
                <img src={experience1} alt="" className="experience__img-one" />
              </div>
              <div className="experience__overlay">
                <img src={experience2} alt="" className="experience__img-two" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider bg-gray-900"></hr>

      {/* <!-- Footer --> */}
      <Footer></Footer>
    </div>
  );
};

export default Homepage;
