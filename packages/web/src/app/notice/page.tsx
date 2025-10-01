"use client";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import SingleColumnTable from "@sparcs-students/web/common/components/Table/SingleColumnTable";
import React, { useEffect, useState } from "react";
import Pagination from "@sparcs-students/web/common/components/Pagination";

interface RowProps {
  tag?: string;
  content: string;
  date?: Date;
  link?: string;
}

const Notice = () => {
  // const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [shownNotice, setShownNotice] = useState<RowProps[]>([]);

  const noticeExample: RowProps[] = [
    {
      tag: "총학",
      content: "2025년 가을학기 예결산안 매뉴얼",
      date: new Date("2025-08-20"),
      link: "https://drive.google.com/drive/folders/1-2TxRDA9kSo_3f3wMHAwyug6haGZxxrn?usp=sharing",
    },
    {
      tag: "총학",
      content: "2025년 가을학기 예결산안 양식",
      date: new Date("2025-08-18"),
      link: "https://drive.google.com/drive/folders/1-2TxRDA9kSo_3f3wMHAwyug6haGZxxrn?usp=sharing",
    },
    {
      tag: "감사원",
      content: "2025년 가을학기 예결산 제출 파일 양식",
      date: new Date("2025-08-18"),
      link: "https://linktr.ee/kaistbai",
    },
    // {
    //   tag: "감사원",
    //   content: "2025년 가을학기 감사 매뉴얼",
    //   date: new Date("2025-08-10"),
    //   link: "https://linktr.ee/kaistbai",
    // },
  ];
  const notice = Array.from({ length: 100 }, () => [...noticeExample]).flat();

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
    const start = (newPageIndex - 1) * 10;
    const end = start + 10;
    setShownNotice(notice.slice(start, end));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 960) {
        // setIsSmallScreen(true);
        if (window.innerWidth <= 720) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      } else {
        // setIsSmallScreen(false);
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const start = (pageIndex - 1) * 10;
    const end = start + 10;
    setShownNotice(notice.slice(start, end));
  }, [notice, pageIndex]);

  return (
    <FlexWrapper direction="column" gap={48}>
      <FlexWrapper direction="column" gap={10}>
        <PageTitle>공지사항</PageTitle>
        <BreadCrumb items={[{ name: "공지사항", path: "/notice" }]} />
      </FlexWrapper>
      <FlexWrapper direction="column" gap={20}>
        <SingleColumnTable
          header={`총 ${notice.length}건`}
          rows={shownNotice}
          mini={isMobile}
          buttonEnable={false}
        />
        <Pagination
          currentPageIndex={pageIndex}
          totalCount={notice.length}
          pageSize={10}
          groupSize={10}
          onPageIndexChange={handlePageChange}
        />
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default Notice;
