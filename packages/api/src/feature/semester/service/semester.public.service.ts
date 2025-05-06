import { Injectable } from "@nestjs/common";
import { SemesterRepository } from "../repository/semester.repository";
import { MSemester } from "../type/semester.model";

@Injectable()
export class SemesterPublicService {
  constructor(private semesterRepository: SemesterRepository) {}

  /**
   * @param
   * @returns VSemesterSummary[]
   * @description 모든 SemesterSummary를 리턴합니다.
   */

  async fetchSemesterAll(): Promise<MSemester[]> {
    const semesters = await this.semesterRepository.find({});
    return semesters;
  }
}
