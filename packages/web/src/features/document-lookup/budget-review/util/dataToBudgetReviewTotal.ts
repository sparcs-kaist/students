import {
  DBExpenditureProps,
  DBIncomeProps,
} from "@sparcs-students/web/features/document-lookup/budget/type/managerFormValues";
import { TotalProps } from "../table/BudgetReviewTotalTable";

type CombinedIncome = {
  incomeLastYear: number;
  incomeThisYear: number;
};

type CombinedExpenditure = {
  expenditureLastYear: number;
  expenditureThisYear: number;
};

export const dataToBudgetReviewTotal = (
  expenditureData: DBExpenditureProps[],
  incomeData?: DBIncomeProps[],
) => {
  const accIncome = incomeData?.reduce<CombinedIncome>(
    (acc, cur) => {
      const { lastYear, thisYear } = cur;

      const accIncomeLastYear = (acc.incomeLastYear as number) ?? 0;
      const accIncomeThisYear = (acc.incomeLastYear as number) ?? 0;

      return {
        incomeLastYear: accIncomeLastYear + Number(lastYear),
        incomeThisYear: accIncomeThisYear + Number(thisYear),
      };
    },
    {
      incomeLastYear: 0,
      incomeThisYear: 0,
    },
  );

  const incomeRow = accIncome && {
    type: "수입",
    lastYear: accIncome.incomeLastYear,
    thisYear: accIncome.incomeThisYear,
    ratio:
      accIncome.incomeLastYear === 0
        ? null
        : (accIncome.incomeThisYear / accIncome.incomeLastYear) * 100,
  };

  const accExpenditure = expenditureData.reduce<CombinedExpenditure>(
    (acc, cur) => {
      const { lastYear, thisYear } = cur;

      const accExpenditureLastYear = (acc.expenditureLastYear as number) ?? 0;
      const accExpenditureThisYear = (acc.expenditureLastYear as number) ?? 0;

      return {
        expenditureLastYear: accExpenditureLastYear + Number(lastYear),
        expenditureThisYear: accExpenditureThisYear + Number(thisYear),
      };
    },

    {
      expenditureLastYear: 0,
      expenditureThisYear: 0,
    },
  );

  const expenditureRow = {
    type: "지출",
    lastYear: accExpenditure.expenditureLastYear,
    thisYear: accExpenditure.expenditureThisYear,
    ratio:
      accExpenditure.expenditureLastYear === 0
        ? null
        : (accExpenditure.expenditureThisYear /
            accExpenditure.expenditureLastYear) *
          100,
  };

  const totalRow = accIncome && {
    type: "총계",
    lastYear: accIncome.incomeLastYear - accExpenditure.expenditureLastYear,
    thisYear: accIncome.incomeThisYear - accExpenditure.expenditureThisYear,
    ratio:
      accIncome.incomeLastYear - accExpenditure.expenditureLastYear === 0
        ? null
        : ((accIncome.incomeThisYear - accExpenditure.expenditureThisYear) /
            (accIncome.incomeLastYear - accExpenditure.expenditureLastYear)) *
          100,
  };

  return [incomeRow, expenditureRow, totalRow].filter(Boolean) as TotalProps[];
};
