import path from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/stories.tsx"],
  addons: ["@storybook/addon-links", "@storybook/addon-essentials"],
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

    return config;
  },
};

export default config;
