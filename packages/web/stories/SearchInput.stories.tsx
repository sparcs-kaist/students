import type { Meta, StoryObj } from "@storybook/react";

import SearchInput from "@sparcs-students/web/common/components/SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "components/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },

  argTypes: {
    searchText: {
      control: { type: "text" },
    },
    handleChange: {
      control: false,
      description:
        "searchText 변화를 감지하고 setSearchText를 실행하는 함수를 삽입합니다.",
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const example: Story = {
  args: {
    searchText: "술박스",
  },
};
