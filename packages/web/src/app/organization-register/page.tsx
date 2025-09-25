"use client";

// students/packages/web/src/app/organization-register/page.tsx

import OrganizationSelectCard from "@sparcs-students/web/common/components/SelectCard/OrganizationSelectCard";
import React, { useEffect, useMemo, useState } from "react";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import { useRouter, useSearchParams } from "next/navigation";
import OrganizationDescription, {
  DescriptionProps,
} from "@sparcs-students/web/features/organization-register/components/OrganizationDescription";
import { overlay } from "overlay-kit";
import Modal from "@sparcs-students/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import styled from "styled-components";
import { getOrganizationLookup } from "@sparcs-students/web/lib/api/organizationApi";
import apiOrg011, {
  ApiOrg011RequestBody,
} from "@sparcs-students/interface/api/organization/endpoint/apiOrg011";
import { axiosClientWithAuth } from "@sparcs-students/web/lib/axios";
import { SelectItem } from "@sparcs-students/web/common/components/Selects/Select";

const CenterWrapper = styled(FlexWrapper)`
  justify-content: center;
`;

const ApplyButton = styled(Button)`
  width: 100px;
  padding: 8 16px;
`;

interface Organization {
  id: number;
  name: string;
  nameEng: string;
  organizationTypeEnum: unknown;
  foundingYear: number;
  startTerm: Date;
  endTerm: Date | null;
  organizationStateEnum: unknown;
}

interface OrganizationResponseData {
  organizationLists: Array<{
    semester: {
      id: number;
      name: string;
      year: number;
      semesterEnum: unknown;
      startTerm: Date;
      endTerm: Date;
    };
    organizationTypes: Array<{
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      organizationTypeEnum: any;
      organizations: Organization[];
    }>;
  }>;
}

interface OrganizationItem {
  key: SelectItem<string>;
  values: SelectItem<string>[];
}

const OrganizationRegister = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [organizationData, setOrganizationData] =
    useState<OrganizationResponseData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedKey, setSelectedKey] = useState<string>(
    searchParams.get("key") || "",
  );
  const [selectedValue, setSelectedValue] = useState<string>(
    searchParams.get("value") || "",
  );
  const idParam = searchParams.get("id");
  const [selectedId, setSelectedId] = useState<number | null>(
    idParam != null ? parseInt(idParam) : null,
  );
  const [isApplied, setIsApplied] = useState(false);
  const [orgData, setOrgData] = useState<DescriptionProps | null>(null);

  // API 001로 단체 목록 조회
  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        setIsLoading(true);
        const data = await getOrganizationLookup();
        setOrganizationData(data);
      } catch (error) {
        console.error("Failed to fetch organizations:", error);
        alert("단체 목록을 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  const totalList = useMemo((): OrganizationItem[] => {
    if (!organizationData?.organizationLists) return [];

    // Group organizations by type
    const groupedByType = new Map<string, Organization[]>();

    organizationData.organizationLists.forEach(semesterData => {
      semesterData.organizationTypes.forEach(typeData => {
        const existing = groupedByType.get(typeData.organizationTypeEnum) || [];
        groupedByType.set(typeData.organizationTypeEnum, [
          ...existing,
          ...typeData.organizations,
        ]);
      });
    });

    // Convert to OrganizationItem format
    const result: OrganizationItem[] = [];
    groupedByType.forEach((organizations, typeEnum) => {
      result.push({
        key: {
          value: typeEnum,
          label: typeEnum,
        },
        values: organizations.map(org => ({
          value: org.name,
          label: org.name,
          id: org.id,
        })),
      });
    });

    return result;
  }, [organizationData]);

  const keyList = useMemo(
    (): SelectItem<string>[] => totalList.map(item => item.key),
    [totalList],
  );

  const handleApply = async () => {
    if (!selectedId) {
      alert("단체를 선택해주세요.");
      return;
    }

    try {
      const requestBody: ApiOrg011RequestBody = {
        OrganizationMember: {
          organization: { id: selectedId },
        },
      };

      await axiosClientWithAuth.post(apiOrg011.url(), requestBody);

      overlay.open(({ isOpen, close }) => (
        <Modal isOpen={isOpen} width="400px">
          <ConfirmModalContent
            onConfirm={() => {
              setIsApplied(true);
              close();
            }}
          >
            신청 완료되었습니다.
          </ConfirmModalContent>
        </Modal>
      ));
    } catch (error) {
      console.error("Failed to apply:", error);
      alert("신청 중 오류가 발생했습니다.");
    }
  };

  const lookUp = (id: number | null) => {
    if (id === null) return;

    const query = new URLSearchParams({
      key: selectedKey,
      value: selectedValue,
      id: id.toString(),
    }).toString();

    let selectedOrgName = "";
    // eslint-disable-next-line no-restricted-syntax
    for (const item of totalList) {
      if (item.key.value === selectedKey) {
        const foundValue = item.values.find(
          val => val.id === id && val.value === selectedValue,
        );
        if (foundValue) {
          selectedOrgName = foundValue.value;
        }
        break;
      }
    }

    if (selectedOrgName) {
      setOrgData({
        label: selectedOrgName,
        head: "단체장 정보", // TODO: Get actual data from API
        people: 999999, // TODO: Get actual data from API
        description: "단체 설명", // TODO: Get actual data from API
      });
    } else {
      setOrgData(null);
    }

    router.push(`/organization-register?${query}`);
  };

  if (isLoading) {
    return <div>로딩 중...</div>;
  }

  return (
    <FlexWrapper direction="column" gap={48}>
      <FlexWrapper direction="column" gap={10}>
        <PageTitle>단체 신규 가입</PageTitle>
        <BreadCrumb
          items={[{ name: "단체 신규 가입", path: "/organization-register" }]}
        />
      </FlexWrapper>
      <FlexWrapper direction="column" gap={16}>
        <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
          조회 가이드
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
        <FlexWrapper direction="row" gap={8}>
          <Button
            buttonText="조회"
            style={{ marginLeft: "auto", width: "80px" }}
            onClick={() => lookUp(selectedId)}
            type={!selectedId ? "disabled" : "default"}
          />
        </FlexWrapper>
        {orgData !== null && <OrganizationDescription {...orgData} />}
        {orgData !== null && (
          <CenterWrapper direction="row" gap={8}>
            {!isApplied ? (
              <ApplyButton buttonText="신청" onClick={handleApply} />
            ) : (
              <ApplyButton buttonText="신청 완료" type="disabled" />
            )}
          </CenterWrapper>
        )}
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default OrganizationRegister;
