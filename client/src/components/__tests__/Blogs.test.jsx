import React from 'react';
import { render, screen } from '@testing-library/react';
import Blogs from '../Blogs'; // Adjust the path if the test file is in a different directory
import UnderMaintainance_404 from '../UnderMaintainance_404';

jest.mock('../UnderMaintainance_404', () => {
  return function MockUnderMaintainance_404() {
    return <div data-testid="under-maintenance">Under Maintenance</div>;
  };
});

describe('Blogs Component', () => {
  it('renders the UnderMaintainance_404 component', () => {
    render(<Blogs />);

    // Assert that the mocked `UnderMaintainance_404` component is rendered
    expect(screen.getByTestId('under-maintenance')).toBeInTheDocument();
    expect(screen.getByText(/Under Maintenance/i)).toBeInTheDocument();
  });
});
