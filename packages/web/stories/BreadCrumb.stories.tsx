import type { Meta, StoryObj } from "@storybook/react";

import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb/index";

const meta: Meta<typeof BreadCrumb> = {
  title: "components/BreadCrumb",
  component: BreadCrumb,
  parameters: {
    layout: "fullscreen",
  },

  argTypes: {
    items: {
      control: { type: "object" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const example: Story = {
  args: {
    items: [
      {
        name: "동아리 목록",
        path: "/clubs",
      },
    ],
    enableLast: false,
  },
};
