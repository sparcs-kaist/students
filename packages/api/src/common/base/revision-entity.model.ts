import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export class MRevisionEntity extends MEntity {
  static modelName = "RevisionEntity";

  submittedAt: Date | undefined;

  cogAgenda: { id: number } | undefined;

  gsrcAgenda: { id: number } | undefined;
}
