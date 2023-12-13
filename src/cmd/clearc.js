module.exports.q = async (cachePath) => {
  const fs = require("fs-extra");
  const files = await fs.readdir(cachePath);
  if (files.length === 0) {
    return "cache folder is empty to delete";
  } else {
    await fs.emptyDir(cachePath);
  }
};

module.exports.gatto = {
  name: "clearc",
  prefix: true,
  permission: false,
  desc: "delete the contents of the cache folder",
  usages: "[]",
  Coded_by: "Deku"
};

this['botStart'] = async function({ api, event }) {
  const cachePath = __dirname + "/cache";
  const result = await this.q(cachePath);
  if (result === "cache folder is empty to delete") {
    return api.sendMessage(result, event.threadID, event.messageID);
  } else {
    return api.sendMessage("Deleted cache successfully", event.threadID, event.messageID);
  }
};
