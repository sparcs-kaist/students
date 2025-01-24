import SingleColumnTable from "@sparcs-students/web/common/components/Table/SingleColumnTable";
import type { Meta, StoryObj } from "@storybook/react";
import styled from "styled-components";

const meta: Meta<typeof SingleColumnTable> = {
  title: "components/SingleColumnTable",
  component: SingleColumnTable,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },
  argTypes: {
    header: {
      control: { type: "text" },
    },
    clickable: {
      control: { type: "boolean" },
    },
    buttonEnable: {
      control: { type: "boolean" },
    },
    mini: {
      control: { type: "boolean" },
    },
  },
  args: {
    header: "Header",
    clickable: true,
    buttonEnable: true,
    mini: false,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

const TableWrapper = styled.div`
  width: 500px;
`;

const today = new Date();
const fiveDaysAgo = new Date(today); // 오늘 날짜 복사
fiveDaysAgo.setDate(today.getDate() - 5);

export const example: Story = {
  args: {
    moreLink: "",
    rows: [
      {
        tag: "[테스트]",
        content:
          "기ㅣ이이이이이이이이이이ㅣ이이ㅣ이이이이이이이이이이이이이이이이이이이이이이이이이이기ㅣ이이이이이이이이이이ㅣ이이ㅣ이이이이이이이이이이이이이이이이이이이이이이이이이이ㄴ",
        date: today,
      },
      {
        tag: "[테스트]",
        content: "짧은 텍스트",
        date: fiveDaysAgo,
      },
      { content: "태그 없을 때", date: new Date("2024-11-21") },
    ],
  },

  render: function Render(args) {
    return (
      <TableWrapper>
        <SingleColumnTable {...args} />
      </TableWrapper>
    );
  },
};
