module.exports.gatto = {
  name: "group",
  prefix: true,
  permission: false,
  desc: "Get list of group",
  usages: "[list/emoji/name]",
  Coded_by: "Deku"
}

this["botStart"] = async function({api, event, input}){
  let t1  = input[0],
    t2  = input[1];
  if (!t1) return api.sendMessage("Invalid use of command.", event.threadID, event.msssageID);
if (t1 == "name"){
  if (!t2) return api.setTitle("", event.threadID);
 api.setTitle(t2, event.threadID);
  return api.sendMessage("[SUCCESS] Change the group name to "+t2, event.threadID, event.messageID)
}
  if (t1 == "emoji"){
    if (!t2) return api.sendMessage("Missing emoji", event.threadID, event.msesageID);
 api.changeThreadEmoji(t2, event.threadID);
    return api.sendMessage("[SUCCESS] Change the group emoji to "+t2, event.threadID, event.messageID)
  }
  if (t1 == "list"){
  var msg = "",
    c = 0,
    length = ""
  const threadList = await api.getThreadList(100, null, ["INBOX"]);
  const groupCount = threadList.filter(thread => thread.isGroup).length;
  const groupData = threadList.filter(thread => thread.isGroup).map(thread => ({
    threadID: thread.threadID,
    groupName: thread.name,
    messageCount: thread.messageCount,
    memLength: thread.participantIDs.length,
    emoji: thread.emoji || "👍"
  }));
  groupData.forEach(data => {
    c += 1
    msg += `${c}. Group Name: ${data.groupName}\nGroup ID: ${data.threadID}\nMembers count: ${data.memLength}\nMessage count: ${data.messageCount}\nEmoji: ${data.emoji}\n\n`
  });
return api.sendMessage("•——[gatto]——•\n\n"+msg+"\nTotal group: "+groupCount+"\n\n•——[gatto]——•", event.threadID, event.messageID)
  }
}

//CODED BY DEKU (@Joshai)
