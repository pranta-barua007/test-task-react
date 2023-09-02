import { z } from "zod";

export const sectorSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  value: z.number(),
  hasNext: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  parentId: z.string().optional(),
});

export const applicationFormSchema = z.object({
  fullName: z
    .string()
    .min(3, { message: "Must be at least three characters long" }),
  sectors: z
    .array(sectorSchema)
    .min(1, { message: "Select at least one sector" }),
  consent: z.boolean().refine((data) => data !== false, {message: 'Must aggree'}),
});

export type IApplicationFormSchema = z.infer<typeof applicationFormSchema>;