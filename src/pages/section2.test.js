import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import Section2 from './section2';
import { MemoryRouter } from 'react-router-dom';


jest.mock('../menu', () => () => <div>Mocked Nav</div>);
jest.mock('../componets/sideBar', () => ({ onSelectGenre }) => (
  <div onClick={() => onSelectGenre('Fantasy')}>Mocked Sidebar</div>
));
jest.mock('../componets/product', () => ({ title }) => (
  <div data-testid="product">{title}</div>
));

describe('Section2 component', () => {
  beforeEach(() => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 1,
              title: 'Harry Potter',
              price: 20,
              coverImage: 'image.jpg',
              description: 'Magic book',
            },
          ]),
      })
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders without crashing and displays fetched book', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Section2 />
        </MemoryRouter>
      );
    });


    expect(screen.getByPlaceholderText(/поиск по названию/i)).toBeInTheDocument();

  
    await waitFor(() =>
      expect(screen.getByTestId('product')).toHaveTextContent('Harry Potter')
    );
  });

  test('shows message when no books are found', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      })
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <Section2 />
        </MemoryRouter>
      );
    });

    await waitFor(() =>
      expect(screen.getByText(/книги не найдены/i)).toBeInTheDocument()
    );
  });

  test('shows error message on fetch failure', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    await act(async () => {
      render(
        <MemoryRouter>
          <Section2 />
        </MemoryRouter>
      );
    });

    await waitFor(() =>
      expect(screen.getByText(/error fetching books/i)).toBeInTheDocument()
    );
  });

  test('filters books by search term', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <Section2 />
        </MemoryRouter>
      );
    });

    await waitFor(() =>
      expect(screen.getByTestId('product')).toBeInTheDocument()
    );

    const searchInput = screen.getByPlaceholderText(/поиск по названию/i);
    fireEvent.change(searchInput, { target: { value: 'Potter' } });

    expect(screen.getByText(/harry potter/i)).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'NotExistingBook' } });

    await waitFor(() =>
      expect(screen.getByText(/книги не найдены/i)).toBeInTheDocument()
    );
  });
});
