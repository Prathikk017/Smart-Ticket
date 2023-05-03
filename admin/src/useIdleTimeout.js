import { useState, useEffect } from 'react';

function useIdleTimeout(timeToIdle) {
  const [idle, setIdle] = useState(false);

  useEffect(() => {
    let timeoutId;

    const resetTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIdle(true);
      }, timeToIdle);
    };

    const events = [
      'load',
      'mousemove',
      'mousedown',
      'click',
      'scroll',
      'keypress',
    ];

    const resetTimeoutOnEvent = () => {
      setIdle(false);
      resetTimeout();
    };

    events.forEach((event) => {
      document.addEventListener(event, resetTimeoutOnEvent);
    });

    resetTimeout();

    return () => {
      clearTimeout(timeoutId);
      events.forEach((event) => {
        document.removeEventListener(event, resetTimeoutOnEvent);
      });
    };
  }, [timeToIdle]);

  return idle;
}

export default useIdleTimeout;
