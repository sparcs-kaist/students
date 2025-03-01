/**
 * @file   paths.ts
 * @brief  Path constants for Navigate, Link, and other components that require paths to be defined as constants.
 * @author andy@sparcs.org (Sangwoo Ye)
 */

const paths = {
  HOME: { name: "홈", path: "/" },
  STUDENTS0: {
    name: "총학 소개",
    sub: [
      {
        name: "총학 소개",
        path: "/students",
      },
    ],
  },
  STUDENTS1: {
    name: "공지사항",
    sub: [
      {
        name: "공지사항",
        path: "/",
      },
    ],
  },
  STUDENTS2: {
    name: "회칙",
    sub: [
      {
        name: "회칙",
        path: "/",
      },
    ],
  },
  STUDENTS3: {
    name: "안건지/회의록",
    sub: [
      {
        name: "안건지/회의록",
        path: "/",
      },
    ],
  },
  STUDENTS4: {
    name: "예/결산",
    sub: [
      {
        name: "예/결산",
        path: "/",
      },
    ],
  },
  MADE_BY: { name: "만든 사람들", path: "/credits" },
  LICENSE: { name: "라이센스", path: "/" },
  TERMS_OF_SERVICE: { name: "이용 약관", path: "/" },
  LOGIN: { name: "로그인", path: "/login" },
};

export type Paths = typeof paths;

export default paths;
