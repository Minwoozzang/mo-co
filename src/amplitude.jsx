import React, { useEffect } from 'react';
import * as amplitude from '@amplitude/analytics-browser';

const Amplitude = () => {
  useEffect(() => {
    amplitude.track('Visit Page');
  }, []);

  return (
    <div>
      <h1>amplitude</h1>
      <button
        onClick={() => {
          amplitude.track('Button Clicked');
        }}
      >
        클릭
      </button>
    </div>
  );
};

export default Amplitude;
