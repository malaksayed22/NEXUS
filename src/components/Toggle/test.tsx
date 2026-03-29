import "@testing-library/jest-dom/vitest";
import { createRef } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Toggle } from "./index";

afterEach(() => {
  cleanup();
});

describe("Toggle", () => {
  it("renders label when provided", () => {
    render(
      <Toggle
        checked={false}
        onChange={() => undefined}
        label="Enable"
        size="md"
      />,
    );

    expect(screen.getByText("Enable")).toBeInTheDocument();
  });

  it("calls onChange when clicked", () => {
    const handleChange = vi.fn();

    render(<Toggle checked={false} onChange={handleChange} size="md" />);

    fireEvent.click(screen.getByRole("switch"));
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("toggles on Space and Enter", () => {
    const handleChange = vi.fn();

    render(<Toggle checked={false} onChange={handleChange} size="md" />);

    const switchEl = screen.getByRole("switch");
    fireEvent.keyDown(switchEl, { key: " " });
    fireEvent.keyDown(switchEl, { key: "Enter" });

    expect(handleChange).toHaveBeenNthCalledWith(1, true);
    expect(handleChange).toHaveBeenNthCalledWith(2, true);
  });

  it("does not call onChange when disabled", () => {
    const handleChange = vi.fn();

    render(
      <Toggle checked={false} onChange={handleChange} size="md" disabled />,
    );

    fireEvent.click(screen.getByRole("switch"));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("forwards ref correctly", () => {
    const ref = createRef<HTMLButtonElement>();

    render(
      <Toggle ref={ref} checked={false} onChange={() => undefined} size="md" />,
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).not.toBeNull();
  });
});
