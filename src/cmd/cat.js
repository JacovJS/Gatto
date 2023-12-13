const axios = require("axios");
module.exports.gatto = {
   name: "cat",
   desc: "AI powered by CatGPT😸",
   usages: "[ask]",
   prefix: false,
   permission: false,
   Coded_by: "JacovJS"
};

exports.botStart = async function({ api, event, input }){
let q = input.join(" ");
if (!q) return api.sendMessage("Missing input meow😸", event.threadID, event.messageID);
try {
  api.sendMessage("🔎😼Meowing...", event.threadID, event.messageID);
const response = await axios.post("https://catgpt.guru/api/chat", {
      messages: [
        {
          role: "user",
          content: q,
        },
      ],
    });
   return api.sendMessage(response.data, event.threadID, event.messageID);
   } catch (e){
  return api.sendMessage(e.message, event.threadID, event.messageID)
  }
}
