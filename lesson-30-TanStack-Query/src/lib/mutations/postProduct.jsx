import { api } from "../axios";

export const postProduct = async (formData) => {
  try {
    const response = await api.post("/products/add", formData);
    return response.data;
  } catch (error) {
    console.error("Error posting product:", error);
    throw error;
  }
};