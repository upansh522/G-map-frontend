import React from 'react';

const SpeedControl = ({ speed, setSpeed }) => {
  const handleSpeedChange = (event) => {
    setSpeed(Number(event.target.value));
  };

  return (
    <div className="speed-control-container bg-gray-100 bg-opacity-80 p-4 rounded-lg shadow-lg">
      <label htmlFor="speedRange" className="block text-gray-700">Adjust Speed</label>
      <input
        id="speedRange"
        type="range"
        min="1"
        max="5"
        step="1"
        value={speed}
        onChange={handleSpeedChange}
        className="w-full mt-2"
      />
      <div className="text-center mt-2">{`Speed: ${speed} sec`}</div>
    </div>
  );
};

export default SpeedControl;
