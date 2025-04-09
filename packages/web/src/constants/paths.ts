/**
 * @file   paths.ts
 * @brief  Path constants for Navigate, Link, and other components that require paths to be defined as constants.
 * @author andy@sparcs.org (Sangwoo Ye)
 */

const paths = {
  HOME: { name: "홈", path: "/" },
  STUDENTS: {
    name: "총학생회",
    sub: [
      {
        name: "소개",
        path: "/info",
      },
      {
        name: "중앙집행위원회",
        path: "/central-executive-committee",
      },
      {
        name: "서식",
        path: "/forms",
      },
      {
        name: "제휴",
        path: "/affiliation",
      },
    ],
  },
  NOTICE: {
    name: "공지사항",
    path: "/notice",
  },
  COMMITTEE: {
    name: "의결기구",
    sub: [
      {
        name: "회칙",
        path: "/rules",
      },
      {
        name: "안건지",
        path: "/agendas",
      },
      {
        name: "회의록",
        path: "/meetings",
      },
    ],
  },
  DOCUMENTS: {
    name: "예·결산 조회",
    path: "/document-lookup",
  },
  ACTIVITY_CERTIFICATE: {
    name: "활동인증서",
    path: "/activity-certificate",
  },
  PETITION: {
    name: "학생 청원",
    path: "/petition",
  },

  MADE_BY: { name: "만든 사람들", path: "/credits" },
  LICENSE: { name: "라이센스", path: "/" },
  TERMS_OF_SERVICE: { name: "이용 약관", path: "/" },
  LOGIN: { name: "로그인", path: "/login" },
};

export type Paths = typeof paths;

export default paths;
