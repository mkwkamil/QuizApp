import { useMutation } from "@tanstack/react-query";
import type { CreateDraftPayload } from "@interfaces/quiz-manage";
import api from "@config/axiosConfig";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

export const useCreateDraftQuiz = () => {
    const navigate = useNavigate();
    
    return useMutation({
        mutationFn: async (payload: CreateDraftPayload) => {
            const { data } = await api.post<{ draftId: number }>('/quiz-management/draft', payload);
            return data.draftId;
        },
        onSuccess: () => {
            toast.success("Draft saved successfully!");
            navigate("/profile", { replace: true });
        },
        onError: () => {
            toast.error("Failed to save draft. Please try again.");
        },
    });
};