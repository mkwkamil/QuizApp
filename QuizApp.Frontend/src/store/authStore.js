import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
    persist(
        (set) => (
            {
                token: null,
                user: null,

                login: data => set({
                    token: data.token,
                    user: {
                        id: data.id,
                        username: data.username,
                        email: data.email,
                        role: data.role
                    }
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