import { fetchDeletedUsers } from "../api/user/deleted-user";

export interface ActionResult<T = any> {
    success: boolean;
    message: string;
    data?: T;
}

export const getDeletedUsersAction = async (
    page: number = 1,
    size: number = 10,
    searchTerm?: string
): Promise<ActionResult> => {
    try {
        const result = await fetchDeletedUsers(page, size, searchTerm);
        if (result.success && result.data) {
            return {
                success: true,
                message: "Deleted users fetched successfully",
                data: result.data
            };
        }
        return {
            success: false,
            message: result.message || "Failed to fetch deleted users"
        };
    } catch (err: any) {
        return {
            success: false,
            message: err.response?.data?.message || err.message || "Failed to fetch deleted users"
        };
    }
};
