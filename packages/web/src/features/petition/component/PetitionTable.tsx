import React, { useEffect, useState } from "react";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Table from "@sparcs-students/web/common/components/Table/Table";
import styled from "styled-components";
import { PetitionStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum/petition.enum";
import PetitionStatus from "@sparcs-students/web/features/petition/component/PetitionStatus";
import SortButton from "@sparcs-students/web/features/petition/component/SortButton";

const ButtonWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

export interface PetitionProps {
  id: number;
  status: PetitionStatusEnum;
  title: string;
  supportCount: number;
  postDate: string;
}

interface PetitionTableProps {
  data: PetitionProps[];
}

const PetitionStatusCell = (status: PetitionStatusEnum) => (
  <PetitionStatus status={status} />
);

const PetitionTable: React.FC<PetitionTableProps> = ({ data }) => {
  const [loaded, setLoaded] = useState(false);
  const [isNewest, setIsNewest] = useState(true);

  const columnHelper = createColumnHelper<PetitionProps>();

  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      header: "번호",
      cell: info => info.getValue(),
      size: 60,
    }),
    columnHelper.accessor("status", {
      id: "status",
      header: "상태",
      cell: info => PetitionStatusCell(info.getValue()),
      size: 136,
    }),
    columnHelper.accessor("title", {
      id: "title",
      header: "제목",
      cell: info => info.getValue(),
      size: 0,
    }),
    columnHelper.accessor("supportCount", {
      id: "supportCount",
      header: "동의 인원",
      cell: info => `${info.getValue()}명`,
      size: 115,
    }),
    columnHelper.accessor("postDate", {
      id: "postDate",
      header: "게시일",
      cell: info => info.getValue(),
      size: 115,
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
    <FlexWrapper direction="column" gap={20}>
      <ButtonWrapper>
        <SortButton isNewest={isNewest} setIsNewest={setIsNewest} />
      </ButtonWrapper>
      {loaded && <Table table={table} />}
    </FlexWrapper>
  );
};

export default PetitionTable;
