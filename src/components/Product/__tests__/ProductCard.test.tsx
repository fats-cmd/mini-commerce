import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ProductCard from '../ProductCard';

// mock the cart store
jest.mock('@/stores/useCartStore', () => ({
  __esModule: true,
  default: () => ({
    addItem: jest.fn(),
  }),
}));

// mock the cart store hook
const mockAddItem = jest.fn();
jest.mock('@/stores/useCartStore', () => ({
  __esModule: true,
  default: () => ({
    addItem: mockAddItem,
  }),
}));

describe('ProductCard', () => {
  const defaultProps = {
    name: 'Test Product',
    price: '29.99',
    description: 'A test product description',
    image: '/test-image.jpg',
    rating: 4.5,
    reviews: 100,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders product information correctly', () => {
    render(<ProductCard {...defaultProps} />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('A test product description')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('(100)')).toBeInTheDocument();
  });

  it('displays product image with correct alt text', () => {
    render(<ProductCard {...defaultProps} />);
    
    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
  });

  it('shows NEW badge when isNew is true', () => {
    render(<ProductCard {...defaultProps} isNew={true} />);
    
    expect(screen.getByText('NEW')).toBeInTheDocument();
  });

  it('shows discount badge when discount is provided', () => {
    render(<ProductCard {...defaultProps} discount={20} />);
    
    expect(screen.getByText('-20%')).toBeInTheDocument();
  });

  it('displays original price when provided', () => {
    render(<ProductCard {...defaultProps} originalPrice="39.99" />);
    
    expect(screen.getByText('$39.99')).toBeInTheDocument();
    expect(screen.getByText('$39.99')).toHaveClass('line-through');
  });

  it('renders star rating correctly', () => {
    render(<ProductCard {...defaultProps} rating={3.5} />);
    
    // should show 3 filled stars and 2 empty stars
    const stars = screen.getAllByTestId('star');
    expect(stars).toHaveLength(5);
  });

  it('adds item to cart when add to cart button is clicked', () => {
    render(<ProductCard {...defaultProps} />);
    
    const addToCartButton = screen.getByText('Add to Cart');
    fireEvent.click(addToCartButton);
    
    expect(mockAddItem).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Test Product',
        price: 29.99,
        description: 'A test product description',
        image: '/test-image.jpg',
        rating: 4.5,
        reviews: 100,
      }),
      1
    );
  });

  it('toggles like state when heart button is clicked', () => {
    render(<ProductCard {...defaultProps} />);
    
    const heartButton = screen.getByRole('button', { name: /wishlist/i });
    
    // initially should not be liked
    expect(heartButton).not.toHaveClass('bg-red-500');
    
    // click to like
    fireEvent.click(heartButton);
    expect(heartButton).toHaveClass('bg-red-500');
    
    // click to unlike
    fireEvent.click(heartButton);
    expect(heartButton).not.toHaveClass('bg-red-500');
  });

  it('shows action buttons on hover', () => {
    render(<ProductCard {...defaultProps} />);
    
    const card = screen.getByRole('article', { hidden: true });
    const actionButtons = screen.getAllByRole('link');
    
    // buttons should be hidden initially
    actionButtons.forEach(button => {
      expect(button).toHaveClass('opacity-0');
    });
    
    // simulate hover
    fireEvent.mouseEnter(card);
    
    // buttons should be visible
    actionButtons.forEach(button => {
      expect(button).toHaveClass('opacity-100');
    });
  });

  it('generates slug from product name when not provided', () => {
    render(<ProductCard {...defaultProps} />);
    
    const viewButton = screen.getByRole('link', { name: /view/i });
    expect(viewButton).toHaveAttribute('href', '/product/test-product');
  });

  it('uses provided slug when available', () => {
    render(<ProductCard {...defaultProps} slug="custom-slug" />);
    
    const viewButton = screen.getByRole('link', { name: /view/i });
    expect(viewButton).toHaveAttribute('href', '/product/custom-slug');
  });

  it('applies small variant styling when small prop is true', () => {
    render(<ProductCard {...defaultProps} small={true} />);
    
    const card = screen.getByRole('article', { hidden: true });
    expect(card).toHaveClass('max-w-xs', 'p-2');
  });

  it('handles price as number correctly', () => {
    render(<ProductCard {...defaultProps} price={49.99} />);
    
    expect(screen.getByText('$49.99')).toBeInTheDocument();
  });

  it('handles invalid price gracefully', () => {
    render(<ProductCard {...defaultProps} price="invalid" />);
    
    expect(screen.getByText('N/A')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<ProductCard {...defaultProps} />);
    
    // check if image has alt text
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
    
    // check if buttons have proper labels
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /wishlist/i })).toBeInTheDocument();
  });

  it('applies hover effects correctly', () => {
    render(<ProductCard {...defaultProps} />);
    
    const card = screen.getByRole('article', { hidden: true });
    
    // should have hover transform classes
    expect(card).toHaveClass('hover:-translate-y-2', 'hover:shadow-2xl');
  });
}); 