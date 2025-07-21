import * as yup from "yup";

export const basicInfoSchema = yup.object().shape({
    title: yup.string().required(),
    description: yup.string().required(),
    categoryId: yup.number().required(),
    difficultyId: yup.number().required(),
});