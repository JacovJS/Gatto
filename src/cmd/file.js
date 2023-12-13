module.exports.gatto = {
  name: "file",
  desc: "View a file or folder",
  Coded_by: "JacovJS",
  usages: "[]",
  permission: true,
  prefix: true
}

const fs = require('fs');

this.botStart = async function({ api, event }) {
  const filePath = process.cwd() + '/src/cmd';
  let msg = "";
  try {
    const files = fs.readdirSync(filePath);
    for (let file of files) {
      const stats = fs.statSync(filePath + '/' + file);
      const isDirectory = stats.isDirectory();
      const emoji = isDirectory ? '📂' : '📑';
      msg += emoji + " " + file + '\n';
    }
    return api.sendMessage("File list:\n\n" + msg, event.threadID, event.messageID);
  } catch (error) {
    return api.sendMessage(`Error reading directory: ${error.message}`, event.threadID, event.messageID);
  }
}
