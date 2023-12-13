module.exports.gatto = {
  name: "getid",
  desc: "Get id of facebook profile",
  Coded_by: "JacovJS",
  usages: "[]",
  permission: false,
  prefix: false
}
const k = require('get-fbid');
//k('google');
this.botStart = async function({ api, event, input }) {
  let t = input[0]
  if (!t) return api.sendMessage("Missing facebook profile link.", event.threadID, event.messageID);
  const result = await k(t)
  return api.sendMessage(result, event.threadID, event.messageID)
}
