import { useCallback, useEffect, useRef, useState } from "react";

import isPropValid from "@emotion/is-prop-valid";
import {
  flexRender,
  Row,
  type Table as TableType,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import Icon from "@sparcs-students/web/common/components/Icon";
import GroupsTag, {
  MemberProps,
} from "@sparcs-students/web/common/components/Tag/GroupsTag";
import TableCell from "@sparcs-students/web/common/components/Table/TableCell";
import Typography from "@sparcs-students/web/common/components/Typography";

interface TableProps<T> {
  table: TableType<T>;
  minWidth?: number;
  height?: number;
  emptyMessage?: string;
  footer?: React.ReactNode;
  rowLink?: (row: T) => string | { pathname: string };
  onClick?: (row: T) => void;
  rowStyleResolver?: (row: T) => React.CSSProperties;
  editData?: MemberProps[];
  setEditData?: React.Dispatch<React.SetStateAction<MemberProps[]>>;
}
const TableWrapper = styled.div`
  width: 100%;
  padding: 0;
  //width: calc(100% + (100vw - 100%));
  //padding: 0 calc((100vw - 100%) / 2);
  /* overflow-x: auto; */
`;

const TableInner = styled.table.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ height?: number; minWidth: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: ${({ minWidth }) => `max(100%, ${minWidth}px)`};
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-radius: 4px;
  border-spacing: 0;
  /* height: ${({ height }) => (height ? `${height}px` : "fit-content")}; */
  table-layout: fixed;
  width: 100%;
`;
const Header = styled.thead`
  overflow: hidden;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
`;
const HeaderRow = styled.tr`
  display: flex;
  width: 100%;
`;
const Content = styled.tbody`
  display: block;
  flex: 1;
  // overflow: hidden;
  width: 100%;
  height: fit-content;
`;

const ContentRow = styled.tr.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ selected: boolean; isClickable: boolean }>`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  cursor: ${({ isClickable }) => (isClickable ? "pointer" : "default")};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.GREEN[100] : "transparent"};
  /* overflow: hidden; */
  white-space: nowrap;
  text-overflow: ellipsis;
  height: fit-content;
`;

const EmptyCenterPlacer = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
`;

const DropdownHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  width: 100%;
  padding: 12px;
  gap: 10px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-top: none;
  border-radius: 4px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
  background-color: ${({ theme }) => theme.colors.GRAY[50]};
  z-index: 5;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const GroupDropdownCell = <T extends { id: string; groups: string[] }>({
  row,
  editData,
  setEditData,
}: {
  row: Row<T>;
  editData: MemberProps[];
  setEditData: React.Dispatch<React.SetStateAction<MemberProps[]>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownOpen = () => {
    setIsOpen(prev => !prev);
  };
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // 임시 부서 이름 목록
  const testGroups = [
    "이름이 긴 부서 1",
    "어쩌구 부서 1",
    "어쩌구 부서 2",
    "어쩌구 부서 3",
    "이름이 굉장히 긴 어떤 부서 예시",
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  // TODO: 임시로 부서 이름 스트링을 기준으로 구현했는데, 추후 백엔드 구현 방식에 따라 id 이용해서 구현하는 게 나을 듯. 그때 되면 타입도 수정.
  const groupClick = (selectedGroup: string) => {
    // TODO: console에 띄우기 위해 임시 변수 설정.
    const updated = editData.map(member => {
      if (member.id !== row.original.id) return member;
      if (selectedGroup === "미소속") {
        return {
          ...member,
          groups: [],
        };
      }
      return {
        ...member,
        groups: member.groups.includes(selectedGroup)
          ? member.groups.filter((group: string) => group !== selectedGroup)
          : [...member.groups, selectedGroup],
      };
    });

    setEditData(updated);
    console.log(updated);
  };

  return (
    <>
      <DropdownHeader onClick={dropdownOpen} style={{ cursor: "pointer" }}>
        <Icon
          type={isOpen ? "keyboard_arrow_up" : "keyboard_arrow_down"}
          size={20}
        />
      </DropdownHeader>
      {isOpen && (
        <Dropdown ref={dropdownRef}>
          {testGroups.map((group, index) => (
            <GroupsTag
              key={index}
              color="GREEN100"
              rowId={row.original.id}
              editData={editData}
              onClick={() => {
                groupClick(group);
              }}
              isDropdown
            >
              {group}
            </GroupsTag>
          ))}
          <GroupsTag
            color="GRAY"
            onClick={() => {
              groupClick("미소속");
            }}
            rowId={row.original.id}
            editData={editData}
            isDropdown
            isNotAssigned
          >
            미소속
          </GroupsTag>
        </Dropdown>
      )}
    </>
  );
};

const MemberEditableTable = <T extends { id: string; groups: string[] }>({
  table,
  minWidth = 400,
  height = undefined,
  emptyMessage = "내역이 없습니다",
  footer = null,
  rowLink = undefined,
  onClick = undefined,
  rowStyleResolver = undefined,
  editData = [],
  setEditData = undefined,
}: TableProps<T>) => {
  // 야매로 min-width 바꿔치기 (고치지 마세요)
  // eslint-disable-next-line no-underscore-dangle
  table._getColumnDefs().forEach(column => {
    // eslint-disable-next-line no-param-reassign
    column.minSize = 0;
  });
  const router = useRouter();
  const handleRowClick = useCallback(
    (row: T) => {
      if (rowLink) {
        const link = rowLink(row);
        if (link) {
          if (typeof link === "string") {
            router.push(link);
          } else if (link?.pathname) {
            router.push(link.pathname);
          }
        }
      }
      if (onClick) {
        onClick(row);
      }
    },
    [rowLink, onClick, router],
  );

  return (
    <TableWrapper>
      <TableInner height={height} minWidth={minWidth}>
        <Header>
          {table.getHeaderGroups().map(headerGroup => (
            <HeaderRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                if (header.isPlaceholder) {
                  return null;
                }
                if (header.column.getCanSort()) {
                  return (
                    <TableCell
                      key={header.id}
                      width={header.column.getSize()}
                      type="HeaderSort"
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                    </TableCell>
                  );
                }
                return (
                  <TableCell
                    key={header.id}
                    width={header.column.getSize()}
                    type="Header"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </TableCell>
                );
              })}
            </HeaderRow>
          ))}
        </Header>
        <Content>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map(row => {
              // 표 스타일 디자인과 맞추기
              const style = rowStyleResolver
                ? rowStyleResolver(row.original)
                : undefined;
              return (
                <ContentRow
                  key={row.id}
                  selected={row.getIsSelected()}
                  isClickable={!!rowLink || !!onClick}
                  onClick={() => handleRowClick(row.original)}
                  style={style}
                >
                  {row.getVisibleCells().map(cell =>
                    cell.column.columnDef.header === "소속 부서" ? (
                      <TableCell
                        key={cell.id}
                        width={cell.column.getSize()}
                        type="Icon"
                        icon={
                          <GroupDropdownCell
                            row={row}
                            editData={editData}
                            setEditData={setEditData!}
                          />
                        }
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ) : (
                      <TableCell
                        key={cell.id}
                        width={cell.column.getSize()}
                        type="Default"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ),
                  )}
                </ContentRow>
              );
            })
          ) : (
            <EmptyCenterPlacer>
              <Typography
                fs={16}
                lh={24}
                color="GRAY.200"
                ff="PRETENDARD"
                fw="REGULAR"
              >
                {emptyMessage}
              </Typography>
            </EmptyCenterPlacer>
          )}
          {footer}
        </Content>
      </TableInner>
    </TableWrapper>
  );
};
export default MemberEditableTable;
