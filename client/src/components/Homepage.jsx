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
import { Card } from '@/components/ui/card';
import Header from "../components/Header.jsx";
import "../styles/bootstrap.min.css";
import "../styles/homepage.css";

const Homepage = () => {
  const features = [
    {
      icon: "fa-route",
      title: "Track Your Travels",
      description: "Log the places you've visited with a timeline, and visualize your travel statistics, including distance traveled and your global travel percentile."
    },
    {
      icon: "fa-camera",
      title: "Capture Memories",
      description: "Showcase your top travel moments by uploading photos from your trips, creating a personal memoir of your adventures."
    },
    {
      icon: "fa-compass",
      title: "Get Recommendations",
      description: "Receive AI-driven destination suggestions based on your travel history and wishlist, and plan your future itineraries with ease."
    },
    {
      icon: "fa-map-marked-alt",
      title: "Document Spots",
      description: "Discover and document the best hotels, restaurants, and tourist spots at each destination, helping you and other travelers plan the perfect trip."
    }
  ];

  return (
    <div className="homepage">
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
      <section className="w-full px-4 py-12">
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
      <section className="locations" id="locations">
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
      <section className="stats py-5" id="stats">
        <div className="container py-lg-5 py-md-3">
          <div className="row stat-grids">
            <div className="col-lg-6 stats-left">
              <h3 className="heading mb-4 text-li">Years in the Travel</h3>
              <p className="mb-3">
                Join thousands of travelers worldwide and see how you compare!
              </p>
            </div>
            <div className="col-lg-6 grid1 stats-right mt-lg-0 mt-4 pl-5">
              <div className="row">
                <div className="col-sm-4 col-6">
                  <p className="text-li">Total Distance Traveled</p>
                  <h4 className="text-wh">10M+</h4>
                  <span className="fa fa-users mr-2"></span>
                </div>
                <div className="col-sm-4 col-6">
                  <p>Countries Explored</p>
                  <h4>120+</h4>
                  <span className="fa fa-tasks mr-2"></span>
                </div>
                <div className="col-sm-4 col-6 mt-sm-0 mt-5">
                  <p>Trips Logged</p>
                  <h4>25k</h4>
                  <span className="fa fa-files-o mr-2"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr className="divider"></hr>

      {/* <!-- Footer --> */}

      <section className="footer">
        <div className="foot">
          <div className="footer-content">
            <div className="footlinks">
              <h4>Quick Links</h4>
              <ul>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/contact-us">About Us</Link>
                </li>
                <li>
                  <Link to="/contact-us">Contact Us</Link>
                </li>
              </ul>
            </div>

            <div className="footlinks">
              <h4>Connect</h4>
              <div className="social">
                <a href="#" target="_blank">
                  <i className="bx bxl-facebook"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="end">
          <p>Copyright © 2024 Travelopedia</p>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
