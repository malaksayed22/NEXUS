import "@testing-library/jest-dom/vitest";
import { createRef } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Textarea } from "./index";

afterEach(() => {
  cleanup();
});

describe("Textarea", () => {
  it("renders label when provided", () => {
    render(<Textarea label="Message" />);

    expect(screen.getByText("Message")).toBeInTheDocument();
  });

  it("shows errorMessage when isInvalid", () => {
    render(
      <Textarea isInvalid errorMessage="Message is required" label="Message" />,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Message is required");
  });

  it("does not show errorMessage when not isInvalid", () => {
    render(
      <Textarea
        isInvalid={false}
        errorMessage="Message is required"
        label="Message"
      />,
    );

    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("character count updates on change", () => {
    render(
      <Textarea
        label="Message"
        maxLength={20}
        aria-label="message"
        defaultValue="hello"
      />,
    );

    const textarea = screen.getByLabelText("message");
    fireEvent.change(textarea, { target: { value: "hello world" } });

    expect(screen.getByText("11 / 20")).toBeInTheDocument();
  });

  it("calls onChange with correct value", () => {
    const handleChange = vi.fn();

    render(<Textarea onChange={handleChange} aria-label="message" />);

    fireEvent.change(screen.getByLabelText("message"), {
      target: { value: "Updated" },
    });

    expect(handleChange).toHaveBeenCalledTimes(1);
    const event = handleChange.mock.calls[0]?.[0];
    expect(event?.target.value).toBe("Updated");
  });

  it("forwards ref correctly", () => {
    const ref = createRef<HTMLTextAreaElement>();

    render(<Textarea ref={ref} aria-label="message" />);

    expect(ref.current).toBeInstanceOf(HTMLTextAreaElement);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.getAttribute("aria-label")).toBe("message");
  });
});
