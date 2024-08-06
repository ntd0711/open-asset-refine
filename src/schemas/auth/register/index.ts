import {
  ACCEPTED_IMAGE_TYPES,
  MAX_FILE_SIZE,
  NUMBER_OF_VERIFICATION_CODE,
} from "@constants/auth";
import { z } from "zod";

const emailSchema = z.string().email("Invalid email address");
const passwordSchema = z.string().min(8).max(20);

// const EmailSchema = z
//   .object({
//     email: z.string().email({ message: "Invalid email address" }),
//     confirmEmail: z.string().email({ message: "Invalid email address" }),
//   })
//   .refine((data) => data.email === data.confirmEmail, {
//     message: "Emails don't match",
//     path: ["confirmEmail"],
//   });

// const PasswordSchema = z
//   .object({
//     password: z
//       .string()
//       .min(8, { message: "Password must be at least 8 characters long" }),
//     confirmPassword: z.string(),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

export const CredentialUserSignUpSchema = z
  .object({
    email: emailSchema,
    confirmEmail: emailSchema,
    verificationCode: z
      .string()
      .length(
        NUMBER_OF_VERIFICATION_CODE,
        "verification code must be 4 number"
      ),
    password: passwordSchema,
    confirmPassword: passwordSchema,
    profileImage: z
      .instanceof(File)
      .optional()
      .nullable()
      .refine(
        (file) => !file || file.size <= MAX_FILE_SIZE,
        `ファイルサイズは${MAX_FILE_SIZE / 1000000}MB以下にしてください`
      )
      .refine(
        (file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "JPEGまたはPNG、WEBP形式の画像をアップロードしてください"
      ),
    nickname: z.string().min(3).max(10),
    birthday: z.object({
      year: z.number().min(1900).max(new Date().getFullYear()),
      month: z.number().min(1).max(12),
      day: z.number().min(1).max(31),
    }),
    userId: z
      .string()
      .min(3)
      .max(5)
      .regex(/^\d+$/, { message: "Input must only contain numbers" }),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Email does not match",
    path: ["confirmEmail"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });
