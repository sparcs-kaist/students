import styled from "styled-components";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { mockViewProjectReportResultData } from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockViewResultData";
import { overlay } from "overlay-kit";
import Modal from "@sparcs-students/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import ProjectTable from "@sparcs-students/web/features/document-lookup/project/components/ProjectTable";
import {
  mockOperationPlanData,
  mockViewerProjectData,
} from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectProposalData";
import OperationPlan from "@sparcs-students/web/features/document-lookup/project/components/OperationPlan";
import ReviewOperationPlan from "@sparcs-students/web/features/document-lookup/project/components/ReviewOperationPlan";
import Button from "@sparcs-students/web/common/components/Buttons/Button";

const ButtonWrapper = styled.div`
  gap: 30px;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

const ReviewerProjectProposalFrame = () => {
  const { id } = useParams();
  const [review, setReview] = useState<string>("");
  const handleSubmitAll = () => {
    console.log("리뷰하는 문서의 정보:", mockViewProjectReportResultData);
    console.log("제출된 리뷰:", review);
  };

  const handleResetAll = () => {
    setReview("");
  };

  const openSaveModal = () => {
    // TODO: add save logic
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <ConfirmModalContent
          onConfirm={() => {
            handleSubmitAll();
            close();
          }}
        >
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
          onConfirm={() => {
            handleResetAll();
            close();
          }}
          onClose={() => close()}
        >
          임시저장 내역을{"\n"}모두 삭제하시겠습니까?
        </CancellableModalContent>
      </Modal>
    ));
  };

  return (
    <FlexWrapper direction="column" gap={60} style={{ padding: "20 0px" }}>
      <ProjectTable
        pageId={parseInt(id as string)}
        data={mockViewerProjectData}
        isProposal
      />
      <OperationPlan {...mockOperationPlanData} />
      <ReviewOperationPlan review={review} reviewHandler={setReview} />
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
    </FlexWrapper>
  );
};

export default ReviewerProjectProposalFrame;
