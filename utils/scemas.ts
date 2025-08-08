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
  sex: z.enum(["male", "female"], { message: "Sex is required" }),
  faculty: z.string().min(1, { message: "Faculty is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  goverment: z.string().min(1, { message: "Government is required" }),
  CommitteeIds: z.array(z.number()).optional(),
  roleId: z.enum(["0", "1", "2", "3"]),
});

export const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
