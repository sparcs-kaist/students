"use client";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import SingleColumnTable from "@sparcs-students/web/common/components/Table/SingleColumnTable";
import React, { useEffect, useRef, useState } from "react";
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
  NOTICE_LIST_STATE_KEY,
  NOTICE_LIST_RESTORE_KEY,
} from "@sparcs-students/web/features/notice/noticeData";

interface NoticeListState {
  pageIndex: number;
  pageSize: number;
  searchText: string;
}

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

const SearchFieldWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const ClearSearchButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: transparent;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const SearchBar = ({
  handleSearch,
  searchInputText,
  setSearchInputText,
}: {
  handleSearch: (searchText: string) => void;
  searchInputText: string;
  setSearchInputText: (searchText: string) => void;
}) => {
  const runSearch = () => {
    handleSearch(searchInputText);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      runSearch();
    }
  };

  const handleClear = () => {
    setSearchInputText("");
    handleSearch("");
  };

  return (
    <FlexWrapper
      direction="row"
      gap={10}
      justify="flex-end"
      alignItems="center"
    >
      <Icon type="search" size={28} />
      <SearchFieldWrapper>
        <TextInput
          placeholder="키워드로 검색"
          value={searchInputText}
          handleChange={setSearchInputText}
          onKeyDown={handleKeyDown}
          style={{ paddingRight: 32 }}
        />
        {searchInputText && (
          <ClearSearchButton type="button" onClick={handleClear}>
            <Icon type="close" size={18} color="#9B9B9B" />
          </ClearSearchButton>
        )}
      </SearchFieldWrapper>
      <ModalTableButton buttonText="검색" onClick={runSearch} />
    </FlexWrapper>
  );
};

const PageSizeSetting = ({
  handlePageSizeChange,
  pageSize,
}: {
  handlePageSizeChange: (newPageSize: number) => void;
  pageSize: number;
}) => {
  const PageSizeList = [5, 10, 15, 20, 30, 50, 100];
  const PageSizeItems = PageSizeList.map(size => ({
    label: size.toString().concat("건"),
    value: size.toString(),
  }));

  return (
    <HorizontalWrapper width={113}>
      <Select
        items={PageSizeItems}
        value={pageSize.toString()}
        onChange={newSize => {
          const size = Number(newSize);
          handlePageSizeChange(size);
        }}
        textWidth="50px"
      />
    </HorizontalWrapper>
  );
};

const SmallFrame = ({
  handleSearch,
  searchInputText,
  setSearchInputText,
  handlePageSizeChange,
  pageSize,
}: {
  handleSearch: (searchText: string) => void;
  searchInputText: string;
  setSearchInputText: (searchText: string) => void;
  handlePageSizeChange: (newPageSize: number) => void;
  pageSize: number;
}) => (
  <FlexWrapper direction="column" gap={20}>
    <SearchBar
      handleSearch={handleSearch}
      searchInputText={searchInputText}
      setSearchInputText={setSearchInputText}
    />
    <FlexWrapper direction="row" gap={20} justify="flex-end">
      <PageSizeSetting
        handlePageSizeChange={handlePageSizeChange}
        pageSize={pageSize}
      />
    </FlexWrapper>
  </FlexWrapper>
);

const LargeFrame = ({
  handleSearch,
  searchInputText,
  setSearchInputText,
  handlePageSizeChange,
  pageSize,
}: {
  handleSearch: (searchText: string) => void;
  searchInputText: string;
  setSearchInputText: (searchText: string) => void;
  handlePageSizeChange: (newPageSize: number) => void;
  pageSize: number;
}) => (
  <FlexWrapper
    direction="row"
    gap={20}
    justify="space-between"
    alignItems="center"
  >
    <PageSizeSetting
      handlePageSizeChange={handlePageSizeChange}
      pageSize={pageSize}
    />
    <HorizontalWrapper width={408} justify="flex-end">
      <SearchBar
        handleSearch={handleSearch}
        searchInputText={searchInputText}
        setSearchInputText={setSearchInputText}
      />
    </HorizontalWrapper>
  </FlexWrapper>
);

const Notice = () => {
  const router = useRouter();
  // const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchText, setSearchText] = useState("");
  const [searchInputText, setSearchInputText] = useState("");
  const [isListStateInitialized, setIsListStateInitialized] = useState(false);
  const hasInitializedListState = useRef(false);
  const [allNotice, setAllNotice] = useState<NoticeRow[]>(() =>
    getStoredNoticeList(),
  );
  const [searchedNotice, setSearchedNotice] = useState<NoticeRow[]>([]);
  const [shownNotice, setShownNotice] = useState<NoticeRow[]>([]);

  const currentNotice = searchText.trim() ? searchedNotice : allNotice;

  const syncPageData = (
    source: NoticeRow[],
    nextPageIndex: number,
    nextPageSize: number,
  ) => {
    const totalPages = Math.max(
      1,
      Math.ceil(source.length / nextPageSize || 1),
    );
    const safePageIndex = Math.min(Math.max(1, nextPageIndex), totalPages);

    const start = (safePageIndex - 1) * nextPageSize;
    const end = start + nextPageSize;

    setPageIndex(safePageIndex);
    setShownNotice(source.slice(start, end));
  };

  const handlePageChange = (newPageIndex: number) => {
    syncPageData(currentNotice, newPageIndex, pageSize);
  };

  const handleSearch = (nextSearchText: string) => {
    const trimmed = nextSearchText.trim();
    const filtered = trimmed
      ? allNotice.filter(
          notice =>
            notice.content.toLowerCase().includes(trimmed.toLowerCase()) ||
            notice.tag?.toLowerCase().includes(trimmed.toLowerCase()),
        )
      : allNotice;

    setSearchText(trimmed);
    setSearchInputText(trimmed);
    setSearchedNotice(filtered);
    syncPageData(filtered, 1, pageSize);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    syncPageData(currentNotice, 1, newPageSize);
  };

  const saveListStateBeforeNoticeNavigation = () => {
    const listState: NoticeListState = { pageIndex, pageSize, searchText };
    window.sessionStorage.setItem(
      NOTICE_LIST_STATE_KEY,
      JSON.stringify(listState),
    );
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
    if (hasInitializedListState.current) {
      return;
    }
    hasInitializedListState.current = true;

    const savedNotices = getStoredNoticeList();
    setAllNotice(savedNotices);

    // Restore the previous list view (search / page / page size) only when the
    // user came back from a detail page via "목록으로". Otherwise — entering via
    // the top nav, breadcrumb, or after creating a notice — show the full list.
    let restoredState: NoticeListState | null = null;
    if (typeof window !== "undefined") {
      const shouldRestore =
        window.sessionStorage.getItem(NOTICE_LIST_RESTORE_KEY) === "1";
      window.sessionStorage.removeItem(NOTICE_LIST_RESTORE_KEY);

      if (shouldRestore) {
        try {
          const raw = window.sessionStorage.getItem(NOTICE_LIST_STATE_KEY);
          if (raw) {
            restoredState = JSON.parse(raw) as NoticeListState;
          }
        } catch {
          restoredState = null;
        }
      } else {
        window.sessionStorage.removeItem(NOTICE_LIST_STATE_KEY);
      }
    }

    if (restoredState) {
      const trimmed = restoredState.searchText.trim();
      const filtered = trimmed
        ? savedNotices.filter(
            notice =>
              notice.content.toLowerCase().includes(trimmed.toLowerCase()) ||
              notice.tag?.toLowerCase().includes(trimmed.toLowerCase()),
          )
        : savedNotices;

      setSearchText(trimmed);
      setSearchInputText(trimmed);
      setSearchedNotice(filtered);
      setPageSize(restoredState.pageSize);
      syncPageData(filtered, restoredState.pageIndex, restoredState.pageSize);
    } else {
      setSearchedNotice(savedNotices);
      syncPageData(savedNotices, 1, 10);
    }

    setIsListStateInitialized(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(
        NOTICE_STORAGE_KEY,
        JSON.stringify(allNotice),
      );
    }
  }, [allNotice]);

  useEffect(() => {
    if (typeof window === "undefined" || !isListStateInitialized) {
      return;
    }
    const listState: NoticeListState = { pageIndex, pageSize, searchText };
    window.sessionStorage.setItem(
      NOTICE_LIST_STATE_KEY,
      JSON.stringify(listState),
    );
  }, [isListStateInitialized, pageIndex, pageSize, searchText]);

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
            searchInputText={searchInputText}
            setSearchInputText={setSearchInputText}
            handlePageSizeChange={handlePageSizeChange}
            pageSize={pageSize}
          />
        )}
        {!isMobile && (
          <LargeFrame
            handleSearch={handleSearch}
            searchInputText={searchInputText}
            setSearchInputText={setSearchInputText}
            handlePageSizeChange={handlePageSizeChange}
            pageSize={pageSize}
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
          header={`총 ${currentNotice.length}건`}
          rows={shownNotice}
          mini={isMobile}
          buttonEnable={false}
          onRowNavigate={saveListStateBeforeNoticeNavigation}
        />
        <Pagination
          currentPageIndex={pageIndex}
          totalCount={currentNotice.length}
          pageSize={pageSize}
          groupSize={10}
          onPageIndexChange={handlePageChange}
        />
      </FlexWrapper>
    </FlexWrapper>
  );
};

export default Notice;
