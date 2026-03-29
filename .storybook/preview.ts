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

      return createElement(
        "div",
        { style: { padding: "16px", width: "100%" } },
        createElement(Story),
      );
    },
  ],
};

export default preview;
