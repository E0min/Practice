import React from 'react';
import './SelectedTracksList.css';

const SelectedTracksList = ({ tracks }) => {
  return (
    <div className="selected-tracks-list">
      <h2>Selected Tracks</h2>
      <ul>
        {tracks.map((track) => (
          <li key={track.id}>
            {track.artists[0].name} - {track.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectedTracksList;
