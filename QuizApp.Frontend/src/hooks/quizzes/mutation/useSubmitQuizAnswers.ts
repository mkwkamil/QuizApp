import { useMutation } from "@tanstack/react-query";
import type { QuizSubmission, QuizSubmissionResult } from "@interfaces/quizzes";
import api from "@config/axiosConfig";

export const useSubmitQuizAnswers = () => {
    return useMutation<QuizSubmissionResult, Error, QuizSubmission>({
        mutationKey: ['submit-quiz'],
        mutationFn: async (submission: QuizSubmission) => {
            const { data } = await api.post<QuizSubmissionResult>(`/quiz/submit`, submission);
            return data;
        },
    })
};