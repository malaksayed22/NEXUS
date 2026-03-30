import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "./index";
import styles from "./stories.module.css";

const meta = {
  title: "Components/Toast",
  component: ToastProvider,
  tags: ["autodocs"],
  args: {
    children: null,
  },
} satisfies Meta<typeof ToastProvider>;

type Story = StoryObj<typeof meta>;

const ToastDemo = ({
  mode,
}: {
  mode: "all" | "action" | "stack" | "persistent";
}) => {
  const { toast } = useToast();

  const triggerStack = () => {
    toast.info("Sync started");
    toast.success("Profile saved!");
    toast.warning("You are offline");
    toast.error("Something went wrong", { duration: 6000 });
  };

  return (
    <div className={styles.panel}>
      {mode === "all" ? (
        <div className={styles.row}>
          <button
            type="button"
            className={styles.button}
            onClick={() => toast.success("Profile saved!")}
          >
            Success
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() =>
              toast.error("Something went wrong", { duration: 6000 })
            }
          >
            Error
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => toast.warning("You are offline")}
          >
            Warning
          </button>
          <button
            type="button"
            className={styles.button}
            onClick={() => toast.info("New version available")}
          >
            Info
          </button>
        </div>
      ) : null}

      {mode === "action" ? (
        <button
          type="button"
          className={styles.button}
          onClick={() =>
            toast.info("New version available", {
              action: { label: "Update", onClick: () => undefined },
            })
          }
        >
          Trigger Action Toast
        </button>
      ) : null}

      {mode === "stack" ? (
        <button type="button" className={styles.button} onClick={triggerStack}>
          Add Multiple Toasts
        </button>
      ) : null}

      {mode === "persistent" ? (
        <button
          type="button"
          className={styles.button}
          onClick={() =>
            toast.info("Persistent notification", { duration: Infinity })
          }
        >
          Add Persistent Toast
        </button>
      ) : null}
    </div>
  );
};

const WithProvider = ({
  mode,
}: {
  mode: "all" | "action" | "stack" | "persistent";
}) => (
  <ToastProvider>
    <ToastDemo mode={mode} />
  </ToastProvider>
);

export const AllVariants: Story = {
  args: {},
  render: () => <WithProvider mode="all" />,
};

export const WithAction: Story = {
  args: {},
  render: () => <WithProvider mode="action" />,
};

export const Stacking: Story = {
  args: {},
  render: () => <WithProvider mode="stack" />,
};

export const Persistent: Story = {
  args: {},
  render: () => <WithProvider mode="persistent" />,
};

export default meta;
