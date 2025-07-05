import React, { useState, useRef } from 'react';
import './AudioDownloader.css';

const AudioDownloader = () => {
  const [url, setUrl] = useState('');
  const urlref = useRef(null);

  const fetchmp3click = () => {
    const urlValue = urlref.current.value;
    console.log("Fetching MP3 for URL:", urlValue);
    urlref.current.value = '';
    setUrl('');
    // You can add routing or API call here
  };

  return (
    <div className="audio-wrapper">
      <div className="audio-card">
        <h1 className="audio-title">🎵 YouTube Audio Downloader</h1>

        <input
          type="text"
          ref={urlref}
          placeholder="Paste YouTube URL here..."
          className="audio-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          className="audio-fetch-btn"
          onClick={fetchmp3click}
        >
          Fetch MP3
        </button>

        <div className="audio-features">
          <h3>✨ Features</h3>
          <ul>
            <li>Download high-quality audio from YouTube links.</li>
            <li>Fast and reliable conversion process.</li>
            <li>No signup required – it's free and easy!</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AudioDownloader;
