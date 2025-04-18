import React from 'react';
import { render, screen } from '@testing-library/react';
import Section4 from './section4';


jest.mock('../menu', () => () => <div>Mocked Nav</div>);


jest.mock('../image/ourstore1.jpg', () => 'pic1.jpg');
jest.mock('../image/ourstore2.jpg', () => 'pic2.jpg');
jest.mock('../image/ourstore3.jpg', () => 'pic3.jpg');
jest.mock('../image/ourstore4.jpg', () => 'pic4.jpg');

describe('Section4 component', () => {
  test('renders store heading, description, and 4 images', () => {
    render(<Section4 />);


    expect(screen.getByText(/Our Store/i)).toBeInTheDocument();


    expect(screen.getByText(/Want to find a crazy corner/i)).toBeInTheDocument();

 
    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(4);


    images.forEach(img => {
      expect(img).toHaveAttribute('alt', 'Book Cover 1');
    });
  });
});
