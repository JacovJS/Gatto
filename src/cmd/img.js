module['exports']['gatto'] = {
    name: "img",
    Coded_by: "JacovJS",
    desc: "Generate an image.",
    usages: "[prompt]",
    permission: false,
    prefix: true
};
const fs = require("fs");
const { get } = require("axios");

this['botStart'] = async function({ api, event, input }) {
  let path = __dirname+"/cache/image.png";
  const txt = input.join(" ");

  let tid = event.threadID,
  mid = event.messageID;

  if (!input[0] || !txt ) return api.sendMessage("Please provide a prompt.", tid, mid);

  try {
    api.sendMessage("⏳ Generating...", tid, mid);

    let enctxt = encodeURI(txt);
    let url = `https://xennapi.xienaxien537.repl.co/xenn-image-generator/api.php?key=xenn1337&text=${enctxt}`;
    const response = await get(url);
    var resp = response.data.imgur_link;
    let result = (await get(resp, { responseType: "arraybuffer" })).data; 
    fs.writeFileSync(path, Buffer.from(result, "utf-8"));
    api.sendMessage({attachment: fs.createReadStream(path)}, tid, () => fs.unlinkSync(path), mid);
  } catch (e) {
    return api.sendMessage(e.message, tid, mid);
  }
};
