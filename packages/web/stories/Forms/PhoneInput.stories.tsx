import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import PhoneInput from "@sparcs-students/web/common/components/Forms/PhoneInput";
import { useArgs } from "@storybook/client-api";
import { fn } from "@storybook/test";

const meta: Meta<typeof PhoneInput> = {
  title: "components/Forms/PhoneInput",
  component: PhoneInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    disabled: { control: "boolean" },
    value: { control: "text" },
    handleChange: { control: false },
    setErrorStatus: { control: false },
    onChange: { control: false },
    optional: { control: "boolean" },
  },
  args: {
    label: "Label",
    placeholder: "010-XXXX-XXXX",
    disabled: false,
    value: "",
    handleChange: fn(),
    setErrorStatus: fn(),
    onChange: undefined,
    optional: true,
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

    return <PhoneInput {...args} value={value} handleChange={handleChange} />;
  },
};
