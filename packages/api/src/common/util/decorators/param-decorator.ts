import { createParamDecorator, ExecutionContext } from "@nestjs/common";

interface UserProfile {
  id: number;
  sid: string;
  name: string;
  email: string;
}

export type GetUser = UserProfile;
interface StudentProfile {
  id: number;
  sid: string;
  name: string;
  email: string;
  type: string;
  studentId: number;
  studentNumber: number;
}
export type GetStudent = StudentProfile;

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetUser = createParamDecorator((data, ctx: ExecutionContext) =>
  (({ id, sid, name, email }) => ({
    id,
    sid,
    name,
    email,
  }))(ctx.switchToHttp().getRequest().user),
);

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GetStudent = createParamDecorator((data, ctx: ExecutionContext) =>
  (({ id, sid, name, email, type, studentId, studentNumber }) => ({
    id,
    sid,
    name,
    email,
    type,
    studentId,
    studentNumber,
  }))(ctx.switchToHttp().getRequest().user),
);
