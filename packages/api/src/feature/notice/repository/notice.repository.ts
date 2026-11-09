import {
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { and, desc, eq, isNull } from "drizzle-orm";
import { MySql2Database } from "drizzle-orm/mysql2";

import {
  INotice,
  INoticeRequestCreate,
  INoticeRequestUpdate,
} from "@sparcs-students/interface/api/notice/index";
import { DrizzleAsyncProvider } from "@sparcs-students/api/drizzle/drizzle.provider";
import { Notice } from "@sparcs-students/api/drizzle/schema";

@Injectable()
export class NoticeRepository {
  constructor(
    @Inject(DrizzleAsyncProvider) private readonly db: MySql2Database,
  ) {}

  async findAll(): Promise<INotice[]> {
    return this.db
      .select({
        id: Notice.id,
        title: Notice.title,
        content: Notice.content,
        createdAt: Notice.createdAt,
        updatedAt: Notice.updatedAt,
      })
      .from(Notice)
      .where(isNull(Notice.deletedAt))
      .orderBy(desc(Notice.createdAt), desc(Notice.id));
  }

  async findById(id: number): Promise<INotice> {
    const [notice] = await this.db
      .select({
        id: Notice.id,
        title: Notice.title,
        content: Notice.content,
        createdAt: Notice.createdAt,
        updatedAt: Notice.updatedAt,
      })
      .from(Notice)
      .where(and(eq(Notice.id, id), isNull(Notice.deletedAt)))
      .limit(1);

    if (!notice) {
      throw new NotFoundException("Notice not found");
    }

    return notice;
  }

  async create(data: INoticeRequestCreate): Promise<INotice> {
    const [result] = await this.db.insert(Notice).values(data);
    if (!result.insertId) {
      throw new InternalServerErrorException("Failed to create notice");
    }

    return this.findById(Number(result.insertId));
  }

  async update(id: number, data: INoticeRequestUpdate): Promise<INotice> {
    await this.db
      .update(Notice)
      .set(data)
      .where(and(eq(Notice.id, id), isNull(Notice.deletedAt)));

    return this.findById(id);
  }

  async delete(id: number): Promise<void> {
    const [result] = await this.db
      .update(Notice)
      .set({ deletedAt: new Date() })
      .where(and(eq(Notice.id, id), isNull(Notice.deletedAt)));

    if (result.affectedRows === 0) {
      throw new NotFoundException("Notice not found");
    }
  }
}
