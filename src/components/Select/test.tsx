import "@testing-library/jest-dom/vitest";
import { createRef } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Select } from "./index";

afterEach(() => {
  cleanup();
});

const renderSelect = (props = {}) =>
  render(
    <Select label="Country" {...props}>
      <option value="us">United States</option>
      <option value="uk">United Kingdom</option>
      <option value="ca">Canada</option>
    </Select>,
  );

describe("Select", () => {
  it("renders a select element", () => {
    renderSelect();
    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });

  it("renders with a label", () => {
    renderSelect();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
  });

  it("renders all option children", () => {
    renderSelect();
    expect(screen.getByRole("option", { name: "United States" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "United Kingdom" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "Canada" })).toBeInTheDocument();
  });

  it("renders placeholder as a disabled option", () => {
    renderSelect({ placeholder: "Choose a country" });
    const placeholder = screen.getByRole("option", { name: "Choose a country" });
    expect(placeholder).toBeInTheDocument();
    expect(placeholder).toBeDisabled();
  });

  it("fires onChange when selection changes", () => {
    const handleChange = vi.fn();
    renderSelect({ onChange: handleChange });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "uk" },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it("is disabled when disabled prop is set", () => {
    renderSelect({ disabled: true });
    expect(screen.getByRole("combobox")).toBeDisabled();
  });

  it("does not fire onChange when disabled", () => {
    const handleChange = vi.fn();
    renderSelect({ disabled: true, onChange: handleChange });
    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "uk" },
    });
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("marks as invalid when error is true", () => {
    renderSelect({ error: true });
    expect(screen.getByRole("combobox")).toHaveAttribute("aria-invalid", "true");
  });

  it("renders helper text", () => {
    renderSelect({ helperText: "Used for shipping calculations." });
    expect(
      screen.getByText("Used for shipping calculations."),
    ).toBeInTheDocument();
  });

  it("forwards ref to the select element", () => {
    const ref = createRef<HTMLSelectElement>();
    render(
      <Select ref={ref} label="Country">
        <option value="us">US</option>
      </Select>,
    );
    expect(ref.current).toBeInstanceOf(HTMLSelectElement);
  });
});
