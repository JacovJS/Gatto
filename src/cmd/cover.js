module.exports.gatto = {
  name: "cover",
  prefix: false,
  permission: false,
  desc: "Make your own fb cover",
  Coded_by: "Deku",
  usages: "[name | submame | color | address | email | cp no.]"
}
const {get} = require("axios")
this.botStart = async function ({api, event, input}){
  const content = input.join(" ").split("|").map(item => item = item.trim());
if (!input[0]) return api.sendMessage("Missing input", event.threadID, event.messageID);
let name = content[0]
let id = event.senderID
let subname = content[1]
let color = content[2] || "white"
let address = content[3]
let email = content[4]
let cpnum = content[5]
  if (!input[0] || !name || !subname || !address|| !email || !cpnum) return api.sendMessage("Wrong format\nUse: "+global.gatto.prefix+this.gatto.name+" "+this.gatto.usages, event.threadID, event.messageID);
  api.sendMessage("⏳Generating...", event.threadID, event.messageID)
const url = `https://free-api.chatbotcommunity.ltd/canvas/fbcover?name=${name}&color=${color}&address=${address}&email=${email}&subname=${subname}&sdt=${cpnum}&uid=${id}`;
try {
  const response = await get(url, {responseType: "stream"})
  const image = response.data
  return api.sendMessage({body: `·——[ FB COVER ]——·
  Name: ${name}
  ID: ${id}
  Subname: ${subname}
  Color: ${color}
  Address: ${address}
  Email: ${email}
  Mobile no.: ${cpnum}`, attachment: image}, event.threadID, event.messageID)
} catch (e){
  return api.sendMessage("❌"+e.message, event.threadID, event.messageID)
  }
}

//CODED BY DEKU (@Joshai)
