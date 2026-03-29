import "@testing-library/jest-dom/vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Badge } from "./index";
import styles from "./styles.module.css";

afterEach(() => {
  cleanup();
});

describe("Badge", () => {
  it("renders with variant class", () => {
    render(
      <Badge variant="success" size="md">
        Stable
      </Badge>,
    );

    const badge = screen.getByText("Stable").parentElement;
    expect(badge).toHaveClass(styles.badge);
    expect(badge).toHaveClass(styles.success);
  });

  it("shows dot when dot is true", () => {
    const { container } = render(
      <Badge variant="default" size="sm" dot>
        Dot
      </Badge>,
    );

    expect(container.querySelector(`.${styles.dot}`)).toBeInTheDocument();
  });

  it("fires onRemove when removable badge is removed", async () => {
    const handleRemove = vi.fn();

    render(
      <Badge variant="brand" size="md" removable onRemove={handleRemove}>
        Removable
      </Badge>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Remove badge" }));

    await waitFor(() => {
      expect(handleRemove).toHaveBeenCalledTimes(1);
    });
  });
});
