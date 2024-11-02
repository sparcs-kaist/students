import type { Meta, StoryObj } from "@storybook/react";

import { fn } from "@storybook/test";

import TextButton from "@sparcs-students/web/common/components/Buttons/TextButton";

const meta: Meta<typeof TextButton> = {
  title: "components/Buttons/TextButton",
  component: TextButton,
  parameters: {
    layout: "centered",
  },

  argTypes: {
    text: {
      control: "text",
    },
  },
  args: { onClick: fn() },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const example: Story = {
  args: {
    text: "Button",
  },
};
