import path from "node:path";
import { readFileSync } from "node:fs";
import type { Plugin } from "vite";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/stories.tsx"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal: async (config) => {
    config.resolve = config.resolve ?? {};
    const rootPath = process.cwd();
    config.resolve.alias = {
      ...(config.resolve.alias ?? {}),
      "@components": path.resolve(rootPath, "src/components"),
      "@tokens": path.resolve(rootPath, "src/styles"),
      "@utils": path.resolve(rootPath, "src/utils"),
    };

    // Injects full-file source on meta + per-story snippets on each export
    // (assignments appended at EOF so story bindings exist — no TDZ errors).
    const storySourcePlugin: Plugin = {
      name: "inject-story-source",
      enforce: "pre",
      transform(source, id) {
        if (id.startsWith("\0") || !id.match(/stories\.tsx$/)) return undefined;

        const MARKER = "export default meta;";
        const markerIdx = source.lastIndexOf(MARKER);
        if (markerIdx === -1) return undefined;

        let originalSource: string;
        try {
          originalSource = readFileSync(id, "utf-8");
        } catch {
          return undefined;
        }

        // Split the original file into per-story blocks keyed by export name.
        // Matches every top-level PascalCase named export (the story exports).
        // Extract each story export block from the original source
        const storyPattern = /^export const ([A-Z]\w+)/gm;
        const hits: { name: string; idx: number }[] = [];
        let m: RegExpExecArray | null;
        while ((m = storyPattern.exec(originalSource)) !== null) {
          hits.push({ name: m[1], idx: m.index });
        }
        const storiesMap: Record<string, string> = {};
        for (let i = 0; i < hits.length; i++) {
          const start = hits[i].idx;
          const end = i + 1 < hits.length ? hits[i + 1].idx : originalSource.length;
          storiesMap[hits[i].name] = originalSource.slice(start, end).trim();
        }

        // Per-story snippets must be assigned AFTER each `export const Name` runs.
        // Injecting `AllVariants.parameters = ...` next to `export default meta`
        // runs before `AllVariants` exists → ReferenceError (temporal dead zone).
        let perStoryInjections = "";
        for (const [name, code] of Object.entries(storiesMap)) {
          perStoryInjections += [
            `${name}.parameters = Object.assign({}, ${name}.parameters, {`,
            `  storySource: { source: ${JSON.stringify(code)} },`,
            `});`,
            "",
          ].join("\n");
        }

        const metaOnlyInjection = [
          `Object.assign(meta, {`,
          `  parameters: Object.assign({}, meta.parameters, {`,
          `    storySource: { source: ${JSON.stringify(originalSource)} },`,
          `  }),`,
          `});`,
          `export default meta;`,
        ].join("\n");

        const injected =
          source.slice(0, markerIdx) +
          metaOnlyInjection +
          source.slice(markerIdx + MARKER.length) +
          (perStoryInjections ? `\n${perStoryInjections}` : "");

        return { code: injected, map: null };
      },
    };

    config.plugins = [...(config.plugins ?? []), storySourcePlugin];

    return config;
  },
};

export default config;
