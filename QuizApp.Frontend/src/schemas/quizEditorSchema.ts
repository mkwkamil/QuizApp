import * as yup from "yup";

export const basicInfoSchema = yup.object().shape({
    title: yup.string().required("Title is required").min(9, "Title must be at least 9 characters long"),
    description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters long"),
    categoryId: yup.number().required(),
    difficultyId: yup.number().required(),
});