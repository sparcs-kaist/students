import z from "zod";

export const zId = z.coerce.number().int().min(1);

export type ExtractId<T extends z.ZodObject<{ id: typeof zId }>> = z.ZodObject<{
  id: T["shape"]["id"];
}>;

export const zExtractId = <T extends z.ZodObject<{ id: typeof zId }>>(
  schema: T,
): ExtractId<T> => z.object({ id: schema.shape.id }) as ExtractId<T>;
