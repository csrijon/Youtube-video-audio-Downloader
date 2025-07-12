import express from "express";
import cors from "cors";
import ytdl from "@distube/ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { on } from "events";

// __dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("Public"))

app.post("/songfetch", async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ message: "No URL provided" });
  }

  const outputPath = path.join(__dirname,"song.mp3");

  try {
    // Delete old file if exists
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }

    // ✅ Use high-quality audio stream (itag 251 = webm+opus)
    const audioStream = ytdl(url, { quality: "251" }); // Opus 160 kbps

    ffmpeg(audioStream)
      .audioCodec("libmp3lame")
      .format("mp3")
      .audioBitrate("128k")
      .on("start", () => {
        console.log("🎧 Conversion started...");
      })
      .on("end", () => {
        console.log("✅ Audio saved as output.mp3");
      })
      .on("error", (err) => {
        console.error("❌ FFmpeg error:", err.message);
      })
     .save(path.join(__dirname, "Public", "Audio", "song.mp3"));
    res.status(200).json({
      message: "Audio conversion started. Check output.mp3 after a while.",
      url: "http://localhost:3000/Audio/song.mp3"
    });

  } catch (err) {
    console.error("❌ Server error:", err.message);
    res.status(500).json({ message: "Conversion failed." });
  }
});

app.get("/download", (req, res) => {
  const filePath = path.join(__dirname, "Public", "Audio", "song.mp3");
  res.download(filePath, "song.mp3", (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(500).send("Download failed");
    }
  });
});
app.post("/videofetch", (req, res) => {
  const { videourlvalue, videoqualityvalue } = req.body;
  console.log(videoqualityvalue, videourlvalue);

  const output = fs.createWriteStream("srijonvideos.mp4");
  const songoutput = fs.createWriteStream("srijonmusic.mp3")

 const videostrems = ytdl(videourlvalue, { quality:"137" })
 const audiomusic =   ytdl(videourlvalue, {quality:"251"})
    videostrems.pipe(output)
   audiomusic.pipe(songoutput)
    .on("finish", () => {
      console.log("✅ Download complete");
      res.send("✅ Video downloaded successfully");
    })
    .on("error", (err) => {
      console.error("❌ Error occurred:", err);
      res.status(500).send("❌ Failed to download video");
    });
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
