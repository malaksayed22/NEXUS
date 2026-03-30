import "@testing-library/jest-dom/vitest";
import { createRef } from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Spinner } from "./index";
import styles from "./styles.module.css";

afterEach(() => {
  cleanup();
});

describe("Spinner", () => {
  it("renders with role status", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders default aria-label 'Loading'", () => {
    render(<Spinner />);
    expect(screen.getByLabelText("Loading")).toBeInTheDocument();
  });

  it("renders custom aria-label", () => {
    render(<Spinner label="Saving file" />);
    expect(screen.getByLabelText("Saving file")).toBeInTheDocument();
  });

  it.each([
    ["xs", styles.xs],
    ["sm", styles.sm],
    ["md", styles.md],
    ["lg", styles.lg],
    ["xl", styles.xl],
  ] as const)("applies %s size class", (size, className) => {
    render(<Spinner size={size} />);
    expect(screen.getByRole("status")).toHaveClass(className);
  });

  it("applies md size by default", () => {
    render(<Spinner />);
    expect(screen.getByRole("status")).toHaveClass(styles.md);
  });

  it("forwards ref correctly", () => {
    const ref = createRef<SVGSVGElement>();
    render(<Spinner ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });

  it("applies custom className", () => {
    render(<Spinner className="custom-class" />);
    expect(screen.getByRole("status")).toHaveClass("custom-class");
  });
});
