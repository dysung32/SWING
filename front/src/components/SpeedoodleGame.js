import React, { useState, useRef, useEffect } from 'react';

import {} from '../styles/SpeedoodleGameEmotion';
import { colors } from '../styles/ColorPalette';
import { H1, H2, H4, H5, H6, P1, P2, SmText } from '../styles/Fonts';

function SpeedoodleGame(props) {
  let canvasRef = useRef(null);
  let canvas;
  let pos = {
    drawable: false,
    X: -1,
    Y: -1,
  };
  let ctx;

  useEffect(() => {
    canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    canvas.addEventListener('mousedown', initDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', finishDraw);
    canvas.addEventListener('mouseout', finishDraw);
  }, []);

  const getPosition = (e) => {
    return { X: e.offsetX, Y: e.offsetY };
  };

  const initDraw = (e) => {
    ctx.beginPath();
    pos = { drawable: true, ...getPosition(e) };
    ctx.lineTo(pos.X, pos.Y);
    ctx.stroke();
  };

  const draw = (e) => {
    if (pos.drawable) {
      pos = { ...pos, ...getPosition(e) };
      ctx.lineTo(pos.X, pos.Y);
      ctx.stroke();
    }
  };

  const finishDraw = () => {
    pos = { drawable: false, X: -1, Y: -1 };
  };
  return (
    <>
      <div style={{ width: '100%', height: '100%' }}>
        <H4>Round 1</H4>
        <div>키워드</div>
        <div style={{ width: '100%', height: '70%', border: '2px solid #111' }}>
          <canvas ref={canvasRef} style={{ border: '1px solid #111' }}></canvas>
        </div>
      </div>
    </>
  );
}
export default SpeedoodleGame;
