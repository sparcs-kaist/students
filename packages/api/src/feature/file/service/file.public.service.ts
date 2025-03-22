import { Injectable } from "@nestjs/common";
import { takeSole } from "@sparcs-students/api/common/util/util";

import { MFile } from "../model/file.model";
import { FileRepository } from "../repository/file.repository";

@Injectable()
export class FilePublicService {
  constructor(private readonly fileRepository: FileRepository) {}

  /**
   * fileId에 해당하는 파일의 정보를 가져옵니다.
   * @param fileId 파일의 id
   * @returns 파일의 정보
   * @throws NotFoundException 파일이 존재하지 않을 경우
   * @throws NotFoundException 파일 URL이 존재하지 않을 경우
   * */
  async getFileInfoById(fileId: number): Promise<MFile> {
    const file = await this.fileRepository
      .find({ id: fileId })
      .then(takeSole("File"));

    return file;
  }

  /**
   * fileId Array에 해당하는 파일의 정보를 가져옵니다.
   * @param fileIds 파일의 id
   * @returns 파일의 정보
   * @throws NotFoundException 파일이 하나라도 존재하지 않을 경우
   * @throws NotFoundException 파일 URL이 하나라도 존재하지 않을 경우
   * */
  async getFilesByIds(fileIds: number[]): Promise<MFile[]> {
    const files = await this.fileRepository.find({ ids: fileIds });
    return files;
  }

  async deleteFilesByIds(fileIds: number[]): Promise<void> {
    await Promise.all(
      fileIds.map(fileId => this.fileRepository.delete(fileId)),
    );
  }
}
