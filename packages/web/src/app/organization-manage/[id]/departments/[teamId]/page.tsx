"use client";

import { DepartmentRoleEnum } from "@sparcs-students/root/packages/interface/src/common/enum/organization.enum";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import Table from "@sparcs-students/web/common/components/Table/Table";
import LightTag from "@sparcs-students/web/common/components/Tag/LightTag";
import Typography from "@sparcs-students/web/common/components/Typography";
import { committeeMemberRoleTagList } from "@sparcs-students/web/common/util/tableTagList";
import { RoleEnumType } from "@sparcs-students/web/features/organization-manage/components/NameSearchResults";
import {
  DepartmentMemberProps,
  mockCommitteeListData,
  mockDepartmentMemberData,
} from "@sparcs-students/web/features/organization-manage/services/_mock/mockOrganizationManageData";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useParams, useRouter } from "next/navigation";
import styled from "styled-components";

const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;
const TwoButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

const roleTag = ({ role }: { role: RoleEnumType }) => {
  if (!Object.values(DepartmentRoleEnum).includes(role as DepartmentRoleEnum))
    return null;

  const departmentRole = role as DepartmentRoleEnum;
  return (
    <LightTag
      color={committeeMemberRoleTagList[departmentRole].color}
      width="96px"
    >
      {committeeMemberRoleTagList[departmentRole].text}
    </LightTag>
  );
};

const OrganizationManage = () => {
  const params = useParams();
  const router = useRouter();

  const mockCommitteeData = mockCommitteeListData.find(
    mockCommitteeDatum => mockCommitteeDatum.id === Number(params.teamId),
  );

  const columnHelper = createColumnHelper<DepartmentMemberProps>();

  const columns = [
    columnHelper.display({
      id: "id",
      header: "번호",
      cell: ({ row }) => row.index + 1,
      size: 80,
    }),
    columnHelper.accessor("studentId", {
      id: "studentId",
      header: "학번",
      cell: info => info.getValue(),
      size: 0,
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: "이름",
      cell: info => info.getValue(),
      size: 0,
    }),
    columnHelper.accessor("role", {
      id: "role",
      header: "직책",
      cell: info => {
        const role = info.getValue();
        return role ? roleTag({ role }) : null;
      },
      size: 0,
    }),
  ];

  const table = useReactTable({
    columns,
    data: mockDepartmentMemberData,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

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
      <FlexWrapper direction="column" gap={40}>
        <FlexWrapper direction="column" gap={32}>
          <Typography fs={24} lh={24} color="PRIMARY" fw="BOLD">
            {mockCommitteeData?.name}
          </Typography>
          <Typography fs={16} lh={20} color="BLACK" fw="REGULAR">
            {mockCommitteeData?.description}
          </Typography>
        </FlexWrapper>
        <Table table={table} />
        <ButtonContainer>
          <TwoButtonWrapper>
            <Button
              type="reverse"
              buttonText="이전"
              style={{ width: "100px" }}
              onClick={() => {
                router.push(`/organization-manage/${params.id}/departments`);
              }}
            />
            <Button
              buttonText="수정"
              style={{ width: "100px" }}
              onClick={() => {
                // TODO: endpoint로 이동
              }}
            />
          </TwoButtonWrapper>
        </ButtonContainer>
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default OrganizationManage;
