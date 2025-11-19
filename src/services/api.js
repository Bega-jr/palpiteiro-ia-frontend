const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const api = {
  get: async (path) => {
    try {
      const token = localStorage.getItem('firebaseToken');

      const res = await fetch(API_URL + path, {
        method: 'GET',
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Content-Type': 'application/json'
        }
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Erro na API: ${res.status} - ${errorText}`);
      }

      return res.json();
    } catch (err) {
      console.error("Erro API:", err);
      throw err;
    }
  }
};

export default api;
