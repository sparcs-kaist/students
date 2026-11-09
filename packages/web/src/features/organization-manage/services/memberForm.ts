import isEqual from "lodash/isEqual";
import type { OrganizationMemberProps } from "@sparcs-students/web/features/organization-manage/components/ManageMemberTable";

export type MemberChanges = {
  updatedRows: OrganizationMemberProps[];
  createdRows: OrganizationMemberProps[];
  deletedRows: OrganizationMemberProps[];
};

// Controller registration can add undefined keys to otherwise untouched rows.
export const normalizeMember = (member: OrganizationMemberProps) => ({
  ...member,
  title: member.title?.trim() ?? "",
  legalBasis: member.legalBasis?.trim() ?? "",
});

export const getMemberChanges = (
  initialData: OrganizationMemberProps[],
  members: OrganizationMemberProps[],
): MemberChanges => {
  const initial = initialData.map(normalizeMember);
  const current = members.map(normalizeMember);
  const initialMap = new Map(initial.map(row => [row.id, row]));
  const currentIds = new Set(current.map(row => row.id));

  return {
    updatedRows: current.filter(row => {
      const original = initialMap.get(row.id);
      return original && !isEqual(row, original);
    }),
    createdRows: current.filter(row => !initialMap.has(row.id)),
    deletedRows: initial.filter(row => !currentIds.has(row.id)),
  };
};

export const isSameStudent = (
  left: OrganizationMemberProps,
  right: OrganizationMemberProps,
) => left.studentId === right.studentId && left.name === right.name;

export const hasCommitteeMetadata = (member: OrganizationMemberProps) =>
  Boolean(member.title?.trim() && member.legalBasis?.trim());
