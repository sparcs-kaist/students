import z from "zod";

export const zOrgName = z.string().max(30);
export const zOrgNameEng = z.string().max(100);
export const zUserName = z.string().max(255);
export const zFileName = z.string().max(256);
