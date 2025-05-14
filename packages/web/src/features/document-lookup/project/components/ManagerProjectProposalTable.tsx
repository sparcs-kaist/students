import React from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  UseFormGetValues,
} from "react-hook-form";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";

import styled from "styled-components";
import TableCell from "@sparcs-students/web/common/components/Table/TableCell";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import Icon from "@sparcs-students/web/common/components/Icon";
import isPropValid from "@emotion/is-prop-valid";
import colors from "@sparcs-students/web/styles/themes/colors";
import HoverClickText from "@sparcs-students/web/common/components/HoverClickText";
import LightTag, {
  LightTagColor,
} from "@sparcs-students/web/common/components/Tag/LightTag";
import { getbudgetStatusTag } from "@sparcs-students/web/features/document-lookup/util/tableTagList";
import DarkTag, {
  DarkTagColor,
} from "@sparcs-students/web/common/components/Tag/DarkTag";
import { ReadOnlyReviewButton } from "@sparcs-students/web/features/document-lookup/project/components/_atomic/ReviewButton";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum";
import { useRouter } from "next/navigation";
import ProjectProposalHelpButton from "@sparcs-students/web/features/document-lookup/project/components/_atomic/ProjectProposalHelpButton";
import { ProjectProposalTableRow } from "@sparcs-students/web/features/document-lookup/project/type/managerFormValues";
import { formatDotDate } from "@sparcs-students/web/utils/Date/formatDate";

export interface PPFormValues {
  proposals: ProjectProposalTableRow[];
  operatingCommittee: string[];
  executiveCommittee: string[];
}

interface ManagerProjectProposalTableProps {
  isProposal: boolean;
  query: string;
  resultId: string;
  formMethods: ReturnType<typeof useForm<PPFormValues>>;
  initialDataLength: number;
}

interface TableRowProps {
  // setValue: UseFormSetValue<FormValues>;
  getValues: UseFormGetValues<PPFormValues>;
  rowIndex: number;
  deleteRow: (rowIndex: number) => void;
  isLast: boolean;
  rowCount: number;
  query: string;
  resultId: string;
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

const TitleWrapper = styled.div`
  width: fit-content;
  white-space: nowrap;
`;

const TitleWithButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const TitleWithToolTipWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
  white-space: nowrap;
`;

const DateWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;
  justify-content: center;
  align-items: center;
`;

const TableRow: React.FC<TableRowProps> = ({
  // setValue,
  getValues,
  rowIndex,
  deleteRow,
  isLast,
  rowCount,
  query,
  resultId,
}) => {
  const router = useRouter();
  return (
    <TableRowWrapper isLast={isLast}>
      <Controller
        name={`proposals.${rowIndex}.id`} // 번호
        render={() => (
          <TableCell type="Default" width="60px">
            <Typography>{rowIndex + 1}</Typography>
          </TableCell>
        )}
      />
      <Controller
        name={`proposals.${rowIndex}.projectName`} // 사업명
        render={({ field }) => (
          <TableCell type="Default" width={0} minWidth={400}>
            <HoverClickText
              text={field.value}
              onClick={() =>
                router.push(
                  `/document-lookup/project-proposal/result/${resultId}/detail/${getValues(`proposals.${rowIndex}.id`)}?${query}`,
                )
              }
            />
          </TableCell>
        )}
      />
      <Controller
        name={`proposals.${rowIndex}.executionPeriod`} // 사업 기간
        render={({ field }) => {
          const firstDate = new Date(field.value.value[0]);
          const secondDate = new Date(field.value.value[1]);
          const firstDateStr = formatDotDate(firstDate);
          const secondDateStr = formatDotDate(secondDate);
          return (
            <TableCell type="Default" width={400}>
              <DateWrapper>
                <Typography>{firstDateStr}</Typography>
                <Typography> - </Typography>
                <Typography>{secondDateStr}</Typography>
              </DateWrapper>
            </TableCell>
          );
        }}
      />
      <Controller
        name={`proposals.${rowIndex}.status`} // 현황
        render={({ field }) => {
          const { color, text } = getbudgetStatusTag(field.value);
          return (
            <TableCell type="Default" width="90px">
              {color !== "GRAY" ? (
                <DarkTag color={color as DarkTagColor}>{text}</DarkTag>
              ) : (
                <LightTag color={color as LightTagColor}>{text}</LightTag>
              )}
            </TableCell>
          );
        }}
      />
      <Controller
        name={`proposals.${rowIndex}.review`} // 검토
        render={({ field }) => (
          <TableCell type="Default" width="90px">
            <ReadOnlyReviewButton review={field.value} />
          </TableCell>
        )}
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
};

const ManagerProjectProposalTable: React.FC<
  ManagerProjectProposalTableProps
> = ({ formMethods, initialDataLength, query, resultId }) => {
  const { handleSubmit, control } = formMethods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "proposals",
  });

  const proposals = formMethods.watch("proposals");

  const defaultNewRow = [
    {
      projectName: "새로운 사업계획서",
      executionPeriod: {
        value: [null, null] as [Date | null, Date | null],
        type: undefined,
      },
      status: DocumentReviewStatusEnum.Unsaved,
      review: "",
    },
  ];

  const addNewRow = () => {
    const newRow = {
      ...defaultNewRow[0],
      id: initialDataLength,
    };
    append(newRow);
  };

  const deleteRow = (rowIndex: number) => {
    if (proposals.length === 1) {
      return;
    }
    remove(rowIndex);
  };

  const onSubmit = (data: PPFormValues) => {
    console.log(data);
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexWrapper direction="column" gap={16}>
          <TitleWithButtonWrapper>
            <TitleWithToolTipWrapper>
              <TitleWrapper>
                <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
                  사업 계획서
                </Typography>
              </TitleWrapper>
              <ProjectProposalHelpButton />
            </TitleWithToolTipWrapper>
            <Button type="default" onClick={addNewRow}>
              추가
            </Button>
          </TitleWithButtonWrapper>
          <FlexWrapper direction="column" gap={16} xOverflow>
            <TableWrapper>
              <TableHeader>
                <TableHeaderWrapper>
                  <TableCell type="Header" width="60px">
                    번호
                  </TableCell>
                  <TableCell type="Header" width={0} minWidth={400}>
                    사업명
                  </TableCell>
                  <TableCell type="Header" width="400px">
                    사업 기간
                  </TableCell>
                  <TableCell type="Header" width="90px">
                    현황
                  </TableCell>
                  <TableCell type="Header" width="90px">
                    검토
                  </TableCell>
                  <TableCell type="Header" width="90px">
                    삭제
                  </TableCell>
                </TableHeaderWrapper>
              </TableHeader>
              <TableContentWrapper>
                {fields.map((field, index) => (
                  <TableRow
                    key={field.id}
                    getValues={formMethods.getValues}
                    rowIndex={index}
                    deleteRow={() => deleteRow(index)}
                    isLast={index === proposals.length - 1}
                    rowCount={proposals.length}
                    query={query}
                    resultId={resultId}
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

export default ManagerProjectProposalTable;
