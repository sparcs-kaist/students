import React, { useEffect, useState } from "react";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
  flexRender,
  Row,
} from "@tanstack/react-table";
import styled from "styled-components";
import Icon from "@sparcs-students/web/common/components/Icon";
import TableCell from "@sparcs-students/web/common/components/Table/TableCell";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import CommitteeNameButton from "@sparcs-students/web/features/organization-manage/components/_atomic/CommitteeNameButton";
import { overlay } from "overlay-kit";
import Modal from "@sparcs-students/web/common/components/Modal";
import CancellableModalContent from "@sparcs-students/web/common/components/Modal/CancellableModalContent";
import TableTextInput from "@sparcs-students/web/common/components/Forms/TableTextInput";
import useOrganizationStore from "@sparcs-students/web/features/organization-manage/stores/useOrganizationStore";
import {
  createTeam,
  deleteTeam,
} from "@sparcs-students/web/features/organization-manage/api/organizationApi";

export interface CommitteeProps {
  id: string;
  name: string;
  leader: string;
  headcount: number;
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

const NameCell: React.FC<{ name: string }> = ({ name }) => (
  <CommitteeNameButton
    text={name}
    onClick={() => {
      // TODO: endpoint로 redirect
    }}
  />
);

const DeleteCell: React.FC<{ id: string; onDelete: (id: string) => void }> = ({
  id,
  onDelete,
}) => (
  <span id={`btn-delete-team-${id}`}>
    <Icon type="delete" size={16} onClick={() => onDelete(id)} color="BLACK" />
  </span>
);

const renderDeleteCell =
  (onDelete: (id: string) => void) =>
  ({ row }: { row: Row<CommitteeProps> }) => (
    <DeleteCell id={row.original.id} onDelete={onDelete} />
  );

const renderNameCell = ({ getValue }: { getValue: () => string }) => (
  <NameCell name={getValue()} />
);

const AddDepartmentModal = ({
  isOpen,
  close,
}: {
  isOpen: boolean;
  close: () => void;
}) => {
  const [teamName, setTeamName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <Modal isOpen={isOpen} width="400px">
      <CancellableModalContent
        onConfirm={async () => {
          if (isSubmitting) return;
          setIsSubmitting(true);
          try {
            const { currentOrganizationId } = useOrganizationStore.getState();
            if (!currentOrganizationId) {
              alert("조직이 선택되지 않았습니다.");
              return;
            }

            await createTeam({
              team: {
                organization: { id: currentOrganizationId },
                name: teamName,
                startTerm: new Date(),
                endTerm: null,
              },
            });
            close();
            window.location.reload(); // Reload to show new team
          } catch (e) {
            console.error(e);
            alert("부서 추가 실패");
          } finally {
            setIsSubmitting(false);
          }
        }}
        onClose={close}
      >
        <FlexWrapper direction="column" gap={16}>
          <Typography fs={20} lh={24} fw="BOLD" color="BLACK">
            부서 추가
          </Typography>
          <TableTextInput
            value={teamName}
            handleChange={setTeamName}
            placeholder="부서명 입력"
          />
        </FlexWrapper>
      </CancellableModalContent>
    </Modal>
  );
};

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

  const handleDelete = async (id: string) => {
    if (window.confirm("정말 부서(팀)를 삭제하시겠습니까?")) {
      try {
        await deleteTeam(parseInt(id));
        setEditData(prevData => prevData.filter(item => item.id !== id));
        window.location.reload();
      } catch (e) {
        console.error(e);
        alert("부서 삭제 실패");
      }
    }
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
      cell: renderNameCell,
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

  const handleAddDepartment = () => {
    overlay.open(({ isOpen, close }) => (
      <AddDepartmentModal isOpen={isOpen} close={close} />
    ));
  };

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
            onClick={handleAddDepartment}
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
    </FlexWrapper>
  );
};

export default ManageCommitteeTable;
