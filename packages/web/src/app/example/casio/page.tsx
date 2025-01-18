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
        date: new Date("2025-01-14"),
        link: "/detail/1",
      },
      {
        tag: "[테스트]",
        content: "짧은 텍스트",
        date: new Date("2025-01-10"),
        link: "/detail/2",
      },
      {
        content: "태그 없을 때",
        date: new Date("2024-11-21"),
        link: "/detail/3",
      },
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
        moreLink="/detail"
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
