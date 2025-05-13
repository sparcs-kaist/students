import React, { useMemo, useRef, useState } from "react";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum";
import { useParams } from "next/navigation";
import styled, { useTheme } from "styled-components";
import { ProjectReportContent } from "@sparcs-students/web/features/document-lookup/project/type/managerFormValues";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import TextAreaWithHeader from "@sparcs-students/web/features/report/components/TextAreaWithHeader";
import Typography from "@sparcs-students/web/common/components/Typography";
import DocumentTimelineTable from "@sparcs-students/web/features/document-lookup/project/components/DocumentTimelineTable";

import TextAreaInput from "@sparcs-students/web/common/components/Forms/TextAreaInput";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import Index from "@sparcs-students/web/common/components/Index";
import { overlay } from "overlay-kit";
import Modal from "@sparcs-students/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import { mockDBExpenditureData } from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockManagerFormData";
import { formatDotDate } from "@sparcs-students/web/utils/Date/formatDate";
import {
  ProjectReportTimelines,
  ProjectReportSingleContent,
} from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectReportTable";
import ReviewerExpenditureTable from "@sparcs-students/web/features/document-lookup/budget/components/ReviewerExpenditureTable";

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
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  gap: 8px;
`;

const BottomButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: center;
  gap: 30px;
`;

const ReviewerProjectReportDetailFrame = () => {
  const documentTitle = useRef<HTMLDivElement>(null);
  const documentPeriod = useRef<HTMLDivElement>(null);
  const manager = useRef<HTMLDivElement>(null);
  const documentDesc = useRef<HTMLDivElement>(null);
  const documentParticipation = useRef<HTMLDivElement>(null);
  const documentResult = useRef<HTMLDivElement>(null);
  const documentUnachieved = useRef<HTMLDivElement>(null);
  const suggestion = useRef<HTMLDivElement>(null);
  const documentTimeline = useRef<HTMLDivElement>(null);
  const budgetReport = useRef<HTMLDivElement>(null);
  const projectReportReview = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<DocumentReviewStatusEnum>(
    DocumentReviewStatusEnum.Accepted,
  );

  const { resultId, detailId } = useParams();
  const theme = useTheme();
  const [totalReviewText, setTotalReviewText] = useState("");

  const report = ProjectReportSingleContent.find(
    item => item.contentId === Number(detailId),
  ) as ProjectReportContent;

  const timelines = ProjectReportTimelines.filter(t =>
    report?.timelineIds.includes(t.id),
  );

  // TODO: 임시로 넣어둠. 나중에 백엔드와 연결될 수 있게 바꾸기
  const onConfirm = () => {};
  const handleReviewChange = (_detail: string) => {};
  const handleStatusChange = (newStatus: DocumentReviewStatusEnum) => {
    setStatus(newStatus);
  };
  const [resetKey, setResetKey] = useState(0);

  const initialReviewData = useMemo(() => {
    const expenditure = mockDBExpenditureData
      .filter(e => e.projectName === report?.title)
      .map(item => ({
        code: item.code,
        reviewText: item.review,
        reviewStatus: item.status,
      }));

    return { expenditure };
  }, [resetKey]);

  const [reviewData, setReviewData] = useState<{
    expenditure: {
      code: number;
      reviewText: string;
      reviewStatus: DocumentReviewStatusEnum;
    }[];
  }>(initialReviewData);

  const handleSubmitAll = () => {
    const review = reviewData;
    console.log("제출된 예산안 리뷰:", review);
    console.log("제출된 사업계획서 전체 검토:", totalReviewText);
    console.log("제출된 사업계획서 전체 검토 상태:", status);
  };

  const handleResetAll = () => {
    setReviewData(initialReviewData);
    setResetKey(prev => prev + 1); // CHACHA: re-render
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

  const indexContents = [
    { name: "사업명, 사업개요", reference: documentTitle },
    { name: "사업 준비기간, 사업일시", reference: documentPeriod },
    { name: "담당부서 / 담당자", reference: manager },
    { name: "세부 사업 내용", reference: documentDesc },
    { name: "사업 참여도", reference: documentParticipation },
    { name: "사업 성과", reference: documentResult },
    { name: "미달 목표", reference: documentUnachieved },
    { name: "제언", reference: suggestion },
    { name: "사업 진행 타임라인", reference: documentTimeline },
    { name: "사업 결산안", reference: budgetReport },
    { name: "사업보고서 검토", reference: projectReportReview },
  ];

  return (
    <ScrollAbleArea>
      <ContentsArea>
        <FlexWrapper direction="row" gap={60} ref={documentTitle}>
          <TextAreaWithHeader header="사업명" contents={[report?.title]} />
          <TextAreaWithHeader header="사업 개요" contents={[report?.brief]} />
        </FlexWrapper>
        <FlexWrapper direction="row" gap={60} ref={documentPeriod}>
          <TextAreaWithHeader
            header="사업 준비 기간"
            contents={[
              report?.preparationPeriod.value
                .map(d => (d ? formatDotDate(d) : "미정"))
                .join(" - "),
            ]}
          />
          <TextAreaWithHeader
            header="사업 일시"
            contents={[
              report?.executionPeriod.value
                .map(d => (d ? formatDotDate(d) : "미정"))
                .join(" - "),
            ]}
          />
        </FlexWrapper>
        <FlexWrapper direction="row" gap={60} ref={manager}>
          <TextAreaWithHeader
            header="담당부서 / 담당자"
            contents={[
              `${report?.manager.teamId}`,
              `${report?.manager.member}`,
            ]}
          />
        </FlexWrapper>
        <FlexWrapper direction="row" gap={60} ref={documentDesc}>
          <TextAreaWithHeader
            header="세부 사업 내용"
            contents={[report?.detail]}
          />
        </FlexWrapper>
        <FlexWrapper direction="row" gap={60} ref={documentParticipation}>
          <TextAreaWithHeader
            header="사업 참여도"
            contents={[report?.participation]}
          />
        </FlexWrapper>
        <FlexWrapper direction="row" gap={60} ref={documentResult}>
          <TextAreaWithHeader header="사업 성과" contents={[report?.result]} />
        </FlexWrapper>
        <FlexWrapper direction="row" gap={60} ref={documentUnachieved}>
          <TextAreaWithHeader header="미달 목표" contents={[report?.todo]} />
        </FlexWrapper>
        <FlexWrapper direction="row" gap={60} ref={suggestion}>
          <TextAreaWithHeader header="제언" contents={[report?.comment]} />
        </FlexWrapper>
        <FlexWrapper direction="column" gap={12} ref={documentTimeline}>
          <Typography fs={24} lh={30} fw="BOLD">
            사업 진행 타임라인
          </Typography>
          <DocumentTimelineTable data={timelines} />
        </FlexWrapper>
        <FlexWrapper direction="column" gap={12} ref={budgetReport}>
          <Typography fs={24} lh={30} fw="BOLD">
            사업 결산안
          </Typography>
          <ReviewerExpenditureTable
            key={`income-${resetKey}`}
            initialData={mockDBExpenditureData.filter(
              e => e.projectName === report?.title,
            )}
            type="report"
            title="사업 결산안"
            pageId={resultId}
            isInsideDetailPage
            onReviewUpdate={({ code, reviewText, reviewStatus }) => {
              setReviewData(prev => {
                const newExpenditure = [...prev.expenditure];
                const existingIndex = newExpenditure.findIndex(
                  d => d.code === code,
                );
                const newEntry = { code, reviewText, reviewStatus };

                if (existingIndex >= 0) {
                  newExpenditure[existingIndex] = newEntry;
                } else {
                  newExpenditure.push(newEntry);
                }

                return { ...prev, expenditure: newExpenditure };
              });
            }}
          />
        </FlexWrapper>
        <FlexWrapper direction="column" gap={12} ref={projectReportReview}>
          <Typography fs={24} lh={30} fw="BOLD">
            사업보고서 검토
          </Typography>
          <TextAreaInput
            placeholder="검토에 대한 설명을 입력하세요."
            handleChange={setTotalReviewText}
            value={totalReviewText}
            height={100}
          />
          <ButtonWrapper>
            <Button
              onClick={() => {
                handleReviewChange(totalReviewText);
                handleStatusChange(DocumentReviewStatusEnum.ReviewRejected);
                onConfirm();
              }}
              type={
                status === DocumentReviewStatusEnum.Rejected ||
                status === DocumentReviewStatusEnum.ReviewRejected
                  ? "disabled"
                  : "default"
              }
              style={
                status === DocumentReviewStatusEnum.Rejected ||
                status === DocumentReviewStatusEnum.ReviewRejected
                  ? {}
                  : {
                      border: `1px solid ${theme.colors.RED[700]}`,
                      backgroundColor: theme.colors.RED[50],
                      color: theme.colors.RED[700],
                    }
              }
            >
              반려
            </Button>
            <Button
              onClick={() => {
                handleReviewChange(totalReviewText);
                handleStatusChange(DocumentReviewStatusEnum.ReviseNeeded);
                onConfirm();
              }}
              type={
                status === DocumentReviewStatusEnum.ReviseNeeded
                  ? "disabled"
                  : "default"
              }
              style={
                status === DocumentReviewStatusEnum.ReviseNeeded
                  ? {}
                  : {
                      border: `1px solid ${theme.colors.GREEN[600]}`,
                      backgroundColor: theme.colors.GREEN[50],
                      color: theme.colors.GREEN[600],
                    }
              }
            >
              수정 요청
            </Button>
            <Button
              onClick={() => {
                handleStatusChange(DocumentReviewStatusEnum.ReviewAccepted);
                onConfirm();
              }}
              type={
                status === DocumentReviewStatusEnum.Accepted ||
                status === DocumentReviewStatusEnum.ReviewAccepted ||
                totalReviewText !== ""
                  ? "disabled"
                  : "default"
              }
            >
              승인
            </Button>
          </ButtonWrapper>
        </FlexWrapper>
        <BottomButtonWrapper>
          <Button
            type="default"
            style={{
              border: `1px solid ${theme.colors.GREEN[600]}`,
              backgroundColor: theme.colors.WHITE,
              color: theme.colors.GREEN[600],
            }}
            onClick={openDiscardModal}
          >
            삭제
          </Button>
          <Button type="default" onClick={openSaveModal}>
            제출
          </Button>
        </BottomButtonWrapper>
      </ContentsArea>
      <Index
        title="목차"
        contents={indexContents}
        headerHeight={headerHeight}
      />
    </ScrollAbleArea>
  );
};
export default ReviewerProjectReportDetailFrame;
