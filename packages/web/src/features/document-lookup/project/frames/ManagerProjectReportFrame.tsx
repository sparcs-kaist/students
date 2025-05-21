import React from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import {
  mockGroupListData,
  mockOperationPlanData,
} from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectReportData";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import { overlay } from "overlay-kit";
import Modal from "@sparcs-students/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import styled from "styled-components";
import ManagerOperationPlan from "@sparcs-students/web/features/document-lookup/project/components/ManageOperationPlan";
import { useForm } from "react-hook-form";
import { ProjectReportTableRow } from "@sparcs-students/web/features/document-lookup/project/type/managerFormValues";
import { GroupProps } from "@sparcs-students/web/features/document-lookup/project/components/_atomic/GroupDetail";
import {
  mapReportDetailToReview,
  mockProjectReportDetailTotalReview,
  ProjectReportSingleContent,
} from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectReportTable";
import ManagerProjectReportTable from "@sparcs-students/web/features/document-lookup/project/components/ManagerProjectReportTable";

interface FrameProps {
  query: string;
  resultId: string;
}

export interface PRFormValues {
  reports: ProjectReportTableRow[];
  operatingCommittee: string[];
  executiveCommittee: string[];
}

const ButtonWrapper = styled.div`
  gap: 30px;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

const ManagerProjectReportFrame: React.FC<FrameProps> = ({
  query,
  resultId,
}) => {
  // const { id } = useParams();
  const [note, setNote] = React.useState<string>("");
  const [groupList, setGroupList] =
    React.useState<GroupProps[]>(mockGroupListData);

  const formMethods = useForm<PRFormValues>({
    defaultValues: {
      reports: mapReportDetailToReview(
        ProjectReportSingleContent,
        mockProjectReportDetailTotalReview,
      ),
      operatingCommittee: [],
      executiveCommittee: [],
    },
  });

  const reports = formMethods.watch("reports");

  const initialDataLength = mapReportDetailToReview(
    ProjectReportSingleContent,
    mockProjectReportDetailTotalReview,
  ).length;

  const handleSubmitAll = () => {
    console.log(reports); // 사업보고서 표
    console.log(note); // 비고
    console.log(groupList); // 국서/TF 활동 요약 표
  };

  const handleResetAll = () => {
    setNote("");
    formMethods.reset({
      reports: mapReportDetailToReview(
        ProjectReportSingleContent,
        mockProjectReportDetailTotalReview,
      ),
    });
    setGroupList(mockGroupListData);
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
      <ManagerProjectReportTable
        formMethods={formMethods}
        initialDataLength={initialDataLength}
        isProposal={false}
        query={query}
        resultId={resultId}
      />
      <ManagerOperationPlan
        {...mockOperationPlanData}
        note={note}
        handleNoteChange={setNote}
        groupList={groupList}
        setGroupList={setGroupList}
      />
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

export default ManagerProjectReportFrame;
