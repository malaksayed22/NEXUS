import type { Preview } from "@storybook/react";
import { createElement } from "react";
import "../src/styles/tokens.css";
import "../src/styles/global.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      expanded: true,
    },
    a11y: {
      config: {
        rules: [
          { id: "color-contrast", enabled: true },
          { id: "label", enabled: true },
          { id: "button-name", enabled: true },
          { id: "image-alt", enabled: true },
          { id: "link-name", enabled: true },
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Global theme switcher",
      defaultValue: "light",
      toolbar: {
        icon: "mirror",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
      },
    },
  },
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme === "dark" ? "dark" : "light";
      document.documentElement.setAttribute("data-theme", theme);

      const bg = theme === "dark" ? "#0d1117" : "#ffffff";
      document.body.style.background = bg;

      return createElement(
        "div",
        {
          style: {
            padding: "24px",
            width: "100%",
            minHeight: "100px",
            background: bg,
            transition: "background 0.2s ease",
          },
        },
        createElement(Story),
      );
    },
  ],
};

export default preview;
