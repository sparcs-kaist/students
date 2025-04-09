import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { useArgs } from "@storybook/client-api";
import { fn } from "@storybook/test";
import MultiSelect, {
  SelectItem,
} from "@sparcs-students/web/common/components/MultiSelect";

const meta: Meta<typeof MultiSelect> = {
  title: "components/Forms/Select",
  component: MultiSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    items: { control: false },
    errorMessage: { control: false },
    disabled: { control: "boolean" },
    selectedValue: { control: "select", options: ["1", "2"] },
    onSelect: { control: false },
    setErrorStatus: { control: false },
  },
  args: {
    items: [
      { label: "test1", value: "1", selectable: true },
      {
        label: "test2",
        value: "2",
        selectable: true,
      },
      { label: "non-selectable", value: "0", selectable: false },
    ],
    errorMessage: "",
    disabled: false,
    selectedValue: "",
    onSelect: fn(),
    setErrorStatus: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const example: Story = {
  render: function Render(args) {
    const [{ selectedValue }, updateArgs] = useArgs();

    const onSelect = (e: string | string[]) => {
      updateArgs({
        selectedValue: e,
      });
    };

    return (
      <MultiSelect
        {...args}
        items={args.items as SelectItem<string>[]}
        selectedValue={selectedValue}
        onSelect={onSelect}
      />
    );
  },
};
