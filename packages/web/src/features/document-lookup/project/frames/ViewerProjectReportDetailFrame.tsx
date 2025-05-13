import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import TextAreaWithHeader from "@sparcs-students/web/features/report/components/TextAreaWithHeader";
import Typography from "@sparcs-students/web/common/components/Typography";
import DocumentTimelineTable from "@sparcs-students/web/features/document-lookup/project/components/DocumentTimelineTable";
import Index from "@sparcs-students/web/common/components/Index";
import React, { useRef } from "react";
import styled from "styled-components";
import { ProjectReportContent } from "@sparcs-students/web/features/document-lookup/project/type/managerFormValues";
import { useParams } from "next/navigation";
import { mockDBExpenditureData } from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockManagerFormData";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum";
import ViewerExpenditureTable from "@sparcs-students/web/features/document-lookup/budget/components/ViewerExpenditureTable";
import {
  ProjectReportSingleContent,
  ProjectReportTimelines,
} from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectReportTable";
import { formatDotDate } from "@sparcs-students/web/utils/Date/formatDate";

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

const ViewerProjectReportDetailFrame = () => {
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

  const { resultId, detailId } = useParams();
  const report = ProjectReportSingleContent.find(
    item => item.contentId === Number(detailId),
  ) as ProjectReportContent;

  const timelines = ProjectReportTimelines.filter(t =>
    report?.timelineIds.includes(t.id),
  );

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
          <ViewerExpenditureTable
            data={mockDBExpenditureData.filter(
              e =>
                e.projectName === report?.title &&
                e.status === DocumentReviewStatusEnum.Accepted,
            )}
            type="report"
            title="사업 결산안"
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

export default ViewerProjectReportDetailFrame;
