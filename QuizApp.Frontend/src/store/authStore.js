import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => (
            {
                user: null,
                token: null,

                login: data => set({
                    token: data.token,
                    user: { username: data.username }
                }),
                
                logout: () => set({
                    user: null,
                    token: null,
                }),
                
                setUser: (data) => set(state => ({
                    user: {
                        ...state.user,
                        ...data
                    }
                })),

                getIsAuthenticated: () => !!useAuthStore.getState().token
            }
        ),
        {
            name: 'auth-storage',
        }
    )
);

export default useAuthStore;