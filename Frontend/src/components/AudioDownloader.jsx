import React, { useState, useRef } from 'react';
import './AudioDownloader.css';

const AudioDownloader = () => {
  const [url, setUrl] = useState('');
  const [videoReady, setVideoReady] = useState(false);
  const [quality, setQuality] = useState('720p');
  const [loading, setLoading] = useState(false);
  const urlref = useRef(null);
  const videoref = useRef(null);

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

    const videourl = "https://youtube-video-audio-downloader-1.onrender.com/videofetch";
    const videooption = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataToSend)
    };

    try {
      setLoading(true);
      setVideoReady(false)
      const response = await fetch(videourl, videooption);
      setUrl('');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log("✅ Fetch success:", result);
      setVideoReady(true);
    } catch (error) {
      console.error(" Fetch error:", error);
    } finally {
      setLoading(false);
    }

    console.log("Fetching video for:", urlValue, videovalue);
  };

  return (
    <div className="audio-wrapper">
      <div className="audio-card">
        <h1 className="audio-title">🎬 YouTube Video Downloader</h1>

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
          <option value="133">240p - 30fps (itag 133)</option>
          <option value="134">360p - 30fps (itag 134)</option>
          <option value="135">480p - 30fps (itag 135)</option>
          <option value="136">720p - 30fps (itag 136)</option>
          <option value="137">1080p - 30fps (itag 137)</option>
          <option value="160">144p - 30fps (itag 160)</option>
          <option value="264">1440p - 30fps (itag 264)</option>
          <option value="266">2160p (4K) - 60fps (itag 266)</option>
          <option value="298">720p - 60fps (itag 298)</option>
          <option value="299">1080p - 60fps (itag 299)</option>
        </select>

        <button className="audio-fetch-btn" onClick={fetchmp3click}>
          Fetch Video
        </button>

        {loading && (
          <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span className="loader"></span>
            <p style={{ color: "#e5e7eb", marginTop: "12px" }}>Please wait, fetching video...</p>
          </div>
        )}
        {videoReady && (
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <a
              href="https://youtube-video-audio-downloader-1.onrender.com/videodownload"
              className="download-btn"
              download
            >
              ⬇️ Download Merged Video
            </a>
          </div>
        )}

        <div className="audio-features">
          <h3>✨ Features</h3>
          <ul>
            <li>Paste a YouTube video link, check the available qualities, and select your preferred resolution.</li>
            <li><strong>Common itags:</strong> 133=240p, 134=360p, 135=480p, 136=720p, 137=1080p</li>
            <li>Supports high-quality, video-only adaptive streams.</li>
            <li>Server-side merging ensures optimized quality and speed.</li>
            <li>No signup required – it's free and easy to use!</li>
          </ul>
        </div>
      </div>
    </div>

  );
};

export default AudioDownloader;
