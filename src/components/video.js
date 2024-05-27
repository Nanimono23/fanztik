import React, { useEffect, useRef } from 'react';
import './video.css';

const VideoPost = ({ post, activePostId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (post.id === activePostId) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error('Error attempting to play video:', error);
        });
      }
    } else {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [activePostId, post.id]);

  return (
    <div className="video-post">
      <video ref={videoRef} src={post.url} controls loop playsInline />
      <p>{post.description}</p>
    </div>
  );
};

export default VideoPost;
