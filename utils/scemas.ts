import z from "zod";

export const registerSchema = z.object({
  userName: z.string().min(1, { message: "Username is required" }),
  fName: z.string().min(1, { message: "First name is required" }),
  mName: z.string().min(1, { message: "Middle name is required" }),
  lName: z.string().min(1, { message: "Last name is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  email: z.string().email({ message: "Invalid email address" }),
  year: z.string().min(1, { message: "Year is required" }),
  sex: z.enum(["male", "female"], { message: "Sex is required" }),
  faculty: z.string().min(1, { message: "Faculty is required" }),
  city: z.string().min(1, { message: "City is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  government: z.string().min(1, { message: "Government is required" }),
  roleId: z.enum(["0", "1", "2", "3"]),
});

export const loginSchema = z.object({
  userName: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});
