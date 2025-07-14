import React, { useState, useRef } from 'react';
import birds from "../assets/birds.jpg"
import './VideoDownloader.css';

const VideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [music, updatemusicurl] = useState(false);
  const [loading, setLoading] = useState(false);
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
      updatemusicurl(false)
      const videoresponse = await fetch(videofetchurl, requestOptions);
      const videodata = await videoresponse.json();
      console.log('Fetched audio data:', videodata);
      updatemusicurl(true)
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
          <button className="video-fetch-btn" onClick={fetchvideoclick}>
            Fetch Audio
          </button>

          {loading && (
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span className="loader"></span>
              <p style={{ color: "#e5e7eb", marginTop: "12px" }}>Please wait, fetching video...</p>
            </div>
          )}

        </div>
      </div>
      {music && (
        <div className="download-section"> {/* ✅ Wrapper added */}
          <div className="music-download-card">
            <h3 className="music-label">🎧 MP3 is Ready!</h3>
            <div className="music-box">
              <div className="music-info">
                <img
                  src={birds}
                  alt="thumbnail"
                  className="music-thumbnail"
                />
                <div>
                  <p className="music-title">Your Downloaded Song</p>
                  <p className="music-filename">song.mp3</p>
                </div>
              </div>
            <a
  href="#"
  className="download-music-btn"
  onClick={(e) => {
    e.preventDefault();

    const button = e.currentTarget;
    button.textContent = "Preparing music..."; // User feedback

    setTimeout(() => {
      window.location.href = "http://localhost:3000/download";
      button.textContent = "Download Music"; // Optional reset if user cancels
    }, 5000); // 2 second delay
  }}
>
  Download Music
</a>


            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoDownloader;
