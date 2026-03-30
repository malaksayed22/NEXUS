import type { Meta, StoryObj } from "@storybook/react";
import { Spinner } from "./index";
import styles from "./stories.module.css";

const meta = {
  title: "Components/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  args: {
    size: "md",
    label: "Loading",
  },
  argTypes: {
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    label: { control: "text" },
  },
} satisfies Meta<typeof Spinner>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: (args) => (
    <div className={styles.row}>
      <Spinner {...args} size="xs" />
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
      <Spinner {...args} size="xl" />
    </div>
  ),
};

export const InlineWithText: Story = {
  render: (args) => (
    <div className={styles.inlineRow}>
      <Spinner {...args} size="sm" />
      <span>Saving changes…</span>
    </div>
  ),
};

export default meta;
