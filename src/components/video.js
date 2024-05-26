import React, { useEffect, useRef } from 'react';
import './video.css';

const VideoPost = ({ post, activePostId }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    console.log('Current active post ID:', activePostId);  // コンソールログを追加してアクティブなポストIDを確認
    if (post._id === activePostId) {  // idを_idに修正
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
  }, [activePostId, post._id]);  // idを_idに修正

  return (
    <div className="video-post">
      <video ref={videoRef} src={post.url} controls loop playsInline /> {/* urlフィールドを使用 */}
      <p>{post.description}</p> {/* descriptionフィールドを使用 */}
    </div>
  );
};

export default VideoPost;
