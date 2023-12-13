# Gatto 😺
Multifuctional Messenger (Facebook) Chat Bot With Many Unreasonable Features for Users to Enjoy.

# Goals 🚀
- [x] Create Database
- [x] Integrate AI (Bard, ChatGPT, and Blackbox)
- [x] Add Features (For Facebook & Messenger Use)
- [x] Send/Download Images & Music From Across the Internet  

# Contribution 😻
- JacovJS [Author]
- Deku (@Joshai)
- August

# Language Used ⭐
- Node.js (JavaScript)
  
# How to Add Your Own Command 🪐
SAMPLE COMMAND: _$help_
```//The command will not work if something is missing in the code (ex: desc: "")
module.exports.gatto = {
  name: "", //name of command
  desc: "", //description 
  Coded_by: "", //Creator of command
  usages: "", //usage
  permission: false, //if false anyone can use the command and if true only admin can use the command.
  prefix: true //if false you don't need to use prefix and if true you need prefix before the command name 
}
this['botStart'] = async function({api, event, input}){
//the input will be args
  //Do something
}

