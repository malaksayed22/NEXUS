import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Modal } from "./index";
import styles from "./stories.module.css";

const meta = {
  title: "Components/Modal",
  component: Modal,
  tags: ["autodocs"],
  args: {
    isOpen: false,
    size: "md",
    title: "Edit profile",
    description: "Update account details and save your changes.",
    closeOnEsc: true,
    closeOnOverlayClick: true,
    isCentered: true,
    children: "Modal content",
    onClose: () => undefined,
  },
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl", "fullscreen"],
    },
    title: { control: "text" },
    description: { control: "text" },
    closeOnEsc: { control: "boolean" },
    closeOnOverlayClick: { control: "boolean" },
    isCentered: { control: "boolean" },
    isOpen: { control: false },
    onClose: { action: "close" },
    children: { control: false },
    footer: { control: false },
  },
} satisfies Meta<typeof Modal>;

type Story = StoryObj<typeof meta>;

const ControlledModal = (args: Story["args"]) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={styles.triggerButton}
        onClick={() => setOpen(true)}
      >
        Open modal
      </button>
      <Modal
        {...args}
        isOpen={open}
        onClose={() => {
          setOpen(false);
          args?.onClose?.();
        }}
      >
        {args?.children ?? (
          <p>
            This is a fully accessible modal with focus trap, escape handling,
            and body scroll lock.
          </p>
        )}
      </Modal>
    </div>
  );
};

export const PrimaryModalFlow: Story = {
  args: {},
  render: ControlledModal,
};

export const WithFooter: Story = {
  args: {},
  render: (args) => (
    <ControlledModal
      {...args}
      footer={
        <>
          <button type="button" className={styles.footerButton}>
            Cancel
          </button>
          <button
            type="button"
            className={`${styles.footerButton} ${styles.primaryFooterButton}`}
          >
            Confirm
          </button>
        </>
      }
    />
  ),
};

export const Sizes: Story = {
  args: {
    size: "sm",
  },
  render: ControlledModal,
};

export const LongContent: Story = {
  args: {
    size: "lg",
    title: "Terms and Conditions",
  },
  render: (args) => (
    <ControlledModal
      {...args}
      children={
        <div className={styles.longText}>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <p>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse.</p>
          <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa.</p>
          <p>
            Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.
          </p>
          <p>Vivamus suscipit tortor eget felis porttitor volutpat.</p>
          <p>Donec sollicitudin molestie malesuada.</p>
          <p>
            Praesent sapien massa, convallis a pellentesque nec, egestas non
            nisi.
          </p>
          <p>Cras ultricies ligula sed magna dictum porta.</p>
          <p>Quisque velit nisi, pretium ut lacinia in, elementum id enim.</p>
          <p>Pellentesque in ipsum id orci porta dapibus.</p>
        </div>
      }
    />
  ),
};

export const Fullscreen: Story = {
  args: {
    size: "fullscreen",
    title: "Fullscreen Modal",
    description: "Immersive experience for complex workflows.",
  },
  render: ControlledModal,
};

export default meta;
