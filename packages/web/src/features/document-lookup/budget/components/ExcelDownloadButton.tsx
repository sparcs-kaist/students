// 지출 총계
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

interface ExcelDownloadButtonProps {
  totalData: TotalProps[];
  expenditureData: DBExpenditureProps[];
  incomeData: DBIncomeProps[];
  year: number;
  semester: string;
  documentType: string;
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

const ExcelDownloadButton: React.FC<ExcelDownloadButtonProps> = ({
  totalData,
  expenditureData,
  incomeData,
  year,
  semester,
  documentType,
  organization,
  submitter,
}) => {
  const handleDownload = () => {
    // 새 워크북 생성
    const workbook = XLSX.utils.book_new();

    // PDF와 동일한 형태로 하나의 시트에 모든 정보 포함
    const sheetData: (string | number)[][] = [];

    // 1. 제목 및 기본 정보 (PDF 상단 레이아웃과 동일하게)
    sheetData.push([
      `KAIST 학부 총학생회 ${organization} ${year}년도 ${semester} ${documentType}`,
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

    // 2. 수입 섹션
    sheetData.push(["수입", "", "", "", "", "", "", ""]);
    sheetData.push(["", "", "", "", "", "", "", ""]);
    sheetData.push([
      "재원(장)",
      "예산 분류(관)",
      "항목(항)",
      "",
      "코드",
      "전년도 결산",
      "당해 연도 예산",
      "비율",
      "예산 산정 근거",
    ]);

    // 수입 데이터를 재원별로 그룹화
    const incomeGroups = groupByBudgetDomain(incomeData);

    // 학생회비 수입
    const studentIncomeItems = incomeGroups[BudgetDomainEnum.Student];
    if (studentIncomeItems.length > 0) {
      studentIncomeItems.forEach(item => {
        sheetData.push([
          "학생회비(100)",
          getDisplayNameBudgetDivisionIncomeEnum(item.budgetDivisionIncome) ||
            "",
          item.item || "",
          "",
          item.code || "",
          formatCurrency(item.lastYear || "0"),
          formatCurrency(item.thisYear || "0"),
          formatRatio(item.ratio),
          item.reason || "",
        ]);
      });

      // 학생회비 소계 계산
      const studentIncomeTotal = {
        lastYear: studentIncomeItems.reduce(
          (sum, item) => sum + parseInt(String(item.lastYear || "0")),
          0,
        ),
        thisYear: studentIncomeItems.reduce(
          (sum, item) => sum + parseInt(String(item.thisYear || "0")),
          0,
        ),
      };
      const studentIncomeRatio =
        studentIncomeTotal.lastYear > 0
          ? (studentIncomeTotal.thisYear / studentIncomeTotal.lastYear) * 100
          : null;

      sheetData.push([
        "",
        "수입 소계",
        "",
        "",
        formatCurrency(studentIncomeTotal.lastYear),
        formatCurrency(studentIncomeTotal.thisYear),
        formatRatio(studentIncomeRatio),
        "",
      ]);
      sheetData.push(["", "", "", "", "", "", "", ""]);
    }

    // 본회계 수입
    const schoolIncomeItems = incomeGroups[BudgetDomainEnum.School];
    if (schoolIncomeItems.length > 0) {
      schoolIncomeItems.forEach(item => {
        sheetData.push([
          "본회계(200)",
          getDisplayNameBudgetDivisionIncomeEnum(item.budgetDivisionIncome) ||
            "",
          item.item || "",
          "",
          item.code || "",
          formatCurrency(item.lastYear || "0"),
          formatCurrency(item.thisYear || "0"),
          formatRatio(item.ratio),
          item.reason || "",
        ]);
      });

      // 본회계 소계 계산
      const schoolIncomeTotal = {
        lastYear: schoolIncomeItems.reduce(
          (sum, item) => sum + parseInt(String(item.lastYear || "0")),
          0,
        ),
        thisYear: schoolIncomeItems.reduce(
          (sum, item) => sum + parseInt(String(item.thisYear || "0")),
          0,
        ),
      };
      const schoolIncomeRatio =
        schoolIncomeTotal.lastYear > 0
          ? (schoolIncomeTotal.thisYear / schoolIncomeTotal.lastYear) * 100
          : null;

      sheetData.push([
        "",
        "수입 소계",
        "",
        "",
        formatCurrency(schoolIncomeTotal.lastYear),
        formatCurrency(schoolIncomeTotal.thisYear),
        formatRatio(schoolIncomeRatio),
        "",
      ]);
      sheetData.push(["", "", "", "", "", "", "", ""]);
    }

    // 자치 수입
    const autonomousIncomeItems = incomeGroups[BudgetDomainEnum.Autonomous];
    if (autonomousIncomeItems.length > 0) {
      autonomousIncomeItems.forEach(item => {
        sheetData.push([
          "자치(300)",
          getDisplayNameBudgetDivisionIncomeEnum(item.budgetDivisionIncome) ||
            "",
          item.item || "",
          "",
          item.code || "",
          formatCurrency(item.lastYear || "0"),
          formatCurrency(item.thisYear || "0"),
          formatRatio(item.ratio),
          item.reason || "",
        ]);
      });

      // 자치 소계 계산
      const autonomousIncomeTotal = {
        lastYear: autonomousIncomeItems.reduce(
          (sum, item) => sum + parseInt(String(item.lastYear || "0")),
          0,
        ),
        thisYear: autonomousIncomeItems.reduce(
          (sum, item) => sum + parseInt(String(item.thisYear || "0")),
          0,
        ),
      };
      const autonomousIncomeRatio =
        autonomousIncomeTotal.lastYear > 0
          ? (autonomousIncomeTotal.thisYear / autonomousIncomeTotal.lastYear) *
            100
          : null;

      sheetData.push([
        "",
        "수입 소계",
        "",
        "",
        formatCurrency(autonomousIncomeTotal.lastYear),
        formatCurrency(autonomousIncomeTotal.thisYear),
        formatRatio(autonomousIncomeRatio),
        "",
      ]);
      sheetData.push(["", "", "", "", "", "", "", ""]);
    }

    // 수입 총계
    const totalIncome = {
      lastYear: incomeData.reduce(
        (sum, item) => sum + parseInt(String(item.lastYear || "0")),
        0,
      ),
      thisYear: incomeData.reduce(
        (sum, item) => sum + parseInt(String(item.thisYear || "0")),
        0,
      ),
    };
    const totalIncomeRatio =
      totalIncome.lastYear > 0
        ? (totalIncome.thisYear / totalIncome.lastYear) * 100
        : null;

    sheetData.push([
      "",
      "수입 총계",
      "",
      "",
      formatCurrency(totalIncome.lastYear),
      formatCurrency(totalIncome.thisYear),
      formatRatio(totalIncomeRatio),
      "",
    ]);
    sheetData.push(["", "", "", "", "", "", "", ""]);
    sheetData.push(["", "", "", "", "", "", "", ""]);

    // 3. 지출 섹션
    sheetData.push(["지출", "", "", "", "", "", "", ""]);
    sheetData.push(["", "", "", "", "", "", "", ""]);
    sheetData.push([
      "재원(장)",
      "예산 분류(관)",
      "사업명(항)",
      "예산 과목 (세부 항목)",
      "코드",
      "전년도 결산",
      "당해 연도 예산",
      "비율",
      "예산 산정 근거",
    ]);

    // 지출 데이터를 재원별로 그룹화
    const expenditureGroups = groupByBudgetDomain(expenditureData);

    // 학생회비 지출
    const studentExpenditureItems = expenditureGroups[BudgetDomainEnum.Student];
    if (studentExpenditureItems.length > 0) {
      studentExpenditureItems.forEach(item => {
        sheetData.push([
          "학생회비(400)",
          getDisplayNameBudgetDivisionExpenseEnum(
            item.budgetDivisionExpenditure,
          ) || "",
          item.projectName || "",
          getDisplayNameBudgetClassExpenseEnum(item.item) || "",
          item.code || "",
          formatCurrency(item.lastYear || "0"),
          formatCurrency(item.thisYear || "0"),
          formatRatio(item.ratio),
          item.reason || "",
        ]);
      });

      // 학생회비 지출 소계
      const studentExpenditureTotal = {
        lastYear: studentExpenditureItems.reduce(
          (sum, item) => sum + parseInt(String(item.lastYear || "0")),
          0,
        ),
        thisYear: studentExpenditureItems.reduce(
          (sum, item) => sum + parseInt(String(item.thisYear || "0")),
          0,
        ),
      };
      const studentExpenditureRatio =
        studentExpenditureTotal.lastYear > 0
          ? (studentExpenditureTotal.thisYear /
              studentExpenditureTotal.lastYear) *
            100
          : null;

      sheetData.push([
        "",
        "지출 소계",
        "",
        "",
        "",
        formatCurrency(studentExpenditureTotal.lastYear),
        formatCurrency(studentExpenditureTotal.thisYear),
        formatRatio(studentExpenditureRatio),
        "",
      ]);
      sheetData.push(["", "", "", "", "", "", "", "", ""]);
    }

    // 본회계 지출
    const schoolExpenditureItems = expenditureGroups[BudgetDomainEnum.School];
    if (schoolExpenditureItems.length > 0) {
      schoolExpenditureItems.forEach(item => {
        sheetData.push([
          "본회계(500)",
          getDisplayNameBudgetDivisionExpenseEnum(
            item.budgetDivisionExpenditure,
          ) || "",
          item.projectName || "",
          getDisplayNameBudgetClassExpenseEnum(item.item) || "",
          item.code || "",
          formatCurrency(item.lastYear || "0"),
          formatCurrency(item.thisYear || "0"),
          formatRatio(item.ratio),
          item.reason || "",
        ]);
      });

      // 본회계 지출 소계
      const schoolExpenditureTotal = {
        lastYear: schoolExpenditureItems.reduce(
          (sum, item) => sum + parseInt(String(item.lastYear || "0")),
          0,
        ),
        thisYear: schoolExpenditureItems.reduce(
          (sum, item) => sum + parseInt(String(item.thisYear || "0")),
          0,
        ),
      };
      const schoolExpenditureRatio =
        schoolExpenditureTotal.lastYear > 0
          ? (schoolExpenditureTotal.thisYear /
              schoolExpenditureTotal.lastYear) *
            100
          : null;

      sheetData.push([
        "",
        "지출 소계",
        "",
        "",
        "",
        formatCurrency(schoolExpenditureTotal.lastYear),
        formatCurrency(schoolExpenditureTotal.thisYear),
        formatRatio(schoolExpenditureRatio),
        "",
      ]);
      sheetData.push(["", "", "", "", "", "", "", "", ""]);
    }

    // 자치 지출
    const autonomousExpenditureItems =
      expenditureGroups[BudgetDomainEnum.Autonomous];
    if (autonomousExpenditureItems.length > 0) {
      autonomousExpenditureItems.forEach(item => {
        sheetData.push([
          "자치(600)",
          getDisplayNameBudgetDivisionExpenseEnum(
            item.budgetDivisionExpenditure,
          ) || "",
          item.projectName || "",
          getDisplayNameBudgetClassExpenseEnum(item.item) || "",
          item.code || "",
          formatCurrency(item.lastYear || "0"),
          formatCurrency(item.thisYear || "0"),
          formatRatio(item.ratio),
          item.reason || "",
        ]);
      });

      // 자치 지출 소계
      const autonomousExpenditureTotal = {
        lastYear: autonomousExpenditureItems.reduce(
          (sum, item) => sum + parseInt(String(item.lastYear || "0")),
          0,
        ),
        thisYear: autonomousExpenditureItems.reduce(
          (sum, item) => sum + parseInt(String(item.thisYear || "0")),
          0,
        ),
      };
      const autonomousExpenditureRatio =
        autonomousExpenditureTotal.lastYear > 0
          ? (autonomousExpenditureTotal.thisYear /
              autonomousExpenditureTotal.lastYear) *
            100
          : null;

      sheetData.push([
        "",
        "지출 소계",
        "",
        "",
        "",
        formatCurrency(autonomousExpenditureTotal.lastYear),
        formatCurrency(autonomousExpenditureTotal.thisYear),
        formatRatio(autonomousExpenditureRatio),
        "",
      ]);
      sheetData.push(["", "", "", "", "", "", "", "", ""]);
    }

    // 지출 총계
    const totalExpenditure = {
      lastYear: expenditureData.reduce(
        (sum, item) => sum + parseInt(String(item.lastYear || "0")),
        0,
      ),
      thisYear: expenditureData.reduce(
        (sum, item) => sum + parseInt(String(item.thisYear || "0")),
        0,
      ),
    };
    const totalExpenditureRatio =
      totalExpenditure.lastYear > 0
        ? (totalExpenditure.thisYear / totalExpenditure.lastYear) * 100
        : null;

    sheetData.push([
      "",
      "지출 총계",
      "",
      "",
      "",
      formatCurrency(totalExpenditure.lastYear),
      formatCurrency(totalExpenditure.thisYear),
      formatRatio(totalExpenditureRatio),
      "",
    ]);
    sheetData.push(["", "", "", "", "", "", "", "", ""]);
    sheetData.push(["", "", "", "", "", "", "", "", ""]);

    // 4. 하단 총계 표 (PDF 하단과 동일하게 구성)
    sheetData.push([
      "",
      "총계",
      "",
      "",
      "",
      "전년도 결산",
      "당해년도 예산",
      "비율",
      "",
    ]);
    sheetData.push([
      "",
      "수입",
      "",
      "",
      "",
      formatCurrency(totalIncome.lastYear),
      formatCurrency(totalIncome.thisYear),
      formatRatio(totalIncomeRatio),
      "",
    ]);
    sheetData.push([
      "",
      "지출",
      "",
      "",
      "",
      formatCurrency(totalExpenditure.lastYear),
      formatCurrency(totalExpenditure.thisYear),
      formatRatio(totalExpenditureRatio),
      "",
    ]);

    const totalBalance = {
      lastYear: totalIncome.lastYear - totalExpenditure.lastYear,
      thisYear: totalIncome.thisYear - totalExpenditure.thisYear,
    };
    const totalBalanceRatio =
      totalBalance.lastYear !== 0
        ? (totalBalance.thisYear / totalBalance.lastYear) * 100
        : null;

    sheetData.push([
      "",
      "잔액",
      "",
      "",
      "",
      formatCurrency(totalBalance.lastYear),
      formatCurrency(totalBalance.thisYear),
      formatRatio(totalBalanceRatio),
      "",
    ]);
    sheetData.push(["", "", "", "", "", "", "", "", ""]);

    // 재원별 총계 (PDF 우측 하단 표와 동일)
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
          lastYear: domainIncomeItems.reduce(
            (sum, item) => sum + parseInt(String(item.lastYear || "0")),
            0,
          ),
          thisYear: domainIncomeItems.reduce(
            (sum, item) => sum + parseInt(String(item.thisYear || "0")),
            0,
          ),
        };
        const domainExpenditureTotal = {
          lastYear: domainExpenditureItems.reduce(
            (sum, item) => sum + parseInt(String(item.lastYear || "0")),
            0,
          ),
          thisYear: domainExpenditureItems.reduce(
            (sum, item) => sum + parseInt(String(item.thisYear || "0")),
            0,
          ),
        };

        const domainIncomeRatio =
          domainIncomeTotal.lastYear > 0
            ? (domainIncomeTotal.thisYear / domainIncomeTotal.lastYear) * 100
            : null;
        const domainExpenditureRatio =
          domainExpenditureTotal.lastYear > 0
            ? (domainExpenditureTotal.thisYear /
                domainExpenditureTotal.lastYear) *
              100
            : null;

        const domainBalance = {
          lastYear:
            domainIncomeTotal.lastYear - domainExpenditureTotal.lastYear,
          thisYear:
            domainIncomeTotal.thisYear - domainExpenditureTotal.thisYear,
        };
        const domainBalanceRatio =
          domainBalance.lastYear !== 0
            ? (domainBalance.thisYear / domainBalance.lastYear) * 100
            : null;

        sheetData.push([
          "",
          domainName || "",
          "",
          "",
          "",
          "전년도 결산",
          "당해년도 예산",
          "비율",
          "",
        ]);
        sheetData.push([
          "",
          "수입",
          "",
          "",
          "",
          formatCurrency(domainIncomeTotal.lastYear),
          formatCurrency(domainIncomeTotal.thisYear),
          formatRatio(domainIncomeRatio),
          "",
          "",
          "",
          "",
        ]);
        sheetData.push([
          "",
          "지출",
          "",
          "",
          "",
          formatCurrency(domainExpenditureTotal.lastYear),
          formatCurrency(domainExpenditureTotal.thisYear),
          formatRatio(domainExpenditureRatio),
          "",
        ]);
        sheetData.push([
          "",
          "잔액",
          "",
          "",
          "",
          formatCurrency(domainBalance.lastYear),
          formatCurrency(domainBalance.thisYear),
          formatRatio(domainBalanceRatio),
          "",
        ]);
        sheetData.push(["", "", "", "", "", "", "", "", ""]);
      }
    });

    // 시트 생성
    const sheet = XLSX.utils.aoa_to_sheet(sheetData);

    // 컬럼 너비 설정 (PDF 비율에 맞게 - 9컬럼)
    sheet["!cols"] = [
      { width: 15 }, // 재원/항목
      { width: 15 }, // 예산 분류(관)
      { width: 18 }, // 사업명/항목명
      { width: 15 }, // 예산과목
      { width: 8 }, // 코드
      { width: 16 }, // 전년도 결산
      { width: 16 }, // 당해 연도 예산
      { width: 12 }, // 비율
      { width: 35 }, // 예산 산정 근거
    ];

    // 셀 병합 설정 (PDF와 동일하게)
    const merges: XLSX.Range[] = [];

    // 제목 병합 (9컬럼)
    merges.push({ s: { r: 0, c: 0 }, e: { r: 0, c: 8 } });

    // 수입/지출 제목 병합 (9컬럼)
    merges.push({ s: { r: 5, c: 0 }, e: { r: 5, c: 8 } }); // 수입 제목

    // 지출 제목 위치를 찾아서 병합 (동적으로 계산)
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
      }); // 지출 제목
    }

    sheet["!merges"] = merges;

    // 스타일 설정을 위한 함수
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

    // 기본 스타일 정의
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

    // 제목 스타일 적용
    addCellStyle(sheet, "A1", titleStyle);

    // 수입 헤더 스타일 적용 (9컬럼)
    ["A8", "B8", "C8", "D8", "E8", "F8", "G8", "H8", "I8"].forEach(cell => {
      addCellStyle(sheet, cell, headerStyle);
    });

    // 지출 헤더 스타일 적용 (동적으로 찾기)
    if (expenditureRowIndex >= 0) {
      const expenditureHeaderRow = expenditureRowIndex + 2; // 지출 제목 다음다음 행이 헤더
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
      `${year}년도 ${semester} ${documentType}`,
    );

    // totalData를 사용한 별도 요약 시트 생성
    if (totalData && totalData.length > 0) {
      const totalSheetData: (string | number)[][] = [
        ["요약 정보"],
        [],
        ["구분", "분류", "작년 결산", "올해 예산", "비율"],
        ...totalData.map(item => [
          getDisplayNameBudgetDomainEnum(item.budgetDomain) || "",
          item.type || "",
          formatCurrency(item.lastYear || 0),
          formatCurrency(item.thisYear || 0),
          formatRatio(item.ratio),
        ]),
      ];

      const totalSummarySheet = XLSX.utils.aoa_to_sheet(totalSheetData);
      totalSummarySheet["!cols"] = [
        { width: 15 }, // 구분
        { width: 15 }, // 분류
        { width: 20 }, // 작년 결산
        { width: 20 }, // 올해 예산
        { width: 15 }, // 비율
      ];

      // 요약 시트 병합 및 스타일
      totalSummarySheet["!merges"] = [
        { s: { r: 0, c: 0 }, e: { r: 0, c: 4 } }, // 요약 정보 제목 병합
      ];

      // 요약 시트 스타일 적용
      addCellStyle(totalSummarySheet, "A1", titleStyle);
      ["A3", "B3", "C3", "D3", "E3"].forEach(cell => {
        addCellStyle(totalSummarySheet, cell, headerStyle);
      });

      XLSX.utils.book_append_sheet(workbook, totalSummarySheet, "요약");
    }

    // 파일명 생성 및 다운로드
    const fileName = `${organization}_${year}년도_${semester}_${documentType}_${new Date().toISOString().slice(0, 10)}.xlsx`;

    XLSX.writeFile(workbook, fileName);
  };

  return <ModalTableButton buttonText="Excel" onClick={handleDownload} />;
};

export default ExcelDownloadButton;
