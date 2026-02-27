import { API } from "../endpoints";
import axiosInstance from "../axios";

export const fetchDeletedUsers = async (page: number, size: number, searchTerm?: string) => {
    try {
        const query = new URLSearchParams({
            page: page.toString(),
            size: size.toString(),
            ...(searchTerm && { searchTerm }),
        }).toString();

        const response = await axiosInstance.get(API.USERS.GET_ALL_DELETED(query));
        return response.data;
    } catch (error: any) {
        return error.response?.data || { success: false, message: "Failed to fetch deleted users" };
    }
};
