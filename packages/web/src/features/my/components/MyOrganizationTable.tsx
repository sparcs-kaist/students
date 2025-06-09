/* eslint-disable import/no-relative-packages */
/* eslint-disable no-restricted-imports */
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import LightTag, {
  LightTagColor,
} from "@sparcs-students/web/common/components/Tag/LightTag";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Table from "@sparcs-students/web/common/components/Table/Table";
import { useEffect, useState } from "react";
import Typography from "@sparcs-students/web/common/components/Typography";
import styled from "styled-components";
import Button from "@sparcs-students/web/common/components/Buttons/Button";

import {
  getOrgainizationRoleTag,
  getOrganizationRegisterStatusTag,
} from "@sparcs-students/web/common/util/tableTagList";
import {
  OrganizationRegisterStatusEnum,
  OrganizationRoleTypeEnum,
} from "../../../../../interface/src/common/enum/organization.enum";

export interface OrgainzationProps {
  id: number;
  name: string;
  role: OrganizationRoleTypeEnum;
  status: OrganizationRegisterStatusEnum;
  startDate: Date | null;
  endDate: Date | null;
}

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const columnHelper = createColumnHelper<OrgainzationProps>();

const getColumns = () => [
  columnHelper.accessor("name", {
    id: "name",
    header: "단체명",
    cell: info => info.getValue(),
    size: 0,
    minSize: 200,
  }),
  columnHelper.accessor("role", {
    id: "role",
    header: "직책",
    cell: info => {
      const { color, text } = getOrgainizationRoleTag(info.getValue());
      return <LightTag color={color as LightTagColor}>{text}</LightTag>;
    },
    size: 0,
    minSize: 160,
  }),
  columnHelper.accessor("status", {
    id: "status",
    header: "현황",
    cell: info => {
      const { color, text } = getOrganizationRegisterStatusTag(info.getValue());
      return <LightTag color={color as LightTagColor}>{text}</LightTag>;
    },
    size: 120,
  }),
  columnHelper.accessor("startDate", {
    id: "startDate",
    header: "임기 시작일",
    cell: info => {
      const date = info.getValue();
      if (!date) return "-";

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}.${month}.${day}`;
    },
    size: 120,
  }),
  columnHelper.accessor("endDate", {
    id: "endDate",
    header: "임기 종료일",
    cell: info => {
      const date = info.getValue();
      if (!date) return "-";

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}.${month}.${day}`;
    },
    size: 120,
  }),
];

const MyOrganizationTable: React.FC = () => {
  const data: OrgainzationProps[] = [
    {
      id: 1,
      name: "산업디자인학과",
      role: OrganizationRoleTypeEnum.Member,
      status: OrganizationRegisterStatusEnum.Rejected,
      startDate: new Date(),
      endDate: null,
    },
  ];

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const columns = getColumns();
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  return (
    <FlexWrapper direction="column" gap={16}>
      <TitleWrapper>
        <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
          나의 단체
        </Typography>
        <Button onClick={() => {}}>단체 가입</Button>
      </TitleWrapper>
      {loaded && <Table table={table} emptyMessage="테이블 정보가 없습니다." />}
    </FlexWrapper>
  );
};

export default MyOrganizationTable;
