import { useEffect, useState } from "react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export interface ICredentials {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
}

interface StoreState {
    credentials: ICredentials | null;
    setCredentials: (credentials: ICredentials | null) => void;
    isAuthenticated: () => boolean;
    logout: () => void;
}

// Didn't use combine here, so we can use setCredentials() in logout()
export const useAuthStore = create<StoreState>()(
    devtools(
        persist(
            (set, get) => {
                return {
                    credentials: null,

                    setCredentials: (credentials) => set(() => ({ credentials })),

                    isAuthenticated: () => !!get().credentials,

                    logout() {
                        get().setCredentials(null);
                    },
                };
            },
            {
                name: "auth-store-storage",
            },
        ),
    ),
);

// Just an alias for use outside of React components
export const authStore = useAuthStore;

// https://docs.pmnd.rs/zustand/integrations/persisting-store-data#how-can-i-check-if-my-store-has-been-hydrated
export const useAuthStoreHydration = () => {
    const [hasHydrated, setHasHydrated] = useState(false);

    useEffect(() => {
        const unsubFinishHydration = authStore.persist.onFinishHydration(() => setHasHydrated(true));

        setHasHydrated(authStore.persist.hasHydrated());

        return () => {
            unsubFinishHydration();
        };
    }, []);

    return hasHydrated;
};
