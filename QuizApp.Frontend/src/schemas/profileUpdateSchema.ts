import * as yup from "yup";

export const profileUpdateSchema = yup.object().shape({
    publicName: yup
        .string()
        .required("Public name is required")
        .max(30, "Public name cannot exceed 30 characters")
        .matches(/^[a-zA-Z0-9_]+$/, "Only letters, numbers and underscores allowed"),
    bio: yup
        .string()
        .max(200, "Bio cannot exceed 200 characters")
});