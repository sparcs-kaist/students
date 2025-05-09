export enum StudentStatusEnum {
  Attending = 1, // 재학
  LeaveOfAbsence, // 휴학
}

export enum UserTypeEnum {
  Undergraduate = "undergraduate",
  Others = "others",
}

export enum UserRoleEnum {
  // CHACHA: 일단 임의로 Students 세계의 역할로 나눠 봄.
  Representative = "representative",
  Manager = "manager",
  Member = "member",
  Viewer = "viewer",
}
