import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import SearchSelect from "@sparcs-students/web/common/components/Forms/SearchSelect";
import { useArgs } from "@storybook/client-api";
import { fn } from "@storybook/test";

const meta: Meta<typeof SearchSelect> = {
  title: "components/Forms/SearchSelect",
  component: SearchSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    errorMessage: { control: false },
    disabled: { control: "boolean" },
    value: { control: "text" },
    handleChange: { control: false },
    setErrorStatus: { control: false },
    onChange: { control: false },
    options: { control: false },
    selected: {
      control: "select",
      options: ["apple", "banana", "banananana", "carrot"],
    },
    setSelected: { control: false },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder",
    errorMessage: "",
    disabled: false,
    value: "",
    handleChange: fn(),
    setErrorStatus: fn(),
    onChange: undefined,
    options: ["apple", "banana", "banananana", "carrot"],
    selected: "",
    setSelected: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const example: Story = {
  render: function Render(args) {
    const [{ value, selected, placeholder, options }, updateArgs] = useArgs();

    const handleChange = (e: string) => {
      updateArgs({
        value: e,
      });
    };

    const setSelected = (e: string) => {
      updateArgs({ value: e, selected: e });
    };

    return (
      <SearchSelect
        {...args}
        options={options}
        placeholder={placeholder}
        value={value}
        handleChange={handleChange}
        selected={selected}
        setSelected={setSelected}
      />
    );
  },
};
