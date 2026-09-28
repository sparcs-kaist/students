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
import isPropValid from "@emotion/is-prop-valid";
import { useRouter } from "next/navigation";
import {
  type NoticeRow,
  getStoredNoticeList,
  NOTICE_STORAGE_KEY,
} from "@sparcs-students/web/features/notice/noticeData";

interface WrapperProps {
  width: number;
  height?: string;
  justify?: string;
}

const HorizontalWrapper = styled.div.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<WrapperProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ justify }) => justify ?? "flex-start"};
  min-width: ${({ width }) => width}px;
  max-width: ${({ width }) => width}px;
  min-height: ${({ height }) => height ?? 36}px;
  max-height: ${({ height }) => height ?? 36}px;
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
    <HorizontalWrapper width={113}>
      <Select
        items={PageSizeItems}
        value={pageSize.toString()}
        onChange={newSize => {
          const size = Number(newSize);
          setPageSize(size);
          handlePageSizeChange(size);
        }}
        textWidth="50px"
      />
    </HorizontalWrapper>
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
    <FlexWrapper direction="row" gap={20} justify="flex-end">
      <PageSizeSetting handlePageSizeChange={handlePageSizeChange} />
    </FlexWrapper>
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
    <HorizontalWrapper width={408} justify="flex-end">
      <SearchBar handleSearch={handleSearch} />
    </HorizontalWrapper>
  </FlexWrapper>
);

const Notice = () => {
  const router = useRouter();
  // const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [allNotice, setAllNotice] = useState<NoticeRow[]>(() =>
    getStoredNoticeList(),
  );
  const [searchedNotice, setSearchedNotice] = useState<NoticeRow[]>([]);
  const [shownNotice, setShownNotice] = useState<NoticeRow[]>([]);

  const handlePageChange = (newPageIndex: number) => {
    setPageIndex(newPageIndex);
    const start = (newPageIndex - 1) * pageSize;
    const end = start + pageSize;
    setShownNotice(allNotice.slice(start, end));
  };

  const handleSearch = (searchText: string) => {
    const filtered = allNotice.filter(
      notice =>
        notice.content.toLowerCase().includes(searchText.toLowerCase()) ||
        notice.tag?.toLowerCase().includes(searchText.toLowerCase()),
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
    const savedNotices = getStoredNoticeList();
    setAllNotice(savedNotices);
    setSearchedNotice(savedNotices);
    const start = (pageIndex - 1) * pageSize;
    const end = start + pageSize;
    setShownNotice(savedNotices.slice(start, end));
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        NOTICE_STORAGE_KEY,
        JSON.stringify(allNotice),
      );
    }
  }, [allNotice]);

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
        <FlexWrapper direction="row" gap={10} justify="flex-end">
          <ModalTableButton
            buttonText="작성"
            type="default"
            onClick={() => router.push("/notice/create")}
          />
        </FlexWrapper>
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
