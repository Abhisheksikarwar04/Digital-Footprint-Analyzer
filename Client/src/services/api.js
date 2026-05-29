import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1'
});

export async function fetchDemoToken() {
  const { data } = await api.get('/auth/demo-token');
  return data.token;
}

export async function createScan(payload, token) {
  const { data } = await api.post('/scan', payload, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  return data;
}

export async function getScan(scanId, token) {
  const { data } = await api.get(`/scan/${scanId}`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  return data;
}
