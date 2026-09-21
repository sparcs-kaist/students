"use client";

import React from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import DelegateUapresidentFrame from "@sparcs-students/web/features/uapresident/components/DelegateUapresidentFrame";

const DelegatePage = () => (
  <FlexWrapper direction="column" gap={40}>
    <FlexWrapper direction="column" gap={10}>
      <PageTitle>총학생회장 권한 위임</PageTitle>
      <BreadCrumb
        items={[
          { name: "총학생회장", path: "/uapresident/manage" },
          { name: "총학생회장 권한 위임", path: "/uapresident/delegate" },
        ]}
      />
    </FlexWrapper>

    <FlexWrapper direction="column" gap={32} padding="0 20px">
      <DelegateUapresidentFrame />
    </FlexWrapper>
  </FlexWrapper>
);

export default DelegatePage;
