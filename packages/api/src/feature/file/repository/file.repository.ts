import { Injectable } from "@nestjs/common";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

import {
  BaseRepositoryFindQuery,
  BaseRepositoryQuery,
  BaseTableFieldMapKeys,
  TableWithID,
} from "@sparcs-students/api/common/base/base.repository";
import { BaseSingleTableRepository } from "@sparcs-students/api/common/base/base.single.repository";
import { File } from "@sparcs-students/api/drizzle/schema/file.schema";
import { EmptyObject } from "@sparcs-students/api/common/base/entity.model";
import { IFileCreate, MFile } from "../model/file.model";

type FileQuery = {
  userId: number;
};

type FileOrderByKeys = "id";
type FileQuerySupport = EmptyObject; // Query Support 용

type FileTable = typeof File;
type FileDbSelect = InferSelectModel<FileTable>;
type FileDbUpdate = Partial<FileDbSelect>;
type FileDbInsert = InferInsertModel<FileTable>;

type FileFieldMapKeys = BaseTableFieldMapKeys<
  FileQuery,
  FileOrderByKeys,
  FileQuerySupport
>;

export type FileRepositoryFindQuery = BaseRepositoryFindQuery<
  FileQuery,
  FileOrderByKeys
>;
export type FileRepositoryQuery = BaseRepositoryQuery<FileQuery>;

@Injectable()
export class FileRepository extends BaseSingleTableRepository<
  MFile,
  IFileCreate,
  FileTable,
  FileQuery,
  FileOrderByKeys,
  FileQuerySupport
> {
  constructor() {
    super(File, MFile);
  }

  protected dbToModelMapping(result: FileDbSelect): MFile {
    return new MFile({
      id: result.id,
      name: result.name,
      extension: result.extension,
      size: result.size,
      signedAt: result.signedAt,
      userId: result.userId,
    });
  }

  protected modelToDBMapping(model: MFile): FileDbUpdate {
    return {
      id: model.id,
      name: model.name,
      extension: model.extension,
      size: model.size,
      userId: model.userId,
    };
  }

  protected createToDBMapping(model: IFileCreate): FileDbInsert {
    return {
      name: model.name,
      extension: model.extension,
      size: model.size,
      userId: model.userId,
      signedAt: model.signedAt,
    };
  }

  protected fieldMap(field: FileFieldMapKeys): TableWithID | null | undefined {
    const fieldMappings: Record<FileFieldMapKeys, TableWithID | null> = {
      id: File,
      userId: File,
    };

    if (!(field in fieldMappings)) {
      return undefined;
    }

    return fieldMappings[field];
  }
}
