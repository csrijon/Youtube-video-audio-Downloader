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

  const outputPath = path.join(__dirname, "song.mp3");

  try {
    // Delete old file if exists
    if (fs.existsSync(outputPath)) {
      fs.unlinkSync(outputPath);
    }

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
  const { videourlvalue,videoqualityvalue } = req.body;

  const videoPath = "srijonvideos.mp4";
  const audioPath = "srijonmusic.webm";
  const outputPath = path.join("Public", "Video", "ytdone.mp4");

  let isVideoDone = false;
  let isAudioDone = false;

  const checkAndMerge = () => {
    if (isVideoDone && isAudioDone) {
      const outputDir = path.join("Public", "Video");

      //  Ensure output directory exists
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      ffmpeg()
        .input(videoPath)
        .input(audioPath)
        .videoCodec("copy")
        .audioCodec("aac")
        .outputOptions("-b:a", "128k")
        .outputOptions("-shortest")
        .on("end", () => {
          console.log("✅ Merge done");
          res.status(200).json({
            message: "Viddeo conversion started. Check output.mp4 after a while.",
            url: "http://localhost:3000/Video/ytdone.mp4"
          }
          )
        })
        .on("error", (err) => {
          console.error("❌ Merge error:", err);
          res.status(500).send("❌ Merge failed");
        })
        .save(outputPath);
    }
  };

  // ✅ Step 1: Download video
  const videoStream = fs.createWriteStream(videoPath);
  ytdl(videourlvalue, { quality: "299" }) 
    .on("error", (err) => {
      console.error("❌ Video error:", err);
      res.status(500).send("❌ Video download failed");
    })
    .pipe(videoStream)
    .on("finish", () => {
      console.log("✅ Video download complete");
      isVideoDone = true;
      checkAndMerge();
    });

  // ✅ Step 2: Download audio
  const audioStream = fs.createWriteStream(audioPath);
  ytdl(videourlvalue, { quality: "251" }) // Best Opus audio stream (webm)
    .on("error", (err) => {
      console.error("❌ Audio error:", err);
      res.status(500).send("❌ Audio download failed");
    })
    .pipe(audioStream)
    .on("finish", () => {
      console.log("✅ Audio download complete");
      isAudioDone = true;
      checkAndMerge();
    });
});


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
