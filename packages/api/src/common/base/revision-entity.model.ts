import { MEntity } from "@sparcs-students/api/common/base/entity.model";
import { DocumentItemStatusEnum } from "@sparcs-students/interface/common/type/revision-base.type";

export class MRevisionEntity extends MEntity {
  static modelName = "RevisionEntity";

  documentStatusEnum: DocumentItemStatusEnum;

  submittedAt: Date | undefined;

  cogAgendaId: { id: number } | undefined;

  gsrcAgendaId: { id: number } | undefined;
}
