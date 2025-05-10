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
import React, { useRef } from "react";
import styled from "styled-components";
import { ProjectProposalContent } from "@sparcs-students/web/features/document-lookup/project/type/managerFormValues";
import { formatDotDate } from "@sparcs-students/web/utils/Date/formatDate";
import DocumentTimelineTable from "@sparcs-students/web/features/document-lookup/project/components/DocumentTimelineTable";
import ViewerExpenditureTable from "@sparcs-students/web/features/document-lookup/budget/components/ViewerExpenditureTable";
import { mockDBExpenditureData } from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockManagerFormData";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum";

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

const ViewerProjectProposalDetailFrame: React.FC = () => {
  const documentTitle = useRef<HTMLDivElement>(null);
  const documentPeriod = useRef<HTMLDivElement>(null);
  const manager = useRef<HTMLDivElement>(null);
  const documentPurpose = useRef<HTMLDivElement>(null);
  const documentTarget = useRef<HTMLDivElement>(null);
  const documentDetail = useRef<HTMLDivElement>(null);
  const documentTimeline = useRef<HTMLDivElement>(null);
  const documentExpenditure = useRef<HTMLDivElement>(null);

  const { resultId, detailId } = useParams();
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
          <ViewerExpenditureTable
            data={mockDBExpenditureData.filter(
              e =>
                e.projectName === proposal?.title && // CHACHA: 현재 페이지의 사업명과 동일한 예산안만 나타나야 하고,
                e.status === DocumentReviewStatusEnum.Accepted, // 뷰어에게는 최종 승인된 예산안만 보여야 합니다.
            )}
            type="proposal"
            title="사업 예산안"
            pageId={resultId}
            isInsideDetailPage
          />
        </FlexWrapper>
      </ContentsArea>
      <Index
        title="목차"
        contents={indexContents}
        headerHeight={headerHeight}
      />
    </ScrollAbleArea>
  );
};

export default ViewerProjectProposalDetailFrame;
