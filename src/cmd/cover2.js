module.exports.gatto = {
  name: "cover2",
  prefix: false,
  permission: false,
  desc: "Make your own fb cover (second edition) automatic",
  Coded_by: "JacovJS",
  usages: "[reply/mention]"
}
//https://free-api.chatbotcommunity.ltd/canvas/fbcoverv3?uid=100055943906136&birthday=June%2010,%202003&love=Shane&location=Phillipines&hometown=Dasmari%C3%83%C2%B1as&name=Joshua%20Sy&follow=12340&gender=male

const {get} = require("axios")
this.botStart = async function ({api, event, input}){
if (input.join().indexOf('@') !== -1){ var id = Object.keys(event.mentions) }
      else var id = input[0] || event.senderID;
      if(event.type == "message_reply") { var id = event.messageReply.senderID }
      api.sendMessage("⏳Getting Info...", event.threadID, event.messageID);
      const info = await api.getUserInfoV2(id);
      var name = info.name
      var love = info.love.name
      if (info.love == "Không Xác Định"){
      var love = "None"
      }
      var loc = info.location.name
      if (info.location == "Không Xác Định"){
      var loc = "No Hometown"
      }
      var ht = info.hometown.name
      if (info.hometown == "Không Xác Định"){
      var ht = "No Location"
      }
      var f = info.follow
  if (f == "Không Xác Định"){
    var f = "No followers"
  }
    var bday = info.birthday
  if (bday == "Không Xác Định"){
    var bday = "No Birthday"
  }
      var g = info.gender || "Unknown gender"
      api.sendMessage("🔄Generating facebook cover...", event.threadID, event.messageID);
const url = `https://free-api.ainz-sama101.repl.co/canvas/fbcoverv3?uid=${id}&birthday=${bday}&love=${love}&location=${loc}&hometown=${ht}&name=${name}&follow=${f}&gender=${g}`;
try {
  const response = await get(url, {responseType: "stream"})
  const image = response.data
  return api.sendMessage({body: `·———[ COVER ]———·
  Name: ${name}
  ID: ${id}
  Love: ${love}
  Location: ${loc}
  Hometown: ${ht}
  Followers: ${f}
  Gender: ${g}
·———[ COVER ]———·`, attachment: image}, event.threadID, event.messageID)
  } catch (e){
  return api.sendMessage("❌"+e.message, event.threadID, event.messageID)
  }
}
