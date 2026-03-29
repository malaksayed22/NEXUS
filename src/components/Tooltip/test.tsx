import "@testing-library/jest-dom/vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Tooltip } from "./index";

afterEach(() => {
  cleanup();
  vi.useRealTimers();
});

beforeEach(() => {
  vi.useFakeTimers();
});

describe("Tooltip", () => {
  it("shows on hover after delay", async () => {
    render(
      <Tooltip content="Helpful" delay={300}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByRole("button", { name: "Trigger" }));
    await vi.advanceTimersByTimeAsync(300);

    expect(screen.getByRole("tooltip")).toHaveTextContent("Helpful");
  });

  it("shows on focus for keyboard users", async () => {
    render(
      <Tooltip content="Keyboard" delay={300}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    fireEvent.focus(screen.getByRole("button", { name: "Trigger" }));
    await vi.advanceTimersByTimeAsync(300);

    expect(screen.getByRole("tooltip")).toHaveTextContent("Keyboard");
  });

  it("adds aria-describedby to trigger", async () => {
    render(
      <Tooltip content="Aria" delay={300}>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole("button", { name: "Trigger" });
    fireEvent.focus(trigger);
    await vi.advanceTimersByTimeAsync(300);

    const tooltip = screen.getByRole("tooltip");
    expect(trigger).toHaveAttribute("aria-describedby", tooltip.id);
  });

  it("does not show when disabled", async () => {
    render(
      <Tooltip content="Disabled" disabled>
        <button type="button">Trigger</button>
      </Tooltip>,
    );

    fireEvent.mouseEnter(screen.getByRole("button", { name: "Trigger" }));
    await vi.advanceTimersByTimeAsync(400);

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});
