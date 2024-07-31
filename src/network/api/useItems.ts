import { AxiosRequestConfig } from "axios";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../axiosInstance";

// Example for GET call
export const useItems = () => {
    return useQuery({
        queryKey: ["items"],
        queryFn: async ({ signal }) => {
            const config: AxiosRequestConfig = {
                signal,
            };

            const response = await axiosInstance.get<any>("items", config);

            return response.data;
        },
    });
};
