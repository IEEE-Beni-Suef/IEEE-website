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
  CommitteeIds: z.array(z.string().transform((val) => Number(val))),
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
  keywords: z.string().min(1, { message: "At least one keyword is required" }),
  photo: z.any(),
  Video: z.any().optional(),
  categoryId: z.number().min(1, { message: "Category is required" }),
});

export const attendanceItemSchema = z.object({
  userId: z.string().min(1, { message: "User ID is required" }),
  isAttend: z.boolean(),
  score: z.string().min(1, { message: "Score is required" }),
});

export const submitAttendanceSchema = z.object({
  meetingId: z.string().min(1, { message: "Meeting ID is required" }),
  usersAttendents: z
    .array(attendanceItemSchema)
    .min(1, { message: "At least one attendee is required" }),
});

// New meeting schemas
export const meetingUserSchema = z.object({
  userId: z.number().min(1, { message: "User ID is required" }),
  attended: z.boolean(),
  mark: z
    .number()
    .min(0, { message: "Mark must be 0 or greater" })
    .max(10, { message: "Mark cannot exceed 10" }),
});

export const createMeetingSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  type: z.string().min(1, { message: "Type is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  recap: z.string().min(1, { message: "Recap is required" }),
  committeeId: z.number().min(1, { message: "Committee ID is required" }),
  headId: z.number().min(1, { message: "Head ID is required" }),
  users: z
    .array(meetingUserSchema)
    .min(1, { message: "At least one user is required" }),
});

//? send email schema for dashboard email page

export const sendEmailSchema = z.object({
  subject: z.string().min(1, { message: "Subject is required" }),
  body: z.string().min(1, { message: "Body is required" }),
  recipientIds: z
    .array(z.number())
    .min(1, "You must select at least one recipient"),
});

// Sponsers Validation==============================

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const addSponserSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  image: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: "Max image size is 5MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .png, and .webp formats are supported",
    }),
});
// Sponsers Validation==============================
