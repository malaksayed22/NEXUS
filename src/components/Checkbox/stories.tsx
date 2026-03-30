import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./index";
import styles from "./stories.module.css";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    label: "Accept terms and conditions",
    size: "md",
    indeterminate: false,
    error: false,
    disabled: false,
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    indeterminate: { control: "boolean" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof meta>;

const ControlledCheckbox = (args: Story["args"]) => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
    />
  );
};

const ControlledCheckboxWithHelperText = (args: Story["args"]) => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox
      {...args}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      helperText="We'll send important account information only."
    />
  );
};

const ControlledCheckboxGroup = (args: Story["args"]) => {
  const [selected, setSelected] = useState<string[]>(["email"]);
  const toggle = (val: string) =>
    setSelected((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
    );
  const options = [
    { value: "email", label: "Email notifications" },
    { value: "sms", label: "SMS notifications" },
    { value: "push", label: "Push notifications" },
  ];
  return (
    <div className={styles.stack}>
      {options.map((opt) => (
        <Checkbox
          {...args}
          key={opt.value}
          label={opt.label}
          checked={selected.includes(opt.value)}
          onChange={() => toggle(opt.value)}
        />
      ))}
    </div>
  );
};

export const Default: Story = {
  render: ControlledCheckbox,
};

export const Checked: Story = {
  args: {
    label: "Notify me of updates",
    checked: true,
  },
};

export const Indeterminate: Story = {
  args: {
    label: "Select all",
    indeterminate: true,
    checked: false,
  },
};

export const WithHelperText: Story = {
  render: ControlledCheckboxWithHelperText,
};

export const ErrorState: Story = {
  args: {
    label: "I agree to the terms",
    error: true,
    helperText: "You must accept the terms to continue.",
    checked: false,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled option",
    disabled: true,
    checked: false,
  },
};

export const AllSizes: Story = {
  render: (args) => (
    <div className={styles.stack}>
      <Checkbox {...args} size="sm" label="Small" checked={true} onChange={() => {}} />
      <Checkbox {...args} size="md" label="Medium" checked={true} onChange={() => {}} />
      <Checkbox {...args} size="lg" label="Large" checked={true} onChange={() => {}} />
    </div>
  ),
};

export const CheckboxGroup: Story = {
  render: ControlledCheckboxGroup,
};

export default meta;
