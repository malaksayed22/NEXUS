import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Modal } from "./index";

afterEach(() => {
  cleanup();
});

describe("Modal", () => {
  it("renders when isOpen is true and not when false", () => {
    const { rerender } = render(
      <Modal isOpen={false} onClose={() => undefined}>
        Content
      </Modal>,
    );

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    rerender(
      <Modal isOpen onClose={() => undefined}>
        Content
      </Modal>,
    );

    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("calls onClose on overlay click when closeOnOverlayClick is true", () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen onClose={handleClose} closeOnOverlayClick>
        Content
      </Modal>,
    );

    fireEvent.click(screen.getByTestId("modal-overlay"));
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose on Escape key", () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen onClose={handleClose} closeOnEsc>
        <button type="button">Inside</button>
      </Modal>,
    );

    fireEvent.keyDown(document, { key: "Escape" });
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose on overlay click when closeOnOverlayClick is false", () => {
    const handleClose = vi.fn();

    render(
      <Modal isOpen onClose={handleClose} closeOnOverlayClick={false}>
        Content
      </Modal>,
    );

    fireEvent.click(screen.getByTestId("modal-overlay"));
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("renders title and description with aria attributes", () => {
    render(
      <Modal
        isOpen
        onClose={() => undefined}
        title="Edit profile"
        description="Change profile settings"
      >
        Content
      </Modal>,
    );

    const dialog = screen.getByRole("dialog");
    const heading = screen.getByRole("heading", { name: "Edit profile" });
    const description = screen.getByText("Change profile settings");

    expect(dialog).toHaveAttribute("aria-labelledby", heading.id);
    expect(dialog).toHaveAttribute("aria-describedby", description.id);
  });

  it("keeps focus trapped inside with Tab", () => {
    render(
      <Modal isOpen onClose={() => undefined} title="Focus trap">
        <button type="button">First</button>
        <button type="button">Second</button>
      </Modal>,
    );

    const first = screen.getByRole("button", { name: "First" });
    const second = screen.getByRole("button", { name: "Second" });
    const close = screen.getByRole("button", { name: "Close modal" });

    first.focus();
    fireEvent.keyDown(first, { key: "Tab" });
    second.focus();
    fireEvent.keyDown(second, { key: "Tab" });

    expect(document.activeElement).toBe(close);
  });
});
