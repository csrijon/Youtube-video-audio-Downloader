import React from "react";
import "./DownloadMusic.css";

const DownloadMusic = () => {
  return (
    <section className="download-wrapper">
      <header className="download-header">
        <h2 className="download-title">🎵 Download Your MP3</h2>
      </header>

      <article className="download-info">
        <img
          src="https://via.placeholder.com/80"
          alt="Song Thumbnail"
          className="song-thumbnail"
        />
        <div className="song-meta">
          <h3 className="song-title">Blinding Lights</h3>
          <p className="song-artist">The Weeknd</p>
        </div>
      </article>

      <div className="file-info">
        <p className="file-name">File: blinding-lights.mp3</p>
      </div>

      <footer>
        <a href="#" download className="download-button">
          ⬇️ Download MP3
        </a>
      </footer>
    </section>
  );
};

export default DownloadMusic;
