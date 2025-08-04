import { Injectable } from "@nestjs/common";

import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";

import { MFile, RMFile } from "../model/file.model";
import { FileRepository } from "../repository/file.repository";
import { getFileKey } from "../file.util";

@Injectable()
export class FilePublicService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly s3Client: S3Client,
  ) {}

  /**
   * MFile을 받고 RMFile을 반환합니다.
   * @param files MFile[]
   * @returns RMFile[]
   * */
  async getFileInfoById(files: MFile[]): Promise<RMFile[]> {
    return Promise.all(
      files.map(async file => ({
        id: file.id,
        name: file.name,
        extension: file.extension,
        size: file.size,
        url: await this.getFileUrl(file),
      })),
    );
  }

  private async getFileUrl(file: MFile): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: process.env.S3_BUCKET_NAME,
      Key: getFileKey(file),
    });
    return getSignedUrl(this.s3Client, command, { expiresIn: 600 });
  }
}
