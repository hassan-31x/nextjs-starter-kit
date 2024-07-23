import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1, {
    message: "Email is required"
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  username: z.string().min(3),
});