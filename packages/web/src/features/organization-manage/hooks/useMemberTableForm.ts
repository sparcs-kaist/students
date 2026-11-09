import { useState } from "react";
import { useForm } from "react-hook-form";
import type {
  MemberFormValues,
  OrganizationMemberProps,
} from "@sparcs-students/web/features/organization-manage/components/ManageMemberTable";
import { normalizeMember } from "@sparcs-students/web/features/organization-manage/services/memberForm";

const useMemberTableForm = (members: OrganizationMemberProps[]) => {
  const [initialData, setInitialData] = useState(() =>
    members.map(normalizeMember),
  );
  const formMethods = useForm<MemberFormValues>({
    defaultValues: { members: initialData },
    mode: "onChange",
  });

  const commit = (
    savedMembers: OrganizationMemberProps[],
    deletedIds: number[],
  ) => {
    const saved = new Map(
      savedMembers.map(row => [row.id, normalizeMember(row)]),
    );
    const deleted = new Set(deletedIds);
    setInitialData(previous => [
      ...previous.filter(row => !deleted.has(row.id) && !saved.has(row.id)),
      ...saved.values(),
    ]);
    formMethods.reset({
      members: formMethods
        .getValues("members")
        .map(row => saved.get(row.id) ?? row),
    });
  };

  return { formMethods, initialData, commit };
};

export default useMemberTableForm;
