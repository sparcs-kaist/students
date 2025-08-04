"use client";

import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import ManageCommitteeTable from "@sparcs-students/web/features/organization-manage/components/ManageCommitteeTable";
import {
  mockCommitteeListData,
  organizationName,
} from "@sparcs-students/web/features/organization-manage/services/_mock/mockOrganizationManageData";
import { useParams } from "next/navigation";

const OrganizationManage = () => {
  const params = useParams();

  return (
    <FlexWrapper direction="column" gap={48}>
      <FlexWrapper direction="column" gap={10}>
        <PageTitle>단체 관리</PageTitle>
        <BreadCrumb
          items={[
            { name: "단체 관리", path: "/organization-manage" },
            {
              name: "부서/TF 배치도",
              path: `/organization-manage/${params.id}`,
            },
          ]}
        />
      </FlexWrapper>
      <ManageCommitteeTable
        name={organizationName}
        data={mockCommitteeListData}
      />
    </FlexWrapper>
  );
};

export default OrganizationManage;
