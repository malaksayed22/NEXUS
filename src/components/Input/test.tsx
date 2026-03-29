import "@testing-library/jest-dom/vitest";
import { createRef } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Input } from "./index";

afterEach(() => {
  cleanup();
});

describe("Input", () => {
  it("renders label when provided", () => {
    render(<Input label="Email" size="md" />);

    expect(screen.getByText("Email")).toBeInTheDocument();
  });

  it("shows errorMessage when isInvalid", () => {
    render(
      <Input size="md" isInvalid errorMessage="Invalid value" label="Email" />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Invalid value");
  });

  it("does not show errorMessage when not isInvalid", () => {
    render(
      <Input
        size="md"
        isInvalid={false}
        errorMessage="Invalid value"
        label="Email"
      />,
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("calls onChange with correct value", () => {
    const handleChange = vi.fn();

    render(<Input size="md" onChange={handleChange} aria-label="name" />);

    fireEvent.change(screen.getByLabelText("name"), {
      target: { value: "Alice" },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    const event = handleChange.mock.calls[0]?.[0];
    expect(event?.target.value).toBe("Alice");
  });

  it("forwards ref correctly", () => {
    const ref = createRef<HTMLInputElement>();

    render(<Input ref={ref} size="md" aria-label="name" />);

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.getAttribute("aria-label")).toBe("name");
  });
});
