import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getSpotifyToken from '../services/spotifyService';
import './MusicSearch.css';

const MusicSearch = ({ onSelectTrack }) => {
  const [query, setQuery] = useState('');
  const [tracks, setTracks] = useState([]);
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const token = await getSpotifyToken();
      setToken(token);
    };

    fetchToken();
  }, []);

  const searchTracks = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('https://api.spotify.com/v1/search', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        params: {
          q: query,
          type: 'track',
          limit: 20,
        },
      });
      setTracks(response.data.tracks.items);
    } catch (error) {
      console.error('Error fetching data: ', error);
      alert('Error fetching data');
    }
  };

  return (
    <div className="music-search">
      <form className='search-form' onSubmit={searchTracks}>
        <input
          type="text"
          placeholder="Search for music"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="results">
        {tracks.map((track) => (
          <div key={track.id} className="track-item" onClick={() => onSelectTrack(track)}>
            <img src={track.album.images[1].url} alt={track.name} className="track-image" />
            <div className="track-info">
              <div className="track-name">{track.name}</div>
              <div className="track-artist">{track.artists[0].name}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MusicSearch;
