"use client";

import TimelineTable from "@sparcs-students/web/features/document/components/TimelineTable";

const CompoenentPage: React.FC = () => {
  const mockTimeLine = [
    {
      startDate: new Date("2025-01-24"),
      endDate: new Date("2025-01-28"),
      content: "집행운영회 운영",
    },
    {
      startDate: new Date("2025-01-24"),
      endDate: new Date("2025-01-28"),
      content: "메모가 있는 경우",
      memo: "기이이이이ㅣ이이이이이ㅣ이이ㅣ이이이이이ㅣ이이ㅣ이이이이이ㅣ이이ㅣ이이이이이ㅣ이이ㅣ이이이이이ㅣ이이인메모",
    },
  ];

  return <TimelineTable contents={mockTimeLine} />;
};

export default CompoenentPage;
