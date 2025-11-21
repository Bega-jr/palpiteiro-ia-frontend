const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://palpiteiro-ia-backend-docker.onrender.com";

const api = {
  get: async (path) => {
    try {
      const token = localStorage.getItem('firebaseToken');

      const res = await fetch(API_URL + path, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : ""
        }
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Erro API (${res.status}): ${msg}`);
      }

      return res.json();
    } catch (e) {
      console.error("Erro API:", e);
      throw e;
    }
  }
};

export default api;
