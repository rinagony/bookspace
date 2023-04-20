import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";

describe("Header Component", () => {
  it("should render without errors", () => {
    render(<Header />);
    const component = screen.getByTestId("Header");
    expect(component).toBeInTheDocument();
  });

  it("should render the SearchField component", () => {
    render(<Header />);
    const searchField = screen.getByTestId("SearchField");
    expect(searchField).toBeInTheDocument();
  });

  it("should call setSearchData when SearchField is changed", () => {
    const setSearchDataMock = jest.fn();
    render(<Header />);
    const searchField = screen.getByTestId("SearchField");
    fireEvent.change(searchField, { target: { value: "search text" } });
    expect(setSearchDataMock).toHaveBeenCalled();
  });
});