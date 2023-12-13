module.exports.gatto = {
  name: "sim",
  desc: "Talk to Sim",
  Coded_by: "Deku",
  usages: "[ask]",
  permission: false,
  prefix: true
}

const fs = require("fs");
const similarity = require("similarity");

this.botStart = async function({api, event, input}) {
  const path = process.cwd() + '/others/sim.json';

  if (!fs.existsSync(path)) return api.sendMessage("Sim data not found", event.threadID, event.messageID);

  const data = JSON.parse(fs.readFileSync(path));
  const question = input.join(" ");

  if (!question) return api.sendMessage("Please provide a question", event.threadID, event.messageID);

  let bestMatch = "";
  let highestScore = 0;

  for (const key in data) {
    const score = similarity(question, key);
    if (score > highestScore) {
      highestScore = score;
      bestMatch = key;
    }
  }

  if (highestScore < 0.5) return api.sendMessage("I don't have an answer for that question\nBut try to teach me using teach command (ex:"+global.gatto.prefix+"teach who's handsome|you)", event.threadID, event.messageID);

  const responses = data[bestMatch];
  const response = responses[Math.floor(Math.random() * responses.length)];

  api.sendMessage(response, event.threadID, event.messageID);

//CODED BY DEKU (@Joshai)
}
