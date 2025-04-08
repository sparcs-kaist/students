"use client";

import { DocumentReviewStatusEnum } from "@sparcs-students/interface/common/enum/meeting.enum";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import TextAreaInput from "@sparcs-students/web/common/components/Forms/TextAreaInput";
import Index from "@sparcs-students/web/common/components/Index";
import Typography from "@sparcs-students/web/common/components/Typography";
import BudgetReportTable from "@sparcs-students/web/features/documents/components/BudgetReportTable";
import DocumentTimelineTable from "@sparcs-students/web/features/documents/components/DocumentTimelineTable";
import mockBudgetReportData from "@sparcs-students/web/features/documents/services/_mock/mockBudgetReportTable";
import { mockDocumentTimelineData } from "@sparcs-students/web/features/documents/services/_mock/mockDocumentTimelineTable";
import TextAreaWithHeader from "@sparcs-students/web/features/report/components/TextAreaWithHeader";

import { useParams } from "next/navigation";
import React, { useRef, useState } from "react";
import styled, { useTheme } from "styled-components";

interface DocumentViewerDetailPageProps {
  review: string;
  status: DocumentReviewStatusEnum;
}

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

const DocumentViewerDetailPage: React.FC<DocumentViewerDetailPageProps> = ({
  review,
  status,
}) => {
  // 임시로 넣어둠. 나중에 백엔드와 연결될 수 있게 바꾸기
  const onConfirm = () => {};
  const handleReviewChange = (_detail: string) => {};
  const handleStatusChange = (_status: DocumentReviewStatusEnum) => {};

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

  const { resultId } = useParams();
  const theme = useTheme();
  const [reviewText, setReviewText] = useState(review);

  const breadcrumbItems = [
    { name: "예결산 조회", path: "/document-lookup" },
    {
      name: "사업보고서",
      path: `/document-lookup/project-report/result/${resultId}`,
    },
    {
      name: "사업명",
      path: `/document-lookup/project-proposal/result/${resultId}`,
    },
  ];

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
    <FlexWrapper direction="column" gap={48}>
      <FlexWrapper direction="column" gap={10}>
        <Typography fw="BOLD" fs={30} lh={40} color="PRIMARY">
          예결산 조회
        </Typography>
        <BreadCrumb items={breadcrumbItems} />
      </FlexWrapper>
      <ScrollAbleArea>
        <ContentsArea>
          <FlexWrapper direction="row" gap={60} ref={documentTitle}>
            <TextAreaWithHeader header="사업명" contents={["contents1"]} />
            <TextAreaWithHeader header="사업 개요" contents={["contents1"]} />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={documentPeriod}>
            <TextAreaWithHeader
              header="사업 준비 기간"
              contents={["contents1"]}
            />
            <TextAreaWithHeader header="사업 일시" contents={["contents1"]} />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={manager}>
            <TextAreaWithHeader
              header="담당부서 / 담당자"
              contents={["contents1", "contents2"]}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={documentDesc}>
            <TextAreaWithHeader
              header="세부 사업 내용"
              contents={["contents1"]}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={documentParticipation}>
            <TextAreaWithHeader header="사업 참여도" contents={["contents1"]} />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={documentResult}>
            <TextAreaWithHeader header="사업 성과" contents={["contents1"]} />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={documentUnachieved}>
            <TextAreaWithHeader header="미달 목표" contents={["contents1"]} />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={60} ref={suggestion}>
            <TextAreaWithHeader header="제언" contents={["contents1"]} />
          </FlexWrapper>
          <FlexWrapper direction="column" gap={12} ref={documentTimeline}>
            <Typography fs={24} lh={30} fw="BOLD">
              사업 진행 타임라인
            </Typography>
            <DocumentTimelineTable data={mockDocumentTimelineData} />
          </FlexWrapper>
          <FlexWrapper direction="column" gap={12} ref={budgetReport}>
            <Typography fs={24} lh={30} fw="BOLD">
              사업 결산안
            </Typography>
            <BudgetReportTable initialData={mockBudgetReportData} />
          </FlexWrapper>
          <FlexWrapper direction="column" gap={12} ref={projectReportReview}>
            <Typography fs={24} lh={30} fw="BOLD">
              사업보고서 검토
            </Typography>
            <TextAreaInput
              placeholder="검토에 대한 설명을 입력하세요."
              handleChange={setReviewText}
              value={reviewText}
              height={100}
            />
            <ButtonWrapper>
              <Button
                onClick={() => {
                  handleReviewChange(reviewText);
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
                  handleReviewChange(reviewText);
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
                  reviewText !== ""
                    ? "disabled"
                    : "default"
                }
              >
                승인
              </Button>
            </ButtonWrapper>
          </FlexWrapper>
        </ContentsArea>
        <Index
          title="목차"
          contents={indexContents}
          headerHeight={headerHeight}
        />
      </ScrollAbleArea>
      <BottomButtonWrapper>
        <Button
          type="default"
          style={{
            border: `1px solid ${theme.colors.GREEN[600]}`,
            backgroundColor: theme.colors.WHITE,
            color: theme.colors.GREEN[600],
          }}
        >
          삭제
        </Button>
        <Button type="default">제출</Button>
      </BottomButtonWrapper>
    </FlexWrapper>
  );
};

export default DocumentViewerDetailPage;
