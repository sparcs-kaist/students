// import { createParamDecorator, ExecutionContext } from "@nestjs/common";

import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export interface UserProfile {
  id: number;
  sid: string;
  name: string;
  email: string;
}

export interface StudentProfile {
  id: number;
  sid: string;
  name: string;
  email: string;
  type: string;
  studentId: number;
  studentNumber: number;
  departmentId: number;
}
export const GetUser = createParamDecorator((data, ctx: ExecutionContext) =>
  (({ id, sid, name, email }) => ({
    id,
    sid,
    name,
    email,
  }))(ctx.switchToHttp().getRequest().user),
);

export const GetStudent = createParamDecorator((data, ctx: ExecutionContext) =>
  (({
    id,
    sid,
    name,
    email,
    type,
    studentId,
    studentNumber,
    departmentId,
  }) => ({
    id,
    sid,
    name,
    email,
    type,
    studentId,
    studentNumber,
    departmentId,
  }))(ctx.switchToHttp().getRequest().user),
);
