import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import { and, eq, inArray, SQL, isNull, count } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";
import {
  DrizzleAsyncProvider,
  DrizzleTransaction,
} from "src/drizzle/drizzle.provider";
import { File } from "src/drizzle/schema/file.schema";

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { MFile } from "../model/file.model";

type IFileQuery = {
  id?: number;
  ids?: number[];
  userId?: number;
};

type IFileCreate = {
  name: string;
  extension: string;
  size: number;
  signedAt: Date;
  userId: number;
};

@Injectable()
export class FileRepository {
  constructor(
    @Inject(DrizzleAsyncProvider) private db: MySql2Database,
    private readonly s3Client: S3Client,
  ) {}

  async withTransaction<Result>(
    callback: (tx: DrizzleTransaction) => Promise<Result>,
  ): Promise<Result> {
    return this.db.transaction(callback);
  }

  private makeWhereClause(param: IFileQuery): SQL[] {
    const whereClause: SQL[] = [];
    if (param.id) {
      whereClause.push(eq(File.id, param.id));
    }
    if (param.ids) {
      whereClause.push(inArray(File.id, param.ids));
    }
    if (param.userId) {
      whereClause.push(eq(File.userId, param.userId));
    }
    whereClause.push(isNull(File.deletedAt));

    return whereClause;
  }

  async countTx(tx: DrizzleTransaction, query: IFileQuery): Promise<number> {
    const whereClause = this.makeWhereClause(query);
    const cnt = await tx
      .select({ count: count() })
      .from(File)
      .where(and(...whereClause));
    return cnt[0].count;
  }

  async count(query: IFileQuery): Promise<number> {
    return this.withTransaction(tx => this.countTx(tx, query));
  }

  async findTx(tx: DrizzleTransaction, query: IFileQuery): Promise<MFile[]> {
    const whereClause = this.makeWhereClause(query);
    const files = await tx
      .select()
      .from(File)
      .where(and(...whereClause));

    const filesWithUrl = await Promise.all(
      files.map(async file => {
        // 내가 S3에 하려는 작업을 명시한다.
        const command = new GetObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
          Key: this.getFileKey(file),
        });

        const url = await getSignedUrl(this.s3Client, command, {
          expiresIn: 600,
        });

        return {
          ...file,
          url,
        };
      }),
    );

    return filesWithUrl.map(file => MFile.fromDbResult(file));
  }

  async find(query: IFileQuery): Promise<MFile[]> {
    return this.withTransaction(tx => this.findTx(tx, query));
  }

  async insertTx(tx: DrizzleTransaction, param: IFileCreate): Promise<number> {
    const [fileId] = await tx.insert(File).values(param);

    if (!fileId.insertId) {
      throw new InternalServerErrorException("File insert failed");
    }

    return fileId.insertId;
  }

  async insert(param: IFileCreate): Promise<number> {
    return this.withTransaction(tx => this.insertTx(tx, param));
  }

  async deleteTx(tx: DrizzleTransaction, fileId: number): Promise<void> {
    const [res] = await tx
      .update(File)
      .set({ deletedAt: new Date() })
      .where(eq(File.id, fileId));

    if (!res.affectedRows) {
      throw new InternalServerErrorException("File is not deleted");
    }
  }

  async delete(fileId: number): Promise<void> {
    return this.withTransaction(tx => this.deleteTx(tx, fileId));
  }

  private getFileKey(file: { userId: number; signedAt: Date; name: string }) {
    return `file/${file.userId}.${file.signedAt.valueOf()}.${file.name}`;
  }
}
