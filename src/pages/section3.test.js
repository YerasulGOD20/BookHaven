import React from 'react';
import { render, screen } from '@testing-library/react';
import Section3 from './section3';

jest.mock('../componets/card', () => ({ title, price, info1, info2, info3, info4 }) => (
  <div data-testid="card">
    <h2>{title}</h2>
    <p>{price}</p>
    <ul>
      <li>{info1}</li>
      <li>{info2}</li>
      <li>{info3}</li>
      <li>{info4}</li>
    </ul>
  </div>
));

describe('Section3 component', () => {
  test('renders pricing section with two plans', () => {
    render(<Section3 />);

 
    expect(screen.getByText(/Pricing/i)).toBeInTheDocument();
    expect(screen.getByText(/Choose the convenient option/i)).toBeInTheDocument();


    const cards = screen.getAllByTestId('card');
    expect(cards).toHaveLength(2);

   
    expect(cards[0]).toHaveTextContent(/Monthly/i);
    expect(cards[0]).toHaveTextContent(/\$50/i);

    expect(cards[1]).toHaveTextContent(/Annual/i);
    expect(cards[1]).toHaveTextContent(/\$500/i);
  });
});
