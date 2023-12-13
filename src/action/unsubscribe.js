module.exports.gatto = {
  type: "log:unsubscribe",
}
const axios = require("axios"),
  fs = require("fs");
let path = __dirname+"/cache/left.png"
this['Start'] = async function({api, event}){
  
  function reply(msg){
    api.sendMessage(msg, event.threadID, event.messageID)
  }
          let {threadName, participantIDs} = await api.getThreadInfo(event.threadID);
  let tn = threadName || "Unnamed Group";
  let name = (await api.getUserInfoV2(event.logMessageData.leftParticipantFbId)).name;
if (event.logMessageData.leftParticipantFbId == api.getCurrentUserID()){ 
  const nam = (await api.getUserInfoV2(event.author)).name
  return api.sendMessage(`——[BOT LOGS]——\n\nBot has been kick to a group.\n\nName: ${tn}\n\nID: ${event.threadID}\n\nKicked by: ${nam}\n\n[ f ]: https://facebook.com/${event.author}\n\n——[BOT LOGS]——`, global.gatto.ad[0]); 
} else {
            const type = (event.author == event.logMessageData.leftParticipantFbId) ? "left the group." : "kicked by the Admin of group";
  let avt = ["https://i.imgur.com/WL4XGO1.png", "https://i.imgur.com/6h8kc9s.png", "https://i.imgur.com/k15A102.png", "https://i.imgur.com/AaDPx0e.png"]
   var avt1 = avt[Math.floor(Math.random() * avt.length)];
  let image = (
    await axios.get(`${global.gatto.api.endpoint}canvas/goodbye2?name=${name}&uid=${event.logMessageData.leftParticipantFbId}&bg=${avt1}.png&member=${participantIDs.length}`, {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(path, Buffer.from(image, "utf-8"));
            reply({body: name+" has been " + type+"\n"+tn+" now has have "+participantIDs.length+" members left.", attachment: fs.createReadStream(path)}, () => fs.unlinkSync(path))
   } 
  if (global.gatto.antiout == true){
api.addUserToGroup(event.logMessageData.leftParticipantFbId, event.threadID, (error, info) => {
   if (error) {
    api.sendMessage(`I can't re-add ${name} to group ${tn}`, event.threadID)
   } else api.sendMessage(`${name} has been re-added to this group.`, event.threadID);
  })
     }
}
