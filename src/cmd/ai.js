module.exports.gatto = {
  name: "ai",
  usages: "[ask]",
  permission: false,
  prefix: false,
  Coded_by: "JacovJS",
  desc: "AI powered by Blackbox"
}
this.botStart = async function({api, event, input}){
  const axios = require("axios");
  let t = input.join(" ");
  let tid = event.threadID,
    mid = event.messageID;
  if (!t) return api.sendMessage("Missing input!", tid, mid);
  api.sendMessage(`🔍 "${t}" …`, tid, mid)
  try {
      const url = 'https://useblackbox.io/chat-request-v4';
  const data = {
    textInput: t,
    allMessages: [{ user: t }],
    stream: '',
    clickedContinue: false,
  };

    const response = await axios.post(url, data);
    const message = response.data.response[0][0];
    api.sendMessage(`${message}`, tid, mid);
  } catch (error) {
    api.sendMessage('An error occurred while fetching the response from AI.', tid, mid);
  }
}
