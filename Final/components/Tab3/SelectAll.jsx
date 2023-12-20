import React, { useState, useEffect } from 'react';

const SelectAll = ({ info }) => {
  const [button, setButton] = useState('');
  const [showAfterTime, setShowAfterTime] = useState(true);
  const [showBeforeTime, setShowBeforeTime] = useState(true);

  const handleAfterTimeClick = () => {
    setButton('오전');
    setShowAfterTime(true);
    setShowBeforeTime(false);
  };

  const handleBeforeTimeClick = () => {
    setButton('오후');
    setShowBeforeTime(true);
    setShowAfterTime(false);
  };

  useEffect(() => {
    setButton('');
  }, [info]);

  useEffect(() => {
    if (info === 'proA') {
      setShowBeforeTime(true);
      setShowAfterTime(false);
    } else if (info === 'proB') {
      setShowBeforeTime(false);
      setShowAfterTime(true);
    } else if (info === 'proC') {
      setShowBeforeTime(true);
      setShowAfterTime(false);
    } else {
      setShowBeforeTime(true);
      setShowAfterTime(true);
    }
  }, [info]);

  return (
    <>
      <span
        className={`after ${!showAfterTime ? 'delete' : ''} ${button === '오전' ? 'show' : ''}`}
        onClick={handleAfterTimeClick}
      >
        오전
      </span>
      <span
        className={`before ${!showBeforeTime ? 'delete' : ''} ${button === '오후' ? 'show' : ''}`}
        onClick={handleBeforeTimeClick}
      >
        오후
      </span>
    </>
  );
};

export default SelectAll;
