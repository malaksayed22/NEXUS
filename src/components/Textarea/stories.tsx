import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./index";
import styles from "./stories.module.css";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    label: "Message",
    placeholder: " ",
    helperText: "Write a concise message.",
    isInvalid: false,
    autoResize: false,
    disabled: false,
  },
  argTypes: {
    label: { control: "text" },
    helperText: { control: "text" },
    errorMessage: { control: "text" },
    isInvalid: { control: "boolean" },
    autoResize: { control: "boolean" },
    maxLength: { control: "number" },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MessageComposer: Story = {};

export const WithCharacterCount: Story = {
  args: {
    maxLength: 200,
    defaultValue: "I am writing a product-minded frontend component library.",
  },
  render: (args) => (
    <div className={styles.stack}>
      <Textarea {...args} />
    </div>
  ),
};

export const AutoResize: Story = {
  args: {
    autoResize: true,
    defaultValue:
      "Line one\nLine two\nLine three\nLine four\nLine five\nLine six",
  },
  render: (args) => (
    <div className={styles.stack}>
      <Textarea {...args} />
    </div>
  ),
};

export const ErrorState: Story = {
  args: {
    isInvalid: true,
    errorMessage: "Message is required.",
    helperText: undefined,
  },
  render: (args) => (
    <div className={styles.stack}>
      <Textarea {...args} />
    </div>
  ),
};
