import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import isPropValid from "@emotion/is-prop-valid";
import TableCell from "@sparcs-students/web/common/components/Table/TableCell";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
  UseFormSetValue,
} from "react-hook-form";
import TableTextInput from "@sparcs-students/web/common/components/Forms/TableTextInput";
import TagSelect from "@sparcs-students/web/common/components/Selects/TagSelect";
import Icon from "@sparcs-students/web/common/components/Icon";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import {
  memberRoleTagList,
  committeeRoleTagList,
} from "@sparcs-students/web/common/util/tableTagList";
import {
  MemberRoleEnum,
  CommitteeRoleEnum,
  DepartmentRoleEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum/organization.enum";
import isEqual from "lodash/isEqual";
import { DarkTagColor } from "@sparcs-students/web/common/components/Tag/DarkTag";
import { LightTagColor } from "@sparcs-students/web/common/components/Tag/LightTag";

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

type RoleType = "member" | "committee";
export type RoleEnumType =
  | MemberRoleEnum
  | CommitteeRoleEnum
  | DepartmentRoleEnum;
type RoleCellInfo = {
  label: string;
  value: RoleEnumType;
  color: LightTagColor | DarkTagColor;
};

export interface OrganizationMemberProps {
  id: number;
  studentId: string;
  name: string;
  role: RoleEnumType; // TODO: change to real enum
  startDate?: string;
  endDate?: string;
}

interface ManageMemberTableProps {
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

interface MemberRowProps {
  setValue: UseFormSetValue<MemberFormValues>;
  rowIndex: number;
  isLast: boolean;
  deleteRow: (index: number) => void;
  roleType: RoleType;
}

const MemberRow: React.FC<MemberRowProps> = ({
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
          onClick={() => deleteRow(rowIndex)}
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
  const { fields, remove } = useFieldArray({
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
    36 + (members.length + 1) * 48 + 250, // TODO: magic number 36 + 48 + 250
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

    setDynamicHeight(36 + length * 48 + 250); // TODO: magic number
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexWrapper direction="column" gap={16}>
          <Typography fs={24} lh={32} fw="SEMIBOLD">
            구성원 관리
          </Typography>

          <FlexWrapper direction="row" gap={10}>
            <Button>저장</Button>
          </FlexWrapper>
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
