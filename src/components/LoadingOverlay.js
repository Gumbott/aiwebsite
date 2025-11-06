import React, { useMemo, useState } from 'react';
import './LoadingOverlay.css';
import RobotLogo from './RobotLogo';

const LoadingOverlay = ({ fadeOut = false }) => {
  const [reverse, setReverse] = useState(false);
  const [boost, setBoost] = useState(false);

  const spinClassName = useMemo(() => {
    const parts = ['spinner'];
    if (reverse) parts.push('reverse');
    if (boost) parts.push('boost');
    return parts.join(' ');
  }, [reverse, boost]);

  return (
    <div className={`loading-overlay${fadeOut ? ' fade-out' : ''}`} role="alert" aria-busy="true">
      <div
        className="loading-card"
        onMouseEnter={() => setBoost(true)}
        onMouseLeave={() => setBoost(false)}
        onClick={() => setReverse((r) => !r)}
        title="Click to flip direction, hover to boost"
      >
        <div className={spinClassName}>
          <RobotLogo size={72} color="#00ff88" />
        </div>
        <div className="loading-text">Starting RobotsForHire…</div>
        <div className="loading-subtext">Smart. Secure. Set-and-Forget.</div>
      </div>
    </div>
  );
};

export default LoadingOverlay;


