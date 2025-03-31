import React, { useEffect, useState } from "react";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "@sparcs-students/web/common/components/Table/Table";
import GroupsTag from "@sparcs-students/web/common/components/Tag/GroupsTag";

export interface MemberProps {
  id: string;
  name: string;
  groups: string[];
}

interface MemberTableProps {
  data: MemberProps[];
}

const columnHelper = createColumnHelper<MemberProps>();

const columns = [
  columnHelper.accessor("id", {
    id: "id",
    header: "학번",
    cell: info => info.getValue(),
    size: 450,
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "이름",
    cell: info => info.getValue(),
    size: 450,
  }),
  columnHelper.accessor("groups", {
    id: "groups",
    header: "소속 부서",
    cell: info => (
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {info.getValue().length === 0 ? (
          <GroupsTag color="GRAY" isDropdown={false}>
            미소속
          </GroupsTag>
        ) : (
          info.getValue().map((group, index) => (
            <GroupsTag key={index} color="GREEN100" isDropdown={false}>
              {group}
            </GroupsTag>
          ))
        )}
      </div>
    ),
    size: 975,
  }),
];

const MemberTable: React.FC<MemberTableProps> = ({ data }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <FlexWrapper direction="column" gap={16}>
      <FlexWrapper direction="row" gap={12}>
        <Typography fs={20} lh={28} color="BLACK" fw="SEMIBOLD">
          위원 명단
        </Typography>
      </FlexWrapper>
      {loaded && (
        <Table table={table} emptyMessage="운영위원 정보가 없습니다." />
      )}
    </FlexWrapper>
  );
};

export default MemberTable;
