import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUsPage from '../AboutUsPage';
import { AuthProvider } from '../../contexts/AuthContext';
import { MemoryRouter } from 'react-router-dom';

test('renders AboutUsPage component', () => {
    render(
        <AuthProvider>
          <MemoryRouter>
            <AboutUsPage />
          </MemoryRouter>
        </AuthProvider>
      );

    // Check the header's <h1>
    const headerHeading = screen.getByText('Travelopedia', { selector: '.header-navbar' });
    expect(headerHeading).toBeInTheDocument();

    // Check the content section's <h1>
    const contentHeading = screen.getByText('Travelopedia', { selector: '.content__title' });
    expect(contentHeading).toBeInTheDocument();

    // Check the hero section heading
    expect(screen.getByRole('heading', { name: 'About Travelopedia' })).toBeInTheDocument();
});
