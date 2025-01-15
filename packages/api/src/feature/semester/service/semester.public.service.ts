import { Injectable, NotFoundException } from "@nestjs/common";
import { SemesterT } from "@sparcs-students/api/drizzle/schema";
import { SemesterRepository } from "../repository/semester.repository";

@Injectable()
export class SemesterPublicService {
  constructor(private semesterRepository: SemesterRepository) {}

  /**
   * @param id semester id
   * @returns Semester id에 해당하는 Semester 객체를 리턴합니다.
   * @description semester가 없으면 404Exception을 throw합니다.
   */
  async getSemesterById(id: number): Promise<SemesterT> {
    const semesters = await this.semesterRepository.selectSemesterById(id);
    if (semesters.length === 0) {
      throw new NotFoundException(`Semester with ID ${id} not found.`);
    }

    return semesters[0];
  }
}
