import z from "zod";

export const zName = z.string().max(30);
export const zNameEng = z.string().max(100);
export const zUserName = z.string().max(255);
export const zFileName = z.string().max(256);
export const zEnumName = z.string().max(30);
export const zDocumentItemName = z.string().max(255);

export const zMoney = z.coerce.number().int().min(0);
