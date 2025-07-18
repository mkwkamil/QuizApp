import { useQuery } from "@tanstack/react-query";
import type { ProfileSummary } from "@interfaces/profile";
import api from "@config/axiosConfig";

export const useProfileSummary = () => {
    return useQuery<ProfileSummary>({
        queryKey: ["profile", "summary"],
        queryFn: async () => {
            const { data } = await api.get<ProfileSummary>("/profile/summary");
            return {
                ...data,
                joinDate: new Date(data.joinDate).toLocaleDateString("en-US", {
                    month: "short",
                    year: "numeric",
                }),
            };
        },
    });
};

// { id: 'email', label: 'Email', value: data.email, icon: <Email /> },
// { id: 'username', label: 'Username', value: data.username, icon: <Person /> },
// { id: 'memberSince', label: 'Member Since', value: new Date(data.joinDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), icon: <Cake /> }