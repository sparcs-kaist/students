import isPropValid from "@emotion/is-prop-valid";
import {
  CommitteeRoleEnum,
  MemberRoleEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum/organization.enum";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import TableTextInput from "@sparcs-students/web/common/components/Forms/TableTextInput";
import Icon from "@sparcs-students/web/common/components/Icon";
import TagSelect from "@sparcs-students/web/common/components/Selects/TagSelect";
import TableCell from "@sparcs-students/web/common/components/Table/TableCell";
import { DarkTagColor } from "@sparcs-students/web/common/components/Tag/DarkTag";
import { LightTagColor } from "@sparcs-students/web/common/components/Tag/LightTag";
import Typography from "@sparcs-students/web/common/components/Typography";
import {
  committeeRoleTagList,
  memberRoleTagList,
} from "@sparcs-students/web/common/util/tableTagList";
import isEqual from "lodash/isEqual";
import React, { useEffect, useRef, useState } from "react";
import {
  Controller,
  FormProvider,
  UseFormGetValues,
  UseFormSetValue,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import styled from "styled-components";

import Modal from "@sparcs-students/web/common/components/Modal";
import NameSearchInput from "@sparcs-students/web/features/organization-manage/components/NameSearchInput";
import NameSearchModalContent from "@sparcs-students/web/features/organization-manage/components/NameSearchModalContent";
import NameSearchResults from "@sparcs-students/web/features/organization-manage/components/NameSearchResults";
import { overlay } from "overlay-kit";
import { mockSearchMemberData } from "@sparcs-students/web/features/organization-manage/services/_mock/mockOrganizationManageData";
import DeleteModalContent from "@sparcs-students/web/features/organization-manage/components/DeleteModalContent";

const TableWrapper = styled.table`
  position: relative;
  width: 100%;
  border-collapse: collapse;
`;

const TableHeaderWrapper = styled.tr`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.GREEN[700]};
  color: white;
  height: 40px;
  border-radius: 4px 4px 0 0;
  overflow: hidden;
`;

const TableContentWrapper = styled.tbody``;

const TableRowWrapper = styled.tr.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isLast: boolean }>`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.WHITE};
  border-left: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-right: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-radius: ${({ isLast }) => (isLast ? "0 0 4px 4px" : "0")};
  height: 48px;
`;

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: end;
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

type RoleType = "member" | "committee";
type RoleEnumType = MemberRoleEnum | CommitteeRoleEnum;
type RoleCellInfo = {
  label: string;
  value: RoleEnumType;
  color: LightTagColor | DarkTagColor;
};

export interface OrganizationMemberProps {
  id: number;
  studentId: string;
  name: string;
  role: RoleEnumType;
  startDate: string;
  endDate: string;
}

export interface ManageMemberTableProps {
  formMethods: ReturnType<typeof useForm<MemberFormValues>>;
  initialData: OrganizationMemberProps[];
  onDiffExtract?: (diff: {
    updatedRows: OrganizationMemberProps[];
    createdRows: OrganizationMemberProps[];
    deletedRows: OrganizationMemberProps[];
  }) => void;
  roleType: RoleType;
}

export interface MemberFormValues {
  members: OrganizationMemberProps[];
}

const COL_WIDTHS = {
  idx: "80px",
  student: "168px",
  name: 0,
  role: "168px",
  date: "168px",
  delete: "80px",
};

const TABLE_HEADER_HEIGHT = 36;
const TABLE_ROW_HEIGHT = 48;
const TABLE_EXTRA_HEIGHT = 125;

interface MemberRowProps {
  getValues: UseFormGetValues<MemberFormValues>;
  setValue: UseFormSetValue<MemberFormValues>;
  rowIndex: number;
  isLast: boolean;
  deleteRow: (index: number) => void;
  roleType: RoleType;
}

const MemberRow: React.FC<MemberRowProps> = ({
  getValues,
  setValue,
  rowIndex,
  isLast,
  deleteRow,
  roleType,
}) => {
  let roleList: RoleCellInfo[];
  switch (roleType) {
    case "committee":
      roleList = Object.entries(committeeRoleTagList).map(
        ([key, { text, color }]) => {
          const value = () => {
            switch (key) {
              case "1":
                return CommitteeRoleEnum.Chief;
              default:
                return CommitteeRoleEnum.Member;
            }
          };
          return {
            label: text,
            value: value(),
            color,
          };
        },
      );
      break;
    case "member":
      roleList = Object.entries(memberRoleTagList).map(
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
      break;
    default:
      break;
  }

  const openDeleteModal = () => {
    overlay.open(({ isOpen, close }) => (
      <Modal isOpen={isOpen} width="400px">
        <DeleteModalContent
          onConfirm={() => {
            deleteRow(rowIndex);
            close();
          }}
          onClose={() => close()}
        >
          <Typography
            fs={20}
            lh={28}
            color="BLACK"
            fw="REGULAR"
            style={{ textAlign: "center", whiteSpace: "pre" }}
          >
            <b>{getValues(`members.${rowIndex}.name`)}</b> 학우를 <b>삭제</b>
            하시겠습니까?
          </Typography>

          <Typography fs={12} lh={12} color="BLACK" fw="REGULAR">
            이 경우 기록 자체가 삭제되므로, 실수로 승인한 경우에만 삭제해주세요.
          </Typography>
        </DeleteModalContent>
      </Modal>
    ));
  };

  return (
    <TableRowWrapper isLast={isLast}>
      <TableCell type="Default" width={COL_WIDTHS.idx}>
        {rowIndex + 1}
      </TableCell>

      <Controller
        name={`members.${rowIndex}.studentId`}
        render={({ field }) => (
          <TableCell type="Default" width={COL_WIDTHS.student}>
            <TableTextInput
              value={field.value}
              handleChange={field.onChange}
              placeholder="학번 입력"
            />
          </TableCell>
        )}
      />

      <Controller
        name={`members.${rowIndex}.name`}
        render={({ field }) => (
          <TableCell type="Default" width={COL_WIDTHS.name}>
            <TableTextInput
              value={field.value}
              handleChange={field.onChange}
              placeholder="이름 입력"
            />
          </TableCell>
        )}
      />

      <Controller
        name={`members.${rowIndex}.role`}
        render={({ field }) => (
          <TableCell type="Default" width={COL_WIDTHS.role}>
            <TagSelect<RoleEnumType>
              items={roleList.slice(0, 4)}
              value={field.value || "-"}
              onChange={newValue => {
                setValue(`members.${rowIndex}.role`, newValue);
                field.onChange(newValue);
              }}
              errorMessage="필수 항목입니다."
              width="100px"
            />
          </TableCell>
        )}
      />

      <Controller
        name={`members.${rowIndex}.startDate`}
        render={({ field }) => (
          <TableCell type="Default" width={COL_WIDTHS.date}>
            <input
              type="date"
              value={field.value}
              onChange={field.onChange}
              style={{ width: "100%", border: "none", outline: "none" }}
            />
          </TableCell>
        )}
      />

      <Controller
        name={`members.${rowIndex}.endDate`}
        render={({ field }) => (
          <TableCell type="Default" width={COL_WIDTHS.date}>
            <input
              type="date"
              value={field.value}
              onChange={field.onChange}
              style={{ width: "100%", border: "none", outline: "none" }}
            />
          </TableCell>
        )}
      />

      <TableCell type="Default" width={COL_WIDTHS.delete}>
        <Icon
          type="delete"
          size={16}
          onClick={() => openDeleteModal()}
          color="BLACK"
        />
      </TableCell>
    </TableRowWrapper>
  );
};

const MemberTableForm: React.FC<ManageMemberTableProps> = ({
  formMethods,
  initialData,
  onDiffExtract = () => {},
  roleType,
}) => {
  const { handleSubmit, control, setValue } = formMethods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "members",
  });

  const members = useWatch({ control, name: "members" });

  const initialDataRef = useRef<OrganizationMemberProps[]>(initialData);

  useEffect(() => {
    const initialMap = new Map(
      initialDataRef.current.map(row => [row.id, row]),
    );

    members.forEach((row, _index) => {
      const original = initialMap.get(row.id);
      if (!original) return;
      const normalizedRow = {
        ...row,
      };
      const normalizedOriginal = {
        ...original,
      };
      console.log("normalizedRow:", normalizedRow);
      console.log("normalizedOriginal:", normalizedOriginal);
      console.log(normalizedRow === normalizedOriginal);
    });
  }, [members, setValue]);

  useEffect(() => {
    const initialMap = new Map(
      initialDataRef.current.map(row => [row.id, row]),
    );

    const updatedRows = members.filter(row => {
      const original = initialMap.get(row.id);
      return original && !isEqual(row, original);
    });

    const createdRows = members.filter(row => !initialMap.has(row.id));

    const deletedRows = initialDataRef.current.filter(
      row => !members.find(r => r.id === row.id),
    );

    onDiffExtract({ updatedRows, createdRows, deletedRows });
  }, [members, onDiffExtract]);

  const [dynamicHeight, setDynamicHeight] = React.useState<number | undefined>(
    TABLE_HEADER_HEIGHT +
      (members.length + 1) * TABLE_ROW_HEIGHT +
      TABLE_EXTRA_HEIGHT,
  );

  const onSubmit = (data: MemberFormValues) => {
    const dirtyRows = data.members.filter(
      (row, index) => !isEqual(row, initialDataRef.current[index]),
    );
    console.log("수정된 row만 제출:", dirtyRows);
  };

  const deleteRow = (rowIndex: number) => {
    if (members.length === 1) {
      return;
    }
    remove(rowIndex);
    const length = members.length - 1;

    setDynamicHeight(
      TABLE_HEADER_HEIGHT +
        (length + 1) * TABLE_ROW_HEIGHT +
        TABLE_EXTRA_HEIGHT,
    );
  };

  const addNewRow = (newRow: OrganizationMemberProps) => {
    append(newRow);

    const length = members.length + 1;
    setDynamicHeight(
      TABLE_HEADER_HEIGHT +
        (length + 1) * TABLE_ROW_HEIGHT +
        TABLE_EXTRA_HEIGHT,
    );
  };

  const openAddMemberModal = () => {
    overlay.open(({ isOpen, close }) => {
      const [inputText, setInputText] = useState<string>("");
      const [searchText, setSearchText] = useState<string>("");
      const [searchResults, setSearchResults] = useState<
        OrganizationMemberProps[]
      >([]);

      const onSearch = (text: string) => {
        console.log("search name: ", text);
        setSearchText(text);
        // Simple filter logic on mock data
        const filtered = mockSearchMemberData.filter(member =>
          member.name.includes(text),
        );
        setSearchResults(filtered);
      };

      return (
        <Modal isOpen={isOpen} width="400px">
          <NameSearchModalContent onCancel={close}>
            <TitleWrapper>
              <Typography fs={20} lh={20} fw="BOLD" color="BLACK">
                위원 추가
              </Typography>
            </TitleWrapper>
            <NameSearchInput
              searchText={inputText}
              onChange={setInputText}
              onSearch={onSearch}
            />
            <NameSearchResults
              isSearch={searchText !== ""}
              searchResults={searchResults}
              onAddNewRow={addNewRow}
            />
          </NameSearchModalContent>
        </Modal>
      );
    });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexWrapper direction="column" gap={16}>
          {roleType === "committee" && (
            <ButtonsWrapper>
              <Button onClick={openAddMemberModal}>위원 추가</Button>
            </ButtonsWrapper>
          )}
          <FlexWrapper
            direction="column"
            gap={16}
            height={`${dynamicHeight}px`}
            xOverflow
          >
            <TableWrapper>
              <thead>
                <TableHeaderWrapper>
                  <TableCell type="Header" width={COL_WIDTHS.idx}>
                    번호
                  </TableCell>
                  <TableCell type="Header" width={COL_WIDTHS.student}>
                    학번
                  </TableCell>
                  <TableCell type="Header" width={COL_WIDTHS.name}>
                    이름
                  </TableCell>
                  <TableCell type="Header" width={COL_WIDTHS.role}>
                    직책
                  </TableCell>
                  <TableCell type="Header" width={COL_WIDTHS.date}>
                    시작일
                  </TableCell>
                  <TableCell type="Header" width={COL_WIDTHS.date}>
                    종료일
                  </TableCell>
                  <TableCell type="Header" width={COL_WIDTHS.delete}>
                    삭제
                  </TableCell>
                </TableHeaderWrapper>
              </thead>
              <TableContentWrapper>
                {fields.map((field, idx) => (
                  <MemberRow
                    getValues={formMethods.getValues}
                    setValue={setValue}
                    key={field.id}
                    rowIndex={idx}
                    isLast={idx === fields.length - 1}
                    deleteRow={() => deleteRow(idx)}
                    roleType={roleType}
                  />
                ))}
              </TableContentWrapper>
            </TableWrapper>
          </FlexWrapper>
        </FlexWrapper>
      </form>
    </FormProvider>
  );
};

export default MemberTableForm;
