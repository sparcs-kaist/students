import type { Meta, StoryObj } from "@storybook/react";
import React from "react";

import { fn } from "@storybook/test";

import Button from "@sparcs-students/web/common/components/Buttons/Button";
import Tag from "@sparcs-students/web/common/components/Tag/Tag";

const meta: Meta<typeof Button> = {
  title: "components/Buttons/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: { type: "select", options: ["default", "outlined", "disabled"] },
      defaultValue: "default",
    },
    buttonText: {
      control: "text",
    },
    iconType: {
      control: "text",
    },
    children: {
      control: false,
    },
  },
  args: { onClick: fn() },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const example: Story = {
  args: {
    type: "default",
    buttonText: "Button",
    children: <Tag color="GREEN600">Example Tag Children</Tag>,
    iconType: "person",
  },
};
