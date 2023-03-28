import React, { useState, useEffect } from 'react';
import { colors } from '../styles/ColorPalette';
import { H5 } from '../styles/Fonts';

function Timer(props) {
  const [milliseconds, setMilliseconds] = useState(0);
  const [seconds, setSeconds] = useState(20);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(milliseconds) > 0) {
        setMilliseconds(parseInt(milliseconds) - 1);
      }
      if (parseInt(milliseconds) === 0) {
        if (parseInt(seconds) === 0) {
          clearInterval(countdown);
        } else {
          setSeconds(parseInt(seconds) - 1);
          setMilliseconds(99);
        }
      }
    }, 10);
    return () => clearInterval(countdown);
  }, [seconds, milliseconds]);

  return (
    <>
      <H5 color={colors.gameBlue500}>
        {seconds}:{milliseconds < 10 ? `0${milliseconds}` : milliseconds}
      </H5>
    </>
  );
}

export default Timer;
