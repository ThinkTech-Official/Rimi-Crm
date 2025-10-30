import { API_BASE } from "../utils/urls";

export const useDeleteDocument = () => {
  const deleteDocument = async (id: string) => {
    try {
      const response = await fetch(`${API_BASE}/documents/${id}`, {
        method: "DELETE",
      });
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error deleting document:", error);
      throw error;
    }
  };
  return { deleteDocument };
};
