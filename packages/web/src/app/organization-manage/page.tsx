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
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import Typography from "@sparcs-students/web/common/components/Typography";
import Notice from "@sparcs-students/web/common/components/Notice";
import styled from "styled-components";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import { useRouter } from "next/navigation";

const BoxWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const Box = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  border-raidus: ${({ theme }) => theme.round.sm};
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
`;

const TitleWithButton = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  gap: 16px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

const OrganizationManage = () => {
  const mockOrganizationName = "전산학부";
  const mockPendingApprovalCount = 3;
  const mockId = 0;

  const router = useRouter();
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
    <FlexWrapper direction="column" gap={40}>
      <FlexWrapper direction="column" gap={10}>
        <PageTitle>단체 관리</PageTitle>
        <BreadCrumb
          items={[{ name: "단체 관리", path: "/organization-manage" }]}
        />
      </FlexWrapper>
      <FlexWrapper direction="column" gap={48} padding="0 20px">
        <FlexWrapper direction="column" gap={16}>
          <Typography fs={24} lh={24} color="PRIMARY" fw="BOLD">
            {mockOrganizationName} 집행위원회
          </Typography>
          <BoxWrapper>
            <Box>
              <Typography fs={16} lh={20} color="BLACK" fw="SEMIBOLD">
                {mockPendingApprovalCount}인의 학우가 승인 대기 중입니다.
              </Typography>
              <Button
                onClick={() => {
                  router.push(`/organization-manage/${mockId}/approve`);
                }}
              >
                검토하기
              </Button>
            </Box>
            <Box>
              <Typography fs={16} lh={20} color="BLACK" fw="SEMIBOLD">
                부서/TF 배치도
              </Typography>
              <Button
                onClick={() => {
                  router.push(`/organization-manage/${mockId}/departments`);
                }}
              >
                수정하기
              </Button>
            </Box>
          </BoxWrapper>
        </FlexWrapper>
        <Notice
          text={`대표자를 위임할 시 익일 0시에 권한이 넘어가며, 그 전까지 다시 대표자
          직책을 회수할 수 있습니다.`}
        >
          <Typography fs={16} lh={20}>
            임기 시작일 및 종료일이 선택되지 않은 부원이 있다면 대표자 위임이
            되지 않으므로, 위임 전 확인 부탁드립니다.
            <br />
            종료일은 현재 날짜 이후로만 설정 가능하며, 종료일이 넘어가면
            자동으로 명단에서 사라지게 됩니다.
          </Typography>
        </Notice>
        <ManageMemberTable
          formMethods={formMemberMethods}
          initialData={mockOrganizationMemberData}
          onDiffExtract={setDirtyMemberData}
          roleType="member"
        />
      </FlexWrapper>
      <FlexWrapper direction="column" gap={48} padding="0 20px">
        <FlexWrapper direction="column" gap={10}>
          <TitleWithButton>
            <Typography fs={24} lh={24} color="PRIMARY" fw="BOLD">
              {mockOrganizationName} 운영위원회
            </Typography>
            <ButtonsWrapper>
              <Button type="reverse">운위 삭제</Button>
              <Button>운위 추가</Button>
            </ButtonsWrapper>
          </TitleWithButton>
        </FlexWrapper>
        <FlexWrapper direction="column" gap={16}>
          <TitleWithButton>
            <Typography fs={20} lh={20} color="BLACK" fw="BOLD">
              운영 위원회
            </Typography>
            <ButtonsWrapper>
              <Button>위원 추가</Button>
            </ButtonsWrapper>
          </TitleWithButton>
          <ManageMemberTable
            formMethods={formCommitteeMethods}
            initialData={mockCommitteeMemberData}
            onDiffExtract={setDirtyMemberData}
            roleType="committee"
          />
        </FlexWrapper>
        <FlexWrapper direction="column" gap={16}>
          <TitleWithButton>
            <Typography fs={20} lh={20} color="BLACK" fw="BOLD">
              확대운영위원회
            </Typography>
            <ButtonsWrapper>
              <Button>위원 추가</Button>
            </ButtonsWrapper>
          </TitleWithButton>
          <ManageMemberTable
            formMethods={formCommitteeMethods}
            initialData={mockCommitteeMemberData}
            onDiffExtract={setDirtyMemberData}
            roleType="committee"
          />
        </FlexWrapper>
      </FlexWrapper>
      <ButtonWrapper>
        <Button style={{ padding: "8px 16px" }}>제출</Button>
      </ButtonWrapper>
    </FlexWrapper>
  );
};

export default OrganizationManage;
