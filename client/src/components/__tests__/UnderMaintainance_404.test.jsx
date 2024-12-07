import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import UnderMaintainance from '../UnderMaintainance_404';

describe('UnderMaintainance Component', () => {
  test('renders the component with correct elements', () => {
    render(
      <BrowserRouter>
        <UnderMaintainance />
      </BrowserRouter>
    );

    // Check for heading
    const heading = screen.getByRole('heading', { name: /under maintenance/i });
    expect(heading).toBeInTheDocument();

    // Check for description
    const description = screen.getByText(
      /we're updating our travel blog to bring you even more amazing content!/i
    );
    expect(description).toBeInTheDocument();

    // Check for link
    const homeLink = screen.getByRole('link', { name: /return home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  test('ensures the link contains an arrow icon', () => {
    render(
      <BrowserRouter>
        <UnderMaintainance />
      </BrowserRouter>
    );

    // Locate the arrow icon by its `className` using `querySelector`
    const arrowIcon = document.querySelector('.lucide-arrow-left');
    expect(arrowIcon).toBeInTheDocument();
  });
});
