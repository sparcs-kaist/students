"use client";

import React, { useState } from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import ManageMemberTable, {
  MemberFormValues,
  OrganizationMemberProps,
} from "@sparcs-students/web/features/organization-manage/components/ManageMemberTable";
import { useForm } from "react-hook-form";
import {
  mockOrganizationMemberData,
  mockCommitteeMemberData,
} from "@sparcs-students/web/features/organization-manage/services/_mock/mockOrganizationManageData";

const OrganizationManage = () => {
  // TODO: remove esline disable (임시라서 넣어놓음)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dirtyMemberData, setDirtyMemberData] = useState<{
    updatedRows: OrganizationMemberProps[];
    createdRows: OrganizationMemberProps[];
    deletedRows: OrganizationMemberProps[];
  }>({ updatedRows: [], createdRows: [], deletedRows: [] });
  const formMemberMethods = useForm<MemberFormValues>({
    defaultValues: {
      members: mockOrganizationMemberData,
    },
  });
  const formCommitteeMethods = useForm<MemberFormValues>({
    defaultValues: {
      members: mockCommitteeMemberData,
    },
  });

  return (
    <FlexWrapper direction="column" gap={10}>
      <ManageMemberTable
        formMethods={formMemberMethods}
        initialData={mockOrganizationMemberData}
        onDiffExtract={setDirtyMemberData}
        roleType="member"
      />
      <ManageMemberTable
        formMethods={formCommitteeMethods}
        initialData={mockCommitteeMemberData}
        onDiffExtract={setDirtyMemberData}
        roleType="committee"
      />
    </FlexWrapper>
  );
};

export default OrganizationManage;
