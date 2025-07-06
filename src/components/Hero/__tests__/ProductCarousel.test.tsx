// i did this so that the custom jest-dom matchers like toBeInTheDocument, toHaveAttribute, and toHaveClass work in my tests
import "@testing-library/jest-dom";
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProductCarousel from "../ProductCarousel";

// mock the image loading
const mockImage = {
  onload: jest.fn(),
  src: "",
};

// mock window.Image constructor
Object.defineProperty(window, "Image", {
  writable: true,
  value: jest.fn(() => mockImage),
});

describe("ProductCarousel", () => {
  beforeEach(() => {
    // reset mocks before each test
    jest.clearAllMocks();
    mockImage.onload = jest.fn();
    mockImage.src = "";
  });

  it("renders the carousel with first image", () => {
    render(<ProductCarousel />);

    // check if the main carousel container is there
    const carousel = screen.getByRole("region", { hidden: true });
    expect(carousel).toBeInTheDocument();

    // check if the first image is loaded
    const image = screen.getByAltText("Flash sale product 1");
    expect(image).toBeInTheDocument();
  });

  it("shows navigation buttons on hover", () => {
    render(<ProductCarousel />);

    const prevButton = screen.getByLabelText("Previous");
    const nextButton = screen.getByLabelText("Next");

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();

    // buttons should be hidden by default (opacity-0)
    expect(prevButton).toHaveClass("opacity-0");
    expect(nextButton).toHaveClass("opacity-0");
  });

  it("navigates to next image when next button is clicked", async () => {
    render(<ProductCarousel />);

    const nextButton = screen.getByLabelText("Next");
    fireEvent.click(nextButton);

    // wait for the image to change
    await waitFor(() => {
      const image = screen.getByAltText("Flash sale product 2");
      expect(image).toBeInTheDocument();
    });
  });

  it("navigates to previous image when prev button is clicked", async () => {
    render(<ProductCarousel />);

    // first go to next image
    const nextButton = screen.getByLabelText("Next");
    fireEvent.click(nextButton);

    // then go back
    const prevButton = screen.getByLabelText("Previous");
    fireEvent.click(prevButton);

    // should be back to first image
    await waitFor(() => {
      const image = screen.getByAltText("Flash sale product 1");
      expect(image).toBeInTheDocument();
    });
  });

  it("shows dots indicator for all images", () => {
    render(<ProductCarousel />);

    // should have 3 dots for 3 images
    const dots = screen
      .getAllByRole("button")
      .filter((button) =>
        button.getAttribute("aria-label")?.includes("Go to slide")
      );

    expect(dots).toHaveLength(3);
  });

  it("navigates to specific image when dot is clicked", async () => {
    render(<ProductCarousel />);

    // click on the third dot
    const thirdDot = screen.getByLabelText("Go to slide 3");
    fireEvent.click(thirdDot);

    // should show the third image
    await waitFor(() => {
      const image = screen.getByAltText("Flash sale product 3");
      expect(image).toBeInTheDocument();
    });
  });

  it("loads full quality image after placeholder for first image", async () => {
    render(<ProductCarousel />);

    // initially should show placeholder
    const images = screen.getAllByAltText("Flash sale product 1");
    // should only be one at first
    expect(images.length).toBe(1);
    expect(images[0]).toHaveAttribute(
      "src",
      expect.stringContaining("carousel-image3-lcp.webp")
    );

    // simulate full image loading
    mockImage.onload();

    await waitFor(() => {
      // should now show both placeholder and full quality image
      const imgs = screen.getAllByAltText("Flash sale product 1");
      expect(imgs.length).toBeGreaterThan(1);
      // one should be the placeholder, one should be the full image
      expect(
        imgs.some((img) =>
          (img as HTMLImageElement).src.includes("carousel-image3-lcp.webp")
        )
      ).toBe(true);
      expect(
        imgs.some((img) =>
          (img as HTMLImageElement).src.includes("carousel-image3.webp")
        )
      ).toBe(true);
    });
  });

  it("displays flash sales content", () => {
    render(<ProductCarousel />);

    // check if the main heading is there
    expect(screen.getByText("Flash")).toBeInTheDocument();
    expect(screen.getByText("Sales")).toBeInTheDocument();

    // check if the description is there
    expect(screen.getByText(/Discover amazing deals/)).toBeInTheDocument();

    // check if the shop now button is there
    expect(screen.getByText("Shop Now")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<ProductCarousel />);

    // check aria-labels on navigation buttons
    expect(screen.getByLabelText("Previous")).toBeInTheDocument();
    expect(screen.getByLabelText("Next")).toBeInTheDocument();

    // check aria-labels on dots
    expect(screen.getByLabelText("Go to slide 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to slide 2")).toBeInTheDocument();
    expect(screen.getByLabelText("Go to slide 3")).toBeInTheDocument();
  });

  it("applies correct CSS classes for styling", () => {
    render(<ProductCarousel />);

    const carousel = screen.getByRole("region", { hidden: true });

    // check for key styling classes
    expect(carousel).toHaveClass(
      "relative",
      "w-full",
      "h-80",
      "lg:h-96",
      "rounded-2xl",
      "overflow-hidden"
    );
  });
});
