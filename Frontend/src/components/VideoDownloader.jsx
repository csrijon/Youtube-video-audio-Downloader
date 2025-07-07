import React, { useState, useRef } from 'react';
import './VideoDownloader.css';

const VideoDownloader = () => {
  const [url, setUrl] = useState('');
  const [music, updatemusicurl] = useState('');
  const [quality, setQuality] = useState('720p');
  const videoRef = useRef(null);
  const videourlref = useRef(null);

  const fetchvideoclick = async () => {
    const videoquality = videoRef.current.value;
    console.log('Selected quality:', videoquality);

    const videourl = videourlref.current.value;
    console.log('Video URL:', videourl);

    if (!videourl) {
      console.log("Video URL is not found");
      return;
    }

    const videovalue = {
      url: videourl,
      // quality: videoquality,
    };

    const videofetchurl = "http://localhost:3000/songfetch";
    const requestOptions = {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(videovalue),
    };

    try {
      const videoresponse = await fetch(videofetchurl, requestOptions);
      const videodata = await videoresponse.json()
      updatemusicurl(videodata.url)

      console.log('Fetched video data:', videodata);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  return (
    <>
      <div className="video-wrapper">
        <div className="video-card">
          <h1 className="video-title">📺 YouTube Video Downloader</h1>

          <input
            type="text"
            placeholder="Paste YouTube URL here..."
            className="video-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            ref={videourlref}
          />

          <select
            className="quality-select"
            value={quality}
            onChange={(e) => setQuality(e.target.value)}
            ref={videoRef}
          >
            <option value="1080p">137</option>
            <option value="720p">22</option>
            <option value="480p">135</option>
            <option value="360p">18</option>
          </select>

          <button
            className="video-fetch-btn"
            onClick={fetchvideoclick}
          >
            Fetch Video
          </button>
          <a href={music}></a>
        </div>
      </div>

      {music && (
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
      )}
    </>
  );
};

export default VideoDownloader;
