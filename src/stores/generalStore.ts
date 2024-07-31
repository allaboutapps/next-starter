import { create } from "zustand";
import { combine, devtools } from "zustand/middleware";

const ERROR_QUEUEING = false;

export const useGeneralStore = create(
    devtools(
        combine(
            {
                isLoading: false,
                runtimeEnvironment: undefined as string | undefined,
                _errors: [] as { message: string; error?: any }[],
            },
            (set, get) => ({
                setIsLoading: (isLoading: boolean) => set(() => ({ isLoading })),

                setRuntimeEnvironment: (runtimeEnvironment: string) => set(() => ({ runtimeEnvironment })),

                getError: () => (get()._errors.length > 0 ? get()._errors[0] : undefined),

                setError(message: string, error?: any) {
                    if (ERROR_QUEUEING) {
                        set(() => ({ _errors: get()._errors.concat([{ message, error }]) }));
                    } else {
                        set(() => ({ _errors: [{ message, error }] }));
                    }
                },

                popError() {
                    if (ERROR_QUEUEING) {
                        // Remove oldest error
                        set(() => ({ _errors: get()._errors.slice(1) }));
                    } else {
                        // this._error = [];
                        set(() => ({ _errors: [] }));
                    }
                },
            }),
        ),
    ),
);

// Just an alias for use outside of React components
export const generalStore = useGeneralStore;
