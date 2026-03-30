import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./index";
import styles from "./stories.module.css";

const Countries = () => (
  <>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
    <option value="ca">Canada</option>
    <option value="au">Australia</option>
    <option value="de">Germany</option>
  </>
);

const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    label: "Country",
    size: "md",
    error: false,
    disabled: false,
    placeholder: "Choose a country",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    onChange: { action: "changed" },
  },
} satisfies Meta<typeof Select>;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div className={styles.wrap}>
      <Select {...args}>
        <Countries />
      </Select>
    </div>
  ),
};

export const WithHelperText: Story = {
  render: (args) => (
    <div className={styles.wrap}>
      <Select {...args} helperText="We use this to calculate shipping rates.">
        <Countries />
      </Select>
    </div>
  ),
};

export const ErrorState: Story = {
  render: (args) => (
    <div className={styles.wrap}>
      <Select
        {...args}
        error
        helperText="Please select a country to continue."
        defaultValue=""
      >
        <Countries />
      </Select>
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <div className={styles.wrap}>
      <Select {...args} disabled defaultValue="us">
        <Countries />
      </Select>
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div className={styles.stack}>
      <Select {...args} size="sm" label="Small" defaultValue="us">
        <Countries />
      </Select>
      <Select {...args} size="md" label="Medium" defaultValue="uk">
        <Countries />
      </Select>
      <Select {...args} size="lg" label="Large" defaultValue="ca">
        <Countries />
      </Select>
    </div>
  ),
};

export const NoLabel: Story = {
  render: (args) => (
    <div className={styles.wrap}>
      <Select {...args} label="" aria-label="Country">
        <Countries />
      </Select>
    </div>
  ),
};

export default meta;
