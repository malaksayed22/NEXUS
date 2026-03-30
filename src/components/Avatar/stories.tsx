import type { Meta, StoryObj } from "@storybook/react";
import { Avatar, AvatarGroup } from "./index";
import styles from "./stories.module.css";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: {
    name: "Ava Rivera",
    size: "md",
    shape: "circle",
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    shape: { control: "select", options: ["circle", "square"] },
    status: {
      control: "select",
      options: ["online", "away", "busy", "offline", undefined],
    },
    src: { control: "text" },
    alt: { control: "text" },
    name: { control: "text" },
  },
} satisfies Meta<typeof Avatar>;

type Story = StoryObj<typeof meta>;

export const ProfileAvatar: Story = {};

export const Sizes: Story = {
  render: (args) => (
    <div className={styles.row}>
      <Avatar {...args} size="xs" />
      <Avatar {...args} size="sm" />
      <Avatar {...args} size="md" />
      <Avatar {...args} size="lg" />
      <Avatar {...args} size="xl" />
    </div>
  ),
};

export const WithStatus: Story = {
  render: (args) => (
    <div className={styles.row}>
      <Avatar {...args} status="online" name="Nora Kim" />
      <Avatar {...args} status="away" name="Liam Chen" />
      <Avatar {...args} status="busy" name="Maya Khan" />
      <Avatar {...args} status="offline" name="Noah Park" />
    </div>
  ),
};

export const Fallbacks: Story = {
  render: (args) => (
    <div className={styles.column}>
      <div className={styles.row}>
        <Avatar {...args} name="Ava Rivera" />
        <Avatar {...args} name="Rina" />
        <Avatar {...args} />
      </div>
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup
      avatars={[
        { name: "Ava Rivera", size: "md", shape: "circle", status: "online" },
        { name: "Liam Chen", size: "md", shape: "circle", status: "away" },
        { name: "Maya Khan", size: "md", shape: "circle", status: "busy" },
        { name: "Noah Park", size: "md", shape: "circle", status: "online" },
        { name: "Ivy Brooks", size: "md", shape: "circle", status: "offline" },
        { name: "Theo Gray", size: "md", shape: "circle", status: "online" },
      ]}
      max={5}
    />
  ),
};

export default meta;
