import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import ProtectedRoute from '../ProtectedRoute';

// Mocking the useAuth hook
jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('ProtectedRoute', () => {
  const mockUseAuth = useAuth as jest.Mock;

  it('renders children when user is authenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true });
    localStorage.setItem('token', 'mockToken');
    localStorage.setItem('user', 'mockUser');

    const { getByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to /signin when user is not authenticated', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    const { getByText } = render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/signin" element={<div>Sign In Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText('Sign In Page')).toBeInTheDocument();
  });

  it('does not redirect to /signin when accessing /about_us', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false });
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    const { getByText } = render(
      <MemoryRouter initialEntries={['/about_us']}>
        <Routes>
          <Route
            path="/about_us"
            element={
              <ProtectedRoute>
                <div>About Us Content</div>
              </ProtectedRoute>
            }
          />
        </Routes>
      </MemoryRouter>
    );

    expect(getByText('About Us Content')).toBeInTheDocument();
  });
});
