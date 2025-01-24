"use client";

import Typography from "@sparcs-students/web/common/components/Typography";
import TextAreaWithHeader from "@sparcs-students/web/features/document/components/TextAreaWithHeader";
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
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 60px;
`;

const IndexArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  position: sticky;
  top: ${headerHeight}px;
  height: fit-content;
`;
const IndexWrapper = styled.div`
  font-size: 16px;
  line-height: 20px;
  font-weight: 400;
  white-space: nowrap;
  width: fit-content;
  cursor: pointer;
`;
// 나중에 표 들어갈 위치
const TableArea = styled.div`
  height: 500px;
  width: 100%;
  background-color: green;
`;
const Casio: React.FC = () => {
  const firstRow = useRef<HTMLDivElement>(null);
  const secondRow = useRef<HTMLDivElement>(null);
  const thirdRow = useRef<HTMLDivElement>(null);
  const fourthRow = useRef<HTMLDivElement>(null);
  const fifthRow = useRef<HTMLDivElement>(null);
  const sixthRow = useRef<HTMLDivElement>(null);

  const scrollToTarget = (target: React.RefObject<HTMLDivElement>) => {
    if (target.current) {
      const top =
        target.current.getBoundingClientRect().top +
        window.scrollY -
        headerHeight;
      console.log(`Top value of target: ${top}`);
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
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
        <TableArea />
      </ContentsArea>

      <IndexArea>
        <Typography fs={24} lh={30} fw="BOLD">
          목차
        </Typography>
        <IndexWrapper onClick={() => scrollToTarget(firstRow)}>
          사업명, 사업개요
        </IndexWrapper>
        <IndexWrapper onClick={() => scrollToTarget(secondRow)}>
          사업 준비기간, 사업일시
        </IndexWrapper>
        <IndexWrapper onClick={() => scrollToTarget(thirdRow)}>
          담당부서 / 담당자
        </IndexWrapper>
        <IndexWrapper onClick={() => scrollToTarget(fourthRow)}>
          사업 추진 목적
        </IndexWrapper>
        <IndexWrapper onClick={() => scrollToTarget(fifthRow)}>
          사업 추진 대상자
        </IndexWrapper>
        <IndexWrapper onClick={() => scrollToTarget(sixthRow)}>
          사업 세부 내용
        </IndexWrapper>
      </IndexArea>
    </ScrollAbleArea>
  );
};

export default Casio;
