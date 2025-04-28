import React, { useEffect, useMemo, useRef } from "react";
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
  useWatch,
  UseFormGetValues,
  UseFormSetValue,
} from "react-hook-form";

import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import LightTag, {
  LightTagColor,
} from "@sparcs-students/web/common/components/Tag/LightTag";
import DarkTag, {
  DarkTagColor,
} from "@sparcs-students/web/common/components/Tag/DarkTag";
import { EditableDetailButton } from "@sparcs-students/web/features/document-lookup/project/components/_atomic/DetailButton";
import { ReadOnlyReviewButton } from "@sparcs-students/web/features/document-lookup/project/components/_atomic/ReviewButton";
import TagSelect from "@sparcs-students/web/common/components/Selects/TagSelect";

import {
  budgetClassExpenseTagList,
  budgetDivisionExpenseTagList,
  budgetDomainTagList,
  getbudgetCodeTag,
  getbudgetRatioTag,
  getbudgetStatusTag,
} from "@sparcs-students/web/features/document-lookup/util/tableTagList";
import {
  BudgetClassExpenseEnum,
  BudgetDivisionExpenseEnum,
  BudgetDomainEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum/budget.enum";

import styled from "styled-components";
import TableCell from "@sparcs-students/web/common/components/Table/TableCell";
import InputSelect from "@sparcs-students/web/common/components/Selects/InputSelect"; // SelectItem,
import TableTextInput from "@sparcs-students/web/common/components/Forms/TableTextInput";
import Button from "@sparcs-students/web/common/components/Buttons/Button";
import Icon from "@sparcs-students/web/common/components/Icon";
import isPropValid from "@emotion/is-prop-valid";
import {
  DarkStatusDetail,
  StatusDetail,
} from "@sparcs-students/web/utils/getTagDetail";
import { DocumentReviewStatusEnum } from "@sparcs-students/root/packages/interface/src/common/enum/meeting.enum";
import colors from "@sparcs-students/web/styles/themes/colors";
import { FormValues } from "@sparcs-students/web/features/document-lookup/project/type/managerFormValues";
import { DBExpenditureProps } from "@sparcs-students/web/features/document-lookup/budget/type/managerFormValues";
import isEqual from "lodash/isEqual"; // CHACHA: array끼리 비교하는 데 필요함. lodash 통으로 import 하면 번들 너무 커짐

export interface ManagerProjectNameCandidate {
  budgetDomain: BudgetDomainEnum;
  budgetDivisionExpenditure: BudgetDivisionExpenseEnum | undefined;
  projectNameCandidate: string[];
}

interface ManagerExpenditureTableProps {
  headerTitle?: string;
  projectNameCandidate: ManagerProjectNameCandidate[];
  isProposal: boolean;
  initialData: DBExpenditureProps[];
  onDiffExtract?: (diff: {
    updatedRows: DBExpenditureProps[];
    createdRows: DBExpenditureProps[];
    deletedRows: DBExpenditureProps[];
  }) => void;
  isInsideDetailFrame?: boolean;
  projectTitleFromDetailFrame?: string;
  onValuesChange?: (values: DBExpenditureProps[]) => void;
}

interface TableRowProps {
  setValue: UseFormSetValue<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  rowIndex: number;
  changeCode: () => void;
  deleteRow: (rowIndex: number) => void;
  isLast: boolean;
  projectNameCandidate: ManagerProjectNameCandidate[]; // CHACHA: 같은 구분, 예산 분류에 해당하는 사업명을 불러오는 것. 작년 것 아님!
  // isDirty: boolean; // CHACHA: row가 수정되었는지
  isInsideDetailFrame: boolean;
  projectTitleFromDetailFrame: string;
}

const TableWrapper = styled.table`
  position: relative;
  height: fit-content;
  overflow: visible;
  border-collapse: collapse;
`;

const TableHeader = styled.thead``;

const TableHeaderWrapper = styled.tr`
  display: flex;
  height: 36px;
  align-items: center;
  border-radius: 4px 4px 0px 0px;
  overflow: hidden;
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
  projectNameCandidate,
  isInsideDetailFrame,
  projectTitleFromDetailFrame,
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

  const divisionItemsList = (
    Object.entries(budgetDivisionExpenseTagList) as unknown as [
      BudgetDivisionExpenseEnum,
      StatusDetail,
    ][]
  ).map(([key, { text, color }]) => ({
    label: text,
    value: Number(key) as BudgetDivisionExpenseEnum,
    color,
  }));

  const divisionItemsClassList = (
    Object.entries(budgetClassExpenseTagList) as unknown as [
      BudgetClassExpenseEnum,
      DarkStatusDetail,
    ][]
  ).map(([key, { text, color }]) => ({
    label: text,
    value: Number(key) as BudgetClassExpenseEnum,
    color,
  }));

  const setProjectNameListInputItem = (foundProjectNameCandidate: string[]) => {
    const inputItem = foundProjectNameCandidate.map(e => ({
      label: e,
      value: e,
    }));
    return inputItem;
  };

  const getProjectNameCandidateList = () => {
    if (!projectNameCandidate) return [];
    const found = projectNameCandidate.find(
      e =>
        e.budgetDomain === getValues(`expenditures.${rowIndex}.budgetDomain`) &&
        e.budgetDivisionExpenditure ===
          parseInt(
            getValues(
              `expenditures.${rowIndex}.budgetDivisionExpenditure`,
            ) as unknown as string,
          ),
    );

    return found?.projectNameCandidate ?? [];
  };

  return (
    <TableRowWrapper isLast={isLast}>
      <Controller
        name={`expenditures.${rowIndex}.code`}
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
        name={`expenditures.${rowIndex}.budgetDomain`}
        render={({ field }) => (
          <TableCell type="Default" width="120px">
            <TagSelect<BudgetDomainEnum>
              items={budgetDomainList.slice(0, 3)}
              value={field.value || "-"}
              onChange={newValue => {
                if (rowIndex === 0) return;
                setValue(`expenditures.${rowIndex}.budgetDomain`, newValue);
                field.onChange(newValue);
                changeCode();
                setValue(`expenditures.${rowIndex}.projectName`, "");
                setProjectNameListInputItem(getProjectNameCandidateList());
              }}
              placeholder="-"
              errorMessage="필수 항목입니다."
              width="65px"
              disabled={rowIndex === 0}
            />
          </TableCell>
        )}
      />
      <Controller
        name={`expenditures.${rowIndex}.budgetDivisionExpenditure`}
        render={({ field }) => (
          <TableCell type="Default" width="150px">
            <TagSelect<BudgetDivisionExpenseEnum>
              items={divisionItemsList.slice(0, 3)}
              value={field.value || divisionItemsList[0].value}
              onChange={newVal => {
                if (rowIndex === 0) return;
                setValue(
                  `expenditures.${rowIndex}.item`,
                  BudgetClassExpenseEnum.Undefined,
                );
                field.onChange(newVal);
                setValue(`expenditures.${rowIndex}.projectName`, "");
                setProjectNameListInputItem(getProjectNameCandidateList());
              }}
              placeholder="-"
              errorMessage="필수 항목입니다."
              width="90px"
              disabled={rowIndex === 0}
            />
          </TableCell>
        )}
      />
      {isInsideDetailFrame ? (
        <Controller
          name={`expenditures.${rowIndex}.projectName`}
          render={({ field }) => (
            <TableCell type="Default" width={0} minWidth={216}>
              <InputSelect
                items={setProjectNameListInputItem(
                  getProjectNameCandidateList(),
                )}
                value={projectTitleFromDetailFrame}
                onChange={newVal => {
                  if (rowIndex === 0) return;
                  field.onChange(newVal);
                }}
                errorMessage="필수 항목입니다."
                disabled
              />
            </TableCell>
          )}
        />
      ) : (
        <Controller
          name={`expenditures.${rowIndex}.projectName`}
          render={({ field }) => (
            <TableCell type="Default" width={0} minWidth={216}>
              <InputSelect
                items={setProjectNameListInputItem(
                  getProjectNameCandidateList(),
                )}
                value={field.value}
                onChange={newVal => {
                  if (rowIndex === 0) return;
                  field.onChange(newVal);
                }}
                errorMessage="필수 항목입니다."
                disabled={rowIndex === 0}
              />
            </TableCell>
          )}
        />
      )}

      <Controller
        name={`expenditures.${rowIndex}.item`}
        render={({ field }) => (
          <TableCell type="Default" width="142px">
            <TagSelect<BudgetClassExpenseEnum>
              items={divisionItemsClassList.slice(0, 16)}
              value={field.value || divisionItemsClassList[0]}
              onChange={newVal => {
                if (rowIndex === 0) return;
                field.onChange(newVal);
              }}
              placeholder="-"
              errorMessage="필수 항목입니다."
              width="90px"
              isLight={false} // DarkTag is used.
              disabled={rowIndex === 0}
            />
          </TableCell>
        )}
      />
      <Controller
        name={`expenditures.${rowIndex}.lastYear`}
        render={({ field }) => (
          <TableCell type="Default" width="130px">
            <TableTextInput
              value={field.value}
              handleChange={newVal => {
                if (rowIndex === 0) return;
                field.onChange(newVal);
              }}
              placeholder="금액 입력"
              prefix="₩"
            />
          </TableCell>
        )}
      />
      <Controller
        name={`expenditures.${rowIndex}.thisYear`}
        render={({ field }) => (
          <TableCell type="Default" width="130px">
            <TableTextInput
              value={field.value}
              handleChange={newVal => {
                if (rowIndex === 0) return;
                field.onChange(newVal);
              }}
              placeholder="금액 입력"
              prefix="₩"
            />
          </TableCell>
        )}
      />
      <Controller
        name={`expenditures.${rowIndex}.ratio`}
        render={() => {
          const lastYear = parseInt(
            getValues(`expenditures.${rowIndex}.lastYear`) as unknown as string,
          );
          const thisYear = parseInt(
            getValues(`expenditures.${rowIndex}.thisYear`) as unknown as string,
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
        name={`expenditures.${rowIndex}.reason`}
        render={({ field }) => {
          const projectItem = isInsideDetailFrame
            ? projectTitleFromDetailFrame
            : getValues(`expenditures.${rowIndex}.projectName`);
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
        name={`expenditures.${rowIndex}.status`}
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
        name={`expenditures.${rowIndex}.review`}
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
            if (rowIndex === 0) return;
            deleteRow(rowIndex);
          }}
          color={rowIndex === 0 ? colors.GRAY["50"] : colors.BLACK}
        />
      </TableCell>
    </TableRowWrapper>
  );
};

const ManagerExpenditureTableInProjectDetail: React.FC<
  ManagerExpenditureTableProps
> = ({
  headerTitle = "지출",
  projectNameCandidate,
  isProposal,
  initialData,
  onDiffExtract = () => {},
  isInsideDetailFrame = false,
  projectTitleFromDetailFrame = "",
  onValuesChange = () => {},
}) => {
  const formMethods = useForm<FormValues>({
    defaultValues: {
      expenditures: initialData.length > 0 ? initialData : [],
    },
  });
  const { control, setValue, getValues, handleSubmit } = formMethods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "expenditures",
  });

  const expenditures = useWatch({
    control,
    name: "expenditures",
  });
  const initialDataRef = useRef<DBExpenditureProps[]>(initialData); // CHACHA: 백엔드에 diff만 넘겨주기 위함
  const nextIdRef = useRef<number>(initialData.length); // CHACHA: Table 전체의 변경 이력을 반영하여 새로운 rowId를 부여하기 위함

  useEffect(() => {
    const initialMap = new Map(
      initialDataRef.current.map(row => [row.id, row]),
    );

    expenditures.forEach((row, index) => {
      const original = initialMap.get(row.id);
      if (original && !isEqual(row, original)) {
        if (row.status !== DocumentReviewStatusEnum.Unsaved) {
          setValue(
            `expenditures.${index}.status`,
            DocumentReviewStatusEnum.Unsaved,
            {
              shouldDirty: false,
              shouldTouch: false,
              shouldValidate: false,
            },
          );
        }
      }
    });
  }, [expenditures, setValue, projectTitleFromDetailFrame]);

  useEffect(() => {
    if (onValuesChange) {
      onValuesChange(expenditures);
    }
  }, [expenditures, onValuesChange]);

  useEffect(() => {
    const initialMap = new Map(
      initialDataRef.current.map(row => [row.id, row]),
    );

    const updatedRows = expenditures.filter(row => {
      const original = initialMap.get(row.id);
      return original && !isEqual(row, original);
    });

    const createdRows = expenditures.filter(row => !initialMap.has(row.id));

    const deletedRows = initialDataRef.current.filter(
      row => !expenditures.find(r => r.id === row.id),
    );

    onDiffExtract({ updatedRows, createdRows, deletedRows });
  }, [expenditures, onDiffExtract]);

  useEffect(() => {
    if (!isInsideDetailFrame) return;

    expenditures.forEach((row, index) => {
      const normalizedCurrent = (row.projectName ?? "").trim();
      const normalizedTitle = (projectTitleFromDetailFrame ?? "").trim();

      if (normalizedCurrent !== normalizedTitle) {
        setValue(
          `expenditures.${index}.projectName`,
          projectTitleFromDetailFrame ?? "",
          {
            shouldDirty: true,
          },
        );
        setValue(
          `expenditures.${index}.status`,
          DocumentReviewStatusEnum.Unsaved,
          {
            shouldDirty: true,
          },
        );
      }
    });
  }, [
    projectTitleFromDetailFrame,
    expenditures,
    isInsideDetailFrame,
    setValue,
  ]);

  const [dynamicHeight, setDynamicHeight] = React.useState<number | undefined>(
    36 + (expenditures.length + 1) * 48 + 250, // TODO: magic number 36 + 48 + 250
  );

  const changeCode = () => {
    let studentsFeeCount = 400;
    let schoolFeeCount = 500;
    let autonomousFeeCount = 600;

    const updatedExpenditures = getValues("expenditures");
    updatedExpenditures.forEach((expenditure, index) => {
      let newCode = expenditure.code;

      switch (expenditure.budgetDomain) {
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

      setValue(`expenditures.${index}.code`, newCode, {
        shouldValidate: true,
      });
    });
  };

  const defaultNewRow = [
    {
      code: 0,
      budgetDomain: BudgetDomainEnum.Undefined,
      budgetDivisionExpenditure: BudgetDivisionExpenseEnum.Undefined,
      projectName: isInsideDetailFrame ? projectTitleFromDetailFrame : "",
      item: BudgetClassExpenseEnum.Undefined,
      lastYear: "",
      thisYear: "",
      ratio: 100.0,
      reason: "",
      status: DocumentReviewStatusEnum.Unsaved,
      review: "",
    },
  ];

  const addNewRow = () => {
    const newRow = {
      ...defaultNewRow[0],
      id: nextIdRef.current, // TODO: this id is DB unique id, so this should be DB length.
      rowId: nextIdRef.current,
    };
    append(newRow);
    nextIdRef.current += 1;

    const length = expenditures.length + 1;
    setDynamicHeight(36 + length * 48 + 250);
  };

  const deleteRow = (rowIndex: number) => {
    if (expenditures.length === 1) {
      return;
    }
    remove(rowIndex);
    const length = expenditures.length - 1;

    setDynamicHeight(36 + length * 48 + 250); // TODO: magic number

    setTimeout(() => {
      // CHACHA: remove is async. Ensure that changeCode is executed after remove.
      changeCode();
    }, 0);
  };

  const onSubmit = (data: FormValues) => {
    const dirtyRows = data.expenditures.filter(
      (row, index) => !isEqual(row, initialDataRef.current[index]),
    );
    console.log("수정된 row만 제출:", dirtyRows);
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FlexWrapper direction="column" gap={16}>
          <TitleWithButtonWrapper>
            <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
              {headerTitle}
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
                  <TableCell type="Header" width="130px">
                    코드
                  </TableCell>
                  <TableCell type="Header" width="120px">
                    구분
                  </TableCell>
                  <TableCell type="Header" width="150px">
                    예산 분류
                  </TableCell>
                  <TableCell type="Header" width={0}>
                    사업명
                  </TableCell>
                  <TableCell type="Header" width="142px">
                    항목
                  </TableCell>
                  <TableCell type="Header" width="130px">
                    {isProposal ? "작년 결산" : "예산"}
                  </TableCell>
                  <TableCell type="Header" width="130px">
                    {isProposal ? "올해 예산" : "결산"}
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
                    isLast={index === expenditures.length - 1}
                    projectNameCandidate={projectNameCandidate}
                    isInsideDetailFrame={isInsideDetailFrame}
                    projectTitleFromDetailFrame={projectTitleFromDetailFrame}
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

export default ManagerExpenditureTableInProjectDetail;
