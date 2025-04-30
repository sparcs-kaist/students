import React, { useState, useEffect } from "react";
import FlexWrapper from "@sparcs-students/web/common/components/FlexWrapper";
import Select, { SelectItem } from "./Select";

export interface TwoSelectProps<T1, T2> {
  leftItems: SelectItem<T1>[];
  rightItems: {
    teamId: T1;
    members: SelectItem<T2>[];
  }[];
  value: {
    teamId: T1 | null;
    memberId: T2 | null;
  };
  onChange: (value: { teamId: T1 | null; memberId: T2 | null }) => void;
}

const TwoSelect = <T1, T2>({
  leftItems,
  rightItems,
  value,
  onChange,
}: TwoSelectProps<T1, T2>) => {
  const [selectedTeamId, setSelectedTeamId] = useState<T1 | null>(
    value?.teamId ?? null,
  );
  const [selectedMemberId, setSelectedMemberId] = useState<T2 | null>(
    value?.memberId ?? null,
  );

  useEffect(() => {
    if (value) {
      setSelectedTeamId(value.teamId);
      setSelectedMemberId(value.memberId);
    }
  }, [value]);

  const currentMembers =
    rightItems.find(team => team.teamId === selectedTeamId)?.members || [];

  const handleTeamChange = (teamId: T1 | undefined) => {
    setSelectedTeamId(teamId ?? null);
    setSelectedMemberId(null);
    onChange?.({ teamId: teamId ?? null, memberId: null });
  };

  const handleMemberChange = (memberId: T2 | undefined) => {
    setSelectedMemberId(memberId ?? null);
    onChange?.({ teamId: selectedTeamId, memberId: memberId ?? null });
  };

  return (
    <FlexWrapper direction="row" gap={30} style={{ alignItems: "center" }}>
      <Select<T1>
        items={leftItems}
        value={selectedTeamId as T1}
        onChange={handleTeamChange}
        placeholder="부서를 선택하세요."
        justify="space-between"
        textWidth="fit-content"
      />
      /
      <Select<T2>
        items={currentMembers}
        value={selectedMemberId as T2}
        onChange={handleMemberChange}
        placeholder="담당자를 선택하세요."
        justify="space-between"
        textWidth="fit-content"
      />
    </FlexWrapper>
  );
};

export default TwoSelect;
