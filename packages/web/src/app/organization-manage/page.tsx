"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { overlay } from "overlay-kit";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import Typography from "@sparcs-students/web/common/components/Typography";
import Notice from "@sparcs-students/web/common/components/Notice";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import Modal from "@sparcs-students/web/common/components/Modal";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import OrganizationSelectCard from "@sparcs-students/web/common/components/SelectCard/OrganizationSelectCard";
import TableTextInput from "@sparcs-students/web/common/components/Forms/TableTextInput";

import ManageMemberTable, {
  MemberFormValues,
  OrganizationMemberProps,
} from "@sparcs-students/web/features/organization-manage/components/ManageMemberTable";
import useOrganizationStore from "@sparcs-students/web/features/organization-manage/stores/useOrganizationStore";
import {
  createOrganizationMember,
  createOrganizationManager,
  createTeamMember,
  createTeamLeader,
  createOperatingCommittee,
  createOperatingCommitteeMember,
  retireOrganizationMember,
  retireOrganizationManager,
  retireTeamMember,
  retireTeamLeader,
  deleteOperatingCommittee,
  retireOperatingCommitteeMember,
} from "@sparcs-students/web/features/organization-manage/api/organizationApi";
import { getOrganizationLookup } from "@sparcs-students/web/features/organization-register/api/organizationApi";
import ManageCommitteeTable from "@sparcs-students/web/features/organization-manage/components/ManageCommitteeTable";

import {
  mockOrganizationMemberData,
  mockCommitteeMemberTableData,
  mockCommitteeListData,
} from "@sparcs-students/web/features/organization-manage/services/_mock/mockOrganizationManageData";

import type { ApiOrg005RequestBody } from "@sparcs-students/interface/api/organization/endpoint/apiOrg005";
import type { ApiOrg006RequestBody } from "@sparcs-students/interface/api/organization/endpoint/apiOrg006";
import type { ApiOrg008RequestBody } from "@sparcs-students/interface/api/organization/endpoint/apiOrg008";
import type { ApiOrg009RequestBody } from "@sparcs-students/interface/api/organization/endpoint/apiOrg009";
import type { ApiOrg013RequestBody } from "@sparcs-students/interface/api/organization/endpoint/apiOrg013";
import type { ApiOrg001ResponseOK } from "@sparcs-students/interface/api/organization/endpoint/apiOrg001";
import type { IOrganization } from "@sparcs-students/interface/api/organization/type/organization.type";
import {
  CommitteeRoleEnum,
  MemberRoleEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum/organization.enum";

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

const CreateOperatingCommitteeModal = ({
  isOpen,
  close,
  orgId,
}: {
  isOpen: boolean;
  close: () => void;
  orgId: number;
}) => {
  const [committeeName, setCommitteeName] = useState("");
  const [isSubmittingModal, setIsSubmittingModal] = useState(false);
  return (
    <Modal isOpen={isOpen} width="400px">
      <CancellableModalContent
        onConfirm={async () => {
          if (isSubmittingModal) return;
          setIsSubmittingModal(true);
          try {
            await createOperatingCommittee({
              operatingCommittee: {
                organization: { id: orgId },
                name: committeeName,
                nameEng: committeeName,
                committeeTypeEnum: 1,
                startTerm: new Date(),
                endTerm: null,
              },
            });
            close();
            window.location.reload();
          } catch (e) {
            console.error(e);
            alert("운영위원회 생성 실패");
          } finally {
            setIsSubmittingModal(false);
          }
        }}
        onClose={close}
      >
        <FlexWrapper direction="column" gap={16}>
          <Typography fs={20} lh={24} fw="BOLD" color="BLACK">
            운영위원회 생성
          </Typography>
          <TableTextInput
            value={committeeName}
            handleChange={setCommitteeName}
            placeholder="위원회 이름 입력"
          />
        </FlexWrapper>
      </CancellableModalContent>
    </Modal>
  );
};

const OrganizationManage = () => {
  const mockOrganizationName = "전산학부";
  const mockPendingApprovalCount = 3;
  const mockId = 0;

  const router = useRouter();
  const { currentOrganizationId } = useOrganizationStore();

  const [organizationData, setOrganizationData] =
    useState<ApiOrg001ResponseOK | null>(null);
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [selectedValue, setSelectedValue] = useState<string>("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [dirtyMemberData, setDirtyMemberData] =
    useState<DirtyCommitteeMemberData>({
      updatedRows: [],
      createdRows: [],
      deletedRows: [],
    });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: Replace with real API when available (e.g., GET /organizations/{id}/members)
  // Currently, there is no API to fetch organization members, so we use mock data.
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

  useEffect(() => {
    if (!currentOrganizationId) {
      const fetchOrganizations = async () => {
        try {
          const data = await getOrganizationLookup();
          setOrganizationData(data);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error("Failed to fetch organizations:", error);
        }
      };
      fetchOrganizations();
    }
  }, [currentOrganizationId]);

  const totalList = useMemo(() => {
    if (!organizationData?.organizationLists) return [];
    const groupedByType = new Map<string, IOrganization[]>();
    organizationData.organizationLists.forEach(semesterData => {
      semesterData.organizationTypes.forEach(typeData => {
        const existing =
          groupedByType.get(String(typeData.organizationTypeEnum)) || [];
        groupedByType.set(String(typeData.organizationTypeEnum), [
          ...existing,
          ...typeData.organizations,
        ]);
      });
    });
    const result: {
      key: { value: string; label: string };
      values: { value: string; label: string; id: number }[];
    }[] = [];
    groupedByType.forEach((organizations, typeEnum) => {
      result.push({
        key: { value: typeEnum, label: typeEnum },
        values: organizations.map(org => ({
          value: org.name,
          label: org.name,
          id: org.id,
        })),
      });
    });
    return result;
  }, [organizationData]);

  const keyList = useMemo(() => totalList.map(item => item.key), [totalList]);

  const handleSelectOrganization = () => {
    if (selectedId) {
      useOrganizationStore.getState().setCurrentOrganizationId(selectedId);
      window.location.reload();
    }
  };

  const handleCreateOperatingCommittee = () => {
    const orgId = currentOrganizationId;
    if (!orgId) return;

    overlay.open(({ isOpen, close }) => (
      <CreateOperatingCommitteeModal
        isOpen={isOpen}
        close={close}
        orgId={orgId}
      />
    ));
  };

  const handleDeleteOperatingCommittee = (committeeId: number) => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <CancellableModalContent
          onConfirm={async () => {
            try {
              await deleteOperatingCommittee(committeeId);
              close();
              window.location.reload();
            } catch (e) {
              console.error(e);
              alert("운영위원회 삭제 실패");
            }
          }}
          onClose={close}
        >
          <Typography fs={16} lh={20} color="BLACK">
            정말 이 운영위원회를 삭제하시겠습니까?
          </Typography>
        </CancellableModalContent>
      </Modal>
    ));
  };

  const getStudentDbId = (studentIdStr: string, name?: string): number => {
    const val = parseInt(studentIdStr);
    if (val === 20220000) return 2;
    if (val === 20210000) {
      if (name === "박민정") return 3;
      if (name === "빅정민") return 4;
      if (name === "박정민") return 5;
      return 3;
    }
    return val;
  };

  const handleSubmitChanges = async () => {
    if (!currentOrganizationId) {
      alert("조직 ID를 찾을 수 없습니다. 조직을 선택해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. 멤버 및 매니저 추가 처리 (apiOrg005 / apiOrg006)
      await Promise.all(
        dirtyMemberData.createdRows.map(async member => {
          if (
            member.role === MemberRoleEnum.Vice ||
            member.role === MemberRoleEnum.Editor
          ) {
            const requestBody: ApiOrg006RequestBody = {
              OrganizationManager: {
                organization: { id: currentOrganizationId },
                student: { id: getStudentDbId(member.studentId, member.name) },
                duration: {
                  startTerm: new Date(member.startDate),
                  endTerm: member.endDate ? new Date(member.endDate) : null,
                },
              },
            };
            return createOrganizationManager(requestBody);
          }
          const requestBody: ApiOrg005RequestBody = {
            OrganizationMember: {
              organization: { id: currentOrganizationId },
              student: { id: getStudentDbId(member.studentId, member.name) },
              duration: {
                startTerm: new Date(member.startDate),
                endTerm: member.endDate ? new Date(member.endDate) : null,
              },
            },
          };
          return createOrganizationMember(requestBody);
        }),
      );

      // 2. 멤버 및 매니저 은퇴 처리 (apiOrg016 / apiOrg017)
      await Promise.all(
        dirtyMemberData.deletedRows.map(async member => {
          if (
            member.role === MemberRoleEnum.Vice ||
            member.role === MemberRoleEnum.Editor
          ) {
            return retireOrganizationManager(member.id, {
              endTerm: new Date(),
            });
          }
          return retireOrganizationMember(member.id, {
            endTerm: new Date(),
          });
        }),
      );

      // 3. 위원회 및 팀의 멤버/리더 추가 및 은퇴 처리
      await Promise.all(
        dirtyCommitteeMemberDataList.map(async committeeData => {
          const isOpCom = committeeData.id === 1; // 1 is Operating Committee (운영위원회)

          // 3a. 추가 처리 (apiOrg013 또는 apiOrg008/009)
          const createPromises = committeeData.dirtyData.createdRows.map(
            async member => {
              if (isOpCom) {
                // 운영위원회 멤버 임명 (apiOrg013)
                const requestBody: ApiOrg013RequestBody = {
                  operatingCommitteeMember: {
                    operatingCommittee: { id: committeeData.id },
                    student: {
                      id: getStudentDbId(member.studentId, member.name),
                    },
                    title:
                      member.role === CommitteeRoleEnum.Chief
                        ? "위원장"
                        : "위원",
                    legalBasis: "회정 제3조",
                    duration: {
                      startTerm: new Date(member.startDate),
                      endTerm: member.endDate ? new Date(member.endDate) : null,
                    },
                  },
                };
                return createOperatingCommitteeMember(requestBody);
              }
              if (member.role === CommitteeRoleEnum.Chief) {
                // 팀 리더 추가 (apiOrg009)
                const requestBody: ApiOrg009RequestBody = {
                  teamLeader: {
                    team: { id: committeeData.id },
                    student: {
                      id: getStudentDbId(member.studentId, member.name),
                    },
                    duration: {
                      startTerm: new Date(member.startDate),
                      endTerm: member.endDate ? new Date(member.endDate) : null,
                    },
                  },
                };
                return createTeamLeader(requestBody);
              }
              // 팀 멤버 추가 (apiOrg008)
              const requestBody: ApiOrg008RequestBody = {
                teamMember: {
                  team: { id: committeeData.id },
                  student: {
                    id: getStudentDbId(member.studentId, member.name),
                  },
                  duration: {
                    startTerm: new Date(member.startDate),
                    endTerm: member.endDate ? new Date(member.endDate) : null,
                  },
                },
              };
              return createTeamMember(requestBody);
            },
          );

          // 3b. 은퇴 처리 (apiOrg022 또는 apiOrg019/020)
          const retirePromises = committeeData.dirtyData.deletedRows.map(
            async member => {
              if (isOpCom) {
                // 운영위원회 멤버 은퇴 (apiOrg022)
                return retireOperatingCommitteeMember(member.id, {
                  endTerm: new Date(),
                });
              }
              if (member.role === CommitteeRoleEnum.Chief) {
                // 팀 리더 은퇴 (apiOrg020)
                return retireTeamLeader(member.id, {
                  endTerm: new Date(),
                });
              }
              // 팀 멤버 은퇴 (apiOrg019)
              return retireTeamMember(member.id, {
                endTerm: new Date(),
              });
            },
          );

          return Promise.all([...createPromises, ...retirePromises]);
        }),
      );

      alert("변경사항이 성공적으로 저장되었습니다.");
      window.location.reload();
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

  if (!currentOrganizationId) {
    return (
      <FlexWrapper direction="column" gap={40}>
        <FlexWrapper direction="column" gap={10}>
          <PageTitle>단체 관리</PageTitle>
          <BreadCrumb
            items={[{ name: "단체 관리", path: "/organization-manage" }]}
          />
        </FlexWrapper>
        <FlexWrapper direction="column" gap={16} padding="0 20px">
          <Typography fs={20} lh={24} color="BLACK" fw="BOLD">
            관리할 단체를 선택해주세요
          </Typography>
          <OrganizationSelectCard
            totalList={totalList}
            keyList={keyList}
            selectedKey={selectedKey}
            setSelectedKey={setSelectedKey}
            selectedValue={selectedValue}
            setSelectedValue={setSelectedValue}
            setSelectedId={setSelectedId}
          />
          <Button
            onClick={handleSelectOrganization}
            type={selectedId ? "default" : "disabled"}
            style={{ width: "120px", alignSelf: "flex-end" }}
          >
            선택 완료
          </Button>
        </FlexWrapper>
      </FlexWrapper>
    );
  }

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
        <FlexWrapper
          direction="row"
          gap={16}
          justify="space-between"
          style={{ alignItems: "center" }}
        >
          <Typography fs={24} lh={24} color="PRIMARY" fw="BOLD">
            {mockOrganizationName} 운영위원회
          </Typography>
          <div style={{ display: "flex", gap: "10px" }}>
            <Button
              id="btn-add-committee"
              onClick={handleCreateOperatingCommittee}
              style={{ padding: "6px 12px", fontSize: "14px" }}
            >
              위원회 생성
            </Button>
            <Button
              id="btn-delete-committee"
              onClick={() => handleDeleteOperatingCommittee(1)}
              style={{
                padding: "6px 12px",
                fontSize: "14px",
                background: "#f44336",
                color: "white",
              }}
            >
              위원회 삭제
            </Button>
          </div>
        </FlexWrapper>
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

      {/* 부서 및 TF 관리 (ManageCommitteeTable 연동) */}
      <FlexWrapper
        direction="column"
        gap={48}
        padding="0 20px"
        style={{
          borderTop: "1px solid #ddd",
          paddingTop: "30px",
          marginTop: "20px",
        }}
      >
        <ManageCommitteeTable
          name="부서 및 TF 관리"
          data={mockCommitteeListData}
        />
      </FlexWrapper>
      <ButtonWrapper>
        <Button
          id="btn-submit-changes"
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
