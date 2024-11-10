import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import DateRangeInput from "@sparcs-students/web/common/components/Forms/DateRangeInput";
import { useArgs } from "@storybook/client-api";
import { fn } from "@storybook/test";

const meta: Meta<typeof DateRangeInput> = {
  title: "components/Forms/DateRangeInput",
  component: DateRangeInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    startValue: { control: "text" },
    endValue: { control: "text" },
    limitStartValue: { control: "text" },
    limitEndValue: { control: "text" },
    onChange: { control: false },
    setErrorStatus: { control: false },
  },
  args: {
    label: "Date",
    startValue: "",
    endValue: "",
    limitStartValue: "2024.01.01",
    limitEndValue: "2024.12.31",
    onChange: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const example: Story = {
  render: function Render(args) {
    const [{ startValue, endValue }, updateArgs] = useArgs();

    const handleChange = (e: string) => {
      const [start, end] = e.split("|");
      updateArgs({ startValue: start, endValue: end });
    };

    return (
      <DateRangeInput
        {...args}
        startValue={startValue}
        endValue={endValue}
        onChange={handleChange}
      />
    );
  },
};
