module.exports.midoriya = {
  name: "alert",
  prefix: true,
  permission: true,
  desc: "Send a notification to all groups.",
  usages: "[msg]",
  Coded_by: "Deku"
}

this["botStart"] = async function({ api, event, input }) {
  const message = input.join(" ");
  const threadList = await api.getThreadList(100, null, ["INBOX"]).catch(error => console.error('Failed to get Thread List:', error));
  const botAdmin = (await api.getUserInfoV2(event.senderID)).name;
  let groupCount = 0;

  for (const thread of threadList) {
    if (thread.isGroup) {
      groupCount++;
      const threadName = thread.name || "";
      const msg = `Notification for group ${threadName}

Message: ${message}

-Admin ${botAdmin}`;

  await api.sendMessage(msg, thread.threadID).catch(error => console.error('Failed to send message:', error));

    }
  }

  api.sendMessage(`Notification sent to ${groupCount} groups`, event.threadID);
}

//CODED BY DEKU (@Joshai)
