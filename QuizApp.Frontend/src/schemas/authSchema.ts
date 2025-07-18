import * as yup from "yup";

export const registerSchema = yup.object({
    username: yup
        .string()
        .required("Username is required")
        .min(6, "Username must be at least 6 characters long")
        .max(32, "Username must be at most 32 characters long")
        .matches(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
    email: yup
        .string()
        .required("Email is required")
        .email("Email must be a valid email address"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("Please confirm your password"),
});

export const loginSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup
        .string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters long"),
});