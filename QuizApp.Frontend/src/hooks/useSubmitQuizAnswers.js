import {useMutation} from "@tanstack/react-query";
import api from "../config/axiosConfig";

export function useSubmitQuizAnswers() {
    return useMutation({
        mutationFn: async (submission) => {
            const res = await api.post("/quiz/submit", submission);
            return res.data;
        },
    });
}