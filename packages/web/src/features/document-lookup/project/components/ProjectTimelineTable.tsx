import React from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  UseFormSetValue,
} from "react-hook-form";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import { EditableDetailButton } from "@sparcs-students/web/features/document-lookup/project/components/_atomic/DetailButton";

import styled from "styled-components";
import TableCell from "@sparcs-students/web/common/components/Table/TableCell";
import TableTextInput from "@sparcs-students/web/common/components/Forms/TableTextInput";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import Icon from "@sparcs-students/web/common/components/Icon";
import isPropValid from "@emotion/is-prop-valid";
import colors from "@sparcs-students/web/styles/themes/colors";
import TimeLineDateInput from "@sparcs-students/web/features/document-lookup/project/components/_atomic/TimelineDateInput";
import {
  ProjectTimelineProps,
  TimelineDateTypeEnum,
} from "@sparcs-students/web/features/document-lookup/project/services/_mock/mockProjectTimelineData";

interface FormValues {
  timelines: ProjectTimelineProps[];
}

interface ProjectTimelineTableProps {
  initialData: ProjectTimelineProps[];
  isProposal: boolean;
}

interface TableRowProps {
  setValue: UseFormSetValue<FormValues>;
  rowIndex: number;
  deleteRow: (rowIndex: number) => void;
  isLast: boolean;
  rowCount: number;
}

const TableWrapper = styled.table`
  position: relative;
  height: fit-content;
  overflow-y: visible;
  border-collapse: collapse;
`;

const TableHeader = styled.thead``;

const TableHeaderWrapper = styled.tr`
  display: flex;
  height: 36px;
  align-items: center;
  border-radius: 4px 4px 0px 0px;
  overflow: hidden;
  width: fit-content;
`;

const TableContentWrapper = styled.tbody`
  overflow-y: visible;
`;

const TableRowWrapper = styled.tr.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isLast: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: ${({ isLast }) => (isLast ? "0px 0px 4px 4px" : "0px")};
  border-right: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-left: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  background: ${({ theme }) => theme.colors.WHITE};
  cursor: pointer;
  overflow-y: visible;
  overflow-x: visible;
  width: fit-content;
`;

const TitleWithButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const TableRow: React.FC<TableRowProps> = ({
  setValue,
  rowIndex,
  deleteRow,
  isLast,
  rowCount,
}) => (
  <TableRowWrapper isLast={isLast}>
    <Controller
      name={`timelines.${rowIndex}.index`}
      render={() => (
        <TableCell type="Default" width="60px">
          <Typography>{rowIndex + 1}</Typography>
        </TableCell>
      )}
    />
    <Controller
      name={`timelines.${rowIndex}.date`}
      render={({ field }) => {
        const currentValue = field.value?.value ?? [null, null];
        const currentType = field.value?.type ?? "";

        return (
          <TableCell type="Default" width="526px">
            <TimeLineDateInput
              dateValue={currentValue}
              dateType={currentType}
              onValueChange={newVal => {
                const newField = { ...field.value, value: newVal };
                field.onChange(newField);
                setValue(`timelines.${rowIndex}.date.value`, newVal);
              }}
              onTypeChange={newType => {
                const newField = {
                  ...field.value,
                  type: newType as TimelineDateTypeEnum,
                };
                field.onChange(newField);
                setValue(`timelines.${rowIndex}.date.type`, newType);
              }}
            />
          </TableCell>
        );
      }}
    />
    <Controller
      name={`timelines.${rowIndex}.content`}
      render={({ field }) => (
        <TableCell type="Default" minWidth={330} width={0}>
          <TableTextInput
            placeholder="사업 내용을 입력하세요."
            handleChange={newVal => {
              setValue(`timelines.${rowIndex}.content`, newVal);
              field.onChange(newVal);
            }}
            value={field.value}
          />
        </TableCell>
      )}
    />
    <Controller
      name={`timeline.${rowIndex}.reason`}
      render={({ field }) => {
        const projectItem = "타임라인";
        return (
          <TableCell type="Default" width="90px">
            <EditableDetailButton
              projectItem={projectItem}
              value={field.value}
              onChange={field.onChange}
            />
          </TableCell>
        );
      }}
    />
    <TableCell type="Default" width="90px">
      <Icon
        type="delete"
        size={16}
        onClick={() => {
          if (rowIndex === 0 && rowCount === 1) return;
          deleteRow(rowIndex);
        }}
        color={
          rowIndex === 0 && rowCount === 1 ? colors.GRAY["50"] : colors.BLACK
        }
      />
    </TableCell>
  </TableRowWrapper>
);

const ProjectTimelineTable: React.FC<ProjectTimelineTableProps> = ({
  initialData,
  // isProposal,
}) => {
  const [dynamicHeight, setDynamicHeight] = React.useState<number | undefined>(
    334, // TODO: magic number 36 + 48 + 250
  );

  const formMethods = useForm<FormValues>({
    defaultValues: {
      timelines: initialData,
    },
  });

  const {
    // handleSubmit,
    control,
    setValue,
  } = formMethods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "timelines",
  });

  const timelines = formMethods.watch("timelines");

  const defaultNewRow = [
    {
      date: {
        value: [null, null] as [Date | null, Date | null],
        type: undefined,
      },
      content: "",
      reason: "",
    },
  ];

  const addNewRow = () => {
    const newRow = {
      ...defaultNewRow[0],
      id: fields.length,
    };
    append(newRow);

    const length = timelines.length + 1;
    setDynamicHeight(36 + length * 48 + 250);
  };

  const deleteRow = (rowIndex: number) => {
    if (timelines.length === 1) {
      return;
    }
    remove(rowIndex);
    const length = timelines.length - 1;

    setDynamicHeight(36 + length * 48 + 250); // TODO: magic number
  };

  // const onSubmit = (data: FormValues) => {
  //   TODO
  // };

  return (
    <FormProvider {...formMethods}>
      {/* <form onSubmit={handleSubmit(onSubmit)}> */}
      <form>
        <FlexWrapper direction="column" gap={16}>
          <TitleWithButtonWrapper>
            <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
              사업 진행 타임라인
            </Typography>
            <Button type="default" onClick={addNewRow}>
              행 추가
            </Button>
          </TitleWithButtonWrapper>
          <FlexWrapper
            direction="column"
            gap={16}
            height={`${dynamicHeight}px`}
            xOverflow
          >
            <TableWrapper>
              <TableHeader>
                <TableHeaderWrapper>
                  <TableCell type="Header" width="60px">
                    번호
                  </TableCell>
                  <TableCell type="Header" width="526px">
                    날짜
                  </TableCell>
                  <TableCell type="Header" width="330px">
                    내용
                  </TableCell>
                  <TableCell type="Header" width="90px">
                    비고
                  </TableCell>
                  <TableCell type="Header" width="90px">
                    삭제
                  </TableCell>
                </TableHeaderWrapper>
              </TableHeader>
              <TableContentWrapper>
                {fields.map((field, index) => (
                  <TableRow
                    setValue={setValue}
                    key={field.id}
                    rowIndex={index}
                    deleteRow={() => deleteRow(index)}
                    isLast={index === timelines.length - 1}
                    rowCount={timelines.length}
                  />
                ))}
              </TableContentWrapper>
            </TableWrapper>
            {/* <button type="submit">Submit</button> for console */}
          </FlexWrapper>
        </FlexWrapper>
      </form>
    </FormProvider>
  );
};

export default ProjectTimelineTable;
