import { Injectable } from "@nestjs/common";
import { IHalfYear } from "@sparcs-students/interface/api/semester/type/semester.type";
import { SemesterRepository } from "../repository/semester.repository";
import { VHalfYearSummary } from "../type/halfYear.summary.model";
import { HalfYearRepository } from "../repository/halfYear.repository";

@Injectable()
export class SemesterPublicService {
  constructor(
    private semesterRepository: SemesterRepository,
    private readonly halfYearRepository: HalfYearRepository,
  ) {}

  /**
   * @param
   * @returns VHalfYearSummary[]
   * @description 모든 HalfYearSummary를 리턴합니다.
   */

  async fetchHalfYearSummaryAll(): Promise<VHalfYearSummary[]> {
    const result = await this.halfYearRepository.fetchSummaryAll();
    return result;
  }

  async fetchHalfYearAll(): Promise<IHalfYear[]> {
    const halfYears = await this.halfYearRepository.fetchAll();
    return halfYears;
  }
}
