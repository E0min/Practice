import React from 'react';
import './SelectGrid.css';

const SelectGrid = ({ gridSize, setGridSize }) => {
  return (
    <div className="select-grid">
      <label>
        Grid Size :     
        <select className="select" value={gridSize} onChange={(e) => setGridSize(Number(e.target.value))}>
          <option value={3}>3x3</option>
          <option value={4}>4x4</option>
          <option value={5}>5x5</option>
        </select>
      </label>
    </div>
  );
};

export default SelectGrid;
