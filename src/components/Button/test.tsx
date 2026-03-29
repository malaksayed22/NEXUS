import "@testing-library/jest-dom/vitest";
import { createRef } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Button } from "./index";
import styles from "./styles.module.css";

afterEach(() => {
  cleanup();
});

describe("Button", () => {
  it.each([
    ["primary", styles.primary],
    ["secondary", styles.secondary],
    ["ghost", styles.ghost],
    ["danger", styles.danger],
  ] as const)("renders %s variant correctly", (variant, className) => {
    render(
      <Button variant={variant} size="md">
        Action
      </Button>,
    );

    const button = screen.getByRole("button", { name: "Action" });
    expect(button).toHaveClass(className);
  });

  it("fires onClick when clicked", () => {
    const handleClick = vi.fn();

    render(
      <Button variant="primary" size="md" onClick={handleClick}>
        Click me
      </Button>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Click me" }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("does not fire onClick when disabled", () => {
    const handleClick = vi.fn();

    render(
      <Button variant="primary" size="md" disabled onClick={handleClick}>
        Disabled
      </Button>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Disabled" }));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("does not fire onClick when loading", () => {
    const handleClick = vi.fn();

    render(
      <Button variant="primary" size="md" isLoading onClick={handleClick}>
        Loading
      </Button>,
    );

    fireEvent.click(screen.getByRole("button"));
    expect(handleClick).not.toHaveBeenCalled();
  });

  it("shows spinner when isLoading is true", () => {
    render(
      <Button variant="primary" size="md" isLoading>
        Loading
      </Button>,
    );

    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("applies fullWidth class", () => {
    render(
      <Button variant="primary" size="md" fullWidth>
        Full width
      </Button>,
    );

    expect(screen.getByRole("button", { name: "Full width" })).toHaveClass(
      styles.fullWidth,
    );
  });

  it("forwards ref correctly", () => {
    const ref = createRef<HTMLButtonElement>();

    render(
      <Button ref={ref} variant="primary" size="md">
        Ref target
      </Button>,
    );

    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
    expect(ref.current).not.toBeNull();
    expect(ref.current?.textContent).toContain("Ref target");
  });
});
