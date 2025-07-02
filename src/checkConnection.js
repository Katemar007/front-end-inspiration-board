import axios from 'axios';

const URL = import.meta.env.VITE_APP_BACKEND_URL;

export const checkBackendConnection = async () => {
  try {
    const res = await axios.get(`${URL}/boards`);
    console.log('✅ Backend connected:', res.data);
    return { status: 'ok', message: '✅ Connected to backend' };
  } catch (err) {
    console.error('❌ Connection failed:', err.message);
    return { status: 'error', message: '❌ Cannot connect to backend' };
  }
};

checkBackendConnection();