import React, { useState } from 'react';
import './Downloader.css';

const Downloader = () => {
  const [url, setUrl] = useState('');
  const [type, setType] = useState('audio');

  return (
    <div className="downloader-wrapper">
      <div className="downloader-card">
        <h1 className="downloader-title">🎵 YouTube Video and Audio Downloader</h1>

        <input
          type="text"
          placeholder="Paste YouTube URL here..."
          className="url-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="type-buttons">
          <button
            className={type === 'audio' ? 'type-btn active' : 'type-btn'}
            onClick={() => setType('audio')}
          >
            Audio
          </button>
          <button
            className={type === 'video' ? 'type-btn active' : 'type-btn'}
            onClick={() => setType('video')}
          >
            Video
          </button>
        </div>

        <button
          className="fetch-btn"
          onClick={() => alert(`Fetching ${type} from URL: ${url}`)}
        >
          Fetch {type === 'audio' ? 'Audio' : 'Video'}
        </button>
      </div>
    </div>
  );
};

export default Downloader;
