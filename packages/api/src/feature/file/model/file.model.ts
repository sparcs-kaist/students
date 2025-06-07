import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { IFile, IRFile } from "@sparcs-students/interface/api/file/index";

export type IFileCreate = {
  name: IFile["name"];
  extension: IFile["extension"];
  size: IFile["size"];
  userId: IFile["userId"];
  signedAt: IFile["signedAt"]; // 파일 업로드 시간: URL 가져올 때 필요한, 파일에서만 있는 독특한 프록시
};

// file id가 int 이면, put에서 랜덤한 file id를 넣어서 모든 파일에 접근 가능한 취약점이 있음.
// TODO: 나중에 userId를 활용한 해당 취약점을 보완하는 검증 작업이 들어가면 좋을 것 같아요.

export class MFile extends MEntity implements IFile {
  name: IFile["name"];

  extension: IFile["extension"];

  size: IFile["size"];

  userId: IFile["userId"];

  signedAt: IFile["signedAt"];

  constructor(file: IFile) {
    super();
    Object.assign(this, file);
  }
}

// Read, Response 용 File Model
// 파일 조회용 Get Presigned URL을 가지고 있음
export interface RMFile extends IRFile {
  id: IFile["id"];

  name: IFile["name"];

  extension: IFile["extension"];

  size: IFile["size"];

  url: string;
}
