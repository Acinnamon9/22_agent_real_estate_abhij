import React, { useEffect, useState } from 'react';
import './AudioWaveform.css';

const AudioWaveform: React.FC = () => {
  const [heights, setHeights] = useState<number[]>([6, 10, 14, 12, 8, 5, 7, 11, 13, 9, 6, 8]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setHeights(prev => prev.map(() => Math.max(4, Math.min(18, 4 + Math.random() * 14))));
    }, 80);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="audio-waveform">
      {heights.map((height, i) => (
        <div 
          key={i} 
          className="audio-bar"
          style={{ height: `${height}px` }}
        />
      ))}
    </div>
  );
};

export default AudioWaveform;