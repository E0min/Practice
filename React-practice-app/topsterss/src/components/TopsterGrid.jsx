import React, { useRef } from 'react';
import './TopsterGrid.css';
import SelectGrid from './SelectGrid';
import html2canvas from 'html2canvas';

const TopsterGrid = ({ gridSize, setGridSize, tracks, onRemoveTrack }) => {
    const captureRef = useRef(null);

    const totalCells = gridSize * gridSize;
    const cells = new Array(totalCells).fill(null);

    tracks.slice(0, totalCells).forEach((track, index) => {
        cells[index] = track;
    });

    const handleCapture = async () => {
        const options = {
            useCORS: true,
            allowTaint: false,
        };

        const canvas = await html2canvas(captureRef.current, options);
        const imgData = canvas.toDataURL('image/png');

        const link = document.createElement('a');
        link.href = imgData;
        link.download = 'topster-and-tracklist.png';
        link.click();
    };

    return (
        <div className="topster-grid-container">
            <div className="grid-and-select">
                <SelectGrid gridSize={gridSize} setGridSize={setGridSize} />
            </div>
            <div className="capture-area" ref={captureRef}>
                <div className={`topster-grid topster-grid-${gridSize}`}>
                    {cells.map((track, index) => (
                        <div key={index} className="grid-cell">
                            {track ? (
                                <div className="track-item">
                                    <img
                                        src={track.album.images[0].url}
                                        alt={track.name}
                                        className="grid-image"
                                        onClick={() => onRemoveTrack(track.id)}
                                    />
                                </div>
                            ) : (
                                <div className="empty-cell" />
                            )}
                        </div>
                    ))}
                </div>
                <div className="selected-tracks-list">
                    <ul>
                        {tracks.map((track) => (
                            <li key={track.id}>
                                {track.artists[0].name} - {track.name}
                            </li>
                        ))}
                    </ul>
                </div>
                
            </div>
            <button onClick={handleCapture} className="capture-button">Capture</button>

        </div>
    );
};

export default TopsterGrid;
