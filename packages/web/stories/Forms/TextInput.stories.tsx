import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import TextInput from "@sparcs-students/web/common/components/Forms/TextInput";
import { useArgs } from "@storybook/client-api";
import { fn } from "@storybook/test";

const meta: Meta<typeof TextInput> = {
  title: "components/Forms/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    errorMessage: { control: false },
    area: { control: "boolean" },
    disabled: { control: "boolean" },
    value: { control: "text" },
    handleChange: { control: false },
    setErrorStatus: { control: false },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder",
    errorMessage: "",
    area: false,
    disabled: false,
    value: "",
    handleChange: fn(),
    setErrorStatus: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const example: Story = {
  render: function Render(args) {
    const [{ value }, updateArgs] = useArgs();

    const handleChange = (e: string) => {
      updateArgs({
        value: e,
      });
    };

    return <TextInput {...args} value={value} handleChange={handleChange} />;
  },
};
