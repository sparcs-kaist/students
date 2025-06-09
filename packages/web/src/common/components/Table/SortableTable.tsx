import { useCallback, useState } from "react";

import isPropValid from "@emotion/is-prop-valid";
import {
  flexRender,
  Row,
  type Table as TableType,
} from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import TableCell from "./TableCell";
import Typography from "../Typography";

interface SortableRowProps<T> {
  row: Row<T>;
  onClick?: (row: T) => void;
  style?: React.CSSProperties;
}

interface TableProps<T> {
  table: TableType<T>;
  minWidth?: number;
  height?: number;
  emptyMessage?: string;
  footer?: React.ReactNode;
  rowLink?: (row: T) => string | { pathname: string };
  onClick?: (row: T) => void;
  rowStyleResolver?: (row: T) => React.CSSProperties;
  onReorder?: (rows: T[]) => void; // Optional: external reorder callback
}

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
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
  overflow: hidden;
  border-spacing: 0;
  table-layout: fixed;
  width: fit-content;
`;

const Header = styled.thead`
  display: flex;
  width: 100%;
`;

const HeaderRow = styled.tr`
  display: flex;
  width: 100%;
`;

const Content = styled.tbody`
  display: block;
  flex: 1;
  overflow-y: visible;
  width: 100%;
`;

const ContentRow = styled.tr.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ selected: boolean; isClickable: boolean }>`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  cursor: ${({ isClickable }) => (isClickable ? "grab" : "default")};
  background-color: ${({ selected, theme }) =>
    selected ? theme.colors.GREEN[100] : "transparent"};
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const EmptyCenterPlacer = styled.div`
  height: 100%;
  display: flex;
  flex: 1;
  padding: 12px 20px;
  justify-content: center;
  align-items: center;
`;

const SortableRow = <T,>({ row, onClick = () => {} }: SortableRowProps<T>) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: row.id });

  const rowStyle: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <ContentRow
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      selected={row.getIsSelected()}
      isClickable={!!onClick}
      onClick={() => onClick?.(row.original)}
      style={rowStyle}
    >
      {row.getVisibleCells().map(cell => (
        <TableCell key={cell.id} width={cell.column.getSize()} type="Default">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </ContentRow>
  );
};

const SortableTable = <T,>({
  table,
  minWidth = 400,
  height = undefined,
  emptyMessage = "내역이 없습니다",
  footer = null,
  rowLink = undefined,
  onClick = undefined,
  rowStyleResolver = undefined,
  onReorder = () => {},
}: TableProps<T>) => {
  const [rows, setRows] = useState(() => table.getRowModel().rows);
  const router = useRouter();

  // 야매로 min-width 바꿔치기 (고치지 마세요)
  // eslint-disable-next-line no-underscore-dangle
  table._getColumnDefs().forEach(column => {
    // eslint-disable-next-line no-param-reassign
    column.minSize = 0;
  });

  const handleRowClick = useCallback(
    (row: T) => {
      if (rowLink) {
        const link = rowLink(row);
        if (typeof link === "string") {
          router.push(link);
        } else if (link?.pathname) {
          router.push(link.pathname);
        }
      }
      if (onClick) {
        onClick(row);
      }
    },
    [rowLink, onClick, router],
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = rows.findIndex(row => row.id === active.id);
    const newIndex = rows.findIndex(row => row.id === over.id);
    const newRows = arrayMove(rows, oldIndex, newIndex);
    setRows(newRows);
    if (onReorder) {
      onReorder(newRows.map(r => r.original));
    }
  };

  return (
    <TableWrapper>
      <TableInner height={height} minWidth={minWidth}>
        <Header>
          {table.getHeaderGroups().map(headerGroup => (
            <HeaderRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                if (header.isPlaceholder) return null;
                const commonProps = {
                  key: header.id,
                  width: header.column.getSize(),
                  minWidth: header.column.columnDef.minSize,
                };
                return (
                  <TableCell {...commonProps} type="Header">
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
          {rows.length ? (
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={rows.map(row => row.id)}
                strategy={verticalListSortingStrategy}
              >
                {rows.map(row => {
                  const style = rowStyleResolver?.(row.original);
                  return (
                    <SortableRow
                      key={row.id}
                      row={row}
                      onClick={handleRowClick}
                      style={style}
                    />
                  );
                })}
              </SortableContext>
            </DndContext>
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

export default SortableTable;
