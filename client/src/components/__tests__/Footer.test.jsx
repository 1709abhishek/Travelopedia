import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Footer from '../Footer'; // Adjust the path if necessary

describe('Footer Component', () => {
    test('renders Footer component with all sections', () => {
        render(
            <Router>
                <Footer />
            </Router>
        );

        // Check if "Quick Links" section exists
        expect(screen.getByText('Quick Links')).toBeInTheDocument();
        expect(screen.getByText('About Us')).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /about us/i })).toHaveAttribute('href', '/about_us');

        // Check if "Address" section exists
        expect(screen.getByText('Address')).toBeInTheDocument();
        expect(screen.getByText('2727 Northgate Blvd, Fort Wayne, 46835')).toBeInTheDocument();

        // Check if "Contact" section exists
        expect(screen.getByText('Contact')).toBeInTheDocument();
        expect(screen.getByText('Phone: +1-234-567-890')).toBeInTheDocument();
        expect(screen.getByText('Email: info@travelopedia.com')).toBeInTheDocument();

        // Check if "Connect" section exists
        expect(screen.getByText('Connect')).toBeInTheDocument();

        // Find the YouTube link using a partial match on the href attribute
        const youtubeLink = screen.getByRole('link', { 
            name: (content, element) => 
                element.getAttribute('href') === 'https://www.youtube.com/@rahul07bagul'
        });
        expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com/@rahul07bagul');

        // Check if copyright text exists
        expect(screen.getByText('Copyright © 2024 Travelopedia')).toBeInTheDocument();
    });

    test('renders YouTube link with correct target and rel attributes', () => {
        render(
            <Router>
                <Footer />
            </Router>
        );

        // Find the YouTube link
        const youtubeLink = screen.getByRole('link', {
            name: (content, element) => 
                element.getAttribute('href') === 'https://www.youtube.com/@rahul07bagul'
        });
        expect(youtubeLink).toHaveAttribute('href', 'https://www.youtube.com/@rahul07bagul');
        expect(youtubeLink).toHaveAttribute('target', '_blank');
        expect(youtubeLink).toHaveAttribute('rel', 'noopener noreferrer');
    });
});
