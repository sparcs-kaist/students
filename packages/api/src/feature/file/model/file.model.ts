import { IFile } from "@sparcs-students/interface/api/file/index";
import { InferSelectModel } from "drizzle-orm";
import { File } from "src/drizzle/schema/file.schema";

type FileDbResult = InferSelectModel<typeof File>;

export class MFile implements IFile {
  id: IFile["id"];

  name: IFile["name"];

  extension: IFile["extension"];

  size: IFile["size"];

  url: IFile["url"];

  userId: IFile["userId"];

  constructor(file: IFile) {
    Object.assign(this, file);
  }

  static fromDbResult(dbResult: FileDbResult & { url: string }): MFile {
    return new MFile({
      ...dbResult,
    });
  }
}
