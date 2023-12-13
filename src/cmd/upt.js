module.exports.gatto = {
  name: "upt",
  desc: "Get uptime",
  Coded_by: "Deku",
  permission: false,
  prefix: false,
  usages: "[]"
}
this['botStart'] = async function ({api, event}){
const time = process.uptime(),
a = Math.floor(time / (60 * 60)),
b = Math.floor((time % (60 * 60)) / 60),
c = Math.floor(time % 60);
api.sendMessage(a+":"+b+":"+c, event.threadID, event.messageID)
}

//CODED BY DEKU (@Joshai)
