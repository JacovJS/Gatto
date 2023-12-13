const { exec } = require("child_process");
module.exports.gatto = {
  name: "shell",
  desc: "Run shell.",
  Coded_by: "JacovJS",
  usages: "[shell]",
  permission: true,
  prefix: true
}
this['botStart'] = async function({ api, event, input }) {
let text = input.join(" ")
exec(`${text}`, (error, stdout, stderr) => {
    if (error) {
        api.sendMessage(`Error Output: \n${error.message}`, event.threadID, event.messageID);
        return;
    }
    if (stderr) {
        api.sendMessage(`Error Output:\n${stderr}`, event.threadID, event.messageID);
        return;
    }
    api.sendMessage(`Output:\n${stdout}`, event.threadID, event.messageID);
});
                                                             }
