import { useMutation } from "@tanstack/react-query";
import type { CreateDraftPayload } from "@interfaces/quiz-manage";
import api from "@config/axiosConfig";
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom";

type UpdateDraftQuizPayload = {
    draftId: number;
    payload: CreateDraftPayload;
};

export const useUpdateDraftQuiz = () => {
    const navigate = useNavigate()
    
    return useMutation({
        mutationFn: async ({ draftId, payload }: UpdateDraftQuizPayload) => {
            const { data } = await api.put<{ draftId: number }>(`/quiz-management/draft/${draftId}`, payload);
            return data.draftId;
        },
        onSuccess: () => {
            toast.success("Draft updated successfully!");
            navigate("/profile", { replace: true });
        },
        onError: () => {
            toast.error("Failed to update draft. Please try again.");
        },
    });
};