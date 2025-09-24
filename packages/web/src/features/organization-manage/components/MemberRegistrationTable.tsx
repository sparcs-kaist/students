import React, { useEffect, useState } from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "@sparcs-students/web/common/components/Table/Table";
import LightTag, {
  LightTagColor,
} from "@sparcs-students/web/common/components/Tag/LightTag";
import {
  getMemberRegistrationTag,
  memberRoleTagList,
} from "@sparcs-students/web/common/util/tableTagList";
import {
  MemberRegistrationEnum,
  MemberRoleEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum/organization.enum";
import TextButton from "@sparcs-students/web/common/components/Buttons/TextButton";
import TagSelect from "@sparcs-students/web/common/components/Selects/TagSelect";
import styled from "styled-components";

export interface MemberReviewProps {
  id: number; // 번호
  studentNumber: number; // 학번
  name: string; // 이름
  role: MemberRoleEnum; // 직책
  status: MemberRegistrationEnum; // 검토 여부
}

interface MemberReviewTableProps {
  initialData: MemberReviewProps[];
  onRoleUpdate: (params: { id: number; newRole: MemberRoleEnum }) => void;
  onStatusUpdate: (params: {
    id: number;
    newStatus: MemberRegistrationEnum;
  }) => void;
}

const columnHelper = createColumnHelper<MemberReviewProps>();

const getColumns = (
  handleRoleChange: (id: number, newRole: MemberRoleEnum) => void,
  handleStatusChange: (id: number, newStatus: MemberRegistrationEnum) => void,
) => [
  columnHelper.accessor("id", {
    id: "id",
    header: "번호",
    cell: info => info.getValue(),
    size: 80,
  }),
  columnHelper.accessor("studentNumber", {
    id: "studentNumber",
    header: "학번",
    cell: info => info.getValue(),
    size: 0,
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "이름",
    cell: info => info.getValue(),
    size: 0,
  }),
  columnHelper.accessor("role", {
    id: "role",
    header: "직책 선택",
    cell: info => {
      const memberRoleList = Object.entries(memberRoleTagList).map(
        ([key, { text, color }]) => {
          const value = () => {
            switch (key) {
              case "1":
                return MemberRoleEnum.Chief;
              case "2":
                return MemberRoleEnum.Vice;
              case "3":
                return MemberRoleEnum.Editor;
              default:
                return MemberRoleEnum.Member;
            }
          };
          return {
            label: text,
            value: value(),
            color,
          };
        },
      );
      const row = info.row.original;
      return (
        <div
          style={{
            justifyContent: "center",
          }}
        >
          <TagSelect<MemberRoleEnum>
            items={memberRoleList.slice(0, 4)}
            value={info.getValue() || "-"}
            onChange={newValue => {
              handleRoleChange(row.id, newValue);
            }}
            errorMessage="필수 항목입니다."
            width="100px"
          />
        </div>
      );
    },
    size: 0,
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: "검토 여부",
    cell: info => {
      const { color, text } = getMemberRegistrationTag(info.getValue());
      return (
        <LightTag color={color as LightTagColor} width="96px">
          {text}
        </LightTag>
      );
    },
    size: 0,
  }),
  columnHelper.accessor("status", {
    id: "actions",
    header: "검토",
    cell: info => {
      const row = info.row.original;
      return (
        <FlexWrapper
          direction="row"
          gap={24}
          style={{ justifyContent: "center" }}
        >
          <TextButton
            text="승인"
            color="blue"
            onClick={() =>
              handleStatusChange(row.id, MemberRegistrationEnum.Approved)
            }
          />
          <TextButton
            text="반려"
            color="red"
            onClick={() =>
              handleStatusChange(row.id, MemberRegistrationEnum.Rejected)
            }
          />
        </FlexWrapper>
      );
    },
    size: 160,
  }),
];

const TableWrapper = styled.div`
  position: relative;
  &,
  & * {
    overflow: visible !important;
  }
`;

const MemberRegistrationTable: React.FC<MemberReviewTableProps> = ({
  initialData,
  onRoleUpdate,
  onStatusUpdate,
}) => {
  const [data, setData] = useState(initialData);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleRoleChange = (id: number, newRole: MemberRoleEnum) => {
    setData(prev =>
      prev.map(item => (item.id === id ? { ...item, role: newRole } : item)),
    );
    onRoleUpdate({ id, newRole });
  };

  const handleStatusChange = (
    id: number,
    newStatus: MemberRegistrationEnum,
  ) => {
    setData(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: newStatus } : item,
      ),
    );
    onStatusUpdate({ id, newStatus });
  };

  const columns = getColumns(handleRoleChange, handleStatusChange);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <TableWrapper>
      {loaded && <Table table={table} emptyMessage="테이블 정보가 없습니다." />}
    </TableWrapper>
  );
};

export default MemberRegistrationTable;
