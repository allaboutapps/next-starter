import { useMutation } from "@tanstack/react-query";
import { ICredentials, useAuthStore } from "../../stores/authStore";
import { axiosInstance } from "../axiosInstance";

const MOCK_LOGIN = true;

export const useLogin = () => {
    const setCredentials = useAuthStore((state) => state.setCredentials);
    return useMutation({
        mutationFn: async (payload: { username: string; password: string }) => {
            const response = MOCK_LOGIN
                ? {
                      // Some mock data for template
                      data: {
                          access_token: "8791aefb-9d32-41c8-9170-f0799718f70e",
                          refresh_token: "36961d6b-3c78-43e8-9592-f12490e2e30a",
                          expires_in: 500,
                          token_type: "bearer",
                      },
                  }
                : await axiosInstance.post<ICredentials>(
                      "/api/v1/auth/login",
                      {
                          ...payload,
                      },
                      {
                          skipAuthRefresh: true,
                      },
                  );
            setCredentials(response.data);
            return response;
        },
    });
};
