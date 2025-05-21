"use client";

import React, { useState } from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import ManageMemberTable, {
  MemberFormValues,
  OrganizationMemberProps,
} from "@sparcs-students/web/features/organization-manage/components/ManageMemberTable";
import { useForm } from "react-hook-form";
import { mockOrganizationMemberData } from "@sparcs-students/web/features/organization-manage/services/_mock/mockOrganizationManageData";

const OrganizationManage = () => {
  // TODO: remove esline disable (임시라서 넣어놓음)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dirtyMemberData, setDirtyMemberData] = useState<{
    updatedRows: OrganizationMemberProps[];
    createdRows: OrganizationMemberProps[];
    deletedRows: OrganizationMemberProps[];
  }>({ updatedRows: [], createdRows: [], deletedRows: [] });
  const formMethods = useForm<MemberFormValues>({
    defaultValues: {
      members: mockOrganizationMemberData,
    },
  });

  return (
    <FlexWrapper direction="column" gap={10}>
      <ManageMemberTable
        formMethods={formMethods}
        initialData={mockOrganizationMemberData}
        onDiffExtract={setDirtyMemberData}
      />
    </FlexWrapper>
  );
};

export default OrganizationManage;
