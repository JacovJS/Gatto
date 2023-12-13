module.exports.gatto = {
  name: "approve",
  desc: "Approve pending group",
  Coded_by: "JacovJS",
  usages: "[group id(threadID)/ all]",
  permission: true,
  prefix: true
}

this['botStart'] = async function ({ api, event, input }) {
  try {
    const message = `${global.gatto.prefix}${global.gatto.name} connected!\nSorry if it took a while for the bot to respond to this group, because this group is in the bot's message request`;
    if (input[0] == "all"){
      const pendingGroups = await api.getThreadList(100, null, ['PENDING'], ['OTHERS'])
      pendingGroups.forEach(g => {
        api.sendMessage(message, g.threadID);
        if(g.length == 0) return api.sendMessage("There's no group/users on pending.", event.threadID, event.messageID);
        return api.sendMessage("Approving groups/users successfully.", event.threadID, event.messageID)
      })
    }
    let thread = parseInt(input[0]);
  /*  if (isNaN(thread)) return api.sendMessage("Invalid ID", event.threadID, event.messageID);*/
    if (!thread) return api.sendMessage("Missing group ID", event.threadID, event.messageID);
    /*const threadExists = await api.getThreadInfo(thread).catch(() => false);
   if (!threadExists) return api.sendMessage("Invalid thread ID", event.threadID, event.messageID);*/
    api.sendMessage(message, thread);
    api.changeNickname(`${global.gatto.name} • [ ${global.gatto.prefix} ]`, thread, api.getCurrentUserID());
    return api.sendMessage("Group ID " + thread + " approve successfully", event.threadID, event.messageID);
  } catch (err) {
    // Handle the error here
    console.error(err);
    api.sendMessage("An error occurred while approving the group", event.threadID, event.messageID);
  }
                                        }
      
