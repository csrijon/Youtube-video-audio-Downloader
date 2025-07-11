import React, { useState, useRef } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import './VideoDownloader.css';

const VideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [music, updatemusicurl] = useState('');
  // const [quality, setQuality] = useState('720p');
  const [loading, setLoading] = useState(false);
  // const videoRef = useRef(null);
  const videourlref = useRef(null);

  const fetchvideoclick = async () => {
    const videourl = videourlref.current.value;
    console.log('Video URL:', videourl);

    if (!videourl) {
      console.log("Video URL is not found");
      return;
    }

    const videovalue = { url: videourl };

    const videofetchurl = "http://localhost:3000/songfetch";
    const requestOptions = {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(videovalue),
    };

    try {
      setLoading(true);
      const videoresponse = await fetch(videofetchurl, requestOptions);
      const videodata = await videoresponse.json();
      updatemusicurl(videodata.url);
      console.log('Fetched video data:', videodata);
    } catch (error) {
      console.error("Error fetching video:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="video-wrapper">
        <div className="video-card">
          <h1 className="video-title">📺 YouTube Music Downloader</h1>

          <input
            type="text"
            placeholder="Paste YouTube URL here..."
            className="video-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            ref={videourlref}
          />

          {/* <select
            className="quality-select"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            ref={videoRef}
          >
            <option value="1080p">137</option>
            <option value="720p">22</option>
            <option value="480p">135</option>
            <option value="360p">18</option>
          </select> */}

          <button className="video-fetch-btn" onClick={fetchvideoclick}>
            Fetch Audio
          </button>

          {loading && (
            <div style={{ marginTop: "20px" }}>
              <ClipLoader color="#3b82f6" size={36} />
              <p style={{ color: "#e0f2fe", marginTop: "8px" }}>Converting to MP3...</p>
            </div>
          )}

          <a href={music}></a>
        </div>
      </div>
{music && (
  <div className="download-section"> {/* ✅ Wrapper added */}
    <div className="music-download-card">
      <h3 className="music-label">🎧 MP3 is Ready!</h3>
      <div className="music-box">
        <div className="music-info">
          <img
            src="https://via.placeholder.com/60"
            alt="thumbnail"
            className="music-thumbnail"
          />
          <div>
            <p className="music-title">Your Downloaded Song</p>
            <p className="music-filename">song.mp3</p>
          </div>
        </div>
        <a
          href="http://localhost:3000/download"
          className="download-music-btn"
          download
        >
          ⬇️ Download MP3
        </a>
      </div>
    </div>
  </div>
)}

    </>
  );
};

export default VideoDownloader;
