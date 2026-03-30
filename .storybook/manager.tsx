import { createElement, Suspense } from "react";
import { addons, types, useParameter } from "@storybook/manager-api";
import { AddonPanel, SyntaxHighlighter } from "@storybook/components";

const ADDON_ID = "myui/story-source";
const PANEL_ID = `${ADDON_ID}/panel`;

function StorySourcePanel() {
  const params = useParameter<{ source?: string }>("storySource", {});
  const source = params?.source ?? "";
  const panelBg = "#0d1117";
  const panelBorder = "1px solid rgba(255, 255, 255, 0.08)";

  if (!source) {
    return createElement(
      "div",
      {
        style: {
          padding: "24px",
          color: "#999",
          background: panelBg,
          border: panelBorder,
          borderRadius: "10px",
          fontFamily: "sans-serif",
          fontSize: 13,
          lineHeight: 1.6,
        },
      },
      "No source available for this story.",
    );
  }

  return createElement(
    Suspense,
    {
      fallback: createElement(
        "div",
        {
          style: {
            padding: "24px",
            fontSize: 13,
            color: "#999",
            background: panelBg,
            border: panelBorder,
            borderRadius: "10px",
          },
        },
        "Loading...",
      ),
    },
    createElement(SyntaxHighlighter, {
      language: "tsx",
      copyable: true,
      showLineNumbers: true,
      customStyle: {
        margin: 0,
        padding: "18px",
        background: panelBg,
        border: panelBorder,
        borderRadius: "10px",
      },
      lineNumberStyle: {
        color: "rgba(232, 232, 240, 0.45)",
      },
      children: source,
    }),
  );
}

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Story",
    render({ active }) {
      return createElement(AddonPanel, {
        active: Boolean(active),
        key: PANEL_ID,
        children: createElement(StorySourcePanel),
      });
    },
  });
});
