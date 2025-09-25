"use client";

// students/packages/web/src/app/organization-manage/page.tsx

import React, { useState } from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import ManageMemberTable, {
  MemberFormValues,
  OrganizationMemberProps,
} from "@sparcs-students/web/features/organization-manage/components/ManageMemberTable";
import { useForm } from "react-hook-form";
import {
  mockOrganizationMemberData,
  mockCommitteeMemberTableData,
} from "@sparcs-students/web/features/organization-manage/services/_mock/mockOrganizationManageData";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import Typography from "@sparcs-students/web/common/components/Typography";
import Notice from "@sparcs-students/web/common/components/Notice";
import styled from "styled-components";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import { useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import Modal from "@sparcs-students/web/common/components/Modal";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import useOrganizationStore from "@sparcs-students/web/stores/useOrganizationStore";
import {
  createOrganizationMember,
  createTeamMember,
  createTeamLeader,
} from "@sparcs-students/web/lib/api/organizationApi";
import { ApiOrg005RequestBody } from "@sparcs-students/interface/api/organization/endpoint/apiOrg005";
import { ApiOrg008RequestBody } from "@sparcs-students/interface/api/organization/endpoint/apiOrg008";
import { ApiOrg009RequestBody } from "@sparcs-students/interface/api/organization/endpoint/apiOrg009";
import { CommitteeRoleEnum } from "@sparcs-students/root/packages/interface/src/common/enum/organization.enum";

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
  border-radius: ${({ theme }) => theme.round.sm};
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

type DirtyCommitteeMemberData = {
  updatedRows: OrganizationMemberProps[];
  createdRows: OrganizationMemberProps[];
  deletedRows: OrganizationMemberProps[];
};

type DirtyCommitteeMemberDataItem = {
  id: number;
  dirtyData: DirtyCommitteeMemberData;
};

const calculateChangedRows = ({
  dirtyMemberData,
  dirtyCommitteeMemberDataList,
}: {
  dirtyMemberData: DirtyCommitteeMemberData;
  dirtyCommitteeMemberDataList: DirtyCommitteeMemberDataItem[];
}) => {
  let rows =
    dirtyMemberData.createdRows.length +
    dirtyMemberData.deletedRows.length +
    dirtyMemberData.updatedRows.length;

  dirtyCommitteeMemberDataList.forEach(dirtyCommitteeMemberData => {
    rows += dirtyCommitteeMemberData.dirtyData.createdRows.length;
    rows += dirtyCommitteeMemberData.dirtyData.updatedRows.length;
    rows += dirtyCommitteeMemberData.dirtyData.deletedRows.length;
  });

  return rows;
};

const OrganizationManage = () => {
  const mockOrganizationName = "전산학부";
  const mockPendingApprovalCount = 3;
  const mockId = 0;

  const router = useRouter();
  const { currentOrganizationId } = useOrganizationStore();

  const [dirtyMemberData, setDirtyMemberData] =
    useState<DirtyCommitteeMemberData>({
      updatedRows: [],
      createdRows: [],
      deletedRows: [],
    });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const formMemberMethods = useForm<MemberFormValues>({
    defaultValues: {
      members: mockOrganizationMemberData,
    },
  });

  const dirtyCommitteeMemberDataList: Array<DirtyCommitteeMemberDataItem> = [];

  const committeeTables = mockCommitteeMemberTableData.map(
    mockCommitteeMemberTable => {
      const [dirtyCommitteeMemberData, setDirtyCommitteeMemberData] =
        useState<DirtyCommitteeMemberData>({
          updatedRows: [],
          createdRows: [],
          deletedRows: [],
        });

      dirtyCommitteeMemberDataList.push({
        id: mockCommitteeMemberTable.id,
        dirtyData: dirtyCommitteeMemberData,
      });

      return {
        id: mockCommitteeMemberTable.id,
        name: mockCommitteeMemberTable.name,
        formMethods: useForm<MemberFormValues>({
          defaultValues: {
            members: mockCommitteeMemberTable.OrganizationMember,
          },
        }),
        initialData: mockCommitteeMemberTable.OrganizationMember,
        onDiffExtract: setDirtyCommitteeMemberData,
        roleType: "committee" as const,
      };
    },
  );

  const handleSubmitChanges = async () => {
    if (!currentOrganizationId) {
      alert("조직 ID를 찾을 수 없습니다. 조직을 선택해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 멤버 추가 처리 (apiOrg005)
      await Promise.all(
        dirtyMemberData.createdRows.map(async member => {
          const requestBody: ApiOrg005RequestBody = {
            OrganizationMember: {
              organization: { id: currentOrganizationId },
              student: { id: parseInt(member.studentId) },
              duration: {
                startTerm: new Date(member.startDate),
                endTerm: member.endDate ? new Date(member.endDate) : null,
              },
            },
          };

          return createOrganizationMember(requestBody);
        }),
      );

      // TODO: 멤버 수정 처리 (PATCH API 필요)
      // await Promise.all(dirtyMemberData.updatedRows.map(async (member) => { ... }));

      // TODO: 멤버 삭제 처리 (DELETE API 필요)
      // await Promise.all(dirtyMemberData.deletedRows.map(async (member) => { ... }));

      // 팀 멤버/리더 추가 처리
      await Promise.all(
        dirtyCommitteeMemberDataList.map(async committeeData => {
          const teamId = committeeData.id;
          const memberPromises = committeeData.dirtyData.createdRows.map(
            async member => {
              // Chief인 경우 팀 리더로 등록 (apiOrg009)
              if (member.role === CommitteeRoleEnum.Chief) {
                const requestBody: ApiOrg009RequestBody = {
                  teamLeader: {
                    team: { id: teamId },
                    student: { id: parseInt(member.studentId) },
                    duration: {
                      startTerm: new Date(member.startDate),
                      endTerm: member.endDate ? new Date(member.endDate) : null,
                    },
                  },
                };

                return createTeamLeader(requestBody);
              }

              // 일반 멤버인 경우 팀 멤버로 등록 (apiOrg008)
              const requestBody: ApiOrg008RequestBody = {
                teamMember: {
                  team: { id: teamId },
                  student: { id: parseInt(member.studentId) },
                  duration: {
                    startTerm: new Date(member.startDate),
                    endTerm: member.endDate ? new Date(member.endDate) : null,
                  },
                },
              };

              return createTeamMember(requestBody);
            },
          );

          return Promise.all(memberPromises);
        }),
      );

      // TODO: 팀 멤버/리더 수정 처리 (PATCH API 필요)
      // TODO: 팀 멤버/리더 삭제 처리 (DELETE API 필요)

      alert("변경사항이 성공적으로 저장되었습니다.");

      // TODO: 페이지 새로고침 또는 데이터 재조회
      // router.refresh();
    } catch (error) {
      console.error("제출 중 오류 발생:", error);
      alert("변경사항 저장 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const onConfirmModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} onClose={close}>
        <CancellableModalContent
          onConfirm={async () => {
            close();
            await handleSubmitChanges();
          }}
          onClose={close}
        >
          <Typography fs={20} lh={28} fw="REGULAR">
            <b>
              {calculateChangedRows({
                dirtyMemberData,
                dirtyCommitteeMemberDataList,
              })}
              인
            </b>
            의 정보가 변경되었습니다. <br />
            <b>반영</b> 하시겠습니까?
          </Typography>
        </CancellableModalContent>
      </Modal>
    ));
  };

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
        <Notice text="대표자를 위임할 시 익일 0시에 권한이 넘어가며, 그 전까지 다시 대표자 직책을 회수할 수 있습니다.">
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
        <Typography fs={24} lh={24} color="PRIMARY" fw="BOLD">
          {mockOrganizationName} 운영위원회
        </Typography>
        {committeeTables.map(committeeTable => (
          <FlexWrapper key={committeeTable.id} direction="column" gap={16}>
            <Typography fs={20} lh={20} color="BLACK" fw="BOLD">
              {committeeTable.name}
            </Typography>
            <ManageMemberTable
              formMethods={committeeTable.formMethods}
              initialData={committeeTable.initialData}
              onDiffExtract={committeeTable.onDiffExtract}
              roleType="committee"
            />
          </FlexWrapper>
        ))}
      </FlexWrapper>
      <ButtonWrapper>
        <Button
          style={{ padding: "8px 16px", width: "100px" }}
          onClick={onConfirmModal}
          type={isSubmitting ? "disabled" : "default"}
        >
          {isSubmitting ? "제출 중..." : "제출"}
        </Button>
      </ButtonWrapper>
    </FlexWrapper>
  );
};

export default OrganizationManage;
