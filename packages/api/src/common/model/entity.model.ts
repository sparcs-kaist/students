import { MySqlColumn } from "drizzle-orm/mysql-core";

import {
  Exclude,
  OperationType,
} from "@sparcs-students/api/common/model/field-operations";

export abstract class MEntity {
  @Exclude(OperationType.CREATE, OperationType.PUT)
  id: number;

  static modelName: string;

  static from(_result: unknown): MEntity {
    throw new Error("Method not implemented. Must be overridden by subclass");
  }

  static fieldMap(_field: unknown): MySqlColumn {
    throw new Error("Method not implemented. Must be overridden by subclass");
  }

  to(_operation: OperationType): unknown {
    throw new Error("Method not implemented. Must be overridden by subclass");
  }

  set(param: Partial<this>): this {
    Object.assign(this, param);
    return this;
  }
}
