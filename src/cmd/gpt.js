const axios = require("axios");
const cheerio = require("cheerio");
module.exports.gatto = {
  name: "gpt",
  prefix: false,
  permission: false,
  desc: "Ask ChatGPT",
  usages: "[ask]",
  Coded_by: "JacovJS"
}
this['botStart'] = async function ({api, event, input}){
  const name = (await api.getUserInfoV2(event.senderID)).name;
  if (!input.join(" ")) return api.sendMessage("Hi "+name+" how can I assist you today?", event.threadID, event.messageID);
  api.sendMessage(`🔍 ${input.join(" ")}`, event.threadID, event.messageID);
  const response = await axios.get('https://chatgpt.ai/');
  const $ = cheerio.load(response.data);
  const nonce = $('[data-nonce]').attr('data-nonce');
  const post_id = $('[data-post-id]').attr('data-post-id');
  const bot_id = $('[data-bot-id]').attr('data-bot-id');

  const headers = {
    'authority': 'chatgpt.ai',
    'origin': 'https://chatgpt.ai',
    'pragma': 'no-cache',
    'referer': 'https://chatgpt.ai/gpt-4/',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
  };
  
  const data = new URLSearchParams();
  data.append('_wpnonce', nonce);
  data.append('post_id', post_id);
  data.append('url', 'https://chatgpt.ai/gpt-4');
  data.append('action', 'wpaicg_chat_shortcode_message');
  data.append('message', input.join(" "));
  data.append('bot_id', bot_id);

  try {
    const response = await axios.post('https://chatgpt.ai/wp-admin/admin-ajax.php', data, { headers });
    const responseData = response.data;
    
    if (responseData && responseData.data) {
      api.sendMessage(responseData.data, event.threadID, event.messageID);
    } else {
      api.sendMessage("No respond.", event.threadID, event.messageID);
    }
  } catch (error) {
    api.sendMessage("Error: "+error.message, event.threadID, event.messageID);
  }
}
