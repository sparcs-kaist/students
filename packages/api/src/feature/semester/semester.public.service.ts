import { Injectable, NotFoundException } from "@nestjs/common";
import { SemesterT } from "@sparcs-students/api/drizzle/schema";
import { SemesterRepository } from "./semester.repository";

@Injectable()
export class SemesterPublicService {
  constructor(private semesterRepository: SemesterRepository) {}

  /**
   * @param id semester id
   * @returns Semester id에 해당하는 Semester 객체를 리턴합니다.
   * @description 학생이 해당 동아리의 대표자 또는 대의원이 아닌 경우 404 exception을 throw 합니다.
   */
  async getSemesterById(id: number): Promise<SemesterT> {
    const semesters = await this.semesterRepository.getSemesterById(id);
    if (semesters.length === 0) {
      throw new NotFoundException(`Semester with ID ${id} not found.`);
    }

    return semesters[0];
  }
}
