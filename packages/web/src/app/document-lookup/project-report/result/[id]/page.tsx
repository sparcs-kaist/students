"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import ViewResult from "@sparcs-students/web/features/documents/components/ViewResult";
import {
  mockViewProjectResultData,
  mockViewResultData,
} from "@sparcs-students/web/features/budget/services/_mock/mockProposalTableData";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import { DocumentType } from "@sparcs-students/web/common/components/SelectCard/DocumentTypeSelectCard";
import { mockData } from "@sparcs-students/web/features/documents/components/ThreeInput/mock";
import ThreeInput, {
  ThreeInputItem,
} from "@sparcs-students/web/features/documents/components/ThreeInput";
import {
  mockOperationPlanData,
  mockProjectProposalData,
  mockViewerProjectData,
} from "@sparcs-students/web/features/project/services/_mock/mockProjectProposalData";
import OperationPlan from "@sparcs-students/web/features/project/components/OperationPlan";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import ViewerProjectTable from "@sparcs-students/web/features/project/components/ViewerProjectTable";
import { UserPermission } from "@sparcs-students/web/features/documents/constants/userPermission";
import styled from "styled-components";
import Modal from "@sparcs-students/web/common/components/Modal";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import { overlay } from "overlay-kit";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import ReviewOperationPlan from "@sparcs-students/web/features/project/components/ReviewOperationPlan";
import ReviewerProjectTable from "@sparcs-students/web/features/project/components/ReviewerProjectTable";
import getMockUserPermission from "@sparcs-students/web/features/documents/services/getMockUserPermission";

const ButtonWrapper = styled.div`
  gap: 30px;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

const Proposal = () => {
  const { id } = useParams();
  const items: ThreeInputItem[] = mockData;
  const [date, setDate] = useState(mockViewResultData.submitDate);
  const [year, setYear] = useState<number>(items[0].year);
  const [isSpring, setIsSpring] = useState<boolean>(items[0].value.isSpring);
  const [type, setType] = useState<DocumentType>(DocumentType.ProjectReport);
  const [selectedKey, setSelectedKey] = useState<string>(""); // TODO: enum으로 변경
  const [selectedValue, setSelectedValue] = useState<string>(""); // TODO: enum으로 변경
  const userPermission = getMockUserPermission(); // TODO: api 연결
  const [review, setReview] = useState<string>("");

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

  return (
    <FlexWrapper direction="column" gap={48}>
      <FlexWrapper direction="column" gap={10}>
        <PageTitle>예결산 조회</PageTitle>
        <BreadCrumb
          items={[
            { name: "예결산 조회", path: "/document-lookup" },
            { name: "사업보고서", path: "/project-report" },
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
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={8}>
            <Button buttonText="조회" style={{ marginLeft: "auto" }} />
          </FlexWrapper>
        </FlexWrapper>
        <ViewResult
          {...mockViewProjectResultData}
          submitDate={date}
          handleDateChange={setDate}
        />
        {userPermission === UserPermission.Viewer && (
          <ViewerProjectTable
            pageId={id}
            data={mockViewerProjectData}
            isProposal={false}
          />
        )}
        {userPermission === UserPermission.Reviewer && (
          <ReviewerProjectTable
            pageId={id}
            initialData={mockProjectProposalData}
            isProposal={false}
          />
        )}
        <OperationPlan {...mockOperationPlanData} isProposal={false} />
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
