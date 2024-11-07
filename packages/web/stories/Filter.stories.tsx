import type { Meta, StoryObj } from "@storybook/react";

import { fn } from "@storybook/test";

import Filter from "@sparcs-students/web/common/components/Filter/index";

const meta: Meta<typeof Filter> = {
  title: "components/Filter",
  component: Filter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"], // CHACHA: description display 위해 추가.

  argTypes: {
    itemList: {
      control: false,
      description: "[개발자, 디자이너, 기획자]",
    },
    selectedList: {
      control: { type: "multi-select" },
      options: ["개발자", "디자이너", "기획자"],
    },
    setSelectedList: {
      control: false,
      description: "useState set 함수를 삽입합니다.",
    },
  },

  args: { setSelectedList: fn() },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const example: Story = {
  args: {
    itemList: ["개발자", "디자이너", "기획자"],
    selectedList: ["개발자", "디자이너", "기획자"],
  },
};
