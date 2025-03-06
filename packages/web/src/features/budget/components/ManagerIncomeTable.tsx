import React, { useMemo, useState } from "react";
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
import { EditableDetailButton } from "@sparcs-students/web/features/documents/components/_atomic/DetailButton";
import { ReadOnlyReviewButton } from "@sparcs-students/web/features/documents/components/_atomic/ReviewButton";
import TagSelect from "@sparcs-students/web/common/components/TagSelect";

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
  BudgetDivisionIncomeItemEnumList,
  // BudgetDivisionIncomeItemEnum,
  // DomainItemSelectItem,
} from "@sparcs-students/interface/common/enum/budget.enum";

import styled from "styled-components";
import TableCell from "@sparcs-students/web/common/components/Table/TableCell";
import InputSelect, {
  SelectItem,
} from "@sparcs-students/web/common/components/InputSelect"; // SelectItem,
import TableTextInput from "@sparcs-students/web/common/components/Forms/TableTextInput";
import { ManagerIncomeProps } from "@sparcs-students/web/features/budget/services/_mock/mockProposalTableData";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import Icon from "@sparcs-students/web/common/components/Icon";
import isPropValid from "@emotion/is-prop-valid";

export interface IncomeProps {
  code: number;
  budgetDomain: BudgetDomainEnum;
  budgetDivisionIncome: BudgetDivisionIncomeEnum | undefined;
  item: string;
  lastYear: number;
  thisYear: number;
  ratio: number | null;
  reason: string;
  status: string;
  review: string;
}

interface FormValues {
  incomes: ManagerIncomeProps[];
}

interface ManagerIncomeTableProps {
  initialData: ManagerIncomeProps[];
}

interface TableRowProps {
  setValue: UseFormSetValue<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  rowIndex: number;
  changeCode: () => void;
  deleteRow: (rowIndex: number) => void;
  isLast: boolean;
}

const TableWrapper = styled.table`
  position: relative;
  height: fit-content;
  overflow-y: visible;
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
  overflow-y: visible;
`;

const TableRowWrapper = styled.tr.withConfig({
  shouldForwardProp: prop => isPropValid(prop),
})<{ isLast: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: ${({ isLast }) => (isLast ? "0px 0px 4px 4px" : "0px")};
  border-right: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  border-left: 1px solid ${({ theme }) => theme.colors.GRAY[100]};
  background: ${({ theme }) => theme.colors.WHITE};
  cursor: pointer;
  overflow-y: visible;
`;

const TitleWithButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const TableRow: React.FC<TableRowProps> = ({
  setValue,
  getValues,
  rowIndex,
  changeCode,
  deleteRow,
  isLast,
}) => {
  const [itemList, setItemList] = useState<SelectItem[]>([]);

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

  const getBudgetDivisionIncomeItemsList = (division: string) => {
    switch (division) {
      case "기층기구회계":
        return BudgetDivisionIncomeItemEnumList.slice(0, 2);
      case "중앙회계":
        return BudgetDivisionIncomeItemEnumList.slice(2, 4);
      case "격려기금":
        return BudgetDivisionIncomeItemEnumList.slice(4, 5);
      case "학교지원금":
        return BudgetDivisionIncomeItemEnumList.slice(5, 6);
      case "이월금":
        return BudgetDivisionIncomeItemEnumList.slice(6, 7);
      case "과비":
        return BudgetDivisionIncomeItemEnumList.slice(7, 8);
      case "단비":
        return BudgetDivisionIncomeItemEnumList.slice(8, 9);
      case undefined:
        return [];
      default:
        return [];
    }
  };

  return (
    <TableRowWrapper isLast={isLast}>
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
            <TagSelect<BudgetDomainEnum>
              items={budgetDomainList.slice(0, 3)}
              value={field.value || "-"}
              onChange={newValue => {
                setValue(`incomes.${rowIndex}.budgetDomain`, newValue);
                setValue(
                  `incomes.${rowIndex}.budgetDivisionIncome`,
                  BudgetDivisionIncomeEnum.Undefined,
                );
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
        render={({ field }) => {
          const divisionOptions = useMemo(
            () =>
              getDivisionItemsList(
                getValues(`incomes.${rowIndex}.budgetDomain`),
              ),
            [getValues(`incomes.${rowIndex}.budgetDomain`)],
          );

          return (
            <TableCell type="Default" width="150px">
              <TagSelect
                items={divisionOptions}
                value={field.value || divisionOptions[0]}
                onChange={newVal => {
                  setItemList(getBudgetDivisionIncomeItemsList(newVal));
                  setValue(`incomes.${rowIndex}.item`, "");
                  field.onChange(newVal);
                }}
                placeholder="-"
                errorMessage="필수 항목입니다."
                width="90px"
              />
            </TableCell>
          );
        }}
      />
      <Controller
        name={`incomes.${rowIndex}.item`}
        render={({ field }) => (
          <TableCell type="Default" width="400px">
            <InputSelect
              items={itemList}
              value={field.value}
              onChange={newVal => field.onChange(newVal)}
              errorMessage="필수 항목입니다."
            />
          </TableCell>
        )}
      />
      <Controller
        name={`incomes.${rowIndex}.lastYear`}
        render={({ field }) => (
          <TableCell type="Default" width="130px">
            <TableTextInput
              value={field.value}
              handleChange={newVal => field.onChange(newVal)}
              placeholder="금액 입력"
              prefix="₩"
            />
          </TableCell>
        )}
      />
      <Controller
        name={`incomes.${rowIndex}.thisYear`}
        render={({ field }) => (
          <TableCell type="Default" width="130px">
            <TableTextInput
              value={field.value}
              handleChange={newVal => field.onChange(newVal)}
              placeholder="금액 입력"
              prefix="₩"
            />
          </TableCell>
        )}
      />
      <Controller
        name={`incomes.${rowIndex}.ratio`}
        render={() => {
          const lastYear = parseInt(
            getValues(`incomes.${rowIndex}.lastYear`) as unknown as string,
          );
          const thisYear = parseInt(
            getValues(`incomes.${rowIndex}.thisYear`) as unknown as string,
          );
          const ratio = useMemo(() => {
            if (lastYear <= 0) {
              return null;
            }
            return (thisYear / lastYear) * 100;
          }, [lastYear, thisYear]);
          const { color, text } = getbudgetRatioTag(ratio);
          return (
            <TableCell type="Default" width="120px">
              <LightTag color={color as LightTagColor}>{text}</LightTag>
            </TableCell>
          );
        }}
      />
      <Controller
        name={`incomes.${rowIndex}.reason`}
        render={({ field }) => {
          const projectItem = getValues(`incomes.${rowIndex}.item`);
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
            <ReadOnlyReviewButton review={field.value} />
          </TableCell>
        )}
      />
      <TableCell type="Default" width="90px">
        <Icon
          type="delete"
          size={16}
          onClick={() => {
            deleteRow(rowIndex);
          }}
        />
      </TableCell>
    </TableRowWrapper>
  );
};

const ManagerIncomeTable: React.FC<ManagerIncomeTableProps> = ({
  initialData,
}) => {
  const [dynamicHeight, setDynamicHeight] = React.useState<number | undefined>(
    334, // TODO: magic number 36 + 48 + 250
  );
  const formMethods = useForm<FormValues>({
    defaultValues: {
      incomes: initialData,
    },
  });

  const { handleSubmit, control, setValue, getValues } = formMethods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "incomes",
  });

  const incomes = formMethods.watch("incomes");

  const defaultNewRow = [
    {
      code: 0,
      budgetDomain: BudgetDomainEnum.Undefined,
      budgetDivisionIncome: BudgetDivisionIncomeEnum.Undefined,
      item: "",
      lastYear: "",
      thisYear: "",
      ratio: 100.0,
      reason: "",
      status: "",
      review: "",
    },
  ];

  const addNewRow = () => {
    const newRow = { ...defaultNewRow[0], id: fields.length };
    append(newRow);

    const length = incomes.length + 1;
    setDynamicHeight(36 + length * 48 + 250);
  };

  const deleteRow = (rowIndex: number) => {
    if (incomes.length === 1) {
      return;
    }
    remove(rowIndex);
    const length = incomes.length - 1;

    setDynamicHeight(36 + length * 48 + 250); // TODO: magic number
  };

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
          <TitleWithButtonWrapper>
            <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
              수입
            </Typography>
            <Button type="default" onClick={addNewRow}>
              추가
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
                  <TableCell type="Header" width="90px">
                    삭제
                  </TableCell>
                </TableHeaderWrapper>
              </TableHeader>
              <TableContentWrapper>
                {fields.map((field, index) => (
                  <TableRow
                    changeCode={changeCode}
                    setValue={setValue}
                    getValues={getValues}
                    key={field.id}
                    rowIndex={index}
                    deleteRow={() => deleteRow(index)}
                    isLast={index === incomes.length - 1}
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

export default ManagerIncomeTable;
