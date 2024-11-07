import type { Meta, StoryObj } from "@storybook/react";

import { fn } from "@storybook/test";

import FoldableSectionTitle from "@sparcs-students/web/common/components/FoldableSectionTitle";

const meta: Meta<typeof FoldableSectionTitle> = {
  title: "components/FoldableSectionTitle",
  component: FoldableSectionTitle,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"], // CHACHA: description display 위해 추가.

  argTypes: {
    title: {
      control: { type: "text" },
    },
    toggle: {
      control: { type: "select" },
      options: [true, false],
    },
    toggleHandler: {
      control: false,
      description: "토글 값을 변경하는 함수입니다.",
    },
  },
  args: { toggleHandler: fn() },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const example: Story = {
  args: {
    title: "2024년 가을학기",
    toggle: false,
  },
};
