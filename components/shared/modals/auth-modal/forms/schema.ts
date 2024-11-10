import { z } from "zod";
export const passwordSchema = z
  .string()
  .min(4, { message: "The password lenght should be at least 6 figures" });

export const formLoginSchema = z.object({
  email: z.string().email({ message: "Enter the correct email" }),
  password: passwordSchema,
});
export const formRegisterSchema = formLoginSchema
  .merge(
    z.object({
      fullName: z
        .string()
        .min(2, { message: "Enter your first name and your last name" }),
      confirmPassword: z.string().min(4, { message: "" }),
    })
  )
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type TFormLoginValues = z.infer<typeof formLoginSchema>;
export type TFormRegisterValues = z.infer<typeof formRegisterSchema>;
