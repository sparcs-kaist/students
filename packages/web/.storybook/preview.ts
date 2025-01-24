import React from "react";

import type { Preview } from "@storybook/react";

import { ThemeProvider } from "styled-components";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";

import colors from "../src/styles/themes/colors";
import fonts from "../src/styles/themes/fonts";
import responsive from "../src/styles/themes/responsive";
import round from "../src/styles/themes/round";
import shadow from "../src/styles/themes/shadow";
import sizes from "../src/styles/themes/sizes";
import zIndices from "../src/styles/themes/zIndices";

const Theme = {
  colors,
  fonts,
  responsive,
  round,
  shadow,
  sizes,
  zIndices,
};

// import fonts from '@sparcs-students/web/common/components/styles/themes.d.ts'
const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeFromJSXProvider({
      themes: {
        Theme,
      },
      Provider: ThemeProvider,
    }),
  ],
};

export default preview;
