import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./index";
import styles from "./stories.module.css";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: {
    content: "Helpful information",
    placement: "top",
    delay: 300,
    disabled: false,
    children: (
      <button type="button" className={styles.button}>
        Hover me
      </button>
    ),
  },
  argTypes: {
    placement: {
      control: "select",
      options: ["top", "bottom", "left", "right"],
    },
    delay: { control: "number" },
    disabled: { control: "boolean" },
    content: { control: "text" },
    children: { control: false },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AllPlacements: Story = {
  render: (args) => (
    <div className={styles.row}>
      <Tooltip {...args} placement="top">
        <button type="button" className={styles.button}>
          Top
        </button>
      </Tooltip>
      <Tooltip {...args} placement="bottom">
        <button type="button" className={styles.button}>
          Bottom
        </button>
      </Tooltip>
      <Tooltip {...args} placement="left">
        <button type="button" className={styles.button}>
          Left
        </button>
      </Tooltip>
      <Tooltip {...args} placement="right">
        <button type="button" className={styles.button}>
          Right
        </button>
      </Tooltip>
    </div>
  ),
};

export const WithDelay: Story = {
  args: {
    delay: 800,
    content: "Delayed tooltip",
  },
};

export const OnButton: Story = {
  args: {
    content: "Clicking still works",
    children: (
      <button type="button" className={styles.button}>
        Action
      </button>
    ),
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    content: "Should not appear",
  },
};
