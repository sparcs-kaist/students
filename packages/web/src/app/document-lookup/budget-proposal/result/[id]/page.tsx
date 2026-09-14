"use client";

import React, { useEffect, useState, useMemo } from "react";
import { format } from "date-fns";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Typography from "@sparcs-students/web/common/components/Typography";
import ViewResult from "@sparcs-students/web/features/document-lookup/components/ViewResult";

import { mockViewBudgetProposalResultData } from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockViewResultData";
import PageTitle from "@sparcs-students/web/common/components/PageTitle";
import { DocumentType } from "@sparcs-students/web/common/components/SelectCard/DocumentTypeSelectCard";
import { mockData } from "@sparcs-students/web/features/document-lookup/components/ThreeInput/mock";
import { dataToTotal } from "@sparcs-students/web/features/document-lookup/budget/util/dataToTotal";

import BreadCrumb from "@sparcs-students/web/common/components/BreadCrumb";
import { UserPermission } from "@sparcs-students/web/constants/userPermission";

import ReviewerBudgetProposalFrame from "@sparcs-students/web/features/document-lookup/budget/frames/ReviewerBudgetProposalFrame";
import { useRouter, useSearchParams } from "next/navigation";
import ThreeInput, {
  ThreeInputItem,
} from "@sparcs-students/web/features/document-lookup/components/ThreeInput";
import getMockUserPermission from "@sparcs-students/web/features/document-lookup/project/services/getMockUserPermission";
import ViewerBudgetProposalFrame from "@sparcs-students/web/features/document-lookup/budget/frames/ViewerBudgetProposalFrame";
import ManagerBudgetProposalFrame from "@sparcs-students/web/features/document-lookup/budget/frames/ManagerBudgetProposalFrame";
import ModalTableButton from "@sparcs-students/web/common/components/Buttons/ModalTableButton";
import ExcelDownloadButton from "@sparcs-students/web/features/document-lookup/budget/components/ExcelDownloadButton";
import {
  fetchRecentIncomeRevision,
  fetchRecentExpenseRevision,
  fetchIncomeRevisionsByDate,
  fetchExpenseRevisionsByDate,
  fetchIncomeDateList,
  fetchExpenseDateList,
  fetchSemesterList,
} from "@sparcs-students/web/features/document-lookup/budget/services/hook/budgetReportApi";
// 실제 mock 데이터 import
import {
  mockDBIncomeData,
  mockDBExpenditureData,
} from "@sparcs-students/web/features/document-lookup/budget/services/_mock/mockManagerFormData";
import { SemesterEnum } from "@sparcs-students/interface/api/semester/type/semester.type";
// 타입 import
import type {
  DBIncomeProps,
  DBExpenditureProps,
} from "@sparcs-students/web/features/document-lookup/budget/type/managerFormValues";
import { ApiSem001ResponseOk } from "@sparcs-students/interface/api/semester/endpoint/apiSem001";

interface SemesterType {
  id: number;
  name: string;
  year: number;
  semesterEnum: SemesterEnum;
  startTerm: string;
  endTerm: string;
}

const BudgetProposal = () => {
  const items: ThreeInputItem[] = mockData;
  const searchParams = useSearchParams();
  const queryYear = parseInt(searchParams.get("year") || "") || items[0].year;
  const queryIsSpring = searchParams.get("isSpring") === "true";
  const queryType = searchParams.get("type") as DocumentType | null;
  const queryKey = searchParams.get("key");
  const queryValue = searchParams.get("value");
  const queryId = parseInt(searchParams.get("id") || "");

  const [date, setDate] = useState(mockViewBudgetProposalResultData.submitDate);
  const [dateList, setDateList] = useState<Date[]>([date as Date]);
  const [year, setYear] = useState<number>(queryYear);
  const [isSpring, setIsSpring] = useState<boolean | null>(queryIsSpring);
  const [type, setType] = useState<DocumentType | null>(queryType);
  const [selectedKey, setSelectedKey] = useState<string | null>(queryKey);
  const [selectedValue, setSelectedValue] = useState<string | null>(queryValue);
  const [selectedOrganizationId, setSelectedOrganizationId] = useState<
    number | null
  >(queryId);
  const [, setSelectedSemesterId] = useState<number | null>(null);
  const userPermission = getMockUserPermission();

  // 실제 API에서 받아온 데이터 (date 별 revision 목록)
  const [incomeRevisions, setIncomeRevisions] = useState<
    | Awaited<
        ReturnType<typeof fetchIncomeRevisionsByDate>
      >["budgetProposalIncomeRevisions"]
    | null
  >(null);
  const [expenseRevisions, setExpenseRevisions] = useState<
    | Awaited<
        ReturnType<typeof fetchExpenseRevisionsByDate>
      >["budgetProposalExpenseRevisions"]
    | null
  >(null);

  // incomeRevisions -> DBIncomeProps[]로 변환 (mock 데이터와 같은 형태)
  const incomeForUI: DBIncomeProps[] = useMemo(() => {
    if (!incomeRevisions) return mockDBIncomeData;

    return incomeRevisions.map(rev => ({
      // api의 필드명을 기반으로 매핑합니다.
      id: Number(rev.id),
      code: Number(rev.code),
      budgetDomain: rev.budgetDomainEnum,
      budgetDivisionIncome: rev.budgetDivisionIncomeEnum,
      item: rev.name,
      // API에는 lastYear 정보가 없으므로 빈값으로 둡니다.
      lastYear: "",
      // amount는 금액(현재년)으로 매핑
      thisYear: rev.amount,
      ratio: null,
      reason: rev.detail ?? "",
      // zRevisionBase에 따라 status/review 필드가 있을 것으로 기대하여 매핑합니다.
      status: 1, // 임시 값
      review: "",
    }));
  }, [incomeRevisions]);

  // expenseRevisions -> DBExpenditureProps[]로 변환
  const expenseForUI: DBExpenditureProps[] = useMemo(() => {
    if (!expenseRevisions) return mockDBExpenditureData;

    return expenseRevisions.map((rev, idx) => ({
      id: Number(rev.id),
      code: Number(rev.code),
      rowId: idx,
      budgetDomain: rev.budgetDomainEnum,
      budgetDivisionExpenditure: rev.budgetDivisionExpenseEnum,
      projectName: rev.name, // API의 name을 projectName으로 사용
      item: rev.budgetClassExpenseEnum,
      lastYear: 0,
      thisYear: rev.amount,
      ratio: null,
      reason: rev.detail ?? "",
      status: 1, // 임시 값
      review: "",
    }));
  }, [expenseRevisions]);

  const router = useRouter();

  // 안전한 lookUp: id 유효성 검사
  const lookUp = (id?: number | null) => {
    if (id === null || id === undefined || Number.isNaN(id)) return;
    const query = new URLSearchParams({
      year: String(year),
      isSpring: String(isSpring),
      type: String(type),
      key: selectedKey ?? "",
      value: selectedValue ?? "",
      id: String(id),
    }).toString();

    switch (type) {
      case "사업 계획서":
        router.push(`/document-lookup/project-proposal/result/${id}?${query}`);
        break;
      case "사업 보고서":
        router.push(`/document-lookup/project-report/result/${id}?${query}`);
        break;
      case "예산안":
        router.push(`/document-lookup/budget-proposal/result/${id}?${query}`);
        break;
      case "결산":
        router.push(`/document-lookup/budget-report/result/${id}?${query}`);
        break;
      default:
        throw new Error(`잘못된 문서 유형: ${type}`);
    }
  };

  // 최초(또는 semester/organization 변경)에는 최신 리비전(fetchRecent)으로 세팅 + 제출연월일 목록 로드
  useEffect(() => {
    let mounted = true;
    if (
      selectedOrganizationId === null ||
      selectedOrganizationId === undefined ||
      Number.isNaN(selectedOrganizationId) ||
      isSpring === null ||
      isSpring === undefined
    ) {
      return () => {};
    }

    // 1) 선택된 연도/학기에 해당하는 semester id 찾기
    async function loadRecent() {
      if (!mounted) return;
      // 선택된 연도/학기에 해당하는 semester id 찾기
      let targetSemesterId: number | null = null;
      try {
        const semRes: ApiSem001ResponseOk = await fetchSemesterList();
        if (!mounted) return;

        // fetchSemesterList는 Semester 목록 형태를 반환하므로 안전하게 접근
        const targetSemester = (semRes as unknown as Array<SemesterType>).find(
          sem =>
            sem.year === year &&
            sem.semesterEnum === (isSpring ? SemesterEnum.H1 : SemesterEnum.H2),
        );
        targetSemesterId = targetSemester ? targetSemester.id : null;
        setSelectedSemesterId(targetSemesterId);
      } catch (e) {
        // 학기 조회 실패 시 null 처리
        setSelectedSemesterId(null);
      }

      if (targetSemesterId === null) {
        // 학기를 찾지 못하면 초기화
        setIncomeRevisions(null);
        setExpenseRevisions(null);
        setDateList([date as Date]);
        return;
      }

      // 2) 제출 연월일 목록 로드 (수입/지출 제출본 날짜를 모두 합쳐서 사용)
      try {
        const [incomeDateRes, expenseDateRes] = await Promise.all([
          fetchIncomeDateList({
            organization: selectedOrganizationId as number,
            semester: targetSemesterId,
          }),
          fetchExpenseDateList({
            organization: selectedOrganizationId as number,
            semester: targetSemesterId,
          }),
        ]);
        if (!mounted) return;

        const toDateStrings = (dateRes: unknown): string[] =>
          Array.isArray(dateRes) && typeof dateRes[0] === "string"
            ? (dateRes as string[])
            : [];
        const mergedDates = Array.from(
          new Set([
            ...toDateStrings(incomeDateRes),
            ...toDateStrings(expenseDateRes),
          ]),
        )
          .sort()
          .map(s => new Date(s));

        setDateList(mergedDates.length > 0 ? mergedDates : [date as Date]);
      } catch {
        setDateList([date as Date]);
      }

      // 3) 최신 리비전 조회 (수입/지출)
      try {
        const inc = await fetchRecentIncomeRevision({
          organization: selectedOrganizationId as number,
          semester: targetSemesterId,
        });
        if (!mounted) return;
        setIncomeRevisions(
          inc.budgetProposalIncomeRevision
            ? [inc.budgetProposalIncomeRevision]
            : null,
        );
      } catch {
        setIncomeRevisions(null);
      }

      try {
        const exp = await fetchRecentExpenseRevision({
          organization: selectedOrganizationId as number,
          semester: targetSemesterId,
        });
        if (!mounted) return;
        setExpenseRevisions(
          exp.budgetProposalExpenseRevision
            ? [exp.budgetProposalExpenseRevision]
            : null,
        );
      } catch {
        setExpenseRevisions(null);
      }
    }

    loadRecent();
    return () => {
      mounted = false;
    };
  }, [selectedOrganizationId, year, isSpring]);

  // date 변경(또는 초기 마운트) 시 해당 날짜의 수입/지출 revision 목록을 불러옴
  useEffect(() => {
    let mounted = true;
    async function loadByDate() {
      const formattedDate =
        date instanceof Date ? format(date, "yyyy-MM-dd") : String(date);

      try {
        const inc = await fetchIncomeRevisionsByDate({
          organization: selectedOrganizationId as number,
          date: formattedDate,
        });
        if (!mounted) return;
        setIncomeRevisions(inc.budgetProposalIncomeRevisions ?? null);
      } catch {
        // 실패하면 null 유지(또는 기존 mock 유지)
        setIncomeRevisions(null);
      }

      try {
        const exp = await fetchExpenseRevisionsByDate({
          organization: selectedOrganizationId as number,
          date: formattedDate,
        });
        if (!mounted) return;
        setExpenseRevisions(exp.budgetProposalExpenseRevisions ?? null);
      } catch {
        setExpenseRevisions(null);
      }
    }
    loadByDate();
    return () => {
      mounted = false;
    };
  }, [date, year, isSpring]);

  return (
    <FlexWrapper direction="column" gap={48}>
      <FlexWrapper direction="column" gap={10}>
        <PageTitle>예결산 조회</PageTitle>
        <BreadCrumb
          items={[
            { name: "예결산 조회", path: "/document-lookup" },
            { name: "예산안", path: "/budget-proposal" },
          ]}
        />
      </FlexWrapper>
      <FlexWrapper direction="column" gap={60} style={{ padding: "20 0px" }}>
        <FlexWrapper direction="column" gap={32}>
          <FlexWrapper direction="column" gap={16}>
            <Typography fs={24} lh={30} color="BLACK" fw="SEMIBOLD">
              조회 가이드
            </Typography>
            <ThreeInput
              itemList={items}
              year={year}
              setYear={setYear}
              isSpring={isSpring}
              setIsSpring={setIsSpring}
              type={type}
              setType={setType}
              selectedKey={selectedKey}
              setSelectedKey={setSelectedKey}
              selectedValue={selectedValue}
              setSelectedValue={setSelectedValue}
              setSelectedId={setSelectedOrganizationId}
            />
          </FlexWrapper>
          <FlexWrapper direction="row" gap={8}>
            <ModalTableButton
              buttonText="조회"
              style={{ marginLeft: "auto" }}
              onClick={() => lookUp(selectedOrganizationId as number)}
            />
          </FlexWrapper>
        </FlexWrapper>
        <ViewResult
          {...mockViewBudgetProposalResultData}
          submitDate={date}
          handleDateChange={setDate}
          dateList={dateList}
        />

        {/* 엑셀 다운로드 버튼 추가 */}
        <FlexWrapper
          direction="row"
          gap={8}
          style={{ justifyContent: "flex-end" }}
        >
          <ExcelDownloadButton
            totalData={dataToTotal(incomeForUI, expenseForUI)}
            expenditureData={expenseForUI}
            incomeData={incomeForUI}
            year={year}
            semester={isSpring ? "상반기" : "하반기"}
            documentType={type || "예산안"}
            organization="전산학부"
            submitter="김스튜"
          />
        </FlexWrapper>

        {userPermission === UserPermission.Viewer && (
          <ViewerBudgetProposalFrame
            totalData={dataToTotal(incomeForUI, expenseForUI)}
            incomeData={incomeForUI}
            expenditureData={expenseForUI}
          />
        )}
        {userPermission === UserPermission.Reviewer && (
          <ReviewerBudgetProposalFrame />
        )}
        {userPermission === UserPermission.Manager && (
          <ManagerBudgetProposalFrame />
        )}
      </FlexWrapper>
    </FlexWrapper>
  );
};
export default BudgetProposal;
