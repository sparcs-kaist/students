"use client";

// students/packages/web/src/app/uapresident/manage/page.tsx

import React from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import ManageOrganizationTable, {
  OrganizationProps,
} from "@sparcs-students/web/features/organization-manage/components/ManageOrganizationTable";

const OrganizationManage = () => {
  // Mock data for the 4 tables
  const mockData: OrganizationProps[] = Array(10)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      name: "전산학부 학생회",
      memberCount: 32,
      repStudentId: "20220279",
      repName: "박정원",
    }));

  const tables = [
    { title: "자치기구 및 학과 학생회", data: mockData },
    { title: "상설기구", data: mockData },
    { title: "전문기구", data: mockData },
    { title: "특별기구", data: mockData },
  ];

  return (
    <FlexWrapper direction="column" gap={40}>
      <FlexWrapper direction="column" gap={10}>
        <PageTitle>기구 관리</PageTitle>
        <BreadCrumb
          items={[{ name: "기구 관리", path: "/uapresident/manage" }]}
        />
      </FlexWrapper>

      <FlexWrapper direction="column" gap={48} padding="0 20px">
        {tables.map((table, index) => (
          <ManageOrganizationTable
            key={index}
            title={table.title}
            data={table.data}
          />
        ))}
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default OrganizationManage;
