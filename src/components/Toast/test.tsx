import "@testing-library/jest-dom/vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ToastProvider, useToast } from "./index";

afterEach(() => {
  cleanup();
});

const TestHarness = () => {
  const { toast } = useToast();

  return (
    <div>
      <button type="button" onClick={() => toast.success("Profile saved!")}>
        Success
      </button>
      <button
        type="button"
        onClick={() =>
          toast.info("New version", {
            action: { label: "Update", onClick: () => undefined },
          })
        }
      >
        Action
      </button>
      <button type="button" onClick={() => toast.dismissAll()}>
        Dismiss all
      </button>
    </div>
  );
};

describe("Toast", () => {
  it("renders a success toast", () => {
    render(
      <ToastProvider>
        <TestHarness />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Success" }));
    expect(screen.getByText("Profile saved!")).toBeInTheDocument();
  });

  it("renders action button when action is provided", () => {
    render(
      <ToastProvider>
        <TestHarness />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Action" }));
    expect(screen.getByRole("button", { name: "Update" })).toBeInTheDocument();
  });

  it("dismisses all toasts", async () => {
    render(
      <ToastProvider>
        <TestHarness />
      </ToastProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Success" }));
    fireEvent.click(screen.getByRole("button", { name: "Dismiss all" }));

    await waitFor(() => {
      expect(screen.queryByText("Profile saved!")).not.toBeInTheDocument();
    });
  });

  it("throws when useToast is used outside provider", () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => undefined);

    const Invalid = () => {
      useToast();
      return null;
    };

    expect(() => render(<Invalid />)).toThrow(
      "useToast must be used within ToastProvider",
    );
    spy.mockRestore();
  });
});
