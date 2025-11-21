const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

export const api = {
  get: async (path) => {
    try {
      const response = await fetch(`${API_URL}${path}`);
      if (!response.ok) throw new Error("Erro na requisição GET");
      return await response.json();
    } catch (error) {
      console.error("API GET Error:", error);
      throw error;
    }
  },

  post: async (path, body = {}) => {
    try {
      const response = await fetch(`${API_URL}${path}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error("Erro na requisição POST");

      return await response.json();
    } catch (error) {
      console.error("API POST Error:", error);
      throw error;
    }
  }
};
