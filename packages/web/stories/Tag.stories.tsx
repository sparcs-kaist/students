import type { Meta, StoryObj } from "@storybook/react";

import LightTag from "@sparcs-students/web/common/components/Tag/LightTag";

const meta: Meta<typeof LightTag> = {
  title: "components/LightTag",
  component: LightTag,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"], // CHACHA: needed to display description

  argTypes: {
    children: {
      control: false,
    },
    color: {
      control: { type: "select" },
      options: [
        "GREEN",
        "BLUE",
        "ORANGE",
        "PURPLE",
        "PINK",
        "YELLOW",
        "RED",
        "GRAY",
      ],
      description:
        "다양한 색을 전달할 수 있으나, 현재 GREEN, RED에 관한 디자인만 설정되어 있습니다.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const example: Story = {
  args: {
    children: <div>Example Tag Children</div>,
  },
};
