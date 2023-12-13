const fonts = "/cache/Play-Bold.ttf"
const downfonts = "https://drive.google.com/u/0/uc?id=1uni8AiYk7prdrC7hgAmezaGTMH5R8gW8&export=download"
const fontsName = 45
const fontsInfo = 33
const fontsOthers = 27
const colorName = "#000000"
module.exports.gatto = {
  name: "infgroup",
  prefix: true,
  permission: false,
  desc: "Get info of group",
  usages: "[]",
  Coded_by: "JacovJS"
}
module.exports.circle = async (image) => {
  const jimp = require("jimp");
  image = await jimp.read(image);
  image.circle();
  return await image.getBufferAsync("image/png");
}
this['botStart'] = async function ({ api, event, input }) {
  let { senderID, threadID, messageID } = event;
   const moment = require("moment-timezone"); 
    var timeNow = moment.tz("Asia/Manila").format("HH:mm:ss")
  const { loadImage, createCanvas } = require("canvas");
  const request = require('request');
  const fs = require("fs-extra");
  const axios = require("axios");
  let pathImg = __dirname + `/cache/${senderID}123.png`;
  let pathAva = __dirname + `/cache/avtuserthread.png`;
  let pathAvata = __dirname + `/cache/avtuserrd.png`;
  let pathAvata2 = __dirname + `/cache/avtuserrd2.png`;
  let pathAvata3 = __dirname + `/cache/avtuserrd3.png`;
  
  var threadInfo = await api.getThreadInfo(threadID);
  let threadName = threadInfo.threadName;
  var nameMen = [];
    var gendernam = [];
    var gendernu = [];
    var nope = [];

    for (let z in threadInfo.userInfo) {
        var gioitinhone = threadInfo.userInfo[z].gender;

        var nName = threadInfo.userInfo[z].name;

        if (gioitinhone == 'MALE') {
            gendernam.push(z + gioitinhone);
        } else if (gioitinhone == 'FEMALE') {
            gendernu.push(gioitinhone);
        } else {
            nope.push(nName);
        }
    }

    var nam = gendernam.length;
    var nu = gendernu.length;
  let qtv = threadInfo.adminIDs.length;
  let sl = threadInfo.messageCount;
  let threadMem = threadInfo.participantIDs.length;
  const path = global.nodemodule["path"];
  const Canvas = global.nodemodule["canvas"];
  const __root = path.resolve(__dirname, "cache");
  var qtv2 = threadInfo.adminIDs;
  var idad = qtv2[Math.floor(Math.random() * qtv)];
  let idmem = threadInfo.participantIDs
  var idmemrd = idmem[Math.floor(Math.random() * threadMem)];
  var idmemrd1 = idmem[Math.floor(Math.random() * threadMem)];
  let getAvatarOne = (await axios.get(`https://graph.facebook.com/${idad.id}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  let getAvatarOne2 = (await axios.get(`https://graph.facebook.com/${idmemrd}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  let getAvatarOne3 = (await axios.get(`https://graph.facebook.com/${idmemrd1}/picture?width=512&height=512&access_token=6628568379%7Cc1e620fa708a1d5696fb991c1bde5662`, { responseType: 'arraybuffer' })).data;
  let Avatar = (
    await axios.get(encodeURI(
      `${threadInfo.imageSrc}`),
      { responseType: "arraybuffer" }
    )
  ).data;
  let getWanted = (
    await axios.get(encodeURI(`https://i.imgur.com/zVvx3bq.png`), {
      responseType: "arraybuffer",
    })
  ).data;
  fs.writeFileSync(pathAva, Buffer.from(Avatar, "utf-8"));
  fs.writeFileSync(pathAvata, Buffer.from(getAvatarOne, 'utf-8'));
  fs.writeFileSync(pathAvata2, Buffer.from(getAvatarOne2, 'utf-8'));
  fs.writeFileSync(pathAvata3, Buffer.from(getAvatarOne3, 'utf-8'));
  Avatar = await this.circle(pathAva);
  avataruser = await this.circle(pathAvata);
  avataruser2 = await this.circle(pathAvata2);
  avataruser3 = await this.circle(pathAvata3);
  fs.writeFileSync(pathImg, Buffer.from(getWanted, "utf-8"));

/*-----------------download----------------------*/
if(!fs.existsSync(__dirname+`${fonts}`)) { 
      let getfont = (await axios.get(`${downfonts}`, { responseType: "arraybuffer" })).data;
       fs.writeFileSync(__dirname+`${fonts}`, Buffer.from(getfont, "utf-8"));
    };
/*---------------------------------------------*/

  let baseImage = await loadImage(pathImg);
  let baseAva = await loadImage(Avatar);
  let baseAvata = await loadImage(avataruser);
  let baseAvata2 = await loadImage(avataruser2);
  let baseAvata3 = await loadImage(avataruser3);
  let canvas = createCanvas(baseImage.width, baseImage.height);
  let ctx = canvas.getContext("2d");
  let text = input.join(" ") || threadName
  let id = threadInfo.threadID;
  ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(baseAva, 80, 73, 285, 285);
  ctx.drawImage(baseAvata, 450, 422, 43, 43);
  ctx.drawImage(baseAvata2, 500, 422, 43, 43);
  ctx.drawImage(baseAvata3, 550, 422, 43, 43);
  ctx.font = `700 ${fontsName}px Arial`;
  ctx.fillStyle = `${colorName}`
  ctx.textAlign = "start";
  fontSize = 40;
  ctx.fillText(text, 435, 125);
  Canvas.registerFont(__dirname+`${fonts}`, {
        family: "Lobster"
    });
  ctx.font = `${fontsInfo}px Lobster`;
  ctx.fillStyle = "#000000";
  ctx.textAlign = "start";
  fontSize = 20;
  ctx.fillText(`⊶ Number of member: ${threadMem}`, 439, 199);
  ctx.fillText(`⊶ Administrators: ${qtv}`, 439, 243);
  ctx.fillText(`⊶ Male: ${nam}`, 439, 287);
  ctx.fillText(`⊶ Female: ${nu}`, 439, 331);
  ctx.fillText(`⊶ Total number of messages: ${sl}`, 439, 379);
  ctx.font = `${fontsOthers}px Lobster`;
  ctx.fillStyle = "#000000";
  ctx.textAlign = "start";
  fontSize = 20;
  ctx.fillText(`Group ID: ${id}`, 18, 470);
  ctx.font = `${fontsOthers}px Lobster`;
  ctx.fillStyle = "#000000";
  ctx.textAlign = "start";
  fontSize = 20;
  ctx.fillText(`• With ${parseInt(threadMem)-3} thành viên khác...`, 607, 453);
  ctx.beginPath();
  const imageBuffer = canvas.toBuffer();
  fs.writeFileSync(pathImg, imageBuffer);
  fs.removeSync(pathAva);
  fs.removeSync(pathAvata);
  
  return api.sendMessage({
    body: `=== 『INFORMATION』 ===\n━━━━━━━━━━━━━━━\n\n[⚜️]→ Group name: ${threadName}\n[⚜️]→ Number of member: ${threadMem}\n[⚜️]→ Administrators: ${qtv}\n[⚜️]→ Male: ${nam}\n[⚜️]→ Female: ${nu}\n[⚜️]→ Total number of messages: ${sl}\n[⚜️]→ Group ID: ${id}\n\n━━━━━━━━━━━━━━━`,
    attachment: fs.createReadStream(pathImg) },
    threadID,
    () => fs.unlinkSync(pathImg),
    messageID
  );
};
