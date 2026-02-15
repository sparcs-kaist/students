import Button from "@sparcs-students/web/common/components/Buttons/Button";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Icon from "@sparcs-students/web/common/components/Icon";
import Modal from "@sparcs-students/web/common/components/Modal";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import TableCell from "@sparcs-students/web/common/components/Table/TableCell";
import Typography from "@sparcs-students/web/common/components/Typography";
import CommitteeNameButton from "@sparcs-students/web/features/organization-manage/components/_atomic/CommitteeNameButton";
import {
  Row,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useParams, useRouter } from "next/navigation";
import { overlay } from "overlay-kit";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

export interface CommitteeProps {
  id: number;
  name: string;
  leader: string;
  headcount: number;
  description: string;
}

interface ManageCommitteeTableProps {
  name: string;
  data: CommitteeProps[];
}

const TableWrapper = styled.div`
  width: 100%;
  padding: 0;
`;

const TableInner = styled.table`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-radius: 4px;
  border-spacing: 0;
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
  width: 100%;
  height: fit-content;
`;

const ContentRow = styled.tr`
  width: 100%;
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  background-color: transparent;
  white-space: nowrap;
  text-overflow: ellipsis;
  height: 50px;
`;

const ButtonWrapper = styled.div`
  padding-top: 32px;
  display: flex;
  flex: 1;
  justify-content: center;
`;

const DeleteCell: React.FC<{
  id: number;
  name: string;
  onDelete: (id: number) => void;
}> = ({ id, name, onDelete }) => {
  const openDeleteModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <CancellableModalContent
          onConfirm={() => {
            onDelete(id);
            close();
          }}
          onClose={() => close()}
        >
          <Typography fs={20} lh={28} color="BLACK" fw="SEMIBOLD">
            <b>{name}</b>
          </Typography>
          <Typography fs={20} lh={28} color="BLACK" fw="REGULAR">
            부서/TF를 삭제하시겠습니까?
          </Typography>
        </CancellableModalContent>
      </Modal>
    ));
  };

  return (
    <Icon type="delete" size={16} onClick={openDeleteModal} color="BLACK" />
  );
};

const renderDeleteCell =
  (onDelete: (id: number) => void) =>
  ({ row }: { row: Row<CommitteeProps> }) => (
    <DeleteCell
      id={row.original.id}
      onDelete={onDelete}
      name={row.original.name}
    />
  );

const NameCell: React.FC<{ id: number; departmentName: string }> = ({
  id,
  departmentName,
}) => {
  const router = useRouter();
  const params = useParams();
  return (
    <CommitteeNameButton
      text={departmentName}
      onClick={() => {
        router.push(`/organization-manage/${params.id}/departments/${id}`);
      }}
    />
  );
};

const renderNameCell = ({
  id,
  departmentName,
}: {
  id: number;
  departmentName: string;
}) => <NameCell id={id} departmentName={departmentName} />;

const ManageCommitteeTable: React.FC<ManageCommitteeTableProps> = ({
  name,
  data,
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  // TODO: back 구현되면, 저장 버튼 클릭시 editData 이용해서 data update하기
  const [editData, setEditData] = useState<CommitteeProps[]>(data);

  const handleDelete = (id: number) => {
    setEditData(prevData => prevData.filter(item => item.id !== id));
  };

  const columnHelper = createColumnHelper<CommitteeProps>();

  const columns = [
    columnHelper.display({
      id: "id",
      header: "번호",
      cell: ({ row }) => row.index + 1,
      size: 80,
    }),
    columnHelper.accessor("name", {
      id: "name",
      header: "부서명",
      cell: info =>
        renderNameCell({
          id: info.row.original.id,
          departmentName: info.row.original.name,
        }),
      size: 0,
    }),
    columnHelper.accessor("leader", {
      id: "leader",
      header: "부서장",
      cell: info => info.getValue(),
      size: 120,
    }),
    columnHelper.accessor("headcount", {
      id: "headcount",
      header: "인원",
      cell: info => `${info.getValue()}인`,
      size: 120,
    }),
    columnHelper.display({
      id: "delete",
      header: "삭제",
      cell: renderDeleteCell(handleDelete),
      size: 80,
    }),
  ];

  const table = useReactTable({
    columns,
    data: editData,
    getCoreRowModel: getCoreRowModel(),
    enableSorting: false,
  });

  // 야매로 min-width 바꿔치기 (고치지 마세요)
  // eslint-disable-next-line no-underscore-dangle
  table._getColumnDefs().forEach(column => {
    // eslint-disable-next-line no-param-reassign
    column.minSize = 0;
  });

  return (
    <FlexWrapper direction="column" gap={16}>
      <FlexWrapper direction="row" gap={12}>
        <FlexWrapper direction="row" gap={0} justify="space-between">
          <Typography fs={24} lh={24} color="PRIMARY" fw="BOLD">
            {name}
          </Typography>
          <Button
            buttonText="부서 추가"
            style={{ width: "80px", padding: "8px", fontSize: "14px" }}
            onClick={() => {
              // TODO: endpoint로 redirect
            }}
          />
        </FlexWrapper>
      </FlexWrapper>
      {loaded && (
        <TableWrapper>
          <TableInner>
            <Header>
              {table.getHeaderGroups().map(headerGroup => (
                <HeaderRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
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
                  ))}
                </HeaderRow>
              ))}
            </Header>
            <Content>
              {table.getRowModel().rows.map(row => (
                <ContentRow key={row.id}>
                  {row.getVisibleCells().map(cell => (
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
                  ))}
                </ContentRow>
              ))}
            </Content>
          </TableInner>
        </TableWrapper>
      )}
      <ButtonWrapper>
        <Button
          style={{ padding: "8px 16px", width: "100px" }}
          onClick={() => {
            console.log(editData);
          }}
        >
          저장
        </Button>
      </ButtonWrapper>
    </FlexWrapper>
  );
};

export default ManageCommitteeTable;
