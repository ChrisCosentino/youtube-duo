import React from 'react';

const VideoQueue = ({ queue }) => {
  return (
    <div className='queue-container'>
      <h1 className='header'>Queue</h1>
      {!Array.isArray(queue) || !queue.length ? (
        <div>Queue is empty</div>
      ) : (
        <div className='queue-list'>
          {queue.map((q, index) => (
            <div key={index}>{q}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoQueue;
