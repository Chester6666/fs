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
              "**<a:nitroemo:829688660009680896> Projeniz Uptime Edilmeye Başlandı ,Daha Önceden Eklediğin Linklere Bakmak İçin `+göster` yaz.**"
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
              "**<a:moderatr:829311369731244103> Lütfen Kabul Edilen  bir URL gir.**"
            )
            .setImage("")
        );
      });
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "+göster") {
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
          }** tane proje Şuan  aktif tutuluyor!`
        )
    );
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "+yardım") {
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
        `**<a:nitroemo:829688660009680896> Selam Dostum, Discord Botunu 7/24 Yapmakmı İstiyorsun Bunu Yapmak için yapman gerekenleri  sana Teker Teker Yazacağım.** \n\n <:emojiite:829682276849549322>  **  Artık Çok daha kolay bir şekilde botunu uptime edebilirsin! **\n\n **<:emojiite:829682276849549322> \`+ekle\` yazarak botunu 7/24 aktif  edebilirsin.** \n\n  **<:emojiite:829682276849549322> \`+göster\` yazarak toplam 7/24 uptime ettiğim bot  sayısını görebilirsin.** \n\n  **<:emojiite:829682276849549322> Eğer botunu uptimeden kaldırmak istiyorsan Voxice Veya Gravitye ulaşabilirsin. **\n\n  ** <:emojiite:829682276849549322>  \`+davet\` yazarak Voxic Code Uptime botunu sunucuna davet edebilirsin. **\n\n ** <:emojiite:829682276849549322> \`+erişim-kontrol\` yazarak bota erişiminizin olup olmadığını kontrol edebilirsin.** **\n\n <a:nitroemo:829688660009680896> \`+i\` yazarak bot istatistiklerini öğrenebilirsin.** **\n\n <a:nitroemo:829688660009680896> \`+youtube\` yazarak Voxicin YouTube kanalına ulaşabilirsin.** **\n\n<a:nitroemo:829688660009680896> \`+linkler\` yazarak __yeni eklenen__ uptime linklerinizi görüntüleyebilirsiniz.**`
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
  var spl = message.content.split(" "); // lan napıyosun it melih
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
          `» Botu eklemek için **[Tıkla!]()**`
        )
    );
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "+i") {
    let asdiscord = new Discord.MessageEmbed()
      .setAuthor(`» ${client.user.username} | İstatistik Komutu`)
      .setTitle(`Discord Sunucumuz`)
      .setURL(`https://discord.gg/n7dD8pu9`)
      .addField(
        `» Çalışma Süresi:`,
        `${moment
          .duration(client.uptime)
          .format("D [gün], H [saat], m [dakika], s [saniye]")}`
      )
      .addField(`» Ping:`, `${client.ws.ping} ms`, true)
      
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
  if (spl[0] == "+erişim-kontrol") {
    var link = spl[1];
    message.channel.send(
      new Discord.MessageEmbed()
        .setFooter(
          ` ${client.user.username} Voxic Code Uptime`,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setColor("PURPLE")
        .setDescription(
          `**» <a:nitroemo:829688660009680896>  Bota erişiminiz aktif! Botumuzda Database Bulunmamaktadır Bize Güvenebilirsiniz  Çalınma Durumu Gibi Bir Durum Asla Olamaz Botlarınızı Güvenle 7/24 Edebilirsiniz !**`
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
        .setDescription(`**» <a:moderatr:829311369731244103> Sahibimin kanalına abone olursan  sunucuda benim altyapıma sahip olabilirsin.** 
        **»<a:moderatr:829311369731244103> Voxicin kanalı için [Tıkla!](https://www.youtube.com/channel/UCHrTh8l9Tu5ay5NoaJFdViQ)**
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
          .setColor("WHİTE")
          .setDescription(
            `**» Hiç bot uptime etmemişsin , uptime etmek için \`!link-add\` yazman gerek.**`
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
          `**» Uptime etmekte olduğun linkler DM Üzerinden gönderildi, Lütfen DM kontrol et.**`
        )
                    .setFooter(
          ` ${client.user.username} Voxic Code Uptime`,
          client.user.displayAvatarURL({ dynamic: true })
        )
    );
    message.author.send(
      new Discord.MessageEmbed()
        .setColor("PURPLE")
        .setDescription(`**» Normal Linklerin:** \n` + Linkleri.join("\n") + ``)// linkelri olmıcak linkler olcak
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
.setTitle('BOTU ETİKETLEDİN İÇİN BOTUN SANA MESAJI '+message.author.username)
.setDescription(`Etiketlemendeki AMaç Ne Ya !yardım Yazsan Gelcem Zaten`)
.setColor('RANDOM')
.setThumbnail(message.author.avatarURL({dynamic: true}))
message.channel.send(codework) 

}  

})