import React from "react";
import {
  useForm,
  useFieldArray,
  FormProvider,
  Controller,
  UseFormSetValue,
  UseFormGetValues,
} from "react-hook-form";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import LightTag, {
  LightTagColor,
} from "@sparcs-students/web/common/components/Tag/LightTag";
import DarkTag, {
  DarkTagColor,
} from "@sparcs-students/web/common/components/Tag/DarkTag";
import DetailButton from "@sparcs-students/web/features/documents/components/_atomic/DetailButton";
import ReviewButton from "@sparcs-students/web/features/documents/components/_atomic/ReviewButton";
import SelectInTable from "@sparcs-students/web/common/components/SelectInTable";

import {
  budgetDivisionIncomeTagList,
  budgetDomainTagList,
  getbudgetCodeTag,
  getbudgetRatioTag,
  getbudgetStatusTag,
} from "@sparcs-students/web/features/documents/utils/tableTagList";
import {
  BudgetDivisionIncomeEnum,
  BudgetDomainEnum,
} from "@sparcs-students/interface/common/enum/budget.enum";

import styled from "styled-components";
import TableCell from "@sparcs-students/web/common/components/Table/TableCell";

export interface IncomeProps {
  code: number;
  budgetDomain: BudgetDomainEnum;
  budgetDivisionIncome: BudgetDivisionIncomeEnum;
  item: string;
  lastYear: number;
  thisYear: number;
  ratio: number | null;
  reason: string;
  status: string;
  review: string;
}

interface FormValues {
  incomes: IncomeProps[];
}

interface ManagerIncomeTableProps {
  initialData: IncomeProps[];
}

interface TableRowProps {
  setValue: UseFormSetValue<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  rowIndex: number;
  changeCode: () => void;
}

const TableWrapper = styled.table`
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  overflow-x: auto;
`;

const TableHeader = styled.thead``;

const TableHeaderWrapper = styled.tr`
  display: flex;
  height: 36px;
  align-items: center;
  border-radius: 4px 4px 0px 0px;
  overflow: hidden;
  width: 100%;
`;

const TableContentWrapper = styled.tbody`
  /* display: flex;
  flex-direction: column;
  align-items: center;
  align-self: stretch;
  border-radius: 0px 0px 4px 4px;
  border-right: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-left: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  background: ${({ theme }) => theme.colors.WHITE}; */
`;

const TableRowWrapper = styled.tr`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 0px 0px 4px 4px;
  border-right: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-left: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  background: ${({ theme }) => theme.colors.WHITE};
`;

const TableRow: React.FC<TableRowProps> = ({
  setValue,
  getValues,
  rowIndex,
  changeCode,
}) => {
  const budgetDomainList = Object.entries(budgetDomainTagList).map(
    ([key, { text, color }]) => {
      const value = () => {
        switch (key) {
          case "1":
            return BudgetDomainEnum.Student;
          case "2":
            return BudgetDomainEnum.School;
          case "3":
            return BudgetDomainEnum.Autonomous;
          default:
            return BudgetDomainEnum.Undefined;
        }
      };
      return {
        label: text,
        value: value(),
        color,
      };
    },
  );

  const divisionItemsList = Object.entries(budgetDivisionIncomeTagList).map(
    ([_, { text, color }]) => ({
      label: text,
      value: text,
      color,
    }),
  );

  const getDivisionItemsList = (newValue: BudgetDomainEnum) => {
    switch (newValue) {
      case 1:
        return divisionItemsList.slice(0, 4);
      case 2:
        return divisionItemsList.slice(4, 5);
      case 3:
        return divisionItemsList.slice(5, 11);
      default:
        return [];
    }
  };

  return (
    <TableRowWrapper>
      <Controller
        name={`incomes.${rowIndex}.code`}
        render={({ field }) => {
          const { color, text } = getbudgetCodeTag(field.value);
          return (
            <TableCell type="Default" width="130px">
              <LightTag color={color as LightTagColor}>{text}</LightTag>
            </TableCell>
          );
        }}
      />
      <Controller
        name={`incomes.${rowIndex}.budgetDomain`}
        render={({ field }) => (
          <TableCell type="Default" width="120px">
            <SelectInTable<BudgetDomainEnum>
              items={budgetDomainList.slice(0, 3)}
              value={field.value || "-"}
              onChange={newValue => {
                setValue(`incomes.${rowIndex}.budgetDomain`, newValue);
                field.onChange(newValue);
                changeCode();
              }}
              placeholder="-"
              errorMessage="필수 항목입니다."
              width="65px"
            />
          </TableCell>
        )}
      />
      <Controller
        name={`incomes.${rowIndex}.budgetDivisionIncome`}
        render={({ field }) => (
          <TableCell type="Default" width="150px">
            <SelectInTable
              items={getDivisionItemsList(
                getValues(`incomes.${rowIndex}.budgetDomain`),
              )}
              value={field.value || "-"}
              onChange={newVal => field.onChange(newVal)}
              placeholder="-"
              errorMessage="필수 항목입니다."
              width="90px"
            />
          </TableCell>
        )}
      />
      <Controller
        name={`incomes.${rowIndex}.item`}
        render={({ field }) => (
          <TableCell type="Default" width="400px">
            {field.value}
          </TableCell>
        )}
      />
      <Controller
        name={`incomes.${rowIndex}.lastYear`}
        render={({ field }) => (
          <TableCell type="Default" width="130px">
            {new Intl.NumberFormat("ko-KR", {
              style: "currency",
              currency: "KRW",
            }).format(field.value)}
          </TableCell>
        )}
      />
      <Controller
        name={`incomes.${rowIndex}.thisYear`}
        render={({ field }) => (
          <TableCell type="Default" width="130px">
            {new Intl.NumberFormat("ko-KR", {
              style: "currency",
              currency: "KRW",
            }).format(field.value)}
          </TableCell>
        )}
      />
      <Controller
        name={`incomes.${rowIndex}.ratio`}
        render={({ field }) => {
          const { color, text } = getbudgetRatioTag(field.value);
          return (
            <TableCell type="Default" width="120px">
              <LightTag color={color as LightTagColor}>{text}</LightTag>
            </TableCell>
          );
        }}
      />
      <Controller
        name={`incomes.${rowIndex}.reason`}
        render={({ field }) => (
          <TableCell type="Default" width="90px">
            <DetailButton
              title={`${field.value}에 대한 비고`}
              detail={field.value}
            />
          </TableCell>
        )}
      />
      <Controller
        name={`incomes.${rowIndex}.status`}
        render={({ field }) => {
          const { color, text } = getbudgetStatusTag(field.value);
          return (
            <TableCell type="Default" width="100px">
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
        name={`incomes.${rowIndex}.review`}
        render={({ field }) => (
          <TableCell type="Default" width="90px">
            <ReviewButton
              status={field.value}
              review={field.value}
              handleStatusChange={field.onChange}
              handleReviewChange={field.onChange}
            />
          </TableCell>
        )}
      />
    </TableRowWrapper>
  );
};

const ManagerIncomeTable: React.FC<ManagerIncomeTableProps> = ({
  initialData,
}) => {
  const formMethods = useForm<FormValues>({
    defaultValues: {
      incomes: initialData,
    },
  });

  const { handleSubmit, control, setValue, getValues } = formMethods;
  const { fields } = useFieldArray({ control, name: "incomes" });

  const incomes = formMethods.watch("incomes");

  const onSubmit = (data: FormValues) => {
    console.log("Submitted incomes:", data.incomes);
  };

  const changeCode = () => {
    let studentsFeeCount = 100;
    let schoolFeeCount = 200;
    let autonomousFeeCount = 300;

    incomes.forEach((income, index) => {
      let newCode = income.code;

      switch (income.budgetDomain) {
        case 1:
          studentsFeeCount += 1;
          newCode = studentsFeeCount;
          break;
        case 2:
          schoolFeeCount += 1;
          newCode = schoolFeeCount;
          break;
        case 3:
          autonomousFeeCount += 1;
          newCode = autonomousFeeCount;
          break;
        default:
          newCode = 0;
          break;
      }

      setValue(`incomes.${index}.code`, newCode, {
        shouldValidate: true,
      });
    });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexWrapper direction="column" gap={16}>
          <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
            수입
          </Typography>
          <TableWrapper>
            <TableHeader>
              <TableHeaderWrapper>
                <TableCell type="Header" width="130px">
                  코드
                </TableCell>
                <TableCell type="Header" width="120px">
                  구분
                </TableCell>
                <TableCell type="Header" width="150px">
                  예산 분류
                </TableCell>
                <TableCell type="Header" width="400px">
                  항목
                </TableCell>
                <TableCell type="Header" width="130px">
                  작년 결산
                </TableCell>
                <TableCell type="Header" width="130px">
                  올해 예산
                </TableCell>
                <TableCell type="Header" width="120px">
                  비율
                </TableCell>
                <TableCell type="Header" width="90px">
                  비고
                </TableCell>
                <TableCell type="Header" width="100px">
                  현황
                </TableCell>
                <TableCell type="Header" width="90px">
                  검토
                </TableCell>
              </TableHeaderWrapper>
            </TableHeader>
            <TableContentWrapper>
              {fields.map((_, index) => {
                const key = `${index}-content`;
                return (
                  <TableRow
                    changeCode={changeCode}
                    setValue={setValue}
                    getValues={getValues}
                    key={key}
                    rowIndex={index}
                  />
                );
              })}
            </TableContentWrapper>
          </TableWrapper>
          <button type="submit">Submit</button>
        </FlexWrapper>
      </form>
    </FormProvider>
  );
};

export default ManagerIncomeTable;
