import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";

import {
  ApiFil001RequestBody,
  ApiFil001ResponseCreated,
} from "@sparcs-students/interface/api/file/index";
import { IUser } from "@sparcs-students/interface/api/user/index";

import { FileRepository } from "../repository/file.repository";

@Injectable()
export class FileService {
  constructor(
    private s3Client: S3Client,
    private fileRepository: FileRepository,
  ) {}

  /**
   * 파일 업로드용 presigned URL을 생성하며, 파일을 DB에 생성합니다.
   * @param param 파일 업로드 정보
   * @returns 파일 업로드 URL
   */
  async getUploadUrl(
    param: ApiFil001RequestBody["metadata"],
    userId: IUser["id"],
  ): Promise<ApiFil001ResponseCreated> {
    const files = await Promise.all(
      param.map(async data => {
        const { name, type, size } = data;
        const extension = name.split(".").pop().toLowerCase();
        const signedAt = new Date();
        signedAt.setMilliseconds(0);

        // 내가 S3에 하려는 작업을 명시한다.
        const command = new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: this.getFileKey({ userId, signedAt, name }),
          ContentType: type,
        });

        const fileId = await this.fileRepository.insert({
          name,
          extension,
          size,
          signedAt,
          userId,
        });

        // Presigned URL을 생성해서 반환한다.
        const uploadUrl = await getSignedUrl(this.s3Client, command, {
          expiresIn: 600,
        });
        return { uploadUrl, id: fileId, name };
      }),
    );

    return { files };
  }

  private getFileKey(file: { userId: number; signedAt: Date; name: string }) {
    return `file/${file.userId}.${file.signedAt.valueOf()}.${file.name}`;
  }
}
