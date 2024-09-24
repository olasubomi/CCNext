import fs from "fs";
import path from "path";
import ytdl from "@distube/ytdl-core";
// import youtubedl from 'youtube-dl-exec';
import axios from "axios";
import instagramDl from "@sasmeee/igdl";

const { URL } = require("url");

const TEMP_DIR = path.join(__dirname, "temp");

const downloadVideo = async (videoUrl, filename) => {
  const response = await axios.get(videoUrl, { responseType: "stream" });
  const filePath = path.join(TEMP_DIR, filename);
  response.data.pipe(fs.createWriteStream(filePath));

  return new Promise((resolve, reject) => {
    response.data.on("end", () => resolve(filePath));
    response.data.on("error", reject);
  });
};

export default async (req, res) => {
  try {
    console.log(req.method, req.body, "payload");
    let buffer = "";
    if (!fs.existsSync(TEMP_DIR)) {
      fs.mkdirSync(TEMP_DIR);
    }
    if (req.file) {
      buffer = req.file.buffer;
    } else if (req.body.url) {
      const { url } = req.body;
      const videoURL = new URL(url);
      const file_name = `File-${Math.floor(Math.random() * 1000000)}.mp4`;
      const filePath = path.join(TEMP_DIR, file_name);

      if (
        videoURL.hostname.includes("youtube.com") ||
        videoURL.hostname.includes("youtu.be")
      ) {
        if (!ytdl.validateURL(url)) {
          return res.status(400).json({ error: "Invalid YouTube URL" });
        }
        console.log("extracting");
        // const promise = await youtubedl(url, { dumpSingleJson: true })
        // const _url = Array.isArray(promise?.requested_formats) && promise.requested_formats.length >= 1 && promise.requested_formats[1]?.hasOwnProperty("url") && promise.requested_formats[1]?.url;
        // if (!_url) throw new Error("Unable to extract video from url")
        // await downloadVideo(_url, file_name);
        // const videoFile = fs.readFileSync(filePath)
        // buffer = videoFile
        // fs.unlinkSync(filePath);
      } else if (videoURL.hostname.includes("instagram.com")) {
        const dataList = await instagramDl(url);
        await downloadVideo(dataList[0]?.download_link, file_name);
        const videoFile = fs.readFileSync(filePath);
        buffer = videoFile;
        fs.unlinkSync(filePath);
      } else {
        return res.status(400).json({ error: "Unsupported video platform" });
      }
    }

    res.status(200).json({
      filePath,
    });
  } catch (e) {
    console.log(e);
  }
};
