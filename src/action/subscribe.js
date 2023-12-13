module['exports']['gatto'] = {
  type: "log:subscribe"
};
this['Start'] = async function({ api, event }) {
  const { threadID } = event;
 let { threadName, participantIDs, imageSrc } = await api.getThreadInfo(threadID);
const fs = require("fs");
const axios = require("axios");
const request = require("request");
  function reply(data) {       api.sendMessage(data, event.threadID, event.messageID);
}
            if (event.logMessageData.addedParticipants.some(i => i.userFbId == api.getCurrentUserID())) {
const nam = (await api.getUserInfoV2(event.author)).name
api.changeNickname(`${global.gatto.name} • [ ${global.gatto.prefix} ]`, event.threadID, api.getCurrentUserID());
             reply( `${global.gatto.name} connected successfully!\nType "${global.gatto.prefix}help" to view all commands\n\nContact the admin if you encounter an error.`);
        /*---LOGS---*/
return api.sendMessage(`——[BOT LOGS]——\n\nBot has been added to a group.\n\nName: ${threadName || "Unnamed Group"}\n\nID: ${event.threadID}\n\nTotal of members: ${participantIDs.length}\n\nAdded by: ${nam}\n\n[ f ]: https://facebook.com/${event.author}\n\n——[BOT LOGS]——`, global.gatto.ad[0]);
            } else {
                try {
let addedParticipants1 = event.logMessageData.addedParticipants;
                    for (let newParticipant of addedParticipants1) {
     let userID = newParticipant.userFbId
         const name = (await api.getUserInfoV2(userID)).name
let paths = __dirname+"/cache/welcome.png";
if (userID !== api.getCurrentUserID()) {
                                
let avt = ["https://i.imgur.com/WL4XGO1.png", "https://i.imgur.com/6h8kc9s.png", "https://i.imgur.com/k15A102.png", "https://i.imgur.com/AaDPx0e.png"]
   var avt1 = avt[Math.floor(Math.random() * avt.length)];
        let im = (
    await axios.get(`${global.gatto.api.endpoint}canvas/welcome?uid=${userID}&name=${name}&bg=${avt1}&namegc=${threadName || "This Group"}&member=${participantIDs.length}`, {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(paths, Buffer.from(im, "utf-8"));
  return reply({ body: `Hello ${name}\nWelcome to ${threadName || "This Group"}\nYou're the ${participantIDs.length}th member on this group.\nEnjoy!`, attachment: fs.createReadStream(paths)}, () => fs.unlinkSync(paths))  
}
                        
                    }
                } catch (err) {
                     console.log("ERROR: " + err.message);
                }
                                  }
                }
