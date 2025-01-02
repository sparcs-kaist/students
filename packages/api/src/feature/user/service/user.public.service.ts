import { Injectable, NotFoundException } from "@nestjs/common";
import { UserT } from "@sparcs-students/api/drizzle/schema";
import { UserRepository } from "../repository/user.repository";

@Injectable()
export class UserPublicService {
  constructor(private userRepository: UserRepository) {}

  /**
   * @param userId
   * @returns UserId에 해당하는 User 객체를 리턴합니다.
   * @description 해당하는 학생이 경우 404 exception을 throw 합니다.
   */
  async getUserById(id: number): Promise<UserT> {
    const users = await this.userRepository.getUserById(id);
    if (users.length === 0) {
      throw new NotFoundException(`User with ID ${id} not found.`);
    }

    return users[0];
  }
}
