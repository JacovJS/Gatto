module.exports.gatto = {
  name: "dl",
  desc: "Download",
  prefix: true,
  permission: false,
  usages: "[]",
  Coded_by: "JacovJS"
}

this.botStart = async function ({api, event, input}){
  const a = require("axios"),
    fs = require("fs");
  const dl = require("@xaviabot/fb-downloader");
  if(!input[0]) return api.sendMessage("Missing url!", event.threadID, event.messageID);
  const path = __dirname+"/cache/vid.mp4"
  const url = input[0]
  const process = `Processing time: ${Date.now() - event.timestamp}ms`;
/*const regex = /https:\/\/www\.facebook\.com\/\S+/;
const match = input[0].match(regex);
const url = match ? match[0] : null;
  if (!match) return api.sendMessage("Please provide a valid URL", threadID, messageID);*/
  try {
    api.sendMessage("⏳Downloading....", event.threadID, event.messageID);
  const result = await dl(url)
  let video = await a.get(encodeURI(result.sd),{ 
    responseType: 'arraybuffer'
  });
const vid = video.data;
    fs.writeFileSync(path, Buffer.from(vid))
    //api.sendMessage(process, event.threadID, event.messageID);
  return api.sendMessage({attachment: fs.createReadStream(path)}, event.threadID, event.messageID)
  } catch (e){
    return api.sendMessage("Error: "+e.message, event.threadID, event.messageID)
  }
}
