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
import {
  createOrganization,
  appointOrganizationPresident,
  retireOrganizationPresident,
} from "@sparcs-students/web/features/uapresident/api/organizationApi";
import { getOrganizationLookup } from "@sparcs-students/web/features/organization-register/api/organizationApi";
import { ApiOrg001ResponseOK } from "@sparcs-students/interface/api/organization/endpoint/apiOrg001";
import {
  OrganizationTypeEnum,
  OrganizationStateEnum,
  OrganizationPresidentTypeEnum,
} from "@sparcs-students/interface/common/enum/organization.enum";

const OrganizationManage = () => {
  const [data, setData] = useState<ApiOrg001ResponseOK | null>(null);

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
    overlay.open(({ isOpen, close }) => {
      let name = "";
      let nameEng = "";
      return (
        <Modal isOpen={isOpen} width="400px">
          <CancellableModalContent
            onConfirm={async () => {
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
                fetchData();
              } catch (e) {
                console.error(e);
                alert("단체 생성 실패");
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
                handleChange={v => {
                  name = v;
                }}
                placeholder="단체명 (한글)"
              />
              <TableTextInput
                value={nameEng}
                handleChange={v => {
                  nameEng = v;
                }}
                placeholder="단체명 (영문)"
              />
            </FlexWrapper>
          </CancellableModalContent>
        </Modal>
      );
    });
  };

  const handleAppointPresident = (orgId: number) => {
    overlay.open(({ isOpen, close }) => {
      let studentId = "";
      let title = "";
      let phoneNumber = "";
      return (
        <Modal isOpen={isOpen} width="400px">
          <CancellableModalContent
            onConfirm={async () => {
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
                fetchData();
              } catch (e) {
                console.error(e);
                alert("단체장 임명 실패");
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
                handleChange={v => {
                  studentId = v;
                }}
                placeholder="학번 입력"
              />
              <TableTextInput
                value={title}
                handleChange={v => {
                  title = v;
                }}
                placeholder="직책 (예: 회장)"
              />
              <TableTextInput
                value={phoneNumber}
                handleChange={v => {
                  phoneNumber = v;
                }}
                placeholder="전화번호 (010-0000-0000)"
              />
            </FlexWrapper>
          </CancellableModalContent>
        </Modal>
      );
    });
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
              onAddOrganization={handleCreateOrganization}
            />
          );
        })}
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default OrganizationManage;
