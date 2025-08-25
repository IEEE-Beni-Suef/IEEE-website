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
  roleId: z.enum(["1", "2", "3", "4", "5"], {
    message: "Role ID is required and must be a valid number",
  }),
});

export const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const committeeSchema = z.object({
  name: z.string().min(1, { message: "Committee name is required" }),
  headId: z.string().min(1, { message: "Head is required" }),
  vicesId: z.array(z.string()),
});


export const attendanceItemSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
  isAttend: z.boolean(),
  score: z.string().min(1, { message: "Score is required" }),
});

export const submitAttendanceSchema = z.object({
  meetingId: z.string().min(1, { message: "Meeting ID is required" }),
  usersAttendents: z.array(attendanceItemSchema).min(1, { message: "At least one attendee is required" }),
});
