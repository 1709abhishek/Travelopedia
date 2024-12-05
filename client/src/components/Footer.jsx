import React from 'react';
import { Link } from 'react-router-dom';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
    return (
        <section className="footer bg-gray-900">
            <div className="foot">
                <div className="footer-content">
                    <div className="footlinks">
                        <h4>Quick Links</h4>
                        <ul>
                            <li>
                                <Link to="/about_us">About Us</Link>
                            </li>
                            <li>
                                <Link to="/contact_us">Contact Us</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footlinks">
                        <h4>Address</h4>
                        <p>2727 Northgate Blvd, Fort Wayne, 46835</p>
                    </div>
                    <div className="footlinks">
                        <h4>Contact</h4>
                        <p>Phone: +1-234-567-890</p>
                        <p>Email: info@travelopedia.com</p>
                    </div>
                    <div className="footlinks">
                        <h4>Connect</h4>
                        <div className="social">
                            <a href="https://www.youtube.com/@rahul07bagul" target="_blank" rel="noopener noreferrer">
                                <YouTubeIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <div className="end">
                <p>Copyright © 2024 Travelopedia</p>
            </div>
        </section>
    );
};

export default Footer;