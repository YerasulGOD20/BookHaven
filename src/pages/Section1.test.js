// Section1.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Section1 from './Section1';
import { MemoryRouter } from 'react-router-dom';


jest.mock('../api', () => ({
  authenticateUser: jest.fn(),
  createUser: jest.fn(),
}));

jest.mock('../menu', () => () => <div>Mocked Nav</div>);
jest.mock('../componets/authmodal', () => ({
  AuthModal: ({ isSignInOpen, isSignUpOpen }) => (
    <div>
      {isSignInOpen && <div>Sign In Modal Open</div>}
      {isSignUpOpen && <div>Sign Up Modal Open</div>}
    </div>
  )
}));

describe('Section1 component', () => {
  test('renders component with main content', () => {
    render(
      <MemoryRouter>
        <Section1 />
      </MemoryRouter>
    );

    expect(screen.getByText(/about bookhaven/i)).toBeInTheDocument();
    expect(screen.getByText(/we make books great again/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test('opens sign in modal on login click', () => {
    render(
      <MemoryRouter>
        <Section1 />
      </MemoryRouter>
    );

    const loginButton = screen.getByText(/login/i);
    fireEvent.click(loginButton);

    expect(screen.getByText(/sign in modal open/i)).toBeInTheDocument();
  });

  test('opens sign up modal on sign up click', () => {
    render(
      <MemoryRouter>
        <Section1 />
      </MemoryRouter>
    );

    const signUpButton = screen.getByText(/sign up/i);
    fireEvent.click(signUpButton);

    expect(screen.getByText(/sign up modal open/i)).toBeInTheDocument();
  });
});
