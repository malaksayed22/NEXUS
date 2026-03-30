import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./index";
import styles from "./stories.module.css";

const meta = {
  title: "Components/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    variant: "elevated",
    padding: "md",
    isHoverable: false,
    isClickable: false,
  },
  argTypes: {
    variant: { control: "select", options: ["elevated", "outlined", "filled"] },
    padding: { control: "select", options: ["none", "sm", "md", "lg"] },
    isHoverable: { control: "boolean" },
    isClickable: { control: "boolean" },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Card>;

type Story = StoryObj<typeof meta>;

export const AllVariants: Story = {
  render: (args) => (
    <div className={styles.grid}>
      <Card {...args} variant="elevated">
        <Card.Body>Elevated card with soft shadow.</Card.Body>
      </Card>
      <Card {...args} variant="outlined">
        <Card.Body>Outlined card with subtle border.</Card.Body>
      </Card>
      <Card {...args} variant="filled">
        <Card.Body>Filled card using secondary background.</Card.Body>
      </Card>
    </div>
  ),
};

export const FullCard: Story = {
  args: {
    variant: "elevated",
    isHoverable: true,
  },
  render: (args) => (
    <Card {...args}>
      <Card.Image
        src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80"
        alt="Desk setup"
        aspectRatio="16/9"
      />
      <Card.Header>
        <h3>Product Analytics</h3>
        <p>Weekly engagement summary and conversion trends.</p>
      </Card.Header>
      <Card.Body>
        Teams with dashboard alerts improved retention by 14% this quarter.
      </Card.Body>
      <Card.Footer>
        <span>Updated 2h ago</span>
        <button type="button">Open</button>
      </Card.Footer>
    </Card>
  ),
};

export const HoverableGrid: Story = {
  render: (args) => (
    <div className={styles.gridThree}>
      <Card {...args} variant="elevated" isHoverable>
        <Card.Body>Hover me</Card.Body>
      </Card>
      <Card {...args} variant="outlined" isHoverable>
        <Card.Body>Hover me too</Card.Body>
      </Card>
      <Card {...args} variant="filled" isHoverable>
        <Card.Body>And me</Card.Body>
      </Card>
    </div>
  ),
};

export const ClickableCard: Story = {
  args: {
    variant: "outlined",
    isClickable: true,
    isHoverable: true,
  },
  render: (args) => (
    <Card {...args}>
      <Card.Header>
        <h3>Keyboard Friendly</h3>
        <p>Press Enter or Space to trigger click.</p>
      </Card.Header>
      <Card.Body>This card behaves like a pressable surface.</Card.Body>
    </Card>
  ),
};

export const MinimalCard: Story = {
  args: {
    variant: "filled",
    padding: "lg",
  },
  render: (args) => (
    <Card {...args}>
      <Card.Body>Minimal card with only body content.</Card.Body>
    </Card>
  ),
};

export default meta;
