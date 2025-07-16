import {useMutation, useQueryClient} from "@tanstack/react-query";
import api from "../../config/axiosConfig";

export const useUpdateProfileMutation = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data) => api.put('/profile', data),
        onSuccess: () => {
            queryClient.invalidateQueries(["profile-summary"]);
        },
    })
}