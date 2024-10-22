import React, { useState, useEffect } from 'react';
import './TopsterPage.css';
import MusicSearch from '../components/MusicSearch';
import TopsterGrid from '../components/TopsterGrid';
import Header from '../components/Header';
import { saveToLocalStorage, loadFromLocalStorage } from '../utils/storage';

const TopsterPage = () => {
  const [gridSize, setGridSize] = useState(0);
  const [selectedTracks, setSelectedTracks] = useState([]);

  useEffect(() => { // 로컬 스토리지에서 데이터를 로드합니다.
    const savedTracks = loadFromLocalStorage('selectedTracks');
    const savedGridSize = loadFromLocalStorage('gridSize');

    if (savedTracks) {
      setSelectedTracks(savedTracks);
    }

    if (savedGridSize) {
      setGridSize(savedGridSize);
    }
  }, []);

  useEffect(() => {     // 선택된 트랙과 그리드 크기를 로컬 스토리지에 저장합니다.
    saveToLocalStorage('selectedTracks', selectedTracks);
    saveToLocalStorage('gridSize', gridSize);
  }, [selectedTracks, gridSize]);

  const handleTrackSelect = (track) => {
    if (selectedTracks.length < gridSize * gridSize) {
      setSelectedTracks([...selectedTracks, track]);
    } else {
      alert('Grid is full');
    }
  };

  const handleRemoveTrack = (trackId) => {
    setSelectedTracks(selectedTracks.filter(track => track.id !== trackId));
  };

  return (
    <div className="topster-page">
      <div className="header">
        <Header />
      </div>
      <div className="content">
        <div className="music-search">
          <MusicSearch onSelectTrack={handleTrackSelect} />
        </div>
        <div className="music-search-results">
          <TopsterGrid
            gridSize={gridSize}
            setGridSize={setGridSize}
            tracks={selectedTracks}
            onRemoveTrack={handleRemoveTrack}
          />
        </div>
      </div>
    </div>
  );
};

export default TopsterPage;
