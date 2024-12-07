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
import { Card } from "@/components/ui/card";
import Header from "../components/Header.jsx";
import "../styles/homepage.css";
import Footer from "./Footer.jsx";
import { useEffect } from "react";

const Homepage = () => {
  const features = [
    {
      icon: "",
      title: "AI Travel Recommendations",
      description:
        "Get personalized AI-driven suggestions for destinations, helping you plan your next adventure with ease.",
    },
    {
      icon: "",
      title: "Track Your Itinerary",
      description:
        "Log your trips and itineraries, keeping a detailed record of all your travel adventures in one place.",
    },
    {
      icon: "",
      title: "Manage Budgets and Bookings",
      description:
        "Create budgets, find the best flights and hotels, and manage all your travel details seamlessly in one platform.",
    },
    {
      icon: "",
      title: "Compare Your Travel Stats",
      description:
        "Discover how much you've traveled compared to others, and see your global travel percentile with detailed insights.",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const statsSection = document.getElementById("stats");
      const servicesSection = document.getElementById("services");
      const rectStats = statsSection.getBoundingClientRect();
      const rectServices = servicesSection.getBoundingClientRect();

      if (rectStats.top <= window.innerHeight && rectStats.bottom >= 0) {
        statsSection.classList.add("visible");
      }

      if (rectServices.top <= window.innerHeight && rectServices.bottom >= 0) {
        servicesSection.classList.add("visible");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="flex h-16 items-center justify-between bg-zinc-900">
        <h1 className="text-xl font-bold header-navbar">Travelopedia</h1>
        <Header />
      </header>
    
      <div className="bg-gray-900">
        <div className="banner">
          <video
            src={videoBanner}
            type="video/mp4"
            autoPlay
            muted
            loop
            preload="auto"
          ></video>

          <div className="content-home" id="home">
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
        <section
          id="services"
          className="services-section w-full px-4 py-12 bg-gray-900"
        >
          <div className="container mx-auto">
            <h3 className="text-center text-white text-5xl lg:text-4xl font-bold mb-12">
              What we do!
            </h3>
            <div className="features-container">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="card w-full sm:w-3/4 lg:w-1/3 p-4 rounded-xl hover:shadow-lg transition-all duration-300 bg-white"
                >
                  <div className="text-center about-box">
                    <h3 className="text-3xl font-semibold mb-2 about-title">
                      {feature.title}
                    </h3>
                    <p className="text-lg about-description">
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
          <a href="./src/static/kashmir.html" target="_blank">
            <div className="col-content">
              <img src={l1} alt="" />
              <h5>India</h5>
              <p>Kashmir</p>
            </div>
          </a>

          <a href="./src/static/turkey.html" target="_blank">
            <div className="col-content">
              <img src={l2} alt="" />
              <h5>Turkey</h5>
              <p>Istanbul</p>
            </div>
          </a>

          <a href="./src/static/paris.html" target="_blank">
            <div className="col-content">
              <img src={l3} alt="" />
              <h5>France</h5>
              <p>Paris</p>
            </div>
          </a>

          <a href="./src/static/indonesia.html" target="_blank">
            <div className="col-content">
              <img src={l4} alt="" />
              <h5>Indonesia</h5>
              <p>Bali</p>
            </div>
          </a>

          <a href="./src/static/dubai.html" target="_blank">
            <div className="col-content">
              <img src={l5} alt="" />
              <h5>United Arab Emirates</h5>
              <p>Dubai</p>
            </div>
          </a>

          <a href="./src/static/switzerland.html" target="_blank">
            <div className="col-content">
              <img src={l6} alt="" />
              <h5>Switzerland</h5>
              <p>Geneva</p>
            </div>
          </a>

          <a href="./src/static/aan.html" target="_blank">
            <div className="col-content">
              <img src={l7} alt="" />
              <h5>Andaman & Nicobar</h5>
              <p>Port Blair</p>
            </div>
          </a>

          <a href="./src/static/Italy.html" target="_blank">
            <div className="col-content">
              <img src={l8} alt="" />
              <h5>Italy</h5>
              <p>Rome</p>
            </div>
          </a>

          <a href="./src/static/la.html" target="_blank">
            <div className="col-content">
              <img src={l10} alt="" />
              <h5>Los Angeles</h5>
              <p>USA</p>
            </div>
          </a>

          <a href="./src/static/new_york.html" target="_blank">
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
              <div className="w-full lg:w-1/2 text-center lg:text-left mb-4 lg:mb-0 p-5 flex items-center justify-center lg:justify-start">
                <div>
                  <h3 className="text-6xl font-bold text-white mb-4 heading">
                    Years in the Travel
                  </h3>
                  <p className="text-gray-400">
                    Join thousands of travelers worldwide and see how you
                    compare!
                  </p>
                </div>
              </div>
              <div className="w-full lg:w-1/2 flex flex-wrap justify-around">
                <div className="w-full sm:w-1/3 text-center mb-4 sm:mb-0">
                  <h4 className="text-6xl font-bold text-white">10M+</h4>
                  <p className="text-gray-400">Total Distance Traveled</p>
                </div>
                <div className="w-full sm:w-1/3 text-center mb-4 sm:mb-0">
                  <h4 className="text-6xl font-bold text-white">120+</h4>
                  <p className="text-gray-400">Countries Explored</p>
                </div>
                <div className="w-full sm:w-1/3 text-center">
                  <h4 className="text-6xl font-bold text-white">25k</h4>
                  <p className="text-gray-400">Trips Logged</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="experience bg-gray-900" id="experience">
          <div className="container mx-auto px-4 py-12">
            <div className="experience__container grid">
              <div className="experience__img grid">
                <div className="experience__overlay">
                  <img
                    src={experience1}
                    alt=""
                    className="experience__img-one"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider bg-gray-900"></hr>

        {/* <!-- Footer --> */}
        <Footer />
      </div>
    </div>
  );
};

export default Homepage;
