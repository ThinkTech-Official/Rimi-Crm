import { axiosInstance } from "../utils/axiosInstance";

export const useDeleteDocument = () => {
  const deleteDocument = async (id: string) => {
    try {
      const response = await axiosInstance.delete(`/documents/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  };
  return { deleteDocument };
};
