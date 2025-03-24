import { render, screen, fireEvent } from "@testing-library/react";
import HotelCard from "../App"; 

const mockHotel = {
  resort: {
    name: "Ocean View Resort",
    regionName: "Maldives",
    countryName: "Maldives",
    starRating: 4,
    image: {
      url: "http://example.com/image.jpg",
      description: "Hotel Image",
    },
    overview: "A beautiful resort with an amazing view of the ocean.",
  },
  bookingDetails: {
    party: {
      adults: 2,
      children: 1,
      infants: 0,
    },
    lengthOfStay: 7,
    price: {
      amount: 1234.56,
    },
  },
  flightDetails: {
    departureDate: "2025-05-20",
    departureAirport: "LHR",
  },
};

describe("HotelCard Component", () => {
  test("should render hotel name, region, country, and price", () => {
    render(<HotelCard hotel={mockHotel} />);
    
  
    expect(screen.getByText("Ocean View Resort")).toBeInTheDocument();
    expect(screen.getByText("Maldives, Maldives")).toBeInTheDocument();
    

    expect(screen.getByText("£1234.56")).toBeInTheDocument();
  });

  test("should render correct star rating", () => {
    render(<HotelCard hotel={mockHotel} />);
    

    expect(screen.getByText("★★★★☆")).toBeInTheDocument();
  });

  test("should toggle 'Read more' and 'Read less' on button click", () => {
    render(<HotelCard hotel={mockHotel} />);
    

    const button = screen.getByText(/Read more/i);
    expect(button).toBeInTheDocument();


    fireEvent.click(button);


    expect(screen.getByText(/Read less/i)).toBeInTheDocument();
    

    fireEvent.click(screen.getByText(/Read less/i));
    

    expect(screen.getByText(/Read more/i)).toBeInTheDocument();
  });

  test("should display formatted date correctly", () => {
    render(<HotelCard hotel={mockHotel} />);
  
    const formattedDate = screen.getByText((content, element) => {
      return content.includes("20th of May");
    });
  
    expect(formattedDate).toBeInTheDocument();
  });
  

  test("should display the offer pill if hotel star rating is less than 5", () => {
    render(<HotelCard hotel={mockHotel} />);
  
    // Query the offer pill by data-testid
    expect(screen.getByTestId("offer-pill")).toBeInTheDocument();
  });
  

  test("should not display the offer pill if hotel star rating is 5", () => {
    const mockHotelWith5Stars = {
      ...mockHotel,
      resort: {
        ...mockHotel.resort,
        starRating: 5,
      },
    };
    
    render(<HotelCard hotel={mockHotelWith5Stars} />);
    

    expect(screen.queryByText("Offer")).toBeNull();
  });
});
