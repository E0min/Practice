import axios from 'axios';

const getSpotifyToken = async () => {
  const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;
  const authString = `${clientId}:${clientSecret}`;
  const encodedAuthString = btoa(authString);

  const response = await axios.post('https://accounts.spotify.com/api/token', 'grant_type=client_credentials', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${encodedAuthString}`,
    },
  });

  return response.data.access_token;
};

export default getSpotifyToken;
