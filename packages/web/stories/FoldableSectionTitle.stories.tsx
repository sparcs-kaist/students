import type { Meta, StoryObj } from "@storybook/react";

import { fn } from "@storybook/test";
import { useState } from "@storybook/preview-api";

import FoldableSectionTitle from "@sparcs-students/web/common/components/FoldableSectionTitle";

const meta: Meta<typeof FoldableSectionTitle> = {
  title: "components/FoldableSectionTitle",
  component: FoldableSectionTitle,
  parameters: {
    layout: "centered",
  },

  argTypes: {
    title: {
      control: { type: "text" },
    },
    toggle: {
      control: false,
    },
    toggleHandler: {
      control: false,
    },
  },
  args: { toggleHandler: fn() },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const example: Story = {
  args: {
    title: "2024년 가을학기",
    toggle: false,
  },
  render: function Render(args) {
    const { title, toggle: defaultToggle } = args;
    const [toggle, setToggle] = useState<boolean>(defaultToggle);
    return (
      <FoldableSectionTitle
        {...args}
        title={title}
        toggle={toggle}
        toggleHandler={() => setToggle(!toggle)}
      />
    );
  },
};
