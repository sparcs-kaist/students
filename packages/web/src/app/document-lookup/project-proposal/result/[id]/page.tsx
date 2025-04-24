"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import ViewResult from "@sparcs-students/web/features/document-lookup/components/ViewResult";
import { mockViewProjectProposalResultData } from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockViewResultData";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import { DocumentType } from "@sparcs-students/web/common/components/SelectCard/DocumentTypeSelectCard";
import { mockData } from "@sparcs-students/web/features/document-lookup/components/ThreeInput/mock";
import {
  mockOperationPlanData,
  mockViewerProjectData,
} from "@sparcs-students/web/features/project/services/_mock/mockProjectProposalData";
import OperationPlan from "@sparcs-students/web/features/project/components/OperationPlan";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import { overlay } from "overlay-kit";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import styled from "styled-components";
import Modal from "@sparcs-students/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import ReviewOperationPlan from "@sparcs-students/web/features/project/components/ReviewOperationPlan";
import { UserPermission } from "@sparcs-students/web/constants/userPermission";
import getMockUserPermission from "@sparcs-students/web/features/document-lookup/project/services/getMockUserPermission";
import ThreeInput, {
  ThreeInputItem,
} from "@sparcs-students/web/features/document-lookup/components/ThreeInput";
import ProjectTable from "@sparcs-students/web/features/project/components/ProjectTable";

const ButtonWrapper = styled.div`
  gap: 30px;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;
const Proposal = () => {
  const items: ThreeInputItem[] = mockData;
  const searchParams = useSearchParams();
  const queryYear = parseInt(searchParams.get("year") || "") || items[0].year;
  const queryIsSpring = searchParams.get("isSpring") === "true";
  const queryType = searchParams.get("type") as DocumentType | null;
  const queryKey = searchParams.get("key");
  const queryValue = searchParams.get("value");
  const queryId = parseInt(searchParams.get("id") || "");

  const [date, setDate] = useState(
    mockViewProjectProposalResultData.submitDate,
  );
  const [year, setYear] = useState<number>(queryYear);
  const [isSpring, setIsSpring] = useState<boolean | null>(queryIsSpring);
  const [type, setType] = useState<DocumentType | null>(queryType);
  const [selectedKey, setSelectedKey] = useState<string | null>(queryKey); // TODO: enum으로 변경
  const [selectedValue, setSelectedValue] = useState<string | null>(queryValue); // TODO: enum으로 변경
  const [selectedId, setSelectedId] = useState<number>(queryId);
  const userPermission = getMockUserPermission(); // TODO: api 연결
  const [review, setReview] = useState<string>("");

  const router = useRouter();

  const openSaveModal = () => {
    // TODO: add save logic
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <ConfirmModalContent onConfirm={() => close()}>
          저장되었습니다.
        </ConfirmModalContent>
      </Modal>
    ));
  };

  const openDiscardModal = () => {
    // TODO: add discard logic
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <CancellableModalContent
          onConfirm={() => close()}
          onClose={() => close()}
        >
          임시저장 내역을{"\n"}모두 삭제하시겠습니까?
        </CancellableModalContent>
      </Modal>
    ));
  };

  const lookUp = (pageId: number) => {
    const query = new URLSearchParams({
      year: String(year),
      isSpring: String(isSpring),
      type: String(type),
      key: selectedKey ?? "",
      value: selectedValue ?? "",
      id: String(pageId),
    }).toString();

    switch (type) {
      case "사업 계획서":
        router.push(
          `/document-lookup/project-proposal/result/${pageId}?${query}`,
        );
        break;
      case "사업 보고서":
        router.push(
          `/document-lookup/project-report/result/${pageId}?${query}`,
        );
        break;
      case "예산안":
        router.push(
          `/document-lookup/budget-proposal/result/${pageId}?${query}`,
        );
        break;
      case "결산안":
        router.push(`/document-lookup/budget-report/result/${pageId}?${query}`);
        break;
      default:
        throw new Error(`잘못된 문서 유형: ${type}`);
    }
  };

  return (
    <FlexWrapper direction="column" gap={48}>
      <FlexWrapper direction="column" gap={10}>
        <PageTitle>예결산 조회</PageTitle>
        <BreadCrumb
          items={[
            { name: "예결산 조회", path: "/document-lookup" },
            { name: "사업계획서", path: "/project-proposal" },
          ]}
        />
      </FlexWrapper>
      <FlexWrapper direction="column" gap={60} style={{ padding: "20 0px" }}>
        <FlexWrapper direction="column" gap={32}>
          <FlexWrapper direction="column" gap={16}>
            <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
              조회 가이드
            </Typography>
            <ThreeInput
              itemList={items}
              year={year}
              setYear={setYear}
              isSpring={isSpring}
              setIsSpring={setIsSpring}
              type={type}
              setType={setType}
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              setSelectedId={setSelectedId}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={8}>
            <Button
              buttonText="조회"
              style={{ marginLeft: "auto" }}
              onClick={() => lookUp(selectedId as number)}
            />
          </FlexWrapper>
        </FlexWrapper>
        <ViewResult
          {...mockViewProjectProposalResultData}
          submitDate={date}
          handleDateChange={setDate}
        />
        {(userPermission === UserPermission.Viewer ||
          userPermission === UserPermission.Reviewer) && (
          <ProjectTable
            pageId={selectedId}
            data={mockViewerProjectData}
            isProposal
          />
        )}
        {userPermission === UserPermission.Manager && (
          <ProjectTable
            pageId={selectedId}
            data={mockViewerProjectData}
            isProposal
          />
        )}
        <OperationPlan {...mockOperationPlanData} />
        <ReviewOperationPlan review={review} reviewHandler={setReview} />

        {userPermission === UserPermission.Reviewer && (
          <ButtonWrapper>
            <Button
              type="reverse"
              onClick={openDiscardModal}
              style={{ width: "100px", padding: "8px 16px" }}
            >
              삭제
            </Button>
            <Button
              onClick={openSaveModal}
              style={{ width: "100px", padding: "8px 16px" }}
            >
              제출
            </Button>
          </ButtonWrapper>
        )}
      </FlexWrapper>
    </FlexWrapper>
  );
};
export default Proposal;
