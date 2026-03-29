import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./index";
import styles from "./stories.module.css";

const ArrowIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="M5 12h14m0 0-5-5m5 5-5 5"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
    isLoading: false,
    fullWidth: false,
    disabled: false,
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    isLoading: { control: "boolean" },
    fullWidth: { control: "boolean" },
    disabled: { control: "boolean" },
    leftIcon: { control: false },
    rightIcon: { control: false },
    onClick: { action: "clicked" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VariantShowcase: Story = {
  render: (args) => (
    <div className={styles.row}>
      <Button {...args} variant="primary">
        Primary
      </Button>
      <Button {...args} variant="secondary">
        Secondary
      </Button>
      <Button {...args} variant="ghost">
        Ghost
      </Button>
      <Button {...args} variant="danger">
        Danger
      </Button>
    </div>
  ),
};

export const AllSizes: Story = {
  args: {
    variant: "primary",
  },
  render: (args) => (
    <div className={styles.rowAlign}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};

export const WithIcons: Story = {
  args: {
    variant: "secondary",
    leftIcon: <ArrowIcon />,
    rightIcon: <ArrowIcon />,
    children: "Explore",
  },
};

export const LoadingState: Story = {
  args: {
    isLoading: true,
    children: "Saving",
    variant: "primary",
  },
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
    children: "Continue",
    variant: "primary",
  },
  render: (args) => (
    <div className={styles.fullWidthWrap}>
      <Button {...args} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled",
    variant: "secondary",
  },
};
