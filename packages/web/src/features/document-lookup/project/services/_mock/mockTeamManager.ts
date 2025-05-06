export interface TeamProps {
  teamId: number;
  name: string;
}

export interface TeamMemberProps {
  userId: number;
  name: string;
}

export interface TeamStructureProps {
  teamId: number;
  members: TeamMemberProps[];
}

export const mockTeamList: TeamProps[] = [
  {
    teamId: 0,
    name: "홍보부",
  },
  {
    teamId: 1,
    name: "총무부",
  },
];

export const mockTeamStructure: TeamStructureProps[] = [
  {
    teamId: 0,

    members: [
      {
        userId: 10,
        name: "안채연",
      },
      {
        userId: 1,
        name: "권혁원",
      },
      {
        userId: 2,
        name: "권혁태",
      },
      {
        userId: 6,
        name: "미정",
      },
    ],
  },
  {
    teamId: 1,

    members: [
      {
        userId: 3,
        name: "최지윤",
      },
      {
        userId: 4,
        name: "박정민",
      },
      {
        userId: 5,
        name: "김민주",
      },
      {
        userId: 6,
        name: "미정",
      },
    ],
  },
];
