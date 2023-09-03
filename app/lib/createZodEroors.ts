import { type ZodIssue } from "zod";

export const createZodErrors = (issues: ZodIssue[]) => {
  let zodErrors = {};
  issues.forEach((issue) => {
    zodErrors = { ...zodErrors, [issue.path[0]]: issue.message };
  });
  return zodErrors;
};
