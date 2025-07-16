import {useQuery} from "@tanstack/react-query";
import api from "../../config/axiosConfig";

export const useUserQuizzes = () => {
    return useQuery({
        queryKey: ["user-quizzes"],
        queryFn: async () => {
            const res = await api.get('/profile/my-quizzes');
            return res.data;
        }
    })
}