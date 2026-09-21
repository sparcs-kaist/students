"use client";

import React, { useEffect, useState } from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import ManageOrganizationTable, {
  OrganizationProps,
} from "@sparcs-students/web/features/organization-manage/components/ManageOrganizationTable";
import { overlay } from "overlay-kit";
import Modal from "@sparcs-students/web/common/components/Modal";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import TableTextInput from "@sparcs-students/web/common/components/Forms/TableTextInput";
import Typography from "@sparcs-students/web/common/components/Typography";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import {
  createOrganization,
  appointOrganizationPresident,
  retireOrganizationPresident,
  deleteOrganization,
  createStaff,
  retireStaff,
} from "@sparcs-students/web/features/uapresident/api/organizationApi";
import { getOrganizationLookup } from "@sparcs-students/web/features/organization-register/api/organizationApi";
import { ApiOrg001ResponseOK } from "@sparcs-students/interface/api/organization/endpoint/apiOrg001";
import {
  OrganizationTypeEnum,
  OrganizationStateEnum,
  OrganizationPresidentTypeEnum,
} from "@sparcs-students/interface/common/enum/organization.enum";

// Stateful modals defined outside the component to avoid unstable nested component warning
const CreateOrganizationModal = ({
  isOpen,
  close,
  onConfirmSuccess,
}: {
  isOpen: boolean;
  close: () => void;
  onConfirmSuccess: () => void;
}) => {
  const [name, setName] = useState("");
  const [nameEng, setNameEng] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <Modal isOpen={isOpen} width="400px">
      <CancellableModalContent
        onConfirm={async () => {
          if (isSubmitting) return;
          setIsSubmitting(true);
          try {
            await createOrganization({
              organization: {
                name,
                nameEng,
                organizationTypeEnum: OrganizationTypeEnum.StudentCouncil,
                startTerm: new Date(),
                endTerm: null,
                foundingYear: new Date().getFullYear(),
                organizationStateEnum: OrganizationStateEnum.Regular,
              },
            });
            close();
            onConfirmSuccess();
          } catch (e) {
            console.error(e);
            alert("단체 생성 실패");
          } finally {
            setIsSubmitting(false);
          }
        }}
        onClose={close}
      >
        <FlexWrapper direction="column" gap={16}>
          <Typography fs={20} lh={24} fw="BOLD" color="BLACK">
            단체 생성
          </Typography>
          <TableTextInput
            value={name}
            handleChange={setName}
            placeholder="단체명 (한글)"
          />
          <TableTextInput
            value={nameEng}
            handleChange={setNameEng}
            placeholder="단체명 (영문)"
          />
        </FlexWrapper>
      </CancellableModalContent>
    </Modal>
  );
};

const AppointPresidentModal = ({
  isOpen,
  close,
  orgId,
  onConfirmSuccess,
}: {
  isOpen: boolean;
  close: () => void;
  orgId: number;
  onConfirmSuccess: () => void;
}) => {
  const [studentId, setStudentId] = useState("");
  const [title, setTitle] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <Modal isOpen={isOpen} width="400px">
      <CancellableModalContent
        onConfirm={async () => {
          if (isSubmitting) return;
          setIsSubmitting(true);
          try {
            await appointOrganizationPresident({
              OrganizationPresident: {
                organization: { id: orgId },
                student: { id: parseInt(studentId) },
                organizationPresidentTypeEnum:
                  OrganizationPresidentTypeEnum.Chief,
                title,
                phoneNumber,
                duration: {
                  startTerm: new Date(),
                  endTerm: null,
                },
              },
              ignorePrev: false,
            });
            close();
            onConfirmSuccess();
          } catch (e) {
            console.error(e);
            alert("단체장 임명 실패");
          } finally {
            setIsSubmitting(false);
          }
        }}
        onClose={close}
      >
        <FlexWrapper direction="column" gap={16}>
          <Typography fs={20} lh={24} fw="BOLD" color="BLACK">
            단체장 임명
          </Typography>
          <TableTextInput
            value={studentId}
            handleChange={setStudentId}
            placeholder="학번 입력"
          />
          <TableTextInput
            value={title}
            handleChange={setTitle}
            placeholder="직책 (예: 회장)"
          />
          <TableTextInput
            value={phoneNumber}
            handleChange={setPhoneNumber}
            placeholder="전화번호 (010-0000-0000)"
          />
        </FlexWrapper>
      </CancellableModalContent>
    </Modal>
  );
};

const AppointStaffModal = ({
  isOpen,
  close,
  onConfirmSuccess,
}: {
  isOpen: boolean;
  close: () => void;
  onConfirmSuccess: (studentId: number) => void;
}) => {
  const [studentIdStr, setStudentIdStr] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <Modal isOpen={isOpen} width="400px">
      <CancellableModalContent
        onConfirm={async () => {
          if (isSubmitting) return;
          setIsSubmitting(true);
          try {
            const studentId = parseInt(studentIdStr);
            await createStaff({
              staff: {
                student: { id: studentId },
                duration: {
                  startTerm: new Date(),
                  endTerm: null,
                },
              },
            });
            onConfirmSuccess(studentId);
            close();
          } catch (e) {
            console.error(e);
            alert("집행부원 임명 실패");
          } finally {
            setIsSubmitting(false);
          }
        }}
        onClose={close}
      >
        <FlexWrapper direction="column" gap={16}>
          <Typography fs={20} lh={24} fw="BOLD" color="BLACK">
            집행부원 임명
          </Typography>
          <TableTextInput
            value={studentIdStr}
            handleChange={setStudentIdStr}
            placeholder="학생 ID (예: 2)"
          />
        </FlexWrapper>
      </CancellableModalContent>
    </Modal>
  );
};

const OrganizationManage = () => {
  const [data, setData] = useState<ApiOrg001ResponseOK | null>(null);
  const [staffList, setStaffList] = useState<
    Array<{
      id: number;
      studentId: number;
      startTerm: string;
      endTerm: string | null;
    }>
  >([{ id: 1, studentId: 2, startTerm: "2026-01-01", endTerm: null }]);

  const fetchData = async () => {
    try {
      const result = await getOrganizationLookup();
      setData(result);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateOrganization = () => {
    overlay.open(({ isOpen, close }) => (
      <CreateOrganizationModal
        isOpen={isOpen}
        close={close}
        onConfirmSuccess={fetchData}
      />
    ));
  };

  const handleAppointPresident = (orgId: number) => {
    overlay.open(({ isOpen, close }) => (
      <AppointPresidentModal
        isOpen={isOpen}
        close={close}
        orgId={orgId}
        onConfirmSuccess={fetchData}
      />
    ));
  };

  const handleRetirePresident = (presidentId: number) => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <CancellableModalContent
          onConfirm={async () => {
            try {
              await retireOrganizationPresident(presidentId, {
                endTerm: new Date(),
              });
              close();
              fetchData();
            } catch (e) {
              console.error(e);
              alert("임기 종료 실패");
            }
          }}
          onClose={close}
        >
          <Typography fs={16} lh={20} color="BLACK">
            정말 임기를 종료하시겠습니까?
          </Typography>
        </CancellableModalContent>
      </Modal>
    ));
  };

  const handleDeleteOrganization = (orgId: number) => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <CancellableModalContent
          onConfirm={async () => {
            try {
              await deleteOrganization(orgId);
              close();
              fetchData();
            } catch (e) {
              console.error(e);
              alert("기구 삭제 실패");
            }
          }}
          onClose={close}
        >
          <Typography fs={16} lh={20} color="BLACK">
            정말 기구를 삭제하시겠습니까?
          </Typography>
        </CancellableModalContent>
      </Modal>
    ));
  };

  const handleCreateStaff = () => {
    overlay.open(({ isOpen, close }) => (
      <AppointStaffModal
        isOpen={isOpen}
        close={close}
        onConfirmSuccess={studentId => {
          setStaffList(prev => [
            ...prev,
            {
              id: prev.length + 1,
              studentId,
              startTerm: new Date().toISOString().split("T")[0],
              endTerm: null,
            },
          ]);
        }}
      />
    ));
  };

  const handleRetireStaff = (staffId: number) => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <CancellableModalContent
          onConfirm={async () => {
            try {
              await retireStaff(staffId, {
                endTerm: new Date(),
              });
              setStaffList(prev =>
                prev.map(s =>
                  s.id === staffId
                    ? { ...s, endTerm: new Date().toISOString().split("T")[0] }
                    : s,
                ),
              );
              close();
            } catch (e) {
              console.error(e);
              alert("집행부원 은퇴 처리 실패");
            }
          }}
          onClose={close}
        >
          <Typography fs={16} lh={20} color="BLACK">
            정말 집행부원의 임기를 종료하시겠습니까?
          </Typography>
        </CancellableModalContent>
      </Modal>
    ));
  };

  const transformData = (
    type: OrganizationTypeEnum,
  ): { title: string; data: OrganizationProps[] } => {
    if (!data) return { title: "", data: [] };

    const semesterData = data.organizationLists[0];
    if (!semesterData) return { title: "", data: [] };

    const typeData = semesterData.organizationTypes.find(
      t => t.organizationTypeEnum === type,
    );
    if (!typeData) return { title: "", data: [] };

    return {
      title: type.toString(),
      data: typeData.organizations.map(org => ({
        id: org.id,
        name: org.name,
        memberCount: 0, // API does not provide member count yet
        repStudentId: "", // API does not provide rep info yet
        repName: "", // API does not provide rep info yet
      })),
    };
  };

  const tableConfigs = [
    {
      type: OrganizationTypeEnum.StudentCouncil,
      title: "자치기구 및 학과 학생회",
    },
    { type: OrganizationTypeEnum.Standing, title: "상설기구" },
    { type: OrganizationTypeEnum.Specialized, title: "전문기구" },
    { type: OrganizationTypeEnum.Special, title: "특별기구" },
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
        {tableConfigs.map(config => {
          const { data: tableData } = transformData(config.type);
          return (
            <ManageOrganizationTable
              key={config.type}
              title={config.title}
              data={tableData}
              onAppointPresident={handleAppointPresident}
              onRetirePresident={handleRetirePresident}
              onDeleteOrganization={handleDeleteOrganization}
              onAddOrganization={handleCreateOrganization}
            />
          );
        })}
      </FlexWrapper>

      {/* 집행부원(Staff) 관리 섹션 */}
      <FlexWrapper
        direction="column"
        gap={16}
        padding="0 20px"
        style={{
          borderTop: "1px solid #ddd",
          paddingTop: "30px",
          marginTop: "20px",
        }}
      >
        <FlexWrapper
          direction="row"
          gap={16}
          justify="space-between"
          style={{ alignItems: "center" }}
        >
          <Typography fs={20} lh={20} color="BLACK" fw="BOLD">
            집행부원(Staff) 관리
          </Typography>
          <Button
            id="btn-add-staff"
            onClick={handleCreateStaff}
            style={{ width: "120px", padding: "8px", fontSize: "14px" }}
          >
            집행부원 임명
          </Button>
        </FlexWrapper>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "4px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f5f5f5",
                height: "40px",
                borderBottom: "1px solid #ddd",
                textAlign: "left",
              }}
            >
              <th style={{ padding: "8px" }}>ID</th>
              <th style={{ padding: "8px" }}>학생 ID</th>
              <th style={{ padding: "8px" }}>임기 시작일</th>
              <th style={{ padding: "8px" }}>임기 종료일</th>
              <th style={{ padding: "8px" }}>은퇴 처리</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map(staff => (
              <tr
                key={staff.id}
                style={{ height: "48px", borderBottom: "1px solid #ddd" }}
              >
                <td style={{ padding: "8px" }}>{staff.id}</td>
                <td style={{ padding: "8px" }}>{staff.studentId}</td>
                <td style={{ padding: "8px" }}>{staff.startTerm}</td>
                <td style={{ padding: "8px" }}>{staff.endTerm || "진행 중"}</td>
                <td style={{ padding: "8px" }}>
                  {!staff.endTerm && (
                    <Button
                      id={`btn-retire-staff-${staff.id}`}
                      onClick={() => handleRetireStaff(staff.id)}
                      style={{
                        padding: "4px 8px",
                        fontSize: "12px",
                        background: "#f44336",
                        color: "white",
                      }}
                    >
                      은퇴
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default OrganizationManage;
