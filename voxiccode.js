const moment = require("moment");
moment.locale("tr");
require("moment-duration-format");
const db = require("quick.db");
const Discord = require("discord.js");
const database = require("./database.json");
const client = new Discord.Client({ disableEveryone: true });
client.login(process.env.token);
const fetch = require("node-fetch");
const fs = require("fs");
require("express")().listen(1343);

const express = require("express");
const app = express(); 
const http = require("http");
app.get("/", (request, response) => {
  console.log("Pinglenmedi.");
  response.sendStatus(200);
}); 
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.on("ready", () => {
  console.log("Bot Aktif");
  let playing = client.voice.connections.size;

  client.user.setPresence({
    activity: {
      name: "Voxic Code Uptime",
      type: "idle",
      url: "URL"
          
    }
  });
});

setInterval(() => {
  var links = db.get("linkleri");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Pinglendi.");
}, 60000);

client.on("ready", () => {
  if (!Array.isArray(db.get("linkleri"))) {
    db.set("linkleri", []);
  }
});



client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split("!ekle");
  if (spl[0] == "+ekle") {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkleri")
            .map(Revenge => Revenge.url)
            .includes(link)
        )
          return message.channel.send(
            new Discord.MessageEmbed()
            .setFooter(
              ` ${client.user.username} Voxic Code Uptime`,
              client.user.displayAvatarURL({ dynamic: true })
            )
              .setColor("PURPLE")
              .setDescription(
                "**<a:nitroemo:829688660009680896> Projeniz sistemimizde zaten bulunuyor **"
              )
          );
        message.channel.send(
          new Discord.MessageEmbed()
            .setFooter(
              `${client.user.username} Voxic Code Uptime`,
              client.user.displayAvatarURL({ dynamic: true })
            )
            .setColor("PURPLE")
            .setDescription(
              "**<a:nitroemo:829688660009680896> Projeniz Uptime Edilmeye Ba??land?? ,Daha ??nceden Ekledi??in Linklere Bakmak ????in `+g??ster` yaz.**"
            )
        );
        db.push("linkleri", { url: link, owner: message.author.id });
      db.push(`Projesi_${message.author.id}`, link);
      })
      .catch(e => {
        return message.channel.send(
          new Discord.MessageEmbed()
            .setFooter(
              ` ${client.user.username} Voxic Code Uptime`,
              client.user.displayAvatarURL({ dynamic: true })
            )
            .setColor("PURPLE")
            .setDescription(
              "**<a:moderatr:829311369731244103> L??tfen Kabul Edilen  bir URL gir.**"
            )
            .setImage("")
        );
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "+g??ster") {
    var link = spl[1];
    message.channel.send(
      new Discord.MessageEmbed()
        .setFooter(
          `${client.user.username} Voxic Code Uptime`,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setColor("PURPLE")
        .setDescription(
          ` <:emojiite:829682276849549322> **${
            db.get("linkleri").length
          }** tane proje ??uan  aktif tutuluyor!`
        )
    );
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "+yard??m") {
    var link = spl[1];
    const help = new Discord.MessageEmbed()
      .setFooter(
        ` ${client.user.username} Voxic Code Uptime`,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setColor("PURPLE")
      .setThumbnail(
        "https://media.giphy.com/media/WTO8QA0mX2Cfw5vhkp/giphy.gif"
      )
      .setDescription(
        `**<a:nitroemo:829688660009680896> Selam Dostum, Discord Botunu 7/24 Yapmakm?? ??stiyorsun Bunu Yapmak i??in yapman gerekenleri  sana Teker Teker Yazaca????m.** \n\n <:emojiite:829682276849549322>  **  Art??k ??ok daha kolay bir ??ekilde botunu uptime edebilirsin! **\n\n **<:emojiite:829682276849549322> \`+ekle\` yazarak botunu 7/24 aktif  edebilirsin.** \n\n  **<:emojiite:829682276849549322> \`+g??ster\` yazarak toplam 7/24 uptime etti??im bot  say??s??n?? g??rebilirsin.** \n\n  **<:emojiite:829682276849549322> E??er botunu uptimeden kald??rmak istiyorsan Voxice Veya Gravitye ula??abilirsin. **\n\n  ** <:emojiite:829682276849549322>  \`+davet\` yazarak Voxic Code Uptime botunu sunucuna davet edebilirsin. **\n\n ** <:emojiite:829682276849549322> \`+eri??im-kontrol\` yazarak bota eri??iminizin olup olmad??????n?? kontrol edebilirsin.** **\n\n <a:nitroemo:829688660009680896> \`+i\` yazarak bot istatistiklerini ????renebilirsin.** **\n\n <a:nitroemo:829688660009680896> \`+youtube\` yazarak Voxicin YouTube kanal??na ula??abilirsin.** **\n\n<a:nitroemo:829688660009680896> \`+linkler\` yazarak __yeni eklenen__ uptime linklerinizi g??r??nt??leyebilirsiniz.**`
      )
      .setImage(
        "https://media.discordapp.net/attachments/814483180123193356/829790080909836288/voxic_code.gif"
      );
    message.channel.send(help);
  }
});
////kaanabaabba
client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" "); // lan nap??yosun it melih
  if (spl[0] == "+davet") {
    var link = spl[1];
    message.channel.send(
      new Discord.MessageEmbed()
        .setFooter(
          `${client.user.username} Voxic Code Uptime`,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setColor("PURPLE")
        .setDescription(
          `?? Botu eklemek i??in **[T??kla!]()**`
        )
    );
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "+i") {
    let asdiscord = new Discord.MessageEmbed()
      .setAuthor(`?? ${client.user.username} | ??statistik Komutu`)
      .setTitle(`Discord Sunucumuz`)
      .setURL(`https://discord.gg/n7dD8pu9`)
      .addField(
        `?? ??al????ma S??resi:`,
        `${moment
          .duration(client.uptime)
          .format("D [g??n], H [saat], m [dakika], s [saniye]")}`
      )
      .addField(`?? Ping:`, `${client.ws.ping} ms`, true)
      
      .setFooter(
        ` ${client.user.username} Voxic Code Uptime`,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setColor("PURPLE");
    message.channel.send(asdiscord);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "+eri??im-kontrol") {
    var link = spl[1];
    message.channel.send(
      new Discord.MessageEmbed()
        .setFooter(
          ` ${client.user.username} Voxic Code Uptime`,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setColor("PURPLE")
        .setDescription(
          `**?? <a:nitroemo:829688660009680896>  Bota eri??iminiz aktif! Botumuzda Database Bulunmamaktad??r Bize G??venebilirsiniz  ??al??nma Durumu Gibi Bir Durum Asla Olamaz Botlar??n??z?? G??venle 7/24 Edebilirsiniz !**`
        )
    );
  }
});
client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "+youtube") {
    var link = spl[1];
    message.channel.send(
      new Discord.MessageEmbed()
        .setFooter(
          ` ${client.user.username} Voxic Code Uptime`,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setColor("PURPLE")
        .setDescription(`**?? <a:moderatr:829311369731244103> Sahibimin kanal??na abone olursan  sunucuda benim altyap??ma sahip olabilirsin.** 
        **??<a:moderatr:829311369731244103> Voxicin kanal?? i??in [T??kla!](https://www.youtube.com/channel/UCHrTh8l9Tu5ay5NoaJFdViQ)**
      `)
    );
  }
});
client.on("message", async message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "+linkler") {
    const Linkleri = db.fetch(`Projesi_${message.author.id}`);
    if (
      !db
        .get("linkleri")
        .map(Revenge => Revenge.owner)
        .includes(message.author.id)
    )
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("WH??TE")
          .setDescription(
            `**?? Hi?? bot uptime etmemi??sin , uptime etmek i??in \`!link-add\` yazman gerek.**`
          )
                .setFooter(
          ` ${client.user.username} Voxic Code Uptime`,
          client.user.displayAvatarURL({ dynamic: true })
        )
      );
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("PURPLE")
        .setDescription(
          `**?? Uptime etmekte oldu??un linkler DM ??zerinden g??nderildi, L??tfen DM kontrol et.**`
        )
                    .setFooter(
          ` ${client.user.username} Voxic Code Uptime`,
          client.user.displayAvatarURL({ dynamic: true })
        )
    );
    message.author.send(
      new Discord.MessageEmbed()
        .setColor("PURPLE")
        .setDescription(`**?? Normal Linklerin:** \n` + Linkleri.join("\n") + ``)// linkelri olm??cak linkler olcak
              .setFooter(
          ` ${client.user.username} Voxic Code Uptime`,
          client.user.displayAvatarURL({ dynamic: true })
        )
    );
  }
});
client.on("message", async message =>  {
if(message.author.bot) return
if(message.content === `<@!${client.user.id}>` || message.content === `<@${client.user.id}>`) {
let prefix = db.fetch("prefix."+message.guild.id) || 'ayarlar'.prefix

const codework = new Discord.MessageEmbed()
.setTitle('BOTU ET??KETLED??N ??????N BOTUN SANA MESAJI '+message.author.username)
.setDescription(`Etiketlemendeki AMa?? Ne Ya !yard??m Yazsan Gelcem Zaten`)
.setColor('RANDOM')
.setThumbnail(message.author.avatarURL({dynamic: true}))
message.channel.send(codework) 

}  

})