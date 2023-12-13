const fs = require("fs");

module.exports.gatto = {
  name: "balance",
  desc: "Know your balance",
  Coded_by: "JacovJS",
  usages: "[]",
  permission: false,
  prefix: false
};

this['botStart'] = async function({ api, event }) {
  const balpath = process.cwd() + "/db/balance.json";
  const bpath = JSON.parse(fs.readFileSync(balpath));
  let id = event.senderID;
  
  // Retrieve balance for the user with ID 'id'
  let userBalance = bpath[id] || 0;
  
  // Send the balance message to the user
  api.sendMessage(`Your balance is ₱${userBalance}`, event.threadID, event.messageID);
};
    
