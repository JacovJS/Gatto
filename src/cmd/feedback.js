module.exports.gatto = {
  name: "feedback",
  desc: "Feedback",
  Coded_by: "JacovJS",
  usages: "[feedback]", // Make sure this line is present and has a valid value
  permission: false,
  prefix: true 
}

this['botStart'] = async function ({api, event, input}){
  if (!input[0]) return api.sendMessage("Please enter your feedback", event.threadID, event.messageID);
  if(input.join(" ").length > 60) return api.sendMessage("Feedback is too long!", event.threadID, event.messageID);
  var tn = threadName
if (threadName == null){
   var tn = "Unnamed Group"
}
const m = require("moment-timezone");
var time = m.tz("Asia/Manila").format("HH:mm:ss DD/MM/YYYY");
  //const msg = "";
  for (let i of global.gatto.ad){
    const res = await api.getUserInfo(event.senderID);
   // const resp = await api.getUserInfo(i)
    //var namee = resp.name;
    var name = res.name;
    api.sendMessage("Feedback from "+name+": "+input.join(" ")+"\nFrom Group: "+tn+"\nAt "+time, i);
 return api.sendMessage("Feedback Sent!", event.threadID, event.messageID)
  }
}
