import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./index";
import styles from "./stories.module.css";

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      d="m21 21-4.2-4.2m1.7-5a6.7 6.7 0 1 1-13.4 0 6.7 6.7 0 0 1 13.4 0Z"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    />
  </svg>
);

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    size: "md",
    placeholder: "Type here",
    isInvalid: false,
    isSuccess: false,
    disabled: false,
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    label: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    leftAddon: { control: false },
    rightAddon: { control: false },
    isInvalid: { control: "boolean" },
    isSuccess: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseField: Story = {};

export const WithLabel: Story = {
  args: {
    label: "Email",
    placeholder: " ",
  },
};

export const WithHelperText: Story = {
  args: {
    label: "Username",
    helperText: "Use 4-20 characters.",
    placeholder: " ",
  },
};

export const ErrorState: Story = {
  args: {
    label: "Email",
    isInvalid: true,
    errorMessage: "Please enter a valid email address.",
    placeholder: " ",
  },
};

export const SuccessState: Story = {
  args: {
    label: "Email",
    isSuccess: true,
    helperText: "Looks good.",
    placeholder: " ",
  },
};

export const WithAddons: Story = {
  render: (args) => (
    <div className={styles.stack}>
      <Input
        {...args}
        label="Search"
        leftAddon={<SearchIcon />}
        rightAddon="/"
        placeholder=" "
      />
      <Input
        {...args}
        label="Price"
        leftAddon="$"
        rightAddon="USD"
        placeholder=" "
      />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    label: "Disabled field",
    disabled: true,
    helperText: "This field is unavailable.",
    placeholder: " ",
  },
};
