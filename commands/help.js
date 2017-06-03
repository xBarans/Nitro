const Commands = require('../functions/loadCommands.js');

exports.runs = (message, bot, suffix, args) => {
  let cmds = Commands.getCmds();
  let mods = (message.channel.type === "text") ? message.guild.modules : {};
  let prefix = message.guild.prefix
  let text = {};
  text.start = ['```md', '#The prefix for your server is: ' + prefix];
  let category = ["Uility", "Fun", "Music", "Social", "Random", "Other", "Module"]
  let keys = Object.keys(cmds);
  keys.forEach(c => {
    if (cmds[c].conf.userPerm.indexOf("DEV") === -1 && cmds[c].conf.userPerm.indexOf("dev") === -1) {
      if (!text[cmds[c].conf.category]) text[cmds[c].conf.category] = [];
      text[cmds[c].conf.category].push(`  • ${c} - ${cmds[c].conf.help}`);
    }
  })
  let msg = [text.start.join('\n'), "#Server Management", text.Utility.join("\n")];
  if (!mods.fun && text.Fun) {
    msg.push("#Fun");
    msg.push(text.Fun.join("\n"));
  }
  if (!mods.social && text.Social) {
    msg.push("#Social");
    msg.push(text.Social.join("\n"));
  }
  if (!mods.music && text.Music) {
    msg.push("#Music");
    msg.push(text.Music.join("\n"));
  }
  if (!mods.random && text.Random) {
    msg.push("#Random");
    msg.push(text.Random.join("\n"));
  }
  msg.push("#Other", text.Other.join("\n"), "#Modules", text.Module.join("\n"))
  msg.push('```')
  if (message.channel.type === "text") message.channel.send("**Sliding Into Your DM's**").then(m => m.delete(3000))
  message.author.send(msg.join("\n"), {
    split: {
      append: "```",
      prepend: "```md\n"
    }
  })
}

exports.run = (message, bot, send) => {
  let cmds = Commands.getCmds()
  let mods = message.guild.modules
  let prefix = message.guild.prefix
  let temp = {}
  let fields = []
  forEach(cmds, (c, k) => {
    if (!temp.hasOwnProperty(c.conf.category)) temp[c.conf.category] = []
    temp[c.conf.category].push(prefix + k + " - " + c.conf.help)
  })
  forEach(temp, (c, k) => {
    fields.push({
      name: k,
      value: c.join('\n'),
      inline: true
    })
  })
  let embed = {
    fields,
    color: 0x155CA8
  }
  if (message.channel.type === "text") message.channel.send("**Sliding Into Your DM's**").then(m => m.delete(3000))
  message.author.send('', {
    embed
  })
}

exports.conf = {
  userPerm: [],
  botPerm: [],
  dm: true,
  coolDown: 100,
  category: "Other",
  help: "Get a list of Nitro's commands.",
  args: ""
}

let forEach = function (obj, loop) {
  let a = Object.keys(obj)
  for (i = 0; i < a.length; i++) {
    loop(obj[a[i]], a[i])
  }
  return
}