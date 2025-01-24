"use client";

import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import Index from "@sparcs-students/web/common/components/Index";
import Typography from "@sparcs-students/web/common/components/Typography";
import TextAreaWithHeader from "@sparcs-students/web/features/document/components/TextAreaWithHeader";
import TimelineTable from "@sparcs-students/web/features/document/components/TimelineTable";
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

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 48px;
`;

// 나중에 표 들어갈 위치
const TableArea = styled.div`
  height: 500px;
  width: 100%;
  background-color: green;
`;
const DocumentViewerDetailPage: React.FC = () => {
  const firstRow = useRef<HTMLDivElement>(null);
  const secondRow = useRef<HTMLDivElement>(null);
  const thirdRow = useRef<HTMLDivElement>(null);
  const fourthRow = useRef<HTMLDivElement>(null);
  const fifthRow = useRef<HTMLDivElement>(null);
  const sixthRow = useRef<HTMLDivElement>(null);
  const seventhRow = useRef<HTMLDivElement>(null);

  const mockTimeLine = [
    {
      startDate: new Date("2025-01-24"),
      endDate: new Date("2025-01-28"),
      content: "집행운영회 운영",
    },
    {
      startDate: new Date("2025-01-24"),
      endDate: new Date("2025-01-28"),
      content: "메모가 있는 경우",
      memo: "기이이이이ㅣ이이이이이ㅣ이이ㅣ이이이이이ㅣ이이ㅣ이이이이이ㅣ이이ㅣ이이이이이ㅣ이이ㅣ이이이이이ㅣ이이인메모",
    },
  ];

  const breadcrumbItems = [
    { name: "카테고리", path: "/category" },
    { name: "서브카테고리", path: "/category/subcategory" },
    { name: "상세 페이지", path: "/category/subcategory/detail" },
  ];

  const indexContents = [
    { name: "사업명, 사업개요", reference: firstRow },
    { name: "사업 준비기간, 사업일시", reference: secondRow },
    { name: "담당부서 / 담당자", reference: thirdRow },
    { name: "사업 추진 목적", reference: fourthRow },
    { name: "사업 추진 대상자", reference: fifthRow },
    { name: "사업 세부 내용", reference: sixthRow },
    { name: "사업 진행 타임라인", reference: seventhRow },
  ];

  return (
    <>
      <TitleWrapper>
        <Typography fw="BOLD" fs={30} lh={40} color="PRIMARY">
          예결산 조회
        </Typography>
        <BreadCrumb items={breadcrumbItems} />
      </TitleWrapper>
      <ScrollAbleArea>
        <ContentsArea>
          <RowWrapper ref={firstRow}>
            <TextAreaWithHeader header="사업명" contents={["contents1"]} />
            <TextAreaWithHeader header="사업 개요" contents={["contents1"]} />
          </RowWrapper>
          <RowWrapper ref={secondRow}>
            <TextAreaWithHeader
              header="사업 준비 기간"
              contents={["contents1"]}
            />
            <TextAreaWithHeader header="사업 일시" contents={["contents1"]} />
          </RowWrapper>
          <div ref={thirdRow}>
            <TextAreaWithHeader
              header="담당부서 / 담당자"
              contents={["contents1", "contents2"]}
            />
          </div>
          <div ref={fourthRow}>
            <TextAreaWithHeader
              header="사업 추진 목적"
              contents={["contents1"]}
            />
          </div>
          <div ref={fifthRow}>
            <TextAreaWithHeader
              header="사업 수혜 대상자"
              contents={["contents1"]}
            />
          </div>
          <div ref={sixthRow}>
            <TextAreaWithHeader
              header="세부 사업 내용"
              contents={["contents1"]}
            />
          </div>
          <div
            ref={seventhRow}
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Typography fs={24} lh={30} fw="BOLD">
              사업 진행 타임라인
            </Typography>
            <TimelineTable contents={mockTimeLine} />
          </div>
          <TableArea />
        </ContentsArea>

        <Index
          title="목차"
          contents={indexContents}
          headerHeight={headerHeight}
        />
      </ScrollAbleArea>
    </>
  );
};

export default DocumentViewerDetailPage;
