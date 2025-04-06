
const API_URL = 'http://localhost:3000/api/zoho';

export const zohoApi = {
  connectToZoho: () => {
    const authUrl = `${API_URL}/auth`;
    console.log('Redirecting to:', authUrl);
    window.location.href = authUrl;
  },
};
