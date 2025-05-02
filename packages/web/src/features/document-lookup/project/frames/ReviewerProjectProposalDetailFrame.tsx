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
import React, { useMemo, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import { ProjectProposalContent } from "@sparcs-students/web/features/document-lookup/project/type/managerFormValues";
import { formatDotDate } from "@sparcs-students/web/utils/Date/formatDate";
import DocumentTimelineTable from "@sparcs-students/web/features/document-lookup/project/components/DocumentTimelineTable";
import { mockDBExpenditureData } from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockManagerFormData";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum";
import ReviewerExpenditureTable from "@sparcs-students/web/features/document-lookup/budget/components/ReviewerExpenditureTable";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import { overlay } from "overlay-kit";
import Modal from "@sparcs-students/web/common/components/Modal";
import ConfirmModalContent from "@sparcs-students/web/common/components/Modal/ConfirmModalContent";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import TextAreaInput from "@sparcs-students/web/common/components/Forms/TextAreaInput";

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

const ReviewButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  gap: 8px;
`;

const ReviewerProjectProposalDetailFrame: React.FC = () => {
  const documentTitle = useRef<HTMLDivElement>(null);
  const documentPeriod = useRef<HTMLDivElement>(null);
  const manager = useRef<HTMLDivElement>(null);
  const documentPurpose = useRef<HTMLDivElement>(null);
  const documentTarget = useRef<HTMLDivElement>(null);
  const documentDetail = useRef<HTMLDivElement>(null);
  const documentTimeline = useRef<HTMLDivElement>(null);
  const documentExpenditure = useRef<HTMLDivElement>(null);
  const documentReview = useRef<HTMLDivElement>(null);

  const { resultId, detailId } = useParams();
  const theme = useTheme();
  const [totalReviewText, setTotalReviewText] = useState(""); // 사업계획서 검토 text
  const [status, setStatus] = useState<DocumentReviewStatusEnum>( // 사업계획서 검토 text 아래의 반려 / 수정요청 / 승인
    DocumentReviewStatusEnum.Accepted,
  );
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
    { name: "사업계획서 검토", reference: documentReview },
  ];

  const [resetKey, setResetKey] = useState(0);

  const initialReviewData = useMemo(() => {
    const expenditure = mockDBExpenditureData
      .filter(e => e.projectName === proposal?.title) // CHACHA: 현재의 proposal과 title이 같은 예산안만 filter
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
    // CHACHA: 백에 넘어가야 할 데이터들
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

  const onConfirm = () => {};
  const handleReviewChange = (_detail: string) => {};
  const handleStatusChange = (newStatus: DocumentReviewStatusEnum) => {
    setStatus(newStatus);
  };

  return (
    <ScrollAbleArea>
      <ContentsArea>
        <FlexWrapper direction="row" gap={60} ref={documentTitle}>
          <TextAreaWithHeader header="사업명" contents={[proposal?.title]} />
          <TextAreaWithHeader header="사업 개요" contents={[proposal?.brief]} />
        </FlexWrapper>
        <FlexWrapper direction="row" gap={60} ref={documentPeriod}>
          <TextAreaWithHeader
            header="사업 준비 기간"
            contents={[
              proposal.preparationPeriod.value
                .map(d => (d ? formatDotDate(d) : "미정"))
                .join(" - "),
            ]}
          />
          <TextAreaWithHeader
            header="사업 일시"
            contents={[
              proposal.executionPeriod.value
                .map(d => (d ? formatDotDate(d) : "미정"))
                .join(" - "),
            ]}
          />
        </FlexWrapper>
        <FlexWrapper direction="row" gap={60} ref={manager}>
          <TextAreaWithHeader
            header="담당부서 / 담당자"
            contents={[
              `${proposal.manager.teamId}`,
              `${proposal.manager.member}`,
            ]}
          />
        </FlexWrapper>
        <FlexWrapper direction="row" gap={60} ref={documentPurpose}>
          <TextAreaWithHeader
            header="사업 추진 목적"
            contents={[proposal.purpose]}
          />
        </FlexWrapper>
        <FlexWrapper direction="row" gap={60} ref={documentTarget}>
          <TextAreaWithHeader
            header="사업 수혜 대상자"
            contents={[proposal.beneficiary]}
          />
        </FlexWrapper>
        <FlexWrapper direction="row" gap={60} ref={documentDetail}>
          <TextAreaWithHeader
            header="세부 사업 내용"
            contents={[proposal.detail]}
          />
        </FlexWrapper>
        <FlexWrapper
          direction="row"
          gap={60}
          ref={documentTimeline}
          style={{ display: "flex", flexDirection: "column", gap: "12px" }}
        >
          <Typography fs={24} lh={30} fw="BOLD">
            사업 진행 타임라인
          </Typography>
          <DocumentTimelineTable data={timelines} />
        </FlexWrapper>
        <FlexWrapper direction="row" gap={0} ref={documentExpenditure}>
          <ReviewerExpenditureTable
            key={`income-${resetKey}`}
            initialData={mockDBExpenditureData.filter(
              e => e.projectName === proposal?.title,
              // && // CHACHA: 현재 페이지의 사업명과 동일한 예산안만 나타나야 해요.
            )}
            type="proposal"
            title="사업 예산안"
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
        <FlexWrapper direction="column" gap={12} ref={documentReview}>
          <Typography fs={24} lh={30} fw="BOLD">
            사업계획서 검토
          </Typography>
          <TextAreaInput
            placeholder="검토에 대한 설명을 입력하세요."
            handleChange={setTotalReviewText}
            value={totalReviewText}
            height={100}
          />
          <ReviewButtonWrapper>
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
          </ReviewButtonWrapper>
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

export default ReviewerProjectProposalDetailFrame;
