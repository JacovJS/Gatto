module.exports.gatto = {
  name: "teach",
  desc: "Teach Sim",
  Coded_by: "Deku",
  usages: "[ask | ans]",
  permission: false,
  prefix: true
}

const fs = require("fs");

this.botStart = async function({ api, event, input }) {
  let tid = event.threadID,
    mid = event.messageID;

  let path = process.cwd() + `/others/sim.json`;
  let data = JSON.parse(fs.readFileSync(path));

  const content = input.join(" ").split("|").map(item => item.trim());
  let ask = content[0];
  let ans = content[1];

  if (!ask || !ans) {
    return api.sendMessage(
      "Missing ans or ask query!\nUse: " + global.gatto.prefix + this.config.name + " " + this.config.usages,
      tid,
      mid
    );
  }

  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify({}));
  }

  if (!data[ask]) {
    data[ask] = [];
  }

  if (data[ask].includes(ans)) {
    return api.sendMessage("Already taught\nTry teaching a different ask or ans", tid, mid);
  }

  api.sendMessage(
    "Thanks for teaching me!\n\nYour ask: " + ask + "\nSim response: " + ans,
    tid,
    mid
  );

  data[ask].push(ans);
  fs.writeFileSync(path, JSON.stringify(data, null, 4));
};

//CODED BY DEKU (@Joshai)
