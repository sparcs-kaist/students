import { ViewerIncomeProps } from "@sparcs-students/web/features/budget/components/ViewerIncomeTable";
import {
  ManagerExpenditureProps,
  ManagerIncomeProps,
} from "@sparcs-students/web/features/budget/services/_mock/mockProposalTableData";
import { ViewerExpenditureProps } from "@sparcs-students/web/features/documents/components/ViewerExpenditureTable";
import { BudgetDomainEnum } from "@sparcs-students/root/packages/interface/src/common/enum";
import { TotalProps } from "@sparcs-students/web/features/documents/components/TotalTable";

interface DomainAccum {
  incomeLastYear: number;
  incomeThisYear: number;
  expenditureLastYear: number;
  expenditureThisYear: number;
}

export const dataToTotal = (
  incomeData: ViewerIncomeProps[] | ManagerIncomeProps[],
  expenditureData: ViewerExpenditureProps[] | ManagerExpenditureProps[],
) => {
  const incomeMap = incomeData.reduce<Record<BudgetDomainEnum, DomainAccum>>(
    (acc, cur) => {
      const { budgetDomain, lastYear, thisYear } = cur;

      const prev = acc[budgetDomain] ?? {
        incomeLastYear: 0,
        incomeThisYear: 0,
        expenditureLastYear: 0,
        expenditureThisYear: 0,
      };

      return {
        ...acc,
        [budgetDomain]: {
          ...prev,
          incomeLastYear: prev.incomeLastYear + (lastYear as number),
          incomeThisYear: prev.incomeThisYear + (thisYear as number),
        },
      };
    },
    {} as Record<BudgetDomainEnum, DomainAccum>,
  );

  const combinedMap = expenditureData.reduce<
    Record<BudgetDomainEnum, DomainAccum>
  >((acc, cur) => {
    const { budgetDomain, lastYear, thisYear } = cur;

    const prev = acc[budgetDomain] ?? {
      incomeLastYear: 0,
      incomeThisYear: 0,
      expenditureLastYear: 0,
      expenditureThisYear: 0,
    };

    return {
      ...acc,
      [budgetDomain]: {
        ...prev,
        expenditureLastYear: prev.expenditureLastYear + (lastYear as number),
        expenditureThisYear: prev.expenditureThisYear + (thisYear as number),
      },
    };
  }, incomeMap);

  const resultArray = Object.entries(combinedMap).reduce<TotalProps[]>(
    (acc, [key, sums]) => {
      const domain = Number(key) as BudgetDomainEnum;

      const incomeRow = {
        budgetDomain: domain,
        type: "수입",
        lastYear: sums.incomeLastYear,
        thisYear: sums.incomeThisYear,
        ratio:
          sums.incomeLastYear === 0
            ? null
            : (sums.incomeThisYear / sums.incomeLastYear) * 100,
      };

      const expenditureRow = {
        budgetDomain: domain,
        type: "지출",
        lastYear: sums.expenditureLastYear,
        thisYear: sums.expenditureThisYear,
        ratio:
          sums.expenditureLastYear === 0
            ? null
            : (sums.expenditureThisYear / sums.expenditureLastYear) * 100,
      };

      const totalLastYear = sums.incomeLastYear - sums.expenditureLastYear;
      const totalThisYear = sums.incomeThisYear - sums.expenditureThisYear;
      const totalRow = {
        budgetDomain: domain,
        type: "총계",
        lastYear: totalLastYear,
        thisYear: totalThisYear,
        ratio:
          totalLastYear === 0 ? null : (totalThisYear / totalLastYear) * 100,
      };

      return [...acc, incomeRow, expenditureRow, totalRow];
    },
    [] as {
      budgetDomain: BudgetDomainEnum;
      type: string;
      lastYear: number;
      thisYear: number;
      ratio: number;
    }[],
  );

  return resultArray;
};
