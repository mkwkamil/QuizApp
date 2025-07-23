import * as yup from "yup";
import type {QuestionType} from "@interfaces/quizzes.ts";

const questionTypes: QuestionType[] = ["single", "multiple", "truefalse"];

export const basicInfoSchema = yup.object().shape({
    title: yup.string().required("Title is required").min(9, "Title must be at least 9 characters long"),
    description: yup.string().required("Description is required").min(10, "Description must be at least 10 characters long"),
    categoryId: yup.number().required(),
    difficultyId: yup.number().required(),
});

export const questionsStageSchema = yup.array().of(
    yup.object().shape({
        text: yup
            .string()
            .required("Question text is required")
            .min(5, "Question must be at least 5 characters long"),

        type: yup
            .mixed<QuestionType>()
            .oneOf(questionTypes, "Invalid question type")
            .required("Question type is required"),

        options: yup
            .array()
            .of(yup.string().required("Option cannot be empty"))
            .min(2, "At least 2 options are required")
            .when("type", {
                is: (val: QuestionType) => val !== "truefalse",
                then: (schema) => schema.required("Options required"),
                otherwise: (schema) => schema.notRequired()
            }),

        correctAnswers: yup
            .array()
            .of(yup.number().min(0))
            .min(1, "At least one correct answer is required"),
    })
).min(1, "You must add at least one question");