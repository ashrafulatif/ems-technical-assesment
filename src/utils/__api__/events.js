import axios, { endpoints } from "@/utils/instances";

export const safeApiCall = async (fn) => {
  try {
    const response = await fn();
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw { message: "Network error - backend may be down" };
    } else {
      throw { message: error.message };
    }
  }
};

const getAllMockEvents = async () => {
  const response = await safeApiCall(() => {
    return axios.get(endpoints.events.getMockEvents);
  });

  return response.data;
};

export default {
  getAllMockEvents,
};
