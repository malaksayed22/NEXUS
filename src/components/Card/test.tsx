import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Card } from "./index";
import styles from "./styles.module.css";

afterEach(() => {
  cleanup();
});

describe("Card", () => {
  it("renders compound sections", () => {
    render(
      <Card variant="elevated">
        <Card.Header>Header</Card.Header>
        <Card.Body>Body</Card.Body>
        <Card.Footer>Footer</Card.Footer>
      </Card>,
    );

    expect(screen.getByText("Header")).toBeInTheDocument();
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect(screen.getByText("Footer")).toBeInTheDocument();
  });

  it("applies variant class", () => {
    const { container } = render(
      <Card variant="outlined">
        <Card.Body>Outlined</Card.Body>
      </Card>,
    );

    const card = container.firstElementChild;
    expect(card).toHaveClass(styles.card);
    expect(card).toHaveClass(styles.outlined);
  });

  it("fires onClick when clickable and clicked", () => {
    const handleClick = vi.fn();

    render(
      <Card variant="elevated" isClickable onClick={handleClick}>
        <Card.Body>Clickable</Card.Body>
      </Card>,
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("fires onClick on Enter and Space", () => {
    const handleClick = vi.fn();

    render(
      <Card variant="elevated" isClickable onClick={handleClick}>
        <Card.Body>Keyboard</Card.Body>
      </Card>,
    );

    const card = screen.getByRole("button");
    fireEvent.keyDown(card, { key: "Enter" });
    fireEvent.keyDown(card, { key: " " });

    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  it("renders card image", () => {
    render(
      <Card variant="filled">
        <Card.Image src="https://example.com/photo.jpg" alt="Preview" />
      </Card>,
    );

    expect(screen.getByRole("img", { name: "Preview" })).toBeInTheDocument();
  });
});
