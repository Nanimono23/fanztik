import React, { useEffect, useState, useRef } from 'react';
import VideoPost from './components/video.js';
import './App.css';
import axios from 'axios';

const App = () => {
  const [activePostId, setActivePostId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [agreed, setAgreed] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await axios.get(`${apiUrl}/videos`);
        console.log('Fetched videos:', response.data);
        setPosts(response.data);
        if (response.data.length > 0) {
          setActivePostId(response.data[0]._id);
        }
      } catch (err) {
        console.error('Error fetching videos:', err);
      }
    };

    fetchVideos();
  }, []);

  const containerRef = useRef(null);

  useEffect(() => {
    if (!agreed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActivePostId(entry.target.dataset.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const elements = containerRef.current.querySelectorAll('.video-post-wrapper');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, [posts, agreed]);

  const handleAgree = () => {
    setAgreed(true);
  };

  if (!agreed) {
    return (
      <div className="agree-screen">
        <h1>Welcome to Fanztik</h1>
        <p>Please agree to our terms to watch the videos.</p>
        <button onClick={handleAgree}>I Agree</button>
      </div>
    );
  }

  return (
    <div className="feed-screen" ref={containerRef}>
      {posts.map((post) => (
        <div key={post._id} data-id={post._id} className="video-post-wrapper">
          <VideoPost post={post} activePostId={activePostId} />
        </div>
      ))}
    </div>
  );
};

export default App;
