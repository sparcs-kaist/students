"use client";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import SingleColumnTable from "@sparcs-students/web/common/components/Table/SingleColumnTable";
import React, { useEffect, useState } from "react";
import Pagination from "@sparcs-students/web/common/components/Pagination";
import Icon from "@sparcs-students/web/common/components/Icon";
import TextInput from "@sparcs-students/web/common/components/Forms/TextInput";
import ModalTableButton from "@sparcs-students/web/common/components/Buttons/ModalTableButton";
import styled from "styled-components";
import Select from "@sparcs-students/web/common/components/Selects/Select";
// import colors from "@sparcs-students/web/styles/themes/colors";

interface RowProps {
  tag?: string;
  content: string;
  date?: Date;
  link?: string;
}

// Example data
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
const allNotice = Array.from({ length: 100 }, () => [...noticeExample])
  .flat()
  .sort((a, b) => b.date!.getTime() - a.date!.getTime());

const SearchBarWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 408px;
  min-width: 408px;
  max-width: 408px;
`;

const PageSizeSettingWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: 151px;
  min-width: 151px;
  max-width: 151px;
`;

const SearchBar = ({
  handleSearch,
}: {
  handleSearch: (searchText: string) => void;
}) => {
  const [searchText, setSearchText] = useState("");

  return (
    <FlexWrapper
      direction="row"
      gap={10}
      justify="flex-end"
      alignItems="center"
    >
      <Icon type="search" size={28} />
      <TextInput
        placeholder="키워드로 검색"
        value={searchText}
        handleChange={setSearchText}
      />
      <ModalTableButton
        buttonText="검색"
        onClick={() => handleSearch(searchText)}
      />
    </FlexWrapper>
  );
};

const PageSizeSetting = ({
  handlePageSizeChange,
}: {
  handlePageSizeChange: (newPageSize: number) => void;
}) => {
  const PageSizeList = [5, 10, 15, 20, 30, 50, 100];
  const PageSizeItems = PageSizeList.map(size => ({
    label: size.toString().concat("건"),
    value: size.toString(),
  }));

  const [pageSize, setPageSize] = useState(10);

  return (
    <PageSizeSettingWrapper>
      <Select
        items={PageSizeItems}
        value={pageSize.toString()}
        onChange={newSize => {
          const size = Number(newSize);
          setPageSize(size);
          handlePageSizeChange(size);
        }}
      />
    </PageSizeSettingWrapper>
  );
};

const SmallFrame = ({
  handleSearch,
  handlePageSizeChange,
}: {
  handleSearch: (searchText: string) => void;
  handlePageSizeChange: (newPageSize: number) => void;
}) => (
  <FlexWrapper direction="column" gap={20}>
    <SearchBar handleSearch={handleSearch} />
    <PageSizeSetting handlePageSizeChange={handlePageSizeChange} />
  </FlexWrapper>
);

const LargeFrame = ({
  handleSearch,
  handlePageSizeChange,
}: {
  handleSearch: (searchText: string) => void;
  handlePageSizeChange: (newPageSize: number) => void;
}) => (
  <FlexWrapper
    direction="row"
    gap={20}
    justify="space-between"
    alignItems="center"
  >
    <PageSizeSetting handlePageSizeChange={handlePageSizeChange} />
    <SearchBarWrapper>
      <SearchBar handleSearch={handleSearch} />
    </SearchBarWrapper>
  </FlexWrapper>
);

const Notice = () => {
  // const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchedNotice, setSearchedNotice] = useState<RowProps[]>(allNotice);
  const [shownNotice, setShownNotice] = useState<RowProps[]>([]);

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
    const start = (newPageIndex - 1) * pageSize;
    const end = start + pageSize;
    setShownNotice(allNotice.slice(start, end));
  };

  const handleSearch = (searchText: string) => {
    const filtered = allNotice.filter(notice =>
      notice.content.toLowerCase().includes(searchText.toLowerCase()),
    );
    setSearchedNotice(filtered);
    setPageIndex(1);
    setShownNotice(filtered.slice(0, pageSize));
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPageIndex(1);
    setShownNotice(searchedNotice.slice(0, newPageSize));
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
    setSearchedNotice(allNotice);
    const start = (pageIndex - 1) * pageSize;
    const end = start + pageSize;
    setShownNotice(allNotice.slice(start, end));
  }, []);

  return (
    <FlexWrapper direction="column" gap={20}>
      <FlexWrapper direction="column" gap={10}>
        <PageTitle>공지사항</PageTitle>
        <BreadCrumb items={[{ name: "공지사항", path: "/notice" }]} />
      </FlexWrapper>
      <FlexWrapper direction="column" gap={20}>
        {isMobile && (
          <SmallFrame
            handleSearch={handleSearch}
            handlePageSizeChange={handlePageSizeChange}
          />
        )}
        {!isMobile && (
          <LargeFrame
            handleSearch={handleSearch}
            handlePageSizeChange={handlePageSizeChange}
          />
        )}
        <SingleColumnTable
          header={`총 ${searchedNotice.length}건`}
          rows={shownNotice}
          mini={isMobile}
          buttonEnable={false}
        />
        <Pagination
          currentPageIndex={pageIndex}
          totalCount={searchedNotice.length}
          pageSize={pageSize}
          groupSize={10}
          onPageIndexChange={handlePageChange}
        />
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default Notice;
