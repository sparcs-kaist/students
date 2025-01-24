import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  ApiUsr001RequestBody,
  ApiUsr001ResponseCreated,
} from "@sparcs-students/interface/api/user/index";
import { UserRepository } from "../repository/user.repository";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async postUserStudent(
    body: ApiUsr001RequestBody,
  ): Promise<ApiUsr001ResponseCreated> {
    const ck = await this.userRepository.ckUserStudentBeforeCreate(body);
    if (ck.userId > 0 || ck.userStudentId > 0) {
      throw new HttpException(
        "User Student already exists",
        HttpStatus.BAD_REQUEST,
      );
    }
    const { userId, userStudentId } =
      await this.userRepository.createUserStudent(body);
    if (userId < 1) {
      throw new HttpException(
        "Failed to create user",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (userId < 1) {
      throw new HttpException(
        "Failed to create userStudent",
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { userId, userStudentId };
  }
}
