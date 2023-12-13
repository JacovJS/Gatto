module.exports.gatto = {
  name: "cmd",
  desc: "Command Manager",
  Coded_by: "JacovJS",
  usages: "[load | unload] [command name]",
  permission: true,
  prefix: true
}

const fs = require("fs");

this.botStart = async function({ api, event, input }) {
  let tid = event.threadID,
    mid = event.messageID;

  const action = input[0];
  const commandName = input[1];

  if (!action || !commandName) {
    return api.sendMessage(
      "Missing action or command name!\nUse: " + global.gatto.prefix + this.config.name + " " + this.config.usages,
      tid,
      mid
    );
  }

  try {
    const commandPath = process.cwd() + `/src/cmd/${commandName}.js`;

    if (action === "load") {
      if (require.cache[require.resolve(commandPath)]) {
        return api.sendMessage(
          "Command `" + commandName + "` is already loaded!",
          tid,
          mid
        );
      }

      const command = require(commandPath);
      return api.sendMessage(
        "Command `" + commandName + "` loaded successfully!",
        tid,
        mid
      );
    } else if (action === "unload") {
      if (!require.cache[require.resolve(commandPath)]) {
        return api.sendMessage(
          "Command `" + commandName + "` is not currently loaded!",
          tid,
          mid
        );
      }

      delete require.cache[require.resolve(commandPath)];
      return api.sendMessage(
        "Command `" + commandName + "` unloaded successfully!",
        tid,
        mid
      );
    }
  } catch(err) {
    return api.sendMessage(
      "Error managing command: " + err.message,
      tid,
      mid
    );
  }
};
