// @sparcs-students/web/src/feature/document-lookup/servies/hook/budgetProposalApi.ts

import { axiosClient } from "@sparcs-students/web/lib/axios";
import { HttpStatusCode } from "axios";

// API 012~017 타입 임포트
import apiBudPrp012, {
  ApiBudPrp012RequestQuery,
  ApiBudPrp012ResponseOk,
} from "@sparcs-students/interface/api/proposal/endpoint/apiBudPrp012";
import apiBudPrp013, {
  ApiBudPrp013RequestQuery,
  ApiBudPrp013ResponseOk,
} from "@sparcs-students/interface/api/proposal/endpoint/apiBudPrp013";
import apiBudPrp014, {
  ApiBudPrp014RequestQuery,
  ApiBudPrp014ResponseOk,
} from "@sparcs-students/interface/api/proposal/endpoint/apiBudPrp014";
import apiBudPrp015, {
  ApiBudPrp015RequestQuery,
  ApiBudPrp015ResponseOk,
} from "@sparcs-students/interface/api/proposal/endpoint/apiBudPrp015";
import apiBudPrp016, {
  ApiBudPrp016RequestQuery,
  ApiBudPrp016ResponseOk,
} from "@sparcs-students/interface/api/proposal/endpoint/apiBudPrp016";
import apiBudPrp017, {
  ApiBudPrp017RequestQuery,
  ApiBudPrp017ResponseOk,
} from "@sparcs-students/interface/api/proposal/endpoint/apiBudPrp017";

import apiSem001, {
  ApiSem001ResponseOk,
} from "@sparcs-students/interface/api/semester/endpoint/apiSem001";
import { z } from "zod";
import { zSemester } from "@sparcs-students/interface/api/semester/type/semester.type";

// API 012: 예산안 수입 revision 최신본 조회 (GET with query)
export const fetchRecentIncomeRevision = async (
  query: ApiBudPrp012RequestQuery,
): Promise<ApiBudPrp012ResponseOk> => {
  try {
    const response = await axiosClient.get<ApiBudPrp012ResponseOk>(
      apiBudPrp012.url(),
      { params: query },
    );

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }

    throw new Error("Failed to fetch recent budget proposal income revision");
  } catch (error) {
    console.error("API Error (fetchRecentIncomeRevision):", error);
    throw error;
  }
};

// API 013: 예산안 지출 revision 최신본 조회 (GET with query)
export const fetchRecentExpenseRevision = async (
  query: ApiBudPrp013RequestQuery,
): Promise<ApiBudPrp013ResponseOk> => {
  try {
    const response = await axiosClient.get<ApiBudPrp013ResponseOk>(
      apiBudPrp013.url(),
      { params: query },
    );

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }

    throw new Error("Failed to fetch recent budget proposal expense revision");
  } catch (error) {
    console.error("API Error (fetchRecentExpenseRevision):", error);
    throw error;
  }
};

// API 014: 예산안 수입 revision 날짜 조회 (GET with query)
export const fetchIncomeDateList = async (
  query: ApiBudPrp014RequestQuery,
): Promise<ApiBudPrp014ResponseOk> => {
  try {
    const response = await axiosClient.get<ApiBudPrp014ResponseOk>(
      apiBudPrp014.url(),
      { params: query, baseURL: "https://localhost:8000" },
    );

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }

    throw new Error("Failed to fetch budget proposal income revisions");
  } catch (error) {
    console.error("API Error (getBudgetProposalIncomeRevisions):", error);
    throw error;
  }
};

// API 015: 예산안 지출 revision 날짜 조회 (GET with query)
export const fetchExpenseDateList = async (
  query: ApiBudPrp015RequestQuery,
): Promise<ApiBudPrp015ResponseOk> => {
  try {
    const response = await axiosClient.get<ApiBudPrp015ResponseOk>(
      apiBudPrp015.url(),
      { params: query },
    );

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }

    throw new Error("Failed to fetch budget proposal expense revisions");
  } catch (error) {
    console.error("API Error (fetchExpenseDateList):", error);
    throw error;
  }
};

// API 016: 날짜별 예산안 수입 revision 조회 (GET with query)
export const fetchIncomeRevisionsByDate = async (
  query: ApiBudPrp016RequestQuery,
): Promise<ApiBudPrp016ResponseOk> => {
  try {
    const response = await axiosClient.get<ApiBudPrp016ResponseOk>(
      apiBudPrp016.url(),
      { params: query },
    );

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }

    throw new Error("Failed to fetch budget proposal income items");
  } catch (error) {
    console.error("API Error (fetchIncomeRevisionsByDate):", error);
    throw error;
  }
};

// API 017: 날짜별 예산안 지출 revision 조회 (GET with query)
export const fetchExpenseRevisionsByDate = async (
  query: ApiBudPrp017RequestQuery,
): Promise<ApiBudPrp017ResponseOk> => {
  try {
    const response = await axiosClient.get<ApiBudPrp017ResponseOk>(
      apiBudPrp017.url(),
      { params: query },
    );

    if (response.status === HttpStatusCode.Ok) {
      return response.data;
    }

    throw new Error("Failed to fetch budget proposal expense items");
  } catch (error) {
    console.error("API Error (fetchExpenseRevisionsByDate):", error);
    throw error;
  }
};

// API SEM001: 학기 목록 조회 (GET)
export const fetchSemesterList = async (): Promise<ApiSem001ResponseOk> => {
  try {
    const response = await axiosClient.get<ApiSem001ResponseOk>(
      apiSem001.url(),
    );

    if (response.status === HttpStatusCode.Ok) {
      // Zod를 사용하여 응답 데이터 검증
      const semesterSchema = z.object({
        semester: zSemester,
      });
      const parsedData = semesterSchema.parse(response.data);
      return parsedData;
    }

    throw new Error("Failed to fetch semester list");
  } catch (error) {
    console.error("API Error (fetchSemesterList):", error);
    throw error;
  }
};
