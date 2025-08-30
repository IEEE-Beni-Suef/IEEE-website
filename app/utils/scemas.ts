import z from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  middleName: z.string().min(1, { message: "Middle name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  year: z.string().min(1, { message: "Year is required" }),
  sex: z.enum(["Male", "Female"], { message: "Sex is required" }),
  faculty: z.string().min(1, { message: "Faculty is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  goverment: z.string().min(1, { message: "Government is required" }),
  CommitteeIds: z
    .array(z.string().transform((val) => Number(val)))
    .min(1, { message: "Commitee(s) is required" }),
  roleId: z.enum(["1", "2", "3", "4", "5"], {
    message: "Role ID is required and must be a valid number",
  }),
});

export const createUserSchema = registerSchema.extend({
  isActive: z.boolean(),
});

export const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const committeeSchema = z.object({
  name: z.string().min(1, { message: "Committee name is required" }),
  description: z
    .string()
    .min(1, { message: "Committee description is required" }),
  headId: z.string(),
  vicesId: z.array(z.string()),
  image: z.any().optional(),
});

export const articleSchema = z.object({
  title: z.string().min(1, { message: "Article title is required" }),
  description: z
    .string()
    .min(1, { message: "Article description is required" }),
  keywords: z
    .array(z.string())
    .min(1, { message: "At least one keyword is required" }),
  photo: z.string().min(1, { message: "Article photo is required" }),
  categoryId: z.number().min(1, { message: "Category is required" }),
});
