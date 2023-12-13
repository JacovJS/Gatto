const fs = require("fs")
const axios = require("axios")
const { join } = require("path")
module.exports.gatto = {
  name: "help",
  desc: "Beginner's guide.",
  Coded_by: "Deku", 
  usages: "[page]",
  permission: false,
  prefix: true
}

this['botStart'] = async function ({ api, event, input }) {
  const prefix = global.gatto.prefix;
  const cmd = process.cwd()+"/src/cmd";
  var msg = "";
  var msgs = "";
  var msgss = "";
  var count = 0;
  const path = __dirname+"/cache/"+event.threadID+".png";
  const pathh = __dirname+"/cache/"+event.senderID+".png";
  let avt = ["https://i.imgur.com/WL4XGO1.png", "https://i.imgur.com/6h8kc9s.png", "https://i.imgur.com/k15A102.png", "https://i.imgur.com/AaDPx0e.png"]
  var avt1 = avt[Math.floor(Math.random() * avt.length)];
  let image = (await axios.get(avt1, {
    responseType: "arraybuffer"
  })).data;
  fs.writeFileSync(path, Buffer.from(image, "utf-8"));
  fs.writeFileSync(pathh, Buffer.from(image, "utf-8"));
  let i = 0;
  let commands = [];  // Array to store commands

  for (let file of fs.readdirSync(cmd)) {
    if (file.endsWith(".js")){
      const path = join(cmd, file);
      const script = require(path);
      var usages = script.gatto?.usages || "["+script.gatto?.name+"]",
      name = script.gatto?.name,
      desc = script.gatto?.desc || script.gatto?.usages,
      codedby = script.gatto?.Coded_by || "Unkown",
      pref = script.gatto?.prefix,
      permission = script.gatto?.permission;
      if (permission == true){
        var perm = "Admin only"
      } else {
        var perm = "Anyone"
      }
      if (pref == true){
        var preff = "Yes"
      } else {
        var preff = "No"
      }
      count += 1;
      const command = {
        name: prefix + name,
        desc: desc,
        usages: prefix + name + " " + usages,
        codedby: codedby,
        perm: perm,
        preff: preff
      };
      commands.push(command);
    }
  }

  const currentPage = parseInt(input.join(" ")) || 1;
  const perPage = 10;  // Number of commands per page
  const start = (currentPage - 1) * perPage;
  const end = start + perPage;
  const totalPages = Math.ceil(commands.length / perPage);

  if (start >= commands.length) {
    return api.sendMessage("Invalid page number.", event.threadID, event.messageID);
  }

  for (let j = start; j < end && j < commands.length; j++) {
    const command = commands[j];
    msg += `│[${j + 1}] ${command.name}\n│➤Description: ${command.desc}\n│\n│➤Usages: ${command.usages}\n│\n│➤Programmed By: ${command.codedby}\n│\n│➤Perm: ${command.perm}\n│\n│➤Prefix: ${command.preff}\n│\n├────────\n│\n`;
    if (input.join(" ") == command.name) {
      msgss += `•——————•\n${command.name}\nDescription: ${command.desc}\nUsages: ${command.usages}\nProgrammed By: ${command.codedby}\nPerm�: ${command.perm}\nPrefix: ${command.preff}\n•——————•`;
    }
  }

  if (msgss !== "") {
    api.sendMessage({ body: msgss, attachment: fs.createReadStream(pathh) }, event.threadID, () => fs.unlinkSync(pathh), event.messageID);
  } else {
    msgs += "[ gatto ]\n╭────────────\n│\n" + msg +`Have ${commands.length} command`+"\n│"+`\n│Page ${currentPage} of ${totalPages}`;
    if (currentPage < totalPages) {
      msgs += `\n│\n│To see more commands, use ${prefix}${this.gatto.name} ${currentPage + 1}`+"\n╰────────────\n\n[ gatto ]";
    }

    api.sendMessage({ body: msgs, attachment: fs.createReadStream(path) }, event.threadID, () => fs.unlinkSync(path), event.messageID);
  }
};

//CODED BY DEKU (@Joshai)
