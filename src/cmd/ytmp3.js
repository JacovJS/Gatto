module.exports.gatto = {
  name: "sing",
  prefix: true,
  permission: false,
  desc: "Play a music via title",
  usages: "[title]",
  Coded_by: "JacovJS"
}
//package
const usetube = require('usetube');
const ytdl = require('ytdl-core');
const fs = require('fs');
this.botStart = async function ({ api, event, input }) {
var txt = input.join(' ');
  if (!txt) return api.sendMessage("Missing title of song to execute", event.threadID, event.messageID)
  try{
    api.sendMessage("Getting the video ID...", event.threadID, event.messageID);
    const random = Math.floor(Math.random() * 2) + 1;
  const res = await usetube.searchVideo(txt);
var ok = res.videos[random]
  const stream = ytdl("https://www.youtube.com/watch?v="+ok.id, { filter: 'audioonly' });
    api.sendMessage("Downloading your request...", event.threadID, event.messageID);
      const path = `${__dirname}/cache/song.mp3`; stream.pipe(fs.createWriteStream(path)).on('finish', () => {
        api.sendMessage({body: "Here's your request!\nTitle: "+ok.title+"\nDuration: "+ok.duration+"\nPublished at "+ok.publishedAt, attachment: fs.createReadStream(path)}, event.threadID, () => fs.unlinkSync(path), event.messageID);
      });
} catch (e){
    return api.sendMessage("Error: "+e.message, event.threadID, event.messageID)
}
}
