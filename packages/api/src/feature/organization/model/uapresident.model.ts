import { MEntity } from "@sparcs-students/api/common/base/entity.model";

export interface IUapresidentData {
  id: number;
  student: { id: number };
  duration: {
    startTerm: Date;
    endTerm?: Date | null;
  };
}

export interface IUapresidentCreate {
  student: { id: number };
  duration: {
    startTerm: Date;
    endTerm?: Date | null;
  };
}

export class MUapresident extends MEntity implements IUapresidentData {
  static modelName = "Uapresident";

  student: { id: number };

  duration: {
    startTerm: Date;
    endTerm?: Date | null;
  };

  constructor(data: IUapresidentData) {
    super();
    Object.assign(this, data);
  }
}
