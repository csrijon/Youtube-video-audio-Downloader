import express from "express";
import cors from "cors";
import ytdl from '@distube/ytdl-core';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello i am a noob");
});
app.post("/Videofetch", async (req, res) => {
  const { url } = req.body;
  console.log("Received URL:", url);

  const folderPath = path.join(__dirname, 'video');
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  const filePath = path.join(folderPath, `${Date.now()}.mp4`);
  try {
    const streamvideo = ytdl(url, {
      quality: "18",
      filter: 'audioandvideo',
    });

    streamvideo.pipe(fs.createWriteStream(filePath));

    res.status(200).json({
      message: "Video is being downloaded",
      filePath: filePath,
    });
  } catch (error) {
    console.error("Error downloading video:", error);
    res.status(500).json({ message: "Failed to download video" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
