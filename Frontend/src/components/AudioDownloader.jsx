import React, { useState, useRef } from 'react';
import './AudioDownloader.css';

const AudioDownloader = () => {
  const [url, setUrl] = useState('');
   const [quality, setQuality] = useState('720p');
  const urlref = useRef(null);

  const fetchmp3click = async () => {
    const urlValue = urlref.current.value;
    console.log("Fetching MP3 for URL:", urlValue);
  };

  return (
    <div className="audio-wrapper">
      <div className="audio-card">
        <h1 className="audio-title">🎵 YouTube Video Downloader</h1>

        <input
          type="text"
          ref={urlref}
          placeholder="Paste YouTube URL here..."
          className="audio-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

         <select
            className="quality-select"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            // ref={videoRef}
          >
            <option value="1080p">18</option>
            <option value="720p">22</option>
            <option value="480p">37</option>
            <option value="360p">59</option>
          </select>

        <button
          className="audio-fetch-btn"
          onClick={fetchmp3click}
        >
          Fetch Video
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
