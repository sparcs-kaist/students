import type { Meta, StoryObj } from "@storybook/react";

import Info from "@sparcs-students/web/common/components/Info";

const meta: Meta<typeof Info> = {
  title: "components/Info",
  component: Info,
  parameters: {
    layout: "centered",
  },

  argTypes: {
    text: {
      control: { type: "text" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const example: Story = {
  args: {
    text: "술박스는 술박스입니다.",
  },
};
