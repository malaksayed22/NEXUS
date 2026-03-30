import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio, RadioGroup } from "./index";
import styles from "./stories.module.css";

const meta = {
  title: "Components/Radio",
  component: RadioGroup,
  tags: ["autodocs"],
  args: {
    name: "plan",
    value: "starter",
    onChange: () => undefined,
    size: "md",
    disabled: false,
    orientation: "vertical",
    label: "Select a plan",
    children: null,
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    orientation: { control: "select", options: ["vertical", "horizontal"] },
    disabled: { control: "boolean" },
    children: { control: false },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof RadioGroup>;

type Story = StoryObj<typeof meta>;

const ControlledRadioGroup = (args: Story["args"]) => {
  const [value, setValue] = useState("starter");
  const name = args?.name ?? "plan";
  return (
    <RadioGroup {...args} name={name} value={value} onChange={setValue}>
      <Radio value="starter" label="Starter" />
      <Radio value="pro" label="Pro" />
      <Radio value="enterprise" label="Enterprise" />
    </RadioGroup>
  );
};

const ControlledRadioGroupWithHelperText = (args: Story["args"]) => {
  const [value, setValue] = useState("email");
  const name = args?.name ?? "notifications";
  return (
    <RadioGroup
      {...args}
      name={name}
      value={value}
      onChange={setValue}
      label="Notification method"
    >
      <Radio
        value="email"
        label="Email"
        helperText="Receive updates at your registered address."
      />
      <Radio value="sms" label="SMS" helperText="Carrier rates may apply." />
      <Radio
        value="push"
        label="Push notifications"
        helperText="Requires the mobile app."
      />
    </RadioGroup>
  );
};

const ControlledHorizontalRadioGroup = (args: Story["args"]) => {
  const [value, setValue] = useState("light");
  const name = args?.name ?? "theme";
  return (
    <RadioGroup
      {...args}
      name={name}
      orientation="horizontal"
      value={value}
      onChange={setValue}
      label="Theme"
    >
      <Radio value="light" label="Light" />
      <Radio value="dark" label="Dark" />
      <Radio value="system" label="System" />
    </RadioGroup>
  );
};

const ControlledPartiallyDisabled = (args: Story["args"]) => {
  const [value, setValue] = useState("starter");
  const name = args?.name ?? "plan";
  return (
    <RadioGroup {...args} name={name} value={value} onChange={setValue}>
      <Radio value="starter" label="Starter" />
      <Radio value="pro" label="Pro (unavailable)" disabled />
      <Radio value="enterprise" label="Enterprise" />
    </RadioGroup>
  );
};

export const Default: Story = {
  render: ControlledRadioGroup,
};

export const WithHelperText: Story = {
  render: ControlledRadioGroupWithHelperText,
};

export const Horizontal: Story = {
  render: ControlledHorizontalRadioGroup,
};

export const AllSizes: Story = {
  render: (args) => (
    <div className={styles.sizeRow}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <div key={size} className={styles.sizeCol}>
          <p className={styles.sizeLabel}>{size}</p>
          <RadioGroup {...args} name={`size-${size}`} size={size} value="a" onChange={() => {}}>
            <Radio value="a" label="Option A" />
            <Radio value="b" label="Option B" />
          </RadioGroup>
        </div>
      ))}
    </div>
  ),
};

export const DisabledGroup: Story = {
  render: (args) => (
    <RadioGroup {...args} disabled value="pro" onChange={() => {}}>
      <Radio value="starter" label="Starter" />
      <Radio value="pro" label="Pro" />
      <Radio value="enterprise" label="Enterprise" />
    </RadioGroup>
  ),
};

export const PartiallyDisabled: Story = {
  render: ControlledPartiallyDisabled,
};

export default meta;
