"use client";

import React, { FC, useState, useEffect } from "react";
import Icon from "@sparcs-students/web/common/components/Icon";
import colors from "@sparcs-students/web/styles/themes/colors";
import styled from "styled-components";
import PageIndexButton from "@sparcs-students/web/common/components/Pagination/_atomic/PageIndexButton";

interface PaginationProps {
  currentPageIndex: number; // 현재 페이지 인덱스
  totalCount: number; // 전체 데이터 수
  pageSize: number; // 한 페이지에 들어갈 데이터 수
  groupSize: number; // 한 그룹에 들어갈 페이지 수
  onPageIndexChange: (page: number) => void;
}

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const GroupWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

const ArrowWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Pagination: FC<PaginationProps> = ({
  currentPageIndex,
  totalCount,
  pageSize,
  groupSize,
  onPageIndexChange,
}) => {
  const totalPageCount = Math.ceil(totalCount / pageSize);

  const lastGroup = Math.ceil(totalPageCount / groupSize);
  const [currentGroup, setCurrentPageGroup] = useState<number>(
    Math.ceil(currentPageIndex / groupSize),
  );

  const getPages = (groupIndex: number): number[] => {
    const start = (groupIndex - 1) * groupSize + 1;
    const end = Math.min(start + groupSize - 1, totalPageCount);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };
  const [pages, setPages] = useState<Array<number>>(getPages(currentPageIndex));

  useEffect(() => {
    setCurrentPageGroup(Math.ceil(currentPageIndex / groupSize));
    setPages(getPages(Math.ceil(currentPageIndex / groupSize)));
  }, [currentPageIndex, groupSize, totalCount]);

  return (
    <PaginationWrapper>
      <ArrowWrapper>
        <Icon
          type="arrow_back_ios_new"
          size={16}
          color={currentGroup === 1 ? colors.GRAY["100"] : colors.BLACK}
          onClick={
            currentGroup === 1
              ? undefined
              : () => {
                  if (currentGroup > 1) {
                    onPageIndexChange((currentGroup - 2) * groupSize + 1);
                  }
                }
          }
        />
      </ArrowWrapper>
      <GroupWrapper>
        {pages.map(page => (
          <PageIndexButton
            key={page}
            selected={page === currentPageIndex}
            text={page.toString()}
            onClick={() => {
              onPageIndexChange(page);
            }}
          />
        ))}
      </GroupWrapper>
      <ArrowWrapper>
        <Icon
          type="arrow_forward_ios"
          size={16}
          color={currentGroup === lastGroup ? colors.GRAY["100"] : colors.BLACK}
          onClick={
            currentGroup === lastGroup
              ? undefined
              : () => {
                  if (currentGroup < lastGroup) {
                    onPageIndexChange(currentGroup * groupSize + 1);
                  }
                }
          }
        />
      </ArrowWrapper>
    </PaginationWrapper>
  );
};

export default Pagination;
