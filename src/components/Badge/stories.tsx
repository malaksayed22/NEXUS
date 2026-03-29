import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./index";
import styles from "./stories.module.css";

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    variant: "default",
    size: "md",
    dot: false,
    removable: false,
    children: "Badge",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "success", "warning", "danger", "info", "brand"],
    },
    size: { control: "select", options: ["sm", "md"] },
    dot: { control: "boolean" },
    removable: { control: "boolean" },
    onRemove: { action: "remove" },
    children: { control: "text" },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VariantPalette: Story = {
  render: (args) => (
    <div className={styles.row}>
      <Badge {...args} variant="default">
        Default
      </Badge>
      <Badge {...args} variant="success">
        Success
      </Badge>
      <Badge {...args} variant="warning">
        Warning
      </Badge>
      <Badge {...args} variant="danger">
        Danger
      </Badge>
      <Badge {...args} variant="info">
        Info
      </Badge>
      <Badge {...args} variant="brand">
        Brand
      </Badge>
    </div>
  ),
};

export const WithDot: Story = {
  args: {
    dot: true,
    children: "Live",
    variant: "success",
  },
};

export const Removable: Story = {
  args: {
    removable: true,
    children: "Filter: Active",
    variant: "brand",
  },
};

export const CompactStatus: Story = {
  args: {
    size: "sm",
    dot: true,
    variant: "info",
    children: "Queued",
  },
};
