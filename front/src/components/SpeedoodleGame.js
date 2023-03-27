import React, { useState, useRef } from 'react';

import {} from '../styles/SpeedoodleGameEmotion';
import { colors } from '../styles/ColorPalette';
import { H1, H2, H4, H5, H6, P1, P2, SmText } from '../styles/Fonts';

function SpeedoodleGame(props) {
  const canvasRef = useRef(null);
  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <H4>Round 1</H4>
        <div>키워드</div>
        <div style={{ width: '100%', height: '70%', border: '2px solid #111' }}>
          <canvas ref={canvasRef}></canvas>
        </div>
      </div>
    </>
  );
}
export default SpeedoodleGame;
