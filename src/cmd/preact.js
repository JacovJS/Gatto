module['exports']['gatto'] = {
  name: "postreact",
  Coded_by: "Deku",
  permission: false,
  desc: "React to the Post",
  usages: "[postID | react]",
  prefix: true
}
this['botStart'] = async function({api, event, input}){
  const allType = "unlike/like/love/heart/haha/wow/sad/angry".split("/");
  const postID = input[0];
  const type = input[1];
  if (!postID || !type) return api.sendMessage("error", event.threadID, event.messageID);
  if (!allType.includes(type)) return api.sendMessage(`the reaction type is not valid, please choose one of the following styles : ${allType.join("/")}`, event.threadID, event.messageID);
  api.setPostReaction(Number(postID), type, (err, data) => {
    if (err) return api.sendMessage("Something went wrong, please check your postID and try again later", event.threadID, event.messageID);
    api.sendMessage(`Successfully react ${type} for posts with postID ${postID}`, event.threadID, event.messageID);
  });
}

//CODED BY DEKU (@Joshai)
