import z from "zod";

export const zCode = z.coerce.number().int().min(1);

export type ExtractCode<T extends z.ZodObject<{ code: typeof zCode }>> =
  z.ZodObject<{
    code: T["shape"]["code"];
  }>;

export const zExtractCode = <T extends z.ZodObject<{ code: typeof zCode }>>(
  schema: T,
): ExtractCode<T> => z.object({ code: schema.shape.code }) as ExtractCode<T>;
