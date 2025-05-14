import React, { useEffect, useState } from "react";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "@sparcs-students/web/common/components/Table/Table";
import TableTextInput from "@sparcs-students/web/common/components/Forms/TableTextInput";
import Button from "@sparcs-students/web/common/components/Buttons/Button";

const TableTextInputCell: React.FC<{
  member: OperatingCommitteeMemberProps;
}> = ({ member }) => {
  const [tmpRegulation, setTmpRegulation] = useState("");

  return (
    <TableTextInput
      placeholder="내용을 입력해주세요."
      value={tmpRegulation}
      handleChange={newString => {
        setTmpRegulation(newString);
        Object.assign(member, { regulation: newString });
      }}
    />
  );
};

const renderRegulationCell = (member: OperatingCommitteeMemberProps) => (
  <TableTextInputCell member={member} />
);

export interface OperatingCommitteeMemberProps {
  id: string;
  name: string;
  regulation: string;
}

interface OperatingCommitteeMemberTableProps {
  data: OperatingCommitteeMemberProps[];
}

const OperatingCommitteeMemberTable: React.FC<
  OperatingCommitteeMemberTableProps
> = ({ data }) => {
  const [loaded, setLoaded] = useState(false);
  const tmpData = data;

  const columnHelper = createColumnHelper<OperatingCommitteeMemberProps>();

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
    columnHelper.accessor("regulation", {
      id: "regulation",
      header: "규정",
      cell: info => {
        const specificData = tmpData.find(
          member => member.id === info.row.original.id,
        );
        if (!specificData) return null;

        return renderRegulationCell(specificData);
      },
      size: 975,
    }),
  ];

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
        <FlexWrapper direction="row" gap={0} justify="space-between">
          <Typography fs={20} lh={28} color="BLACK" fw="SEMIBOLD">
            운영 위원 명단
          </Typography>
          <Button
            buttonText="저장"
            style={{ width: "60px", padding: "5px 0px", fontSize: "14px" }}
            onClick={() => {
              console.log(tmpData);
            }}
          />
        </FlexWrapper>
      </FlexWrapper>
      {loaded && (
        <Table table={table} emptyMessage="운영위원 정보가 없습니다." />
      )}
    </FlexWrapper>
  );
};

export default OperatingCommitteeMemberTable;
