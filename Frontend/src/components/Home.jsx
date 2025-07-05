import React from 'react';
import './Home.css';
import logo from '../assets/srijon.jpeg'; // optional image

const Home = () => {
  return (
    <section className="home-section">
      <div className="home-container">
        <div className="home-content">
          <h1 className="fade-up">🚀 YT Fetch</h1>
          <p className="fade-up delay-1">
            The easiest way to download YouTube videos or extract high-quality audio. Choose your format, pick your quality, and get your content in seconds.
          </p>
          <a href="/download" className="cta-button fade-up delay-2">Start Downloading</a>
        </div>

        <div className="home-image fade-up delay-3">
          <img src={logo} alt="Downloader preview" />
        </div>
      </div>

      <div className="features-wrapper">
        <h2 className="fade-up">💡 Why Choose YT Fetch?</h2>
        <div className="features-grid">
          <div className="feature-card fade-up delay-1">
            <h3>🎵 Audio Extract</h3>
            <p>Convert any YouTube video into clean, high-quality MP3 audio within seconds.</p>
          </div>
          <div className="feature-card fade-up delay-2">
            <h3>📺 Video Quality Control</h3>
            <p>Select from a range of resolutions – 1080p, 720p, 480p and more – to suit your needs.</p>
          </div>
          <div className="feature-card fade-up delay-3">
            <h3>⚡ Fast & Free</h3>
            <p>Just paste the link and click – no signup, no limits, 100% free to use.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
