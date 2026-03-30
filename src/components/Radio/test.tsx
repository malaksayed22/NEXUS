import "@testing-library/jest-dom/vitest";
import { createRef } from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Radio, RadioGroup } from "./index";

afterEach(() => {
  cleanup();
});

const renderGroup = (
  value = "a",
  onChange = vi.fn(),
  disabled = false,
) =>
  render(
    <RadioGroup name="test" value={value} onChange={onChange} disabled={disabled}>
      <Radio value="a" label="Option A" />
      <Radio value="b" label="Option B" />
      <Radio value="c" label="Option C" />
    </RadioGroup>,
  );

describe("RadioGroup", () => {
  it("renders all radio options", () => {
    renderGroup();
    expect(screen.getAllByRole("radio")).toHaveLength(3);
  });

  it("renders with role radiogroup", () => {
    render(
      <RadioGroup name="test" value="a" onChange={() => {}} label="Choose">
        <Radio value="a" label="A" />
      </RadioGroup>,
    );
    expect(screen.getByRole("radiogroup", { name: "Choose" })).toBeInTheDocument();
  });

  it("marks the correct radio as checked", () => {
    renderGroup("b");
    expect(screen.getByLabelText("Option B")).toBeChecked();
    expect(screen.getByLabelText("Option A")).not.toBeChecked();
  });

  it("fires onChange when a radio is clicked", () => {
    const handleChange = vi.fn();
    renderGroup("a", handleChange);
    fireEvent.click(screen.getByLabelText("Option B"));
    expect(handleChange).toHaveBeenCalledWith("b");
  });

  it("does not fire onChange when disabled", () => {
    const handleChange = vi.fn();
    renderGroup("a", handleChange, true);
    fireEvent.click(screen.getByLabelText("Option B"));
    expect(handleChange).not.toHaveBeenCalled();
  });

  it("disables all radios when group is disabled", () => {
    renderGroup("a", vi.fn(), true);
    screen.getAllByRole("radio").forEach((radio) => {
      expect(radio).toBeDisabled();
    });
  });
});

describe("Radio", () => {
  it("renders with a label", () => {
    render(
      <RadioGroup name="test" value="x" onChange={() => {}}>
        <Radio value="x" label="My Option" />
      </RadioGroup>,
    );
    expect(screen.getByLabelText("My Option")).toBeInTheDocument();
  });

  it("renders helper text", () => {
    render(
      <RadioGroup name="test" value="x" onChange={() => {}}>
        <Radio value="x" label="Option" helperText="Some helpful context." />
      </RadioGroup>,
    );
    expect(screen.getByText("Some helpful context.")).toBeInTheDocument();
  });

  it("forwards ref to the input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <RadioGroup name="test" value="x" onChange={() => {}}>
        <Radio ref={ref} value="x" label="Ref test" />
      </RadioGroup>,
    );
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it("is disabled individually when disabled prop is set", () => {
    render(
      <RadioGroup name="test" value="a" onChange={() => {}}>
        <Radio value="a" label="A" />
        <Radio value="b" label="B" disabled />
      </RadioGroup>,
    );
    expect(screen.getByLabelText("B")).toBeDisabled();
    expect(screen.getByLabelText("A")).not.toBeDisabled();
  });
});
