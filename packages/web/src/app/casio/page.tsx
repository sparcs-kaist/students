"use client";

import React, { useState } from "react";
import {
  useReactTable,
  createColumnHelper,
  getCoreRowModel,
} from "@tanstack/react-table";
import SortableTable from "@sparcs-students/web/common/components/Table/SortableTable";

interface Person {
  id: string;
  name: string;
  age: number;
}

const columnHelper = createColumnHelper<Person>();

const columns = [
  columnHelper.accessor("name", {
    header: "이름",
    cell: info => info.getValue(),
  }),
  columnHelper.accessor("age", {
    header: "나이",
    cell: info => info.getValue(),
    size: 0,
    minSize: 100,
  }),
];

const SortableTableExample = () => {
  // 초기 데이터
  const [data, setData] = useState<Person[]>([
    { id: "1", name: "철수", age: 25 },
    { id: "2", name: "영희", age: 30 },
    { id: "3", name: "민수", age: 22 },
  ]);

  // 테이블 생성
  const table = useReactTable({
    data,
    columns,
    getRowId: row => row.id,
    getCoreRowModel: getCoreRowModel(),
  });

  // 순서 변경 콜백
  const handleReorder = (newRows: Person[]) => {
    setData(newRows);
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <SortableTable
        table={table}
        minWidth={300}
        onReorder={handleReorder}
        emptyMessage="데이터가 없습니다"
      />
    </div>
  );
};

export default SortableTableExample;
