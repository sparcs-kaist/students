"use client";

import OrganizationSelectCard from "@sparcs-students/web/common/components/SelectCard/OrganizationSelectCard";
import {
  mockOrganizationData,
  mockOrganizationDescriptionData,
} from "@sparcs-students/web/features/organization-register/services/_mock/mockOrganizationData";
import React, { useMemo, useState } from "react";
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

const CenterWrapper = styled(FlexWrapper)`
  justify-content: center;
`;

const ApplyButton = styled(Button)`
  width: 100px;
  padding: 8 16px;
`;

const OrganizationRegister = () => {
  const totalList = mockOrganizationData.organizations;
  const router = useRouter();
  const keyList = useMemo(() => totalList.map(e => e.key), [totalList]);

  const searchParams = useSearchParams();
  const [selectedKey, setSelectedKey] = useState<string | null>(
    searchParams.get("key"),
  );
  const [selectedValue, setSelectedValue] = useState<string | null>(
    searchParams.get("value"),
  );
  const idParam = searchParams.get("id");
  const [selectedId, setSelectedId] = useState<number | null>(
    idParam != null ? parseInt(idParam) : null,
  );
  const [isApplied, setIsApplied] = useState(false);
  const [orgData, setOrgData] = useState<DescriptionProps | null>(null);

  const openApplyModal = () => {
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
  };

  const lookUp = (id: number) => {
    const query = new URLSearchParams({
      key: selectedKey ?? "",
      value: selectedValue ?? "",
      id: selectedId?.toString() ?? "",
    }).toString();

    // TODO: connect with backend
    const tmpData = mockOrganizationDescriptionData.data.find(
      item => item.id === id,
    );
    if (tmpData) {
      setOrgData(
        (({ label, head, people, description }) => ({
          label,
          head,
          people,
          description,
        }))(tmpData),
      );
    } else {
      setOrgData(null);
    }

    router.push(`/organization-register?${query.toString()}`);
  };

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
          selectedKey={selectedKey ?? ""}
          setSelectedKey={setSelectedKey}
          selectedValue={selectedValue ?? ""}
          setSelectedValue={setSelectedValue}
          setSelectedId={setSelectedId}
        />
        <FlexWrapper direction="row" gap={8}>
          <Button
            buttonText="조회"
            style={{ marginLeft: "auto", width: "80px" }}
            onClick={() => lookUp(selectedId as number)}
          />
        </FlexWrapper>
        {orgData !== null && <OrganizationDescription {...orgData} />}
        {orgData !== null && (
          <CenterWrapper direction="row" gap={8}>
            {!isApplied ? (
              <ApplyButton buttonText="신청" onClick={openApplyModal} />
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
