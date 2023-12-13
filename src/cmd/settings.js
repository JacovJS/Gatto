'use strict';
module.exports.gatto = {
  name: "setting",
  prefix: true,
  permission: true,
  desc: "View/Edit bot settings.",
  Coded_by: "JacovJS",
  usages: "[]"
}
//const fs = require("fs")
this['botStart'] = async function({api, event, input}) {
  const fs = require("fs");
  const path = process.cwd() + "/config.json";
  const data = JSON.parse(fs.readFileSync(path));

  if (!input[0]) {
    return api.sendMessage(`🔧Bot Settings

autoGreet: ${data.autoGreet}
antiout: ${data.antiout}
autoPost: ${data.autoPost}
Auto Post when it's Christmas (cm): ${data.cm}
Auto Post when it's New Year (ny): ${data.ny}
name: ${data.name}
prefix: ${data.prefix}`, event.threadID, event.messageID);
  }

  /*let settingOptions = ["autoGreet", "antiout", "autoPost", "cm", "ny", "name", "prefix"];*/
  /*if (!settingOptions.includes(input[0])) {
    return api.sendMessage("Invalid option.", event.threadID, event.messageID);
  }*/

  let settingName = input[0];
  let settingValue = input[1];

  if (settingName === "greet") {
    if (!settingValue) return api.sendMessage("Please select on/off.", event.threadID, event.messageID);
    if (settingValue == "on"){
      var ok = true;
    }
    else if (settingValue == "off"){
      var ok = false;
    } else return api.sendMessage("Please select on/off.", event.threadID, event.messageID);
    data.autoGreet = ok;
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return api.sendMessage(`Auto Greet has been ${data.autoGreet ? 'enabled' : 'disabled'}.\nPlease restart the bot to load the bot setting.`, event.threadID, event.messageID);
  }

  if (settingName === "antiout") {
    if (!settingValue) return api.sendMessage("Please select on/off.", event.threadID, event.messageID);
    if (input[1] == "on"){
      var ok = true;
    } else if (input[1] == "off"){
      var ok = false;
    }
    else return api.sendMessage("Please select on/off.", event.threadID, event.messageID);
    data.antiout = ok;
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return api.sendMessage(`Antiout has been ${input[1]}.\nPlease restart the bot to load the bot setting.`, event.threadID, event.messageID);
  }

  if (settingName === "post") {
    if (!settingValue) return api.sendMessage("Please select on/off.", event.threadID, event.messageID);
    if (input[1] == "on"){
      var ok = true;
    }
    else if (input[1] == "off"){
      var ok = false;
    }
    else return api.sendMessage("Please select on/off.", event.threadID, event.messageID);
    data.autoPost = ok;
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return api.sendMessage(`Auto Post has been ${data.autPost ? 'enabled' : 'disabled'}.\nPlase restart the bot to load bot setting.`, event.threadID, event.messageID);
  }

  if (settingName === "cm") {
    if (!settingValue) return api.sendMessage("Please select on/off.", event.threadID, event.messageID);
    if (input[1] == "on"){
      var ok = true;
    } else if(input[1] == "off"){
      var ok = false;
    } else return api.sendMessage("Please select on/off.", event.threadID, event.messageID);
    data.cm = ok;
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return api.sendMessage(`Auto Post on Christmas (cm) has been ${data.cm ? 'enabled' : 'disabled'}.\nPlease restart the bot to load the bot setting.`, event.threadID, event.messageID);
  }

  if (settingName === "ny") {
    if (!settingValue) return api.sendMessage("Please select on/off.", event.threadID, event.messageID);
    if (input[1] == "on"){
  var ok = true;
} else if(input[1] == "off"){
  var ok = false;
} else return api.sendMessage("Please select on/off.", event.threadID, event.messageID);
    data.ny = ok
    fs.writeFileSync(path, JSON.stringify(data, null, 2))
    return api.sendMessage(`Auto Post on New Year (ny) has been ${data.ny ? 'enabled' : 'disabled'}.\nPlease restart the bot to load bot setting.`, event.threadID, event.messageID);
  }

  if (settingName === "name") {
    if (!settingValue) return api.sendMessage("Please provide a new name.", event.threadID, event.messageID);
    data.name = settingValue;
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return api.sendMessage(`Name has been changed to '${data.name}'.\nPlease restart the bot to load the bot setting.`, event.threadID, event.messageID);
  }

  if (settingName === "prefix") {
    if (!settingValue) return api.sendMessage("Please provide a new prefix.", event.threadID, event.messageID);
    data.prefix = settingValue;
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    return api.sendMessage(`Prefix has been changed to '${data.prefix}'.\nPlease restart the bot to load the bot setting.`, event.threadID, event.messageID);
  } else {
      return api.sendMessage("Wrong format.", event.threadID, event.messageID)
  }
}
