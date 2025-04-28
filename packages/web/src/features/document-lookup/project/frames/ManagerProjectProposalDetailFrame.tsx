"use client";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Index from "@sparcs-students/web/common/components/Index";
import Typography from "@sparcs-students/web/common/components/Typography";
import TextAreaWithHeader from "@sparcs-students/web/features/report/components/TextAreaWithHeader";
import {
  ProjectProposalSingleContent,
  ProjectProposalTimelines,
} from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectProposalTable"; // TODO: API 호출로 받아오는 데이터
import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import styled from "styled-components";
import {
  ProjectProposalContent,
  FormValues,
} from "@sparcs-students/web/features/document-lookup/project/type/managerFormValues";
import { formatDotDate } from "@sparcs-students/web/utils/Date/formatDate";
import {
  mockDBExpenditureData,
  mockManagerProjectNameCandidateList,
} from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockManagerFormData";
// import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum";
// import ReviewerExpenditureTable from "@sparcs-students/web/features/document-lookup/budget/components/ReviewerExpenditureTable";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import { overlay } from "overlay-kit";
import Modal from "@sparcs-students/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import TextAreaInput from "@sparcs-students/web/common/components/Forms/TextAreaInput";
import { Controller, FormProvider, useForm } from "react-hook-form";
import ManagerExpenditureTable from "@sparcs-students/web/features/document-lookup/budget/components/ManagerExpenditureTable";
import TextInput from "@sparcs-students/web/common/components/Forms/TextInput";
// import TimeLineDateInput from "@sparcs-students/web/features/project/components/_atomic/TimelineDateInput";
import ProjectTimelineTable from "@sparcs-students/web/features/project/components/ProjectTimelineTable";

const headerHeight = 70;

const ScrollAbleArea = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0px 20px;
  gap: 60px;
  justify-content: space-between;
  overflow: visible;
`;
const ContentsArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 100px;
  width: 100%;
  overflow-x: scroll;
`;

const ButtonWrapper = styled.div`
  gap: 30px;
  flex-direction: row;
  display: flex;
  justify-content: center;
`;

const ManagerProjectProposalDetailFrame: React.FC = () => {
  const documentTitle = useRef<HTMLDivElement>(null);
  const documentPeriod = useRef<HTMLDivElement>(null);
  const manager = useRef<HTMLDivElement>(null);
  const documentPurpose = useRef<HTMLDivElement>(null);
  const documentTarget = useRef<HTMLDivElement>(null);
  const documentDetail = useRef<HTMLDivElement>(null);
  const documentTimeline = useRef<HTMLDivElement>(null);
  const documentExpenditure = useRef<HTMLDivElement>(null);

  const { detailId } = useParams(); // resultId 언젠간 쓸 것.
  const formMethods = useForm<FormValues>({
    defaultValues: {
      proposalDetail:
        ProjectProposalSingleContent[parseInt(detailId as string)], // CHACHA: 현재 페이지의 detailId와 같은 index, 실제로는 DB에서 온 값
      expenditures: mockDBExpenditureData, // CHACHA: 현재 페이지의 사업명과 동일한 예산안 지출 row만 가져와야 함.
    },
  });

  const proposal = ProjectProposalSingleContent.find(
    item => item.contentId === Number(detailId),
  ) as ProjectProposalContent;

  const timelines = ProjectProposalTimelines.filter(t =>
    proposal?.timelineIds.includes(t.id),
  );

  const indexContents = [
    { name: "사업명, 사업개요", reference: documentTitle },
    { name: "사업 준비기간, 사업일시", reference: documentPeriod },
    { name: "담당부서 / 담당자", reference: manager },
    { name: "사업 추진 목적", reference: documentPurpose },
    { name: "사업 추진 대상자", reference: documentTarget },
    { name: "사업 세부 내용", reference: documentDetail },
    { name: "사업 진행 타임라인", reference: documentTimeline },
    { name: "사업 예산안", reference: documentExpenditure },
  ];

  const [resetKey, setResetKey] = useState(0); // 실시간 edit 렌더링 시 필요!

  const handleSubmitAll = () => {
    // CHACHA: 백에 넘어가야 할 데이터들
  };

  const handleResetAll = () => {
    setResetKey(prev => prev + 1); // CHACHA: re-render
    console.log(resetKey); // 커밋을 위한 임시
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
    <ScrollAbleArea>
      <ContentsArea>
        <FormProvider {...formMethods}>
          <FlexWrapper direction="row" gap={60} ref={documentTitle}>
            <Controller
              name="projectDetail.title"
              render={({ field }) => (
                // CHACHA: need header
                <TextInput placeholder="내용을 입력하세요." {...field} />
              )}
            />
            <Controller
              name="projectDetail.brief"
              render={({ field }) => (
                // CHACHA: need header
                <TextInput placeholder="내용을 입력하세요." {...field} />
              )}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={documentPeriod}>
            <Controller
              name="projectDetail.preparationPeriod"
              render={({ field }) => (
                <TextAreaWithHeader // CHACHA: impl component
                  header="사업 준비 기간"
                  contents={[
                    field.value
                      .map((d: Date) => (d ? formatDotDate(d) : "미정"))
                      .join(" - "),
                  ]}
                />
              )}
            />
            <Controller
              name="projectDetail.executionPeriod"
              render={({ field }) => (
                <TextAreaWithHeader // CHACHA: impl component
                  header="사업 일시"
                  contents={[
                    field.value
                      .map((d: Date) => (d ? formatDotDate(d) : "미정"))
                      .join(" - "),
                  ]}
                />
              )}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={manager}>
            <Controller
              name="proposalDetail.manager"
              render={({ field }) => (
                <TextAreaWithHeader // CHACHA: impl component
                  header="담당부서 / 담당자"
                  contents={[field.value.teamId, field.value.member]}
                />
              )}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={documentPurpose}>
            <Controller
              name="proposalDetail.purpose"
              render={({ field }) => (
                // CHACHA: need header
                <TextAreaInput placeholder="내용을 입력하세요." {...field} />
              )}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={documentTarget}>
            <Controller
              name="proposalDetail.beneficiary"
              render={({ field }) => (
                // CHACHA: need header
                <TextAreaInput placeholder="내용을 입력하세요." {...field} />
              )}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={documentDetail}>
            <Controller
              name="proposalDetail.detail"
              render={({ field }) => (
                // CHACHA: need header
                <TextAreaInput placeholder="내용을 입력하세요." {...field} />
              )}
            />
          </FlexWrapper>
        </FormProvider>
        <FlexWrapper
          direction="row"
          gap={60}
          ref={documentTimeline}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <Typography fs={24} lh={30} fw="BOLD">
            사업 진행 타임라인
          </Typography>
          {/* this already has react hook form */}
          {/* 얘는 지금 projectIds만 가지고 있어서, DB에서 타임라인 값 가져와서 여기다 넣는 게 필요할 듯. */}
          <ProjectTimelineTable data={timelines} />
        </FlexWrapper>
        <FlexWrapper direction="row" gap={0} ref={documentExpenditure}>
          {/* this already has react hook form */}
          {/* 이거 그냥 사계 상세 용으로 테이블 일단 따로 만들자. 말록이랑 formValues 때문에 컨플릭트 날 듯 */}
          <ManagerExpenditureTable
            formMethods={formMethods}
            projectNameCandidate={mockManagerProjectNameCandidateList}
            isProposal
            initialData={mockDBExpenditureData}
          />
        </FlexWrapper>
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
      </ContentsArea>
      <Index
        title="목차"
        contents={indexContents}
        headerHeight={headerHeight}
      />
    </ScrollAbleArea>
  );
};

export default ManagerProjectProposalDetailFrame;
