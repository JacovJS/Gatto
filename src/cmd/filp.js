const fs = require("fs"),
  axios = require("axios");

module.exports.gatto = {
  name: "flip",
  desc: "Play a coin flip game",
  Coded_by: "JacovJS",
  usages: "[]",
  permission: false,
  prefix: false,
};

this["botStart"] = async function ({ api, event }) {
  const balpath = process.cwd() + "/db/balance.json";
  const bpath = JSON.parse(fs.readFileSync(balpath));
const wonPath = __dirname+"/cache/won.jpg";
const losePath = __dirname+"/cache/lose.jpg";
const won = "https://i.imgur.com/hUOh1lJ.jpeg",
lose = "https://i.imgur.com/c2IYYIb.jpeg";
  let id = event.senderID;
  let userBalance = bpath[id] || 0;
 if (userBalance < 50) return api.sendMessage("You don't have enough money to play this game.", event.threadID, event.messageID);
    let result = Math.floor(Math.random() * 2);

    if (result === 0) {
      userBalance += 50;
      const imageWon = (await axios.get(won, {
        responseType: "arraybuffer"
      })).data;
    fs.writeFileSync(wonPath, Buffer.from(imageWon, "utf-8"));
api.sendMessage({body:"Congratulations! You won ₱50!", attachment: fs.createReadStream(wonPath)}, event.threadID, () => fs.unlinkSync(wonPath), event.messageID);
    } else {
      userBalance -= 60;
      const imageLose = (await axios.get(lose, {
        responseType: "arraybuffer"
      })).data;
    fs.writeFileSync(losePath, Buffer.from(imageLose, "utf-8"));
      api.sendMessage({body:"Sorry, you lost ₱60.",attachment: fs.createReadStream(losePath)},event.threadID, () => fs.unlinkSync(losePath), event.messageID);
    }

    bpath[id] = userBalance;
    fs.writeFileSync(balpath, JSON.stringify(bpath, null, 2));

//  api.sendMessage(`Your balance is ₱${userBalance}`, event.threadID, event.messageID);
};
