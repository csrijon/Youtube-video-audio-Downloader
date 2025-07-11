import React, { useState, useRef } from 'react';
import './AudioDownloader.css';

const AudioDownloader = () => {
  const [url, setUrl] = useState('');
   const [quality, setQuality] = useState('720p');
  const urlref = useRef(null);
  const videoref = useRef(null)

const fetchmp3click = async () => {
  const urlValue = urlref.current.value;
  const videovalue = videoref.current.value;

  if (!urlValue || !videovalue) {
    console.log("Please provide both URL and video quality.");
    return;
  }

  const dataToSend = {
    videourlvalue: urlValue,
    videoqualityvalue: videovalue
  };

  const videourl = "http://localhost:3000/videofetch";
  const videooption = {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(dataToSend)
  };

  try {
    const response = await fetch(videourl, videooption);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const result = await response.json();
    console.log(result);
  } catch (error) {
    console.log("hello", error);
  }
  console.log("Fetching MP3 for URL:", urlValue, videovalue);
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
            ref={videoref}
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
