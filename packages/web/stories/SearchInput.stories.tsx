import type { Meta, StoryObj } from "@storybook/react";

import { useState } from "@storybook/preview-api";

import SearchInput from "@sparcs-students/web/common/components/SearchInput";

const meta: Meta<typeof SearchInput> = {
  title: "components/SearchInput",
  component: SearchInput,
  parameters: {
    layout: "centered",
  },

  argTypes: {
    searchText: {
      control: false,
    },
    handleChange: {
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const example: Story = {
  args: {
    searchText: "술박스",
  },
  render: function Render(args) {
    const [searchText, setSearchText] = useState<string>("");
    return (
      <SearchInput
        {...args}
        searchText={searchText}
        handleChange={setSearchText}
      />
    );
  },
};
