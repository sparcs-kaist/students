// 결산안용 엑셀 다운로드 버튼
import React from "react";
import * as XLSX from "xlsx";
import ModalTableButton from "@sparcs-students/web/common/components/Buttons/ModalTableButton";
import {
  getDisplayNameBudgetDomainEnum,
  getDisplayNameBudgetClassExpenseEnum,
  getDisplayNameBudgetDivisionExpenseEnum,
  getDisplayNameBudgetDivisionIncomeEnum,
  BudgetDomainEnum,
} from "@sparcs-students/root/packages/interface/src/common/enum/budget.enum";
import { TotalProps } from "@sparcs-students/web/features/document-lookup/budget/components/TotalTable";
import {
  DBExpenditureProps,
  DBIncomeProps,
} from "@sparcs-students/web/features/document-lookup/budget/type/managerFormValues";

interface BudgetReportExcelDownloadButtonProps {
  totalData: TotalProps[];
  expenditureData: DBExpenditureProps[];
  incomeData: DBIncomeProps[];
  year: number;
  semester: string;
  organization: string;
  submitter: string;
}

// 통화 포맷팅 함수
const formatCurrency = (amount: number | string): string => {
  const numAmount = typeof amount === "string" ? parseInt(amount) : amount;
  return `₩${numAmount.toLocaleString()}`;
};

// 비율 포맷팅 함수
const formatRatio = (ratio: number | null): string => {
  if (ratio === null) return "-%";
  return `${ratio.toFixed(2)}%`;
};

// 재원별로 데이터 그룹화하는 함수
const groupByBudgetDomain = <T extends { budgetDomain: BudgetDomainEnum }>(
  data: T[],
) => {
  const groups: Record<BudgetDomainEnum, T[]> = {
    [BudgetDomainEnum.Student]: [],
    [BudgetDomainEnum.School]: [],
    [BudgetDomainEnum.Autonomous]: [],
    [BudgetDomainEnum.Undefined]: [],
  };

  data.forEach(item => {
    if (groups[item.budgetDomain]) {
      groups[item.budgetDomain].push(item);
    }
  });

  return groups;
};

const BudgetReportExcelDownloadButton: React.FC<
  BudgetReportExcelDownloadButtonProps
> = ({
  totalData,
  expenditureData,
  incomeData,
  year,
  semester,
  organization,
  submitter,
}) => {
  const handleDownload = () => {
    // 새 워크북 생성
    const workbook = XLSX.utils.book_new();

    // 결산안 양식에 맞게 시트 데이터 구성
    const sheetData: (string | number)[][] = [];

    // 1. 제목 및 기본 정보 (결산안 양식)
    sheetData.push([
      `KAIST 학부 총학생회 ${organization} ${year}년도 ${semester} 결산`,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
    ]);
    sheetData.push(["", "", "", "", "", "", "", ""]);
    sheetData.push([
      "기구명",
      organization,
      "",
      "반기",
      `${year}년도 ${semester}`,
    ]);
    sheetData.push([
      "기구장",
      submitter,
      "",
      "제출연월일",
      new Date().toLocaleDateString("ko-KR"),
      "",
    ]);
    sheetData.push(["", "", "", "", "", "", "", ""]);

    // 2. 수입 결산 섹션
    sheetData.push(["수입", "", "", "", "", "", "", ""]);
    sheetData.push(["", "", "", "", "", "", "", ""]);
    sheetData.push([
      "재원(장)",
      "예산 분류(관)",
      "항목(항)",
      "",
      "코드",
      "예산",
      "결산",
      "비율",
      "비고",
    ]);

    // 수입 데이터를 재원별로 그룹화
    const incomeGroups = groupByBudgetDomain(incomeData);

    // 학생회비 수입 결산
    const studentIncomeItems = incomeGroups[BudgetDomainEnum.Student];
    if (studentIncomeItems.length > 0) {
      studentIncomeItems.forEach(item => {
        const executionRate =
          item.thisYear && parseInt(String(item.thisYear)) > 0
            ? (parseInt(String(item.lastYear || "0")) /
                parseInt(String(item.thisYear))) *
              100
            : null;

        sheetData.push([
          "학생회비(100)",
          getDisplayNameBudgetDivisionIncomeEnum(item.budgetDivisionIncome) ||
            "",
          item.item || "",
          "",
          item.code || "",
          formatCurrency(item.thisYear || "0"), // 예산
          formatCurrency(item.lastYear || "0"), // 결산 (실제 집행액)
          formatRatio(executionRate), // 비율
          item.reason || "",
        ]);
      });

      // 학생회비 소계 계산
      const studentIncomeTotal = {
        budget: studentIncomeItems.reduce(
          (sum, item) => sum + parseInt(String(item.thisYear || "0")),
          0,
        ),
        actual: studentIncomeItems.reduce(
          (sum, item) => sum + parseInt(String(item.lastYear || "0")),
          0,
        ),
      };
      const studentIncomeExecutionRate =
        studentIncomeTotal.budget > 0
          ? (studentIncomeTotal.actual / studentIncomeTotal.budget) * 100
          : null;

      sheetData.push([
        "",
        "수입 소계",
        "",
        "",
        "",
        formatCurrency(studentIncomeTotal.budget),
        formatCurrency(studentIncomeTotal.actual),
        formatRatio(studentIncomeExecutionRate),
        "",
      ]);
      sheetData.push(["", "", "", "", "", "", "", ""]);
    }

    // 본회계 수입 결산
    const schoolIncomeItems = incomeGroups[BudgetDomainEnum.School];
    if (schoolIncomeItems.length > 0) {
      schoolIncomeItems.forEach(item => {
        const executionRate =
          item.thisYear && parseInt(String(item.thisYear)) > 0
            ? (parseInt(String(item.lastYear || "0")) /
                parseInt(String(item.thisYear))) *
              100
            : null;

        sheetData.push([
          "본회계(200)",
          getDisplayNameBudgetDivisionIncomeEnum(item.budgetDivisionIncome) ||
            "",
          item.item || "",
          "",
          item.code || "",
          formatCurrency(item.thisYear || "0"),
          formatCurrency(item.lastYear || "0"),
          formatRatio(executionRate),
          item.reason || "",
        ]);
      });

      // 본회계 소계 계산
      const schoolIncomeTotal = {
        budget: schoolIncomeItems.reduce(
          (sum, item) => sum + parseInt(String(item.thisYear || "0")),
          0,
        ),
        actual: schoolIncomeItems.reduce(
          (sum, item) => sum + parseInt(String(item.lastYear || "0")),
          0,
        ),
      };
      const schoolIncomeExecutionRate =
        schoolIncomeTotal.budget > 0
          ? (schoolIncomeTotal.actual / schoolIncomeTotal.budget) * 100
          : null;

      sheetData.push([
        "",
        "수입 소계",
        "",
        "",
        "",
        formatCurrency(schoolIncomeTotal.budget),
        formatCurrency(schoolIncomeTotal.actual),
        formatRatio(schoolIncomeExecutionRate),
        "",
      ]);
      sheetData.push(["", "", "", "", "", "", "", ""]);
    }

    // 자치 수입 결산
    const autonomousIncomeItems = incomeGroups[BudgetDomainEnum.Autonomous];
    if (autonomousIncomeItems.length > 0) {
      autonomousIncomeItems.forEach(item => {
        const executionRate =
          item.thisYear && parseInt(String(item.thisYear)) > 0
            ? (parseInt(String(item.lastYear || "0")) /
                parseInt(String(item.thisYear))) *
              100
            : null;

        sheetData.push([
          "자치(300)",
          getDisplayNameBudgetDivisionIncomeEnum(item.budgetDivisionIncome) ||
            "",
          item.item || "",
          "",
          item.code || "",
          formatCurrency(item.thisYear || "0"),
          formatCurrency(item.lastYear || "0"),
          formatRatio(executionRate),
          item.reason || "",
        ]);
      });

      // 자치 소계 계산
      const autonomousIncomeTotal = {
        budget: autonomousIncomeItems.reduce(
          (sum, item) => sum + parseInt(String(item.thisYear || "0")),
          0,
        ),
        actual: autonomousIncomeItems.reduce(
          (sum, item) => sum + parseInt(String(item.lastYear || "0")),
          0,
        ),
      };
      const autonomousIncomeExecutionRate =
        autonomousIncomeTotal.budget > 0
          ? (autonomousIncomeTotal.actual / autonomousIncomeTotal.budget) * 100
          : null;

      sheetData.push([
        "",
        "수입 소계",
        "",
        "",
        "",
        formatCurrency(autonomousIncomeTotal.budget),
        formatCurrency(autonomousIncomeTotal.actual),
        formatRatio(autonomousIncomeExecutionRate),
        "",
      ]);
      sheetData.push(["", "", "", "", "", "", "", ""]);
    }

    // 수입 총계
    const totalIncome = {
      budget: incomeData.reduce(
        (sum, item) => sum + parseInt(String(item.thisYear || "0")),
        0,
      ),
      actual: incomeData.reduce(
        (sum, item) => sum + parseInt(String(item.lastYear || "0")),
        0,
      ),
    };
    const totalIncomeExecutionRate =
      totalIncome.budget > 0
        ? (totalIncome.actual / totalIncome.budget) * 100
        : null;

    sheetData.push([
      "",
      "수입 총계",
      "",
      "",
      "",
      formatCurrency(totalIncome.budget),
      formatCurrency(totalIncome.actual),
      formatRatio(totalIncomeExecutionRate),
      "",
    ]);
    sheetData.push(["", "", "", "", "", "", "", ""]);
    sheetData.push(["", "", "", "", "", "", "", ""]);

    // 3. 지출 결산 섹션
    sheetData.push(["지출", "", "", "", "", "", "", ""]);
    sheetData.push(["", "", "", "", "", "", "", ""]);
    sheetData.push([
      "재원(장)",
      "예산 분류(관)",
      "사업명(항)",
      "예산 과목 (세부 항목)",
      "코드",
      "예산",
      "결산",
      "비율",
      "비고",
    ]);

    // 지출 데이터를 재원별로 그룹화
    const expenditureGroups = groupByBudgetDomain(expenditureData);

    // 학생회비 지출 결산
    const studentExpenditureItems = expenditureGroups[BudgetDomainEnum.Student];
    if (studentExpenditureItems.length > 0) {
      studentExpenditureItems.forEach(item => {
        const executionRate =
          item.thisYear && parseInt(String(item.thisYear)) > 0
            ? (parseInt(String(item.lastYear || "0")) /
                parseInt(String(item.thisYear))) *
              100
            : null;

        sheetData.push([
          "학생회비(400)",
          getDisplayNameBudgetDivisionExpenseEnum(
            item.budgetDivisionExpenditure,
          ) || "",
          item.projectName || "",
          getDisplayNameBudgetClassExpenseEnum(item.item) || "",
          item.code || "",
          formatCurrency(item.thisYear || "0"),
          formatCurrency(item.lastYear || "0"),
          formatRatio(executionRate),
          item.reason || "",
        ]);
      });

      // 학생회비 지출 소계
      const studentExpenditureTotal = {
        budget: studentExpenditureItems.reduce(
          (sum, item) => sum + parseInt(String(item.thisYear || "0")),
          0,
        ),
        actual: studentExpenditureItems.reduce(
          (sum, item) => sum + parseInt(String(item.lastYear || "0")),
          0,
        ),
      };
      const studentExpenditureExecutionRate =
        studentExpenditureTotal.budget > 0
          ? (studentExpenditureTotal.actual / studentExpenditureTotal.budget) *
            100
          : null;

      sheetData.push([
        "",
        "지출 소계",
        "",
        "",
        "",
        formatCurrency(studentExpenditureTotal.budget),
        formatCurrency(studentExpenditureTotal.actual),
        formatRatio(studentExpenditureExecutionRate),
        "",
      ]);
      sheetData.push(["", "", "", "", "", "", "", "", ""]);
    }

    // 본회계 지출 결산
    const schoolExpenditureItems = expenditureGroups[BudgetDomainEnum.School];
    if (schoolExpenditureItems.length > 0) {
      schoolExpenditureItems.forEach(item => {
        const executionRate =
          item.thisYear && parseInt(String(item.thisYear)) > 0
            ? (parseInt(String(item.lastYear || "0")) /
                parseInt(String(item.thisYear))) *
              100
            : null;

        sheetData.push([
          "본회계(500)",
          getDisplayNameBudgetDivisionExpenseEnum(
            item.budgetDivisionExpenditure,
          ) || "",
          item.projectName || "",
          getDisplayNameBudgetClassExpenseEnum(item.item) || "",
          item.code || "",
          formatCurrency(item.thisYear || "0"),
          formatCurrency(item.lastYear || "0"),
          formatRatio(executionRate),
          item.reason || "",
        ]);
      });

      // 본회계 지출 소계
      const schoolExpenditureTotal = {
        budget: schoolExpenditureItems.reduce(
          (sum, item) => sum + parseInt(String(item.thisYear || "0")),
          0,
        ),
        actual: schoolExpenditureItems.reduce(
          (sum, item) => sum + parseInt(String(item.lastYear || "0")),
          0,
        ),
      };
      const schoolExpenditureExecutionRate =
        schoolExpenditureTotal.budget > 0
          ? (schoolExpenditureTotal.actual / schoolExpenditureTotal.budget) *
            100
          : null;

      sheetData.push([
        "",
        "지출 소계",
        "",
        "",
        "",
        formatCurrency(schoolExpenditureTotal.budget),
        formatCurrency(schoolExpenditureTotal.actual),
        formatRatio(schoolExpenditureExecutionRate),
        "",
      ]);
      sheetData.push(["", "", "", "", "", "", "", "", ""]);
    }

    // 자치 지출 결산
    const autonomousExpenditureItems =
      expenditureGroups[BudgetDomainEnum.Autonomous];
    if (autonomousExpenditureItems.length > 0) {
      autonomousExpenditureItems.forEach(item => {
        const executionRate =
          item.thisYear && parseInt(String(item.thisYear)) > 0
            ? (parseInt(String(item.lastYear || "0")) /
                parseInt(String(item.thisYear))) *
              100
            : null;

        sheetData.push([
          "자치(600)",
          getDisplayNameBudgetDivisionExpenseEnum(
            item.budgetDivisionExpenditure,
          ) || "",
          item.projectName || "",
          getDisplayNameBudgetClassExpenseEnum(item.item) || "",
          item.code || "",
          formatCurrency(item.thisYear || "0"),
          formatCurrency(item.lastYear || "0"),
          formatRatio(executionRate),
          item.reason || "",
        ]);
      });

      // 자치 지출 소계
      const autonomousExpenditureTotal = {
        budget: autonomousExpenditureItems.reduce(
          (sum, item) => sum + parseInt(String(item.thisYear || "0")),
          0,
        ),
        actual: autonomousExpenditureItems.reduce(
          (sum, item) => sum + parseInt(String(item.lastYear || "0")),
          0,
        ),
      };
      const autonomousExpenditureExecutionRate =
        autonomousExpenditureTotal.budget > 0
          ? (autonomousExpenditureTotal.actual /
              autonomousExpenditureTotal.budget) *
            100
          : null;

      sheetData.push([
        "",
        "지출 소계",
        "",
        "",
        "",
        formatCurrency(autonomousExpenditureTotal.budget),
        formatCurrency(autonomousExpenditureTotal.actual),
        formatRatio(autonomousExpenditureExecutionRate),
        "",
      ]);
      sheetData.push(["", "", "", "", "", "", "", "", ""]);
    }

    // 지출 총계
    const totalExpenditure = {
      budget: expenditureData.reduce(
        (sum, item) => sum + parseInt(String(item.thisYear || "0")),
        0,
      ),
      actual: expenditureData.reduce(
        (sum, item) => sum + parseInt(String(item.lastYear || "0")),
        0,
      ),
    };
    const totalExpenditureExecutionRate =
      totalExpenditure.budget > 0
        ? (totalExpenditure.actual / totalExpenditure.budget) * 100
        : null;

    sheetData.push([
      "",
      "지출 총계",
      "",
      "",
      "",
      formatCurrency(totalExpenditure.budget),
      formatCurrency(totalExpenditure.actual),
      formatRatio(totalExpenditureExecutionRate),
      "",
    ]);
    sheetData.push(["", "", "", "", "", "", "", "", ""]);
    sheetData.push(["", "", "", "", "", "", "", "", ""]);

    // 4. 하단 총계 표 (결산안 양식)
    sheetData.push(["", "총계", "", "", "", "예산", "결산", "비율", ""]);
    sheetData.push([
      "",
      "수입",
      "",
      "",
      "",
      formatCurrency(totalIncome.budget),
      formatCurrency(totalIncome.actual),
      formatRatio(totalIncomeExecutionRate),
      "",
    ]);
    sheetData.push([
      "",
      "지출",
      "",
      "",
      "",
      formatCurrency(totalExpenditure.budget),
      formatCurrency(totalExpenditure.actual),
      formatRatio(totalExpenditureExecutionRate),
      "",
    ]);

    const totalBalance = {
      budget: totalIncome.budget - totalExpenditure.budget,
      actual: totalIncome.actual - totalExpenditure.actual,
    };
    const totalBalanceExecutionRate =
      totalBalance.budget !== 0
        ? (totalBalance.actual / totalBalance.budget) * 100
        : null;

    sheetData.push([
      "",
      "잔액",
      "",
      "",
      "",
      formatCurrency(totalBalance.budget),
      formatCurrency(totalBalance.actual),
      formatRatio(totalBalanceExecutionRate),
      "",
    ]);
    sheetData.push(["", "", "", "", "", "", "", "", ""]);

    // 재원별 총계
    const domains = [
      BudgetDomainEnum.Student,
      BudgetDomainEnum.School,
      BudgetDomainEnum.Autonomous,
    ];
    domains.forEach(domain => {
      const domainName = getDisplayNameBudgetDomainEnum(domain);
      const domainIncomeItems = incomeData.filter(
        item => item.budgetDomain === domain,
      );
      const domainExpenditureItems = expenditureData.filter(
        item => item.budgetDomain === domain,
      );

      if (domainIncomeItems.length > 0 || domainExpenditureItems.length > 0) {
        const domainIncomeTotal = {
          budget: domainIncomeItems.reduce(
            (sum, item) => sum + parseInt(String(item.thisYear || "0")),
            0,
          ),
          actual: domainIncomeItems.reduce(
            (sum, item) => sum + parseInt(String(item.lastYear || "0")),
            0,
          ),
        };
        const domainExpenditureTotal = {
          budget: domainExpenditureItems.reduce(
            (sum, item) => sum + parseInt(String(item.thisYear || "0")),
            0,
          ),
          actual: domainExpenditureItems.reduce(
            (sum, item) => sum + parseInt(String(item.lastYear || "0")),
            0,
          ),
        };

        const domainIncomeExecutionRate =
          domainIncomeTotal.budget > 0
            ? (domainIncomeTotal.actual / domainIncomeTotal.budget) * 100
            : null;
        const domainExpenditureExecutionRate =
          domainExpenditureTotal.budget > 0
            ? (domainExpenditureTotal.actual / domainExpenditureTotal.budget) *
              100
            : null;

        const domainBalance = {
          budget: domainIncomeTotal.budget - domainExpenditureTotal.budget,
          actual: domainIncomeTotal.actual - domainExpenditureTotal.actual,
        };
        const domainBalanceExecutionRate =
          domainBalance.budget !== 0
            ? (domainBalance.actual / domainBalance.budget) * 100
            : null;

        sheetData.push([
          "",
          domainName || "",
          "",
          "",
          "",
          "예산",
          "결산",
          "비율",
          "",
        ]);
        sheetData.push([
          "",
          "수입",
          "",
          "",
          "",
          formatCurrency(domainIncomeTotal.budget),
          formatCurrency(domainIncomeTotal.actual),
          formatRatio(domainIncomeExecutionRate),
          "",
        ]);
        sheetData.push([
          "",
          "지출",
          "",
          "",
          "",
          formatCurrency(domainExpenditureTotal.budget),
          formatCurrency(domainExpenditureTotal.actual),
          formatRatio(domainExpenditureExecutionRate),
          "",
        ]);
        sheetData.push([
          "",
          "잔액",
          "",
          "",
          "",
          formatCurrency(domainBalance.budget),
          formatCurrency(domainBalance.actual),
          formatRatio(domainBalanceExecutionRate),
          "",
        ]);
        sheetData.push(["", "", "", "", "", "", "", "", ""]);
      }
    });

    // 시트 생성
    const sheet = XLSX.utils.aoa_to_sheet(sheetData);

    // 컬럼 너비 설정 (결산안 양식에 맞게)
    sheet["!cols"] = [
      { width: 15 }, // 재원/항목
      { width: 15 }, // 예산 분류(관)
      { width: 18 }, // 사업명/항목명
      { width: 15 }, // 예산과목
      { width: 8 }, // 코드
      { width: 16 }, // 예산
      { width: 16 }, // 결산
      { width: 12 }, // 비율
      { width: 35 }, // 비고
    ];

    // 셀 병합 설정
    const merges: XLSX.Range[] = [];

    // 제목 병합
    merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: 8 } });

    // 수입/지출 제목 병합
    merges.push({ s: { r: 5, c: 0 }, e: { r: 5, c: 8 } }); // 수입 제목

    // 지출 제목 위치를 찾아서 병합
    let expenditureRowIndex = -1;
    for (let i = 0; i < sheetData.length; i += 1) {
      if (sheetData[i][0] === "지출") {
        expenditureRowIndex = i;
        break;
      }
    }
    if (expenditureRowIndex >= 0) {
      merges.push({
        s: { r: expenditureRowIndex, c: 0 },
        e: { r: expenditureRowIndex, c: 8 },
      });
    }

    sheet["!merges"] = merges;

    // 스타일 설정
    const addCellStyle = (
      worksheet: XLSX.WorkSheet,
      cellRef: string,
      style: object,
    ) => {
      const cell = worksheet[cellRef] || { t: "s", v: "" };
      cell.s = style;
      // eslint-disable-next-line no-param-reassign
      worksheet[cellRef] = cell;
    };

    const headerStyle = {
      font: { bold: true, sz: 12 },
      alignment: { horizontal: "center", vertical: "center" },
      fill: { fgColor: { rgb: "E8F5E8" } },
      border: {
        top: { style: "thin", color: { rgb: "000000" } },
        bottom: { style: "thin", color: { rgb: "000000" } },
        left: { style: "thin", color: { rgb: "000000" } },
        right: { style: "thin", color: { rgb: "000000" } },
      },
    };

    const titleStyle = {
      font: { bold: true, sz: 14 },
      alignment: { horizontal: "center", vertical: "center" },
    };

    // 스타일 적용
    addCellStyle(sheet, "A1", titleStyle);
    ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"].forEach(cell => {
      addCellStyle(sheet, cell, headerStyle);
    });

    if (expenditureRowIndex >= 0) {
      const expenditureHeaderRow = expenditureRowIndex + 2;
      const expenditureHeaderCells = [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
      ].map(col => `${col}${expenditureHeaderRow + 1}`);
      expenditureHeaderCells.forEach(cell => {
        addCellStyle(sheet, cell, headerStyle);
      });
    }

    XLSX.utils.book_append_sheet(
      workbook,
      sheet,
      `${year}년도 ${semester} 결산`,
    );

    // totalData를 사용한 별도 요약 시트 생성
    if (totalData && totalData.length > 0) {
      const totalSheetData: (string | number)[][] = [
        ["요약 정보"],
        [],
        ["구분", "분류", "예산", "결산", "비율"],
        ...totalData.map(item => [
          getDisplayNameBudgetDomainEnum(item.budgetDomain) || "",
          item.type || "",
          formatCurrency(item.thisYear || 0), // 예산
          formatCurrency(item.lastYear || 0), // 결산
          formatRatio(
            item.thisYear && item.thisYear > 0
              ? ((item.lastYear || 0) / item.thisYear) * 100
              : null,
          ), // 비율
        ]),
      ];

      const totalSummarySheet = XLSX.utils.aoa_to_sheet(totalSheetData);
      totalSummarySheet["!cols"] = [
        { width: 15 },
        { width: 15 },
        { width: 20 },
        { width: 20 },
        { width: 15 },
      ];

      totalSummarySheet["!merges"] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }];

      addCellStyle(totalSummarySheet, "A1", titleStyle);
      ["A3", "B3", "C3", "D3", "E3"].forEach(cell => {
        addCellStyle(totalSummarySheet, cell, headerStyle);
      });

      XLSX.utils.book_append_sheet(workbook, totalSummarySheet, "요약");
    }

    // 파일명 생성 및 다운로드
    const fileName = `${organization}_${year}년도_${semester}_결산_${new Date().toISOString().slice(0, 10)}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

  return <ModalTableButton buttonText="Excel" onClick={handleDownload} />;
};

export default BudgetReportExcelDownloadButton;
