export interface StudentsJwtPayload {
  id: number;
  name: string;
  email: string;
  studentNumber: number;
  uid: string;
  sid: string;
  department: { id: number };
  user: { id: number };
  iat: number;
  exp: number;
}
