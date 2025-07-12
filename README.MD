# 🎬 YouTube Video/Audio Downloader & Merger

A full-stack project that allows users to download YouTube videos and audio, merge them, and download the final output — all from a clean React frontend and a powerful Node.js backend using `ytdl-core` and `ffmpeg`.

---

## 📁 Project Structure

YOUTUBE-DOWNLOADER/
├── Backend/
│ ├── index.js # Express server
│ ├── package.json
│ ├── Public/
│ │ ├── Audio/ # Audio files (e.g., song.mp3)
│ │ └── Video/ # Final merged videos (e.g., ytdone.mp4)
│ ├── srijonvideos.mp4 # Temp video file
│ ├── srijonmusic.webm # Temp audio file
│ └── .gitignore
│
├── Frontend/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── components/
│ │ ├── App.jsx # Main app
│ │ ├── main.jsx
│ │ ├── App.css
│ │ └── index.css
│ ├── vite.config.js
│ ├── index.html
│ └── package.json

yaml
Copy
Edit


---

## 🔧 Tech Stack

### Frontend
- React + Vite
- Fetch
- Raw Css

### Backend
- Node.js + Express
- [ytdl-core](https://www.npmjs.com/package/ytdl-core) — for downloading YouTube streams
- [fluent-ffmpeg](https://www.npmjs.com/package/fluent-ffmpeg)
- FFmpeg (installed on system)

---

## 📥 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/csrijon/youtube-downloader.git
cd youtube-downloader



Backend Setup

cd Backend
npm install

Install FFmpeg globally:

sudo apt install ffmpeg

start the backend 
node index.js

Frontend Setup 

cd ../Frontend
npm install
npm run dev

⚙️ How It Works
User enters a YouTube video URL in the React frontend.

Frontend sends a POST request to /videofetch endpoint.

Backend uses ytdl-core to download:

Video (itag 136)

Audio (itag 251 or 140)

After both streams are downloaded:

FFmpeg merges video + audio.

The output is saved in Public/Video/ytdone.mp4.

Frontend allows the user to download the merged file.

✅ Example Output Paths
Backend/Public/Video/ytdone.mp4 — merged final video

Backend/Public/Audio/song.mp3 — converted audio

Temporary files:

srijonvideos.mp4

srijonmusic.webm

📄 License
This project is licensed under the MIT License.

✍️ Author
Developed by Srijon Chowdhury
Built using passion and JavaScript 🔥