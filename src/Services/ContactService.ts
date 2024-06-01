import { DataContact } from "../Models/contactModel";
import axios from "axios";

const baseUrl = "http://localhost:8081/api/contacts";

const ContactService = {
  fetchAll: async () => {
    try {
      const response = await axios.get(`${baseUrl}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },

  getById: async (id: string) => {
    try {
      const response = await axios.get(`${baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching contacts:", error);
      throw error;
    }
  },

  create: async (contact: DataContact) => {
    try {
      const response = await axios.post(baseUrl, contact);
      return response.data;
    } catch (error) {
      console.error("Error creating contact:", error);
      throw error;
    }
  },

  update: async (id: string, contact: DataContact) => {
    try {
      const response = await axios.put(`${baseUrl}/${id}`, contact);
      return response.data;
    } catch (error) {
      console.error("Error updating contact:", error);
      throw error;
    }
  },

  delete: async (id: string) => {
    try {
      const response = await axios.delete(`${baseUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting contact:", error);
      throw error;
    }
  },
};

export default ContactService;
