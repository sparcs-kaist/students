import {
  GetObjectCommand,
  PutObjectCommand,
  DeleteObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";

import {
  ApiFil001RequestBody,
  ApiFil001ResponseCreated,
  ApiFil002RequestParam,
  ApiFil002ResponseOk,
  ApiFil003RequestParam,
  ApiFil003ResponseOk,
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

  /**
   * 파일 Id를 받아 presigned URL을 반환합니다.
   * @param param 파일 고유 Id
   * @returns 파일 조회/다운로드 URL
   */
  async getDownloadUrl(
    fileId: ApiFil002RequestParam["id"],
  ): Promise<ApiFil002ResponseOk> {
    const file = await this.fileRepository.fetch(fileId);

    if (!file) {
      throw new NotFoundException({
        status: "Error",
        message: "파일이 존재하지 않습니다.",
      });
    }

    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: getFileKey(file),
    });

    const url = await getSignedUrl(this.s3Client, command, { expiresIn: 600 });

    return { url };
  }

  /**
   * DB 및 S3에서 파일을 삭제합니다.
   * @param fileId 파일 고유 Id
   * @param userId 유저 고유 Id
   */
  async deleteFile(
    fileId: ApiFil003RequestParam["id"],
    userId: number,
  ): Promise<ApiFil003ResponseOk> {
    const file = await this.fileRepository.fetch(fileId);

    if (!file) {
      throw new NotFoundException("파일이 존재하지 않습니다.");
    }
    if (file.userId !== userId) {
      throw new ForbiddenException("파일을 삭제할 권한이 없습니다.");
    }

    const command = new DeleteObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: getFileKey(file),
    });

    // DB와 S3에서 동시에 삭제
    await Promise.all([
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.fileRepository.delete({ id: fileId } as any),
      this.s3Client.send(command),
    ]);

    return { status: "Success", message: "파일이 성공적으로 삭제되었습니다." };
  }
}
