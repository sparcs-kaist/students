import type { Meta, StoryObj } from "@storybook/react";

import { fn } from "@storybook/test";

import { useState } from "@storybook/preview-api";

import Filter from "@sparcs-students/web/common/components/Filter/index";

const meta: Meta<typeof Filter> = {
  title: "components/Filter",
  component: Filter,
  parameters: {
    layout: "centered",
  },

  argTypes: {
    itemList: {
      control: false,
    },
    selectedList: {
      control: false,
    },
    setSelectedList: {
      control: false,
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
  render: function Render(args) {
    const [selectedList, setSelectedList] = useState<string[]>([
      "개발자",
      "디자이너",
      "기획자",
    ]);
    return (
      <Filter
        {...args}
        itemList={["개발자", "디자이너", "기획자"]}
        selectedList={selectedList}
        setSelectedList={setSelectedList}
      />
    );
  },
};
