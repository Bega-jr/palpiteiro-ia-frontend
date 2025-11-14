const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default {
  get: async (path) => {
    const token = localStorage.getItem('firebaseToken');
    const res = await fetch(API_URL + path, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (!res.ok) throw new Error('Erro na API');
    return res.json();
  }
};
