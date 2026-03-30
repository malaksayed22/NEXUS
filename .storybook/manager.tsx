import { createElement } from "react";
import { addons, types, useParameter } from "@storybook/manager-api";
import { AddonPanel, SyntaxHighlighter } from "@storybook/components";
import { useTheme } from "@storybook/theming";

const ADDON_ID = "myui/story-source";
const PANEL_ID = `${ADDON_ID}/panel`;

// Exact Storybook syntax colors from @storybook/theming lightSyntaxColors / darkSyntaxColors
const makeTheme = (dark: boolean) => {
  const bg = dark ? "#1B1C1D" : "#FFFFFF";
  const t = dark
    ? { plain: "#EDEDED", comment: "#7C7C7C", string: "#92C379", cyan: "#C6C5FE", blue: "#B474DD", gray: "#EDEDED", red2: "#9a050f", green: "#A8FF60", red4: "#96CBFE", cyan2: "#FFFFB6" }
    : { plain: "#393A34", comment: "#008000", string: "#A31515", cyan: "#36acaa", blue: "#0000ff", gray: "#393A34", red2: "#9a050f", green: "#800000", red4: "#ff0000", cyan2: "#2B91AF" };
  return {
    'pre[class*="language-"]':  { color: t.plain, background: bg, margin: 0, padding: "20px", fontFamily: "inherit" },
    'code[class*="language-"]': { color: t.plain },
    comment:       { color: t.comment, fontStyle: "italic" },
    prolog:        { color: t.comment, fontStyle: "italic" },
    doctype:       { color: t.comment, fontStyle: "italic" },
    cdata:         { color: t.comment, fontStyle: "italic" },
    string:        { color: t.string },
    url:           { color: t.cyan },
    symbol:        { color: t.cyan },
    number:        { color: t.cyan },
    boolean:       { color: t.cyan },
    variable:      { color: t.cyan },
    constant:      { color: t.cyan },
    inserted:      { color: t.cyan },
    atrule:        { color: t.blue },
    keyword:       { color: t.blue },
    "attr-value":  { color: t.blue },
    punctuation:   { color: t.gray },
    operator:      { color: t.gray },
    function:      { color: t.gray },
    deleted:       { color: t.red2 },
    tag:           { color: t.green },
    selector:      { color: t.green },
    "attr-name":   { color: t.red4 },
    property:      { color: t.red4 },
    regex:         { color: t.red4 },
    entity:        { color: t.red4 },
    "class-name":  { color: t.cyan2 },
    important:     { fontWeight: "bold" },
    bold:          { fontWeight: "bold" },
    italic:        { fontStyle: "italic" },
    namespace:     { opacity: 0.7 },
  };
};

function StorySourcePanel() {
  // Each story now has storySource.source injected directly on its .parameters
  // by the Vite plugin, so useParameter returns exactly THIS story's snippet.
  const params = useParameter<{ source?: string }>("storySource", {});
  const source = params?.source ?? "";
  const theme = useTheme() as { base?: string };
  const isDark = theme?.base === "dark";

  if (!source) {
    return createElement(
      "div",
      { style: { padding: "24px", color: "#999", fontFamily: "sans-serif", fontSize: 13 } },
      "No source available for this story.",
    );
  }

  return createElement(SyntaxHighlighter, {
    language: "tsx",
    copyable: true,
    bordered: true,
    padded: true,
    useInlineStyles: true,
    style: makeTheme(isDark),
    showLineNumbers: false,
    children: source,
  } as Parameters<typeof SyntaxHighlighter>[0]);
}

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: "Story",
    render({ active }) {
      return createElement(
        AddonPanel,
        { active, key: PANEL_ID },
        createElement(StorySourcePanel),
      );
    },
  });
});
