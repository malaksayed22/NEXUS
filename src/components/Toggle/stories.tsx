import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./index";
import styles from "./stories.module.css";

const meta = {
  title: "Components/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: {
    checked: false,
    size: "md",
    label: "Enable notifications",
    labelPosition: "right",
    disabled: false,
  },
  argTypes: {
    checked: { control: "boolean" },
    size: { control: "select", options: ["sm", "md", "lg"] },
    label: { control: "text" },
    labelPosition: { control: "radio", options: ["left", "right"] },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

const Controlled = (args: Story["args"]) => {
  const [checked, setChecked] = useState(Boolean(args?.checked));
  const resolvedSize = args?.size ?? "md";

  return (
    <Toggle
      {...args}
      size={resolvedSize}
      checked={checked}
      onChange={(nextChecked) => {
        setChecked(nextChecked);
        args?.onChange?.(nextChecked);
      }}
    />
  );
};

export const NotificationSwitch: Story = {
  render: Controlled,
};

export const LabelLeft: Story = {
  args: {
    labelPosition: "left",
    checked: true,
  },
  render: Controlled,
};

export const Sizes: Story = {
  render: (args) => (
    <div className={styles.row}>
      <Toggle {...args} size="sm" checked={false} onChange={() => undefined} />
      <Toggle {...args} size="md" checked onChange={() => undefined} />
      <Toggle {...args} size="lg" checked={false} onChange={() => undefined} />
    </div>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
    checked: true,
  },
  render: Controlled,
};
