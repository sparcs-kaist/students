import { Injectable, NotFoundException } from "@nestjs/common";

import { IStudent } from "@sparcs-students/interface/api/user/type/user.type";
import { UserRepository } from "../repository/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findStudentByNumber(studentNumber: number): Promise<IStudent> {
    const student =
      await this.userRepository.findStudentByNumber(studentNumber);
    if (!student) {
      throw new NotFoundException(
        `Student with studentNumber ${studentNumber} not found`,
      );
    }
    return student;
  }
}
