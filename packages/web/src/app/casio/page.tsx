"use client";

import SingleColumnTable from "@sparcs-students/web/common/components/Table/SingleColumnTable";
import React from "react";

const HomePage: React.FC = () => {
  const tableData = {
    header: "Example Table",
    clickable: true,
    rows: [
      {
        tag: "[테스트]",
        content:
          "기ㅣ이이이이이이이이이이ㅣ이이ㅣ이이이이이이이이이이이이이이이이이이이이이이이이이이기ㅣ이이이이이이이이이이ㅣ이이ㅣ이이이이이이이이이이이이이이이이이이이이이이이이이이ㄴ",
        date: "어제",
        link: "/detail/1",
      },
      {
        tag: "[테스트]",
        content: "짧은 텍스트",
        date: "2025-01-02",
        link: "/detail/2",
      },
      { content: "태그 없을 때", date: "2025-01-03", link: "/detail/3" },
    ],
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Home Page</h1>
      <h2>Non-empty Table</h2>
      <SingleColumnTable
        header={tableData.header}
        clickable={tableData.clickable}
        rows={tableData.rows}
      />
      <h2>Without Button</h2>
      <SingleColumnTable
        header={tableData.header}
        clickable={false}
        rows={tableData.rows}
        buttonEnable={false}
      />
      <h2>Small Table</h2>
      <SingleColumnTable
        header={tableData.header}
        clickable={tableData.clickable}
        rows={tableData.rows}
        mini
      />
      <h2>Empty Table</h2>
      <SingleColumnTable
        header={tableData.header}
        clickable={tableData.clickable}
        rows={[]}
      />
    </div>
  );
};

export default HomePage;
