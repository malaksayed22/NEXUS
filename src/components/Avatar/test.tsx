import "@testing-library/jest-dom/vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { Avatar, AvatarGroup } from "./index";

afterEach(() => {
  cleanup();
});

describe("Avatar", () => {
  it("renders image when src is provided", () => {
    render(
      <Avatar
        src="https://example.com/avatar.jpg"
        alt="Profile"
        size="md"
        shape="circle"
      />,
    );

    expect(screen.getByRole("img", { name: "Profile" })).toBeInTheDocument();
  });

  it("renders initials when name is provided and no src", () => {
    render(<Avatar name="Ava Rivera" size="md" shape="circle" />);

    expect(screen.getByText("AR")).toBeInTheDocument();
  });

  it("renders generic icon when no src and no name", () => {
    render(<Avatar size="md" shape="circle" />);

    expect(screen.getByLabelText("Avatar placeholder")).toBeInTheDocument();
  });

  it("renders status indicator", () => {
    render(
      <Avatar name="Ava Rivera" size="md" shape="circle" status="online" />,
    );

    expect(screen.getByLabelText("online")).toBeInTheDocument();
  });
});

describe("AvatarGroup", () => {
  it("shows overflow count when avatars exceed max", () => {
    render(
      <AvatarGroup
        max={2}
        avatars={[
          { name: "Ava Rivera", size: "md", shape: "circle" },
          { name: "Liam Chen", size: "md", shape: "circle" },
          { name: "Maya Khan", size: "md", shape: "circle" },
        ]}
      />,
    );

    expect(screen.getByLabelText("1 more")).toBeInTheDocument();
    expect(screen.getByText("+1")).toBeInTheDocument();
  });
});
