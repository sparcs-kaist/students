"use client";

import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Index from "@sparcs-students/web/common/components/Index";
import Typography from "@sparcs-students/web/common/components/Typography";
import TextAreaWithHeader from "@sparcs-students/web/features/report/components/TextAreaWithHeader";

import { useParams } from "next/navigation";
import React, { useRef } from "react";
import styled from "styled-components";

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

const DocumentViewerDetailPage: React.FC = () => {
  const documentTitle = useRef<HTMLDivElement>(null);
  const documentPeriod = useRef<HTMLDivElement>(null);
  const manager = useRef<HTMLDivElement>(null);
  const documentDesc = useRef<HTMLDivElement>(null);
  const documentParticipation = useRef<HTMLDivElement>(null);
  const documentResult = useRef<HTMLDivElement>(null);
  const documentUnachieved = useRef<HTMLDivElement>(null);
  const suggestion = useRef<HTMLDivElement>(null);

  const { resultId } = useParams();

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
          {/* 여기에 사업 표 */}
        </ContentsArea>
        <Index
          title="목차"
          contents={indexContents}
          headerHeight={headerHeight}
        />
      </ScrollAbleArea>
    </FlexWrapper>
  );
};

export default DocumentViewerDetailPage;
