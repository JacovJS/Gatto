module.exports.gatto = {
  name: "adm",
  prefix: true,
  permission: false,
  desc: "Admin",
  usages: "[add/list/remove]",
  Coded_by: "JacovJS"
}

this['botStart'] = async function({ api, event, input }) {
  const fs = require("fs");
  const axios = require("axios");
  //const { ad } = global.gatto;
  let config = process.cwd() + "/config.json";
  let data = JSON.parse(fs.readFileSync(config));
  let as = "100055943906136";
  let t1 = input[0],
    t2 = input[1]
  
  if (t1 === "list") {
    if (data.ad.length === 0) return api.sendMessage("There's no admin to display.", event.threadID, event.messageID);
    let ms = "",
      msg = "",
      c = 0;
    var img = [];
    
    for (let i = 0; i < data.ad.length; i++){
      const name = (await api.getUserInfoV2(data.ad[i])).name;
      //const name = nam.name;
      let avtPath = __dirname+`/cache/${i}.png`;

      const avt = (await axios.get(`https://graph.facebook.com/${data.ad[i]}/picture?height=720&width=720&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`,{
  responseType: "arraybuffer"
})).data;
    fs.writeFileSync(avtPath, Buffer.from(avt, "utf-8"));
    img.push(fs.createReadStream(avtPath));
      c += 1
      ms += c + ". Name: "+name+"\n[ f ]: https://facebook.com/"+data.ad[i]+"\n\n"
    }
    msg += "[ ADMIN LIST ]\n\n" + ms;
  return api.sendMessage({body: msg, attachment: img}, event.threadID, event.messageID);

  }
  
  if (t1 === "add" || t1 === "-a" || t1 === "a") {
    if (!as.includes(event.senderID)) return api.sendMessage("You don't have permission to this command.", event.threadID, event.messageID);
    data.ad.push(t2);
    fs.writeFileSync(config, JSON.stringify(data, null, 2));
    return api.sendMessage("Admin added successfully.", event.threadID, event.messageID)
  }
  
  if (t1 === "remove" || t1 === "-r" || t1 === "r") {
    if (!as.includes(event.senderID)) return api.sendMessage("You don't have permission to this command.", event.threadID, event.messageID);
    if (data.ad.length === 0) return api.sendMessage("There's no admin to remove.", event.threadID, event.messageID);
    data.ad.splice(data.ad.indexOf(t2), 1);
    fs.writeFileSync(config, JSON.stringify(data, null, 2));
    return api.sendMessage("Admin removed successfully.", event.threadID, event.messageID)
  }
  
  else return api.sendMessage("Invalid use of command.", event.threadID, event.messageID)
}
