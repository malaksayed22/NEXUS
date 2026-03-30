import "@testing-library/jest-dom/vitest";
import { createRef } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Checkbox } from "./index";

afterEach(() => {
  cleanup();
});

describe("Checkbox", () => {
  it("renders a checkbox input", () => {
    render(<Checkbox />);
    expect(screen.getByRole("checkbox")).toBeInTheDocument();
  });

  it("renders with a label", () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText("Accept terms")).toBeInTheDocument();
  });

  it("renders checked state", () => {
    render(<Checkbox checked onChange={() => {}} />);
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("fires onChange when clicked", () => {
    const handleChange = vi.fn();
    render(<Checkbox label="Option" checked={false} onChange={handleChange} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("does not fire onChange when disabled", () => {
    const handleChange = vi.fn();
    render(
      <Checkbox label="Option" disabled checked={false} onChange={handleChange} />,
    );
    fireEvent.click(screen.getByRole("checkbox"));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("renders helper text", () => {
    render(<Checkbox helperText="We'll send updates only." />);
    expect(screen.getByText("We'll send updates only.")).toBeInTheDocument();
  });

  it("marks input as invalid when error is true", () => {
    render(<Checkbox error label="Terms" checked={false} onChange={() => {}} />);
    expect(screen.getByRole("checkbox")).toHaveAttribute("aria-invalid", "true");
  });

  it("forwards ref to the input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(<Checkbox ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("is disabled when disabled prop is set", () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole("checkbox")).toBeDisabled();
  });
});
