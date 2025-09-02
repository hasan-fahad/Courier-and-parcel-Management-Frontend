import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AppRoutes from './AppRoutes';

test('renders login page', () => {
  render(
    <MemoryRouter>
      <AppRoutes />
    </MemoryRouter>
  );

  // Check for the text that actually exists on the Login page
  const loginText = screen.getByText(/Welcome To Excel Courier/i);
  expect(loginText).toBeInTheDocument();
});
