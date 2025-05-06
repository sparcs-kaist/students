import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import ItemNumberInput from "@sparcs-students/web/common/components/Forms/ItemNumberInput";
import { useArgs } from "@storybook/client-api";
import { fn } from "@storybook/test";

const meta: Meta<typeof ItemNumberInput> = {
  title: "components/Forms/ItemNumberInput",
  component: ItemNumberInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    errorMessage: { control: false },
    disabled: { control: "boolean" },
    itemLimit: { control: "number" },
    unit: { control: "text" },
    value: { control: "number" },
    handleChange: { control: false },
    setErrorStatus: { control: false },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder",
    errorMessage: "",
    disabled: false,
    itemLimit: 100,
    unit: "개",
    value: "",
    handleChange: fn(),
    setErrorStatus: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const example: Story = {
  render: function Render(args) {
    const [{ value, placeholder }, updateArgs] = useArgs();

    const handleChange = (e: string) => {
      updateArgs({
        value: e,
      });
    };

    return (
      <ItemNumberInput
        {...args}
        value={value}
        placeholder={placeholder}
        handleChange={handleChange}
      />
    );
  },
};
