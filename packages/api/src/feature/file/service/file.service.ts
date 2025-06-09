import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { Injectable } from "@nestjs/common";

import {
  ApiFil001RequestBody,
  ApiFil001ResponseCreated,
} from "@sparcs-students/interface/api/file/index";
import { IUser } from "@sparcs-students/interface/api/user/index";

import { takeOnlyOne } from "@sparcs-students/api/common/util/util";
import { FileRepository } from "../repository/file.repository";
import { getFileKey } from "../file.util";

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
    const signedAt = new Date();
    signedAt.setMilliseconds(0);

    const files = await Promise.all(
      param.map(async data => {
        // 내가 S3에 하려는 작업을 명시한다.
        const command = new PutObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: getFileKey({ userId, signedAt, name: data.name }),
          ContentType: data.type,
        });
        // Presigned URL을 생성해서 반환한다.
        // 파일 생성을 한번에 처리하지 않고 따로 처리하는 이유는, MFile에 type이 없기 떄문에 file id 와 command에 넣을 type을 매핑할 방법이 없기 때문입니다.
        const [file, uploadUrl] = await Promise.all([
          this.fileRepository
            .create({
              name: data.name,
              extension: data.name.split(".").pop().toLowerCase(),
              size: data.size,
              signedAt,
              userId,
            })
            .then(takeOnlyOne("File")),
          getSignedUrl(this.s3Client, command, { expiresIn: 600 }),
        ]);
        return { id: file.id, name: file.name, uploadUrl };
      }),
    );

    return { files };
  }
}
