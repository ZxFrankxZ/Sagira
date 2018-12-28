const config = require('./package.json');
const Discord = require('discord.js');
const bot = new Discord.Client();
const prefix = "!"
const moment = require("moment");
require('moment-duration-format');
const fs = require('fs');
const box = "```";
const enlaces = ["https://discord.gg"];
let userAFK = [];
let apodos = new Array();
let cooldown = new Set();
const sql = require("sqlite");  
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const economy = require('discord-eco');
const modRole = 'Fundador';
const sql2 = require("sqlite");
    sql2.open("./userData.sqlite");   
let cooldown3 = new Set();
let cooldown4 = new Set();


function pluck(array) {
    return array.map(function(item) { return item["name"]; })
}
function hasRole(men, role) {
    if (pluck(men.roles).includes(role)){
        return true;
    } else {
        return false;
    }
}

bot.on("ready", () => {
    console.log(`Iniciada :)`);
    function cambiarestado() {
    let estados = [`!ayuda`,`!cafe`,`!cmd`,`!vendedores`,`!gifs`,`!crg`,`!lastgame`,`!ranks`,`Destiny 2`,`con Espectro`];

    bot.user.setActivity(estados[Math.floor(estados.length * Math.random())]);
    }
    setInterval(cambiarestado, 120000);
})
/*bot.on("ready", () => {         
  function timer() {
    let defaultChannel = "484415601037803530";
    bot.channels.get(defaultChannel).send("```Ultima semana del Festival de las almas perdidas voy a estar regalando cositas. Si quieres saber mas usa !coger o !regalo para divertirte un rato .```")
.then(m => {
    m.delete(600000);

     });

}
setInterval(timer, 10800000);  //puedes cambiar el tiempo a tu parecer 60000 = 1 minuto.
})

;*/

bot.on("error", (e) => console.error(e));

bot.on("guildMemberAdd", member => {
  let server = member.guild;
   if (server.id !== '484414780619096064') return
  let guild = member.guild;
   var role = member.guild.roles.find('name', 'Miembros');
   var canal = bot.channels.get('484418430414356482')
   const embed = new Discord.RichEmbed()
   .setColor(0x00AE86)
   .setTitle(`:inbox_tray: ${member.user.username} / ${member.id} `)
   .setDescription(`Bienvenido ${member.user} a ${member.guild.name}, espero que disfrutes de tu estancia. Ya somos ${server.memberCount}`)
   .setThumbnail(member.user.avatarURL ? member.user.avatarURL : "https://i.imgur.com/ecHmnIt.png")
   .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
   .setTimestamp()
   canal.send({embed})
   member.addRole(role)
   });
   bot.on('guildMemberRemove', (member) => {
    let server = member.guild;
    if (server.id !== '484414780619096064') return
    if (!member.guild.members.get(member.id)) {
      sql.run(`DELETE FROM scores WHERE userId=${member.id}`)
     let guild = member.guild;
     var canal = bot.channels.get('485051239764197377')
     const embed = new Discord.RichEmbed()
     .setColor("#ff0000")
     .setTitle(`:outbox_tray: ${member.user.username} / ${member.id} `)
     .setDescription(`Hasta pronto ${member.user} Sentimos ser tan putamente aburridos y no superar tus espectativas .`)
     .setThumbnail(member.user.avatarURL ? member.user.avatarURL : "https://i.imgur.com/ecHmnIt.png")
     .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
     .setTimestamp()
     canal.send({embed})
    }
     });

     bot.on("messageDelete", message => {
      if (message.guild.id !== '484414780619096064') return
      var canal = bot.channels.get('485251670301736960'); 
      if(message.embeds[0]) { 
      const embed2 = new Discord.RichEmbed() 
      .setTitle("『Mensaje Borrado』")
      .setThumbnail("https://i.imgur.com/my1xVGt.png")
      .addField(`${message.author.username}`, 'Borró un mensaje en '+ "<#"+message.channel.id.toString()+">")
      .addField("Mensaje Borrado:", "El mensaje fue un **Embed**")
      .setColor("#ff0000")
      canal.send(embed2)
      return;
      } else {
      const embed = new Discord.RichEmbed() 
      .setTitle("『Mensaje Borrado』")
      .setThumbnail("https://i.imgur.com/my1xVGt.png")
      .addField(`${message.author.username}`, 'Borró un mensaje en '+ "<#"+message.channel.id.toString()+">")
      .addField(`Mensaje Borrado :` , `${message.content}`, true)
      .setColor("#ff0000")
      if (message.attachments.first()) embed.setImage(message.attachments.first().url)
      if (message.length > 0) embed.addField(`Mensaje Borrado :` , `${message.content}`, true)
      canal.send(embed)
      return;
      }
      });
      bot.on('messageUpdate', (oldMessage, newMessage) => {
        if(oldMessage.guild.id !== '484414780619096064' && newMessage.guild.id !== '484414780619096064') return
        if (oldMessage.embeds.length > 0) return
        var canal = bot.channels.get('485397704164507649')
        const embed = new Discord.RichEmbed()
            .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
            .setTitle('Nuevo mensaje editado')
            .setDescription(`Antes: \`${oldMessage}\`.\n Después: \`${newMessage}\``, true)
            .addField(`Canal:`, `<#${oldMessage.channel.id}>`)
            .setThumbnail("https://i.imgur.com/RY6ywrT.png")
            .setTimestamp()
            .setColor("#ff0000");
        canal.send(embed)
    
    });

    bot.on('guildMemberUpdate', (oldMember, newMember) =>{
      if(oldMember.guild.id !== '504646616083333131' && newMember.guild.id !== '504646616083333131') return
      var canal = bot.channels.get('504646616083333131')
        const embed = new Discord.RichEmbed()
            .setTitle('Nuevo Nombre Actualizado')
            .setDescription(`Antes: \`${oldMember.displayName}\`\n Después: \`${newMember.displayName}\``, true)
            .setThumbnail("https://i.imgur.com/RY6ywrT.png")
            .setColor("#ff0000");
        canal.send(embed)
    });

      bot.on("error", (e) => console.error(e));

bot.on('message', (message) => {
  const content = message.content.split(' ').slice(1);
  const args = content.join(' ');
  const vap = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = vap.shift().toLowerCase();

  if (message.author.bot) return;
  if (message.channel.type === "dm") return message.reply('Por favor usa el servidor para mis comandos no privados.', bot.channels.get('484418797168754698').send(message.author.username+' Me escribió por privado esto : '+message.content+''))
  if(enlaces.some(p => message.content.toLowerCase().includes(p) && !message.content.includes("tenor") || message.guild.id !== '484414780619096064')){
    if(message.member.roles.find("name", "Fundador")) return;
     message.channel.send("¡Oh, no se permite los invites a otros servidores de Discord!!")
     .then(m => {
      m.delete(10000);

       });
       bot.channels.get('485260248001806347').send(message.author.username+' ha intentado hacer autopromoción en '+ "<#"+message.channel.id.toString()+">" + ' y puso esto: '+message.content)
     message.delete();
   } 
// Comienzo de base de datos mysql

if (message.author.bot) return; 
if (message.guild.id !== '484414780619096064') return 
var canal = bot.channels.get('484415756981895178')
sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
if (!row) {
  sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
} else {
  let curLevel = Math.floor(0.1 * Math.sqrt(row.points + 1));
  if (curLevel > row.level) {
    row.level = curLevel;
    sql.run(`UPDATE scores SET points = ${row.points + 1}, level = ${row.level} WHERE userId = ${message.author.id}`);
    var user = message.author;
    const embed = new Discord.RichEmbed() 
  .setTitle("Sistema de Exp")
  .setThumbnail("https://i.imgur.com/m7JsYb7.png")
  .addField(user.username , `Ahora eres nivel **${curLevel}** ¿No es genial?`, true)
  .setImage("https://i.imgur.com/e2NsbP7.gif")
  .setFooter("Para conocer tus puntos y nivel usa !exp ", "https://i.imgur.com/WZwon1a.png")
  .setColor("#ff0000")
  canal.send({embed});
    //message.reply(`You've leveled up to level **${curLevel}**! Ain't that dandy?`);
  }
  sql.run(`UPDATE scores SET points = ${row.points + 1} WHERE userId = ${message.author.id}`);
}
}).catch(() => {
console.error;
sql.run("CREATE TABLE IF NOT EXISTS scores (userId TEXT, points INTEGER, level INTEGER)").then(() => {
  sql.run("INSERT INTO scores (userId, points, level) VALUES (?, ?, ?)", [message.author.id, 1, 0]);
});
});
//if (!message.content.startsWith(prefix)) return;

if (message.content.startsWith(prefix + "exp")) {
sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
  if (!row) return message.reply("Tu nivel actual es 0");
  var user = message.author;
  const embed = new Discord.RichEmbed() 
  .setTitle("Sistema de Exp")
  .setThumbnail("https://i.imgur.com/m7JsYb7.png")
  .addField(user.username , `Tu nivel actual es ${row.level}\nActualmente tienes ${row.points} puntos`, true)
  .setColor("#ff0000")
  .setFooter("Mira el Ranking con !top ", "https://i.imgur.com/WZwon1a.png")
  message.channel.send({embed})
  .then(m => {
    m.delete(10000);

     });
  message.delete()
  //message.reply(`Tu nivel actual es ${row.level}`);
});
} else

if (message.content.startsWith(prefix + "puntos")) {
sql.get(`SELECT * FROM scores WHERE userId ="${message.author.id}"`).then(row => {
  if (!row) return message.reply("No tienes ningun punto actualmente");
   var user = message.author;
  //message.reply(`actualmente tienes ${row.points} puntos`);
  const embed = new Discord.RichEmbed() 
  .setTitle("Sistema de Exp")
  .setThumbnail("https://i.imgur.com/m7JsYb7.png")
  .addField(user.username , `Actualmente tienes ${row.points} puntos`, true)
  .setColor("#ff0000")
  message.channel.send({embed});
  message.delete()
});
}

/*if (message.content.startsWith(prefix + "top")) {
sql.all('SELECT * FROM scores ORDER BY points DESC LIMIT 5').then(row => {
  if (!row) return message.reply("No hay Tops");
  row.forEach(function (row) {
      const embed = new Discord.RichEmbed()
      
      .setTitle("Top Rank")
      .setColor(`RANDOM`)
      .setThumbnail("https://i.imgur.com/m7JsYb7.png")
      .setDescription(bot.users.get(row.userId).username  + ' | Puntos: ' + row.points + ' | Nivel: ' + row.level)
      message.channel.send(embed)
      message.delete()
    }) 
})
}*/
if (message.content.startsWith(prefix + "top")) {
  sql.all('SELECT * FROM scores ORDER BY points DESC LIMIT 10').then(row => {
    if (!row) return message.reply("No hay Tops");
      let top = []
      row.forEach(function (row, i) {
          top.push(`${i + 1}. ${bot.users.get(row.userId).username} | Puntos: ${row.points} | Nivel: ${row.level}`)
      }) 
      const embed = new Discord.RichEmbed()
      
    
      .setTitle("Top Ranking")
      .setColor(`RANDOM`)
      .setThumbnail("https://i.imgur.com/HiDqpMi.pngg")
      .setDescription(top.map(a => `${a}\n`), true)
      message.channel.send(embed);
      message.delete()
  })
  }

  /*setInterval(function(){
    sql.get(`SELECT * FROM scores WHERE points = 25`).then(row => {
      if (bot.users.get(row.userId).presence.status == "offline") {
          sql.run(`DELETE FROM scores WHERE userId=${row.userId}`)
      }
      if (!message.guild.members.get(row.userId)) {
          sql.run(`DELETE FROM scores WHERE userId=${row.userId}`)
      }
  });
   }, 600000);

 Se sube de nivel cada 100 puntos.. lo de abajo es opcional.., es para salvar espacio en glitch.com y RAM. Lo que vamos a ahcer es lo siguiente: Cada 10 minutos el bot checkeará si un usuario tiene 1 o menos puntos, si este no esta conectado el bot borra si fila, de esta forma salvamos espacio y RAM*/
/*
setInterval(function(){
 sql.get(`SELECT * FROM scores WHERE points == 1;`).then(row => {
     if (client.users.get(row.userId).presence.status == "offline") {
       sql.run(`DELETE FROM scores WHERE userId=${row.userId}`)
     }
        
    });
}, 600000);
*/
// Fin de base de datos mysql
// Comando rank de saldo bancario

if (command == "lum") {
  sql2.all('SELECT * FROM economy ORDER BY money DESC LIMIT 10').then(row => {
    if (!row[0]) return message.reply("No hay ranks");
      let top = []
      row.forEach(function (row, i) {
          top.push(`${i + 1}. ${bot.users.get(row.userID).username} | Saldo: ${row.money}`)
      })  
      const embed = new Discord.RichEmbed()
      
    
      .setTitle("Top Ranking")
      .setColor(`RANDOM`)
      .setThumbnail("http://i68.tinypic.com/2s6vce1.png")
      .setDescription(top.map(a => `${a}\n`), true)
      message.channel.send(embed);
      message.delete()
  })
  }

// Comando money & balance 

if (message.content.startsWith(prefix + 'money') || message.content.startsWith(prefix + 'balance')) {    
message.delete()
let userm = message.mentions.users.first()
//if(!userm) return message.reply("Añade un usuario")
  var user = message.author
  economy.fetchBalance(userm ? userm.id : user.id).then((i) => {
const embed = new Discord.RichEmbed()
  .setDescription(`**${message.guild.name} Bank**`)
  .setColor(0xD4AF37) 
  .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
  .setThumbnail("http://i65.tinypic.com/2dsn7yt.png")
  .addField('Titular de la cuenta',userm ? userm.username : user.username,true) 
  .addField('Saldo de la cuenta',i.money+' <:lumen:486413721686769675>',true)
message.channel.send(embed);
})
}

// Comando Add / Remove Money For Admins

if (message.content.startsWith(prefix + 'setbal')){
message.delete()
let Usuario = '';
let dinero = message.content.slice(prefix.lenght).split(" ");
let argsdinero = dinero.slice(1);

// Check if they have the modRole
if (!message.member.roles.find(a => a.name === modRole)) { 
message.channel.send("⛔ **ERROR** No tienes permiso para ejecutar este comando!");
return;
}

// Check if they defined an amount
if (!argsdinero[0]) {
message.channel.send(`**Necesitas definir una cantidad. Uso: ${prefix}setbal <cantidad> <user>**`);
return;
}

// We should also make sure that args[0] is a number
if (isNaN(argsdinero[0])) {
message.channel.send(`**La cantidad tiene que ser un número. Uso: ${prefix}setbal <cantidad> <user>**`);
return; 
}

// Check if they defined a user
if(!argsdinero[1]) {
Usuario = message.author;
} else{
let UsuarioMencionado = message.mentions.users.first();
Usuario = UsuarioMencionado
}
economy.updateBalance(Usuario.id, parseInt(argsdinero[0])).then((i) => {    
message.channel.send(`El usuario: <@${Usuario.id}> ha recibido: ` + `${argsdinero[0]} <:lumen:486413721686769675>` + ` en su cuenta!`)

});

}

// Comando pay

if (message.content.startsWith(prefix + 'pay')){
message.delete()
let autor = message.author
let usuario = message.mentions.users.first()
if(!usuario) return message.channel.send('Debes mencionar a un usuario')
let dinero = message.content.slice(prefix.lenght).split(" ");
let argsdinero = dinero.slice(2);

if (!argsdinero[0]) {
message.channel.send(`**Necesitas definir una cantidad.  Uso: ${prefix}pay <user> <cantidad>**`);
return;
}

// We should also make sure that args[0] is a number
if (isNaN(argsdinero[0])) {
message.channel.send(`**La cantidad tiene que ser un número.  Uso: ${prefix}pay <user> <cantidad>**`);
return; 
}
economy.fetchBalance(autor.id).then((i) => {
let trasf = i.money + 15
let dinerotransf = parseInt(argsdinero[0]) + 15
if(dinerotransf > i.money) return message.reply('No tienes suficiente dinero')
economy.updateBalance(usuario.id, parseInt(argsdinero[0]))
economy.updateBalance(autor.id, -dinerotransf).then(() => {
const embed = new Discord.RichEmbed()
          
            .setColor(0x00AE86)
            .setThumbnail("http://i65.tinypic.com/2dsn7yt.png")
            .setTitle('Transferencia')
            .setDescription('Se han cobrado unas tasas de 15 <:lumen:486413721686769675> para el mantenimiento del servidor')
            .addField('Remitente', message.author.username, true)
   .addField('Destinatario', usuario.username, true)
  .addField('Transferencia', argsdinero[0])
           message.channel.send({embed});
})
})
}

// Comando work

if (message.content.startsWith(prefix + 'work')){
message.delete()
let sueldo = Math.floor(Math.random() * 500)

if(cooldown4.has(message.author.id)){
message.channel.send(message.author.username+ " utiliza el comando despues de 8 horas! Has trabajado suficiente por hoy ..");
return;
}
economy.updateBalance(message.author.id, parseInt(sueldo)).then(() => {    
message.reply(` Has trabajado duro y has ganado ` + `${sueldo} <:lumen:486413721686769675>`)
cooldown4.add(message.author.id);
  setTimeout(() => {
  cooldown4.delete(message.author.id);
  message.reply(" puedes volver a trabajar").then((msg) => {
    msg.delete(10000)
    })
  }, 2.88e+7);
});
}

//  Comando daily

if (message.content.startsWith(prefix + 'daily')){
message.delete()
let sueldo = 250

if(cooldown3.has(message.author.id)){
message.channel.send(message.author.username+ " utiliza el comando despues de 24 horas! Para cobrar tu sueldo diario ...");
return;
}
economy.updateBalance(message.author.id, parseInt(sueldo)).then(() => {    
message.reply(` Has cobrado tu sueldo diario de ` + `${sueldo} <:lumen:486413721686769675> `)
cooldown3.add(message.author.id);
  setTimeout(() => {
  cooldown3.delete(message.author.id);
  message.reply(" puedes volver a cobrar tu sueldo").then((msg) => {
    msg.delete(10000)
    })
  }, 8.64e+7);
});
}

// Commando minar facil 

if (message.content.startsWith(prefix + "minar")) {
  message.delete()
  let coste = -100;
  economy.fetchBalance(message.author.id).then((i) => {
      if (i.money < 100) { //Puedes poner cualquier precio
        return message.channel.send("❌ No tienes suficiente dinero.")
      }
var materiales = ["<:diamante:506574063754280974>", "<:rubi:506574064110927902>","<:bronce:506574063754412052>","<:iron:506574063733309441>","<:oro:506574063519662081>","<:piedra:506583559402946577>"];
var herramientas = ["<:picomadera:506574064031367199>", "<:picohierro:506574063540502529>","<:picodiamante:506574063972515849>","<:picooro:506574063955738630>","<:picorubi:506574063984967715>"];
const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
                .setTitle(herramientas[Math.floor(Math.random() * herramientas.length)] + ' ' + ' |  Mineria')
                .setDescription('¡Felicitaciones '+message.author.username+' Has Minado : '+ materiales[Math.floor(Math.random() * materiales.length)]+'')
                economy.updateBalance(message.author.id, parseInt(coste)).then((o) => {console.log(o)})
                   message.channel.send({embed});
                   message.channel.send("📦 Has pagado **100** <:lumen:486413721686769675> por el comando 'minar'.").then((msg) => {
                      msg.delete(10000)
                      })
                   
                   });
}

  if (message.content.startsWith(prefix + 'vote')) {
    message.channel.send('Comando deshabilitado temporalmente');
  message.delete()
  }
  if(message.content.startsWith(prefix + 'apoyo')) { 
    const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .setDescription("Si te gusta el trabajo desempeñado por mi compañero , es tan simple com hacer una donación [aqui](https://www.paypal.me/JoseAlfonsoA). Asegúrese de incluir cierta información (nombre de usuario de Discord) para que podamos agradecerselo mil veces. ¡Gracias por todo tu apoyo! ")
  .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
  .setTimestamp()
     message.channel.send({embed});
  message.delete()
    
  }
  if (message.content.startsWith(prefix + 'test')){
    let defaultChannel = "484415601037803530";
    bot.channels.get(defaultChannel).send("```Recordad que vosotros mismos podeis crear las actividades mediante el comando !lfg create en #comandos-bots. Encontrareis una guia detallada en #faqs donde se os enseña como hacer uso de ciertos comandos . Que pasen un buen dia y nos vemos en la torre Guardi@ns.```")
.then(m => {
    m.delete(600000);

     });

     message.delete()

    }
    if (message.content.startsWith(prefix + 'poll')){
      if(!args) return message.channel.send('Agrege una pregunta para la encuesta.')
  
  const embed = new Discord.RichEmbed()
        .setAuthor('Pregunta:')
        .setDescription('**'+args+'**')
        .addField('Opcion 1', '1\u20e3 Si')
        .addField('Opcion 2', '2\u20e3 No')
        .addField('Opcion 3', '3\u20e3 Paso')
        .setColor(0xff4d4d)
        .setTimestamp()
  
  message.channel.send({embed})
  .then(m => {
          m.react("1\u20e3");
          m.react("2\u20e3");
          m.react("3\u20e3");
          message.delete()
  
  });
      }
      if (message.content.startsWith(prefix + 'galleta')){
      let user = message.mentions.users.first();
  let razon = args.split(' ').slice(1).join(' ');
  
  if(!user) return message.channel.send('Mencione a un usuario.');
      
  if(!razon){
    razon ='Ninguno';
  
  }
  message.channel.send('**'+ user.username +',** toma una :cookie: de **'+message.author.username+'**\n\n**Razón:** '+razon+'\n(づ｡◕‿‿◕｡)づ:･ﾟ✧ :cookie:');
  message.delete()
      }
      if (message.content.startsWith(prefix + 'amor')){
      let users = message.mentions.users.map(m => m.username).join(' y ');
      if(!users) return message.channel.send('Mencione a dos usuarios para calcular');
          
      const random = Math.floor(Math.random() * 100);
      let heard = "";
       
          if(random < 50){
              heard=':broken_heart:';
      
          }else if(random < 80){
              heard=':sparkling_heart: ';
              
          }else if(random < 101){
              heard=':heart:';
      
          }
                  
      const embed = new Discord.RichEmbed()
          .setAuthor('El porcentaje de amor de '+users+' es:')
          .setDescription(heard+' **'+random+' %**'+' '+heard)
          .setColor(0xff4d4d)
      
      message.channel.send({embed});
      message.delete()
        }
    /*
    if (message.author.bot) return;
        if (message.content.startsWith(prefix + 'vote')) {
          if (message.channel.type === "text") return message.reply('Por favor usa este comando por privado')
      var canal = bot.channels.get('427207548459024394')
      var canal2 = bot.channels.get('427223226863714306')
      //let user = message.mentions.users.first();
     let msg = args.split("|");
     let razon = msg[1]
     let razon2 = msg[2]
     let razon4 = msg[0]
     let id = msg[3]
       if(!args) return message.channel.send(`Formato incorrecto Usa : !vote Usuario escrito sin @|razon|10/10|id de la raid Ejemplo : !vote El Rincon Gamer|Me parece un buen guia por bla bla bla|10/10|id de la raid.`);
       //if (!razon4) return message.reply('Debe mencionar a alguien.');
       if(!razon) return message.channel.send('Escriba su razon de por que vota al usuario');
       if(!razon2) return message.channel.send('Escriba su valor ejemplo 10/10');
       if(!id) return message.channel.send('Escriba la id de la escuadra.');
     message.channel.send("Tu voto ha sido enviado. ** Este mensaje se auto-destruira en 10 segundos**")
     .then(m => {
         m.delete(10000);
       });
       const embed = new Discord.RichEmbed()
       .setColor(0x00AE86)
       .setTitle("Votado por : Anonimo " )
       .addField(":bust_in_silhouette: Usuario Votado :", razon4, true)
       //.addField(":id: ID :", user.id, true)
       .addField(":page_facing_up: ID Escuadra :", id, true)
       .addField(":page_facing_up: Razón :", razon, true)
       .addField(":page_facing_up: Valor :", razon2, true)
       .setThumbnail("https://i.imgur.com/BwazaMv.png")
       .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
       .setTimestamp()
       const embed2 = new Discord.RichEmbed()
       .setColor(0x00AE86)
       .setTitle(":card_box: Voto")
       .setDescription("Su voto fue generado")
       .addField(":clipboard: Detalles : ", "▔▔▔▔▔▔▔▔▔▔▔▔▔▔" , true)
       .addField("Usuario Votado :", razon4, true)
      // .addField(":id: ID :", user.id, true)
       .addField(":page_facing_up: ID Escuadra :", id, true)
       .addField(":page_facing_up: Razón :", razon, true)
       .addField(":page_facing_up: Valor :", razon2, true)
       .addField(":bar_chart: Estado", " Su voto a sido enviado y publicado", true)
       .setThumbnail(`${message.author.avatarURL}`)
       .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
       .setTimestamp()
       const embed3 = new Discord.RichEmbed()
       .setColor(0x00AE86)
       .setTitle("Votado por : " + message.author.username)
       .addField(":bust_in_silhouette: Usuario Votado :", razon4, true)
       //.addField(":id: ID :", user.id, true)
       .addField(":page_facing_up: ID Escuadra :", id, true)
       .addField(":page_facing_up: Razón :", razon, true)
       .addField(":page_facing_up: Valor :", razon2, true)
       .setThumbnail("https://i.imgur.com/BwazaMv.png")
       .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
       .setTimestamp()
       canal2.send(embed3)
       message.author.send(embed2)
       canal.send(embed)
       message.delete();
     }
    if (message.channel.type === "dm") return message.reply('Por favor usa el servidor para mis comandos no privados.', bot.channels.get('420744794546110464').send(message.author.username+' Me escribió por privado esto : '+message.content+''))

if (message.content.startsWith(prefix + 'reporte')) {
 var canal = bot.channels.get('398880856111841300')
 let user = message.mentions.users.first();
let msg = args.split("|");
let razon = msg[1]
 let link = msg[2]
  if(!args) return message.channel.send(`Formato incorrecto Usa : !reporte @user|razon|<link de las pruebas> Ejemplo : !reporte @El Rincon Gamer|Le da like a mis mensajes|https://i.imgur.com/imVZYxZ.png (si no la hay pon no hay sin <>).`);
  if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
  if(!razon) return message.channel.send('Escriba su razon de por que reporta al usuario');
  if(!link) return message.channel.send('Mande una prueba de por que reporta al usuario');
message.channel.send("Tu reporte ha sido enviado. ** Este mensaje se auto-destruira en 10 segundos**")
.then(m => {
    m.delete(10000);
  });
  const embed = new Discord.RichEmbed()
  .setColor(0x00AE86)
  .setTitle("Reportado por : " + message.author.username)
  .addField(":bust_in_silhouette: Usuario Reportado :", user.username+'#'+user.discriminator, true)
  .addField(":id: ID :", user.id, true)
  .addField(":page_facing_up: Razón :", razon, true)
  .addField(":paperclip: Prueba :", `[link](${link}) `, true)
  .setThumbnail("https://i.imgur.com/dumbAMx.jpg")
  .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
  .setTimestamp()
  canal.send({embed})
  bot.channels.get('398880856111841300').send("Codigo : `"+args+"|Razon`")

  message.delete();
}
if (message.content.startsWith(prefix + 'reporte')) {
  let user = message.mentions.users.first();
let msg = args.split("|");
let razon = msg[1]
 let link = msg[2]
     const embed = new Discord.RichEmbed()
   .setColor(0x00AE86)
   .setTitle(":card_box: Reporte")
   .setDescription("Su reporte fue generado")
   .addField(":clipboard: Detalles : ", "▔▔▔▔▔▔▔▔▔▔▔▔▔▔" , true)
   .addField("Usuario Reportado :", user.username+'#'+user.discriminator, true)
   .addField(":id: ID :", user.id, true)
   .addField(":page_facing_up: Razón :", razon, true)
   .addField(":paperclip: Prueba :", `[link](${link}) `, true)
   .addField(":bar_chart: Estado", " En Verificación (este proceso puede tardar en función a los reportes generados)", true)
   .setThumbnail(`${message.author.avatarURL}`)
   .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
   .setTimestamp()
   message.author.send({embed})
   
 }
if (message.content.startsWith(prefix + 'acreporte')) {
  let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");
  if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
  var canal = bot.channels.get('423146656259899413')
  let user = message.mentions.users.first();
 let msg = args.split("|");
 let razon = msg[1]
  let link = msg[2]
   if(!args) return message.channel.send(`Formato incorrecto Usa : !acreporte","Acepta un reporte de usuario con el codigo proporcionado en la parte inferior del reporte principal`);
   if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
   if(!razon) return message.channel.send('Escriba su razon de por que reporta al usuario');
   if(!link) return message.channel.send('Mande una prueba de por que reporta al usuario');
 message.channel.send("Tu reporte ha sido enviado. ** Este mensaje se auto-destruira en 10 segundos**")
 .then(m => {
     m.delete(10000);
   });
   const embed = new Discord.RichEmbed()
   .setColor(0x33ff00)
   .setTitle("✅Aceptado por : " + message.author.username)
   .addField(":bust_in_silhouette: Usuario Reportado :", user.username+'#'+user.discriminator, true)
   .addField(":id: ID :", user.id, true)
   .addField(":page_facing_up: Razón :", razon, true)
   .addField(":paperclip: Prueba :", `[link](${link})`, true)
   .setThumbnail("https://i.imgur.com/dumbAMx.jpg")
   .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
   .setTimestamp()
   canal.send({embed})
   message.delete();
 }
 if (message.content.startsWith(prefix + 'acreporte')) {
  let user = message.mentions.users.first();
let msg = args.split("|");
let razon = msg[1]
 let link = msg[2]
     const embed = new Discord.RichEmbed()
   .setColor(0x00AE86)
   .setTitle("✅Aceptado por : " + message.author.username)
   .addField(":bust_in_silhouette: Usuario Reportado :", user.username+'#'+user.discriminator, true)
   .addField(":id: ID :", user.id, true)
   .addField(":page_facing_up: Razón :", razon, true)
   .addField(":paperclip: Prueba :", `[link](${link})`, true)
   .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
   .setThumbnail(`${message.author.avatarURL}`)
   .setTimestamp()
   message.author.send({embed})
   
 }
 if (message.content.startsWith(prefix + 'rzreporte')) {
  let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");
  if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
   var canal = bot.channels.get('423146866872418305')
  let user = message.mentions.users.first();
 let msg = args.split("|");
 let razon = msg[1]
  let link = msg[2]
  let razon3 = msg[3]
   if(!args) return message.channel.send(`Formato incorrecto Usa : !rzreporte","Rechaza un reporte de usuario con el codigo proporcionado en la parte inferior del reporte principal y añade "|Razon de por que rechazas el reporte"`);
   if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
   if(!razon) return message.channel.send('Escriba su razon de por que reporta al usuario');
   if(!link) return message.channel.send('Mande una prueba de por que reporta al usuario');
   if(!razon3) return message.channel.send('Escriba su razon de por que rechaza el reporte del usuario');

   message.channel.send("Tu reporte ha sido enviado. ** Este mensaje se auto-destruira en 10 segundos**")
 .then(m => {
     m.delete(10000);
   });
   const embed = new Discord.RichEmbed()
   .setColor(0xff0000)
   .setTitle("❌Rechazado por : " + message.author.username)
   .addField(":bust_in_silhouette: Usuario Reportado :", user.username+'#'+user.discriminator, true)
   .addField(":id: ID :", user.id, true)
   .addField(":page_facing_up: Razón :", razon, true)
   .addField(":paperclip: Prueba :", `[link](${link}) `, true)
   .addField("❌ Razón del rechazo :", razon3, true)
   .setThumbnail("https://i.imgur.com/dumbAMx.jpg")
   .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
   .setTimestamp()
   canal.send({embed})
   message.delete();
 }
 if (message.content.startsWith(prefix + 'rzreporte')) {
  let user = message.mentions.users.first();
let msg = args.split("|");
let razon = msg[1]
 let link = msg[2]
 let razon3 = msg[3]
 const embed = new Discord.RichEmbed()
 .setColor(0xff0000)
 .setTitle("❌Rechazado por : " + message.author.username)
 .addField(":bust_in_silhouette: Usuario Reportado :", user.username+'#'+user.discriminator, true)
 .addField(":id: ID :", user.id, true)
 .addField(":page_facing_up: Razón :", razon, true)
 .addField(":paperclip: Prueba :", `[link](${link}) `, true)
 .addField("❌ Razón del rechazo :", razon3, true)
 .setThumbnail(`${message.author.avatarURL}`)
 .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
 .setTimestamp()
 message.author.send({embed})
 }
 if (message.content.startsWith(prefix + 'informe')) {
  message.channel.send('Comando deshabilitado temporalmente');
message.delete()
}

 if (message.content.startsWith(prefix + 'informe')) {
  if (hasRole(message.member, "[ Moderador ]") || hasRole(message.member, "MOD Destiny") || hasRole(message.member, "[ Lider Supremo ]") || hasRole(message.member, "Sherpa") || hasRole(message.member, "Apoyo IG")){
  var canal = bot.channels.get('398880856111841300')
  let user = message.mentions.users.first();
 let msg = args.split("|");
 let razon = msg[1]
 let razon2 = msg[2]
 let link = msg[3]
   if(!args) return message.channel.send(`Formato incorrecto Usa : !informe @tunombre|id de la raid|razon|link . Ejemplo : !informe Id de la raid|Hago este informe a peticion de bla bla bla bla|link de la imagen.`);
   if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.');
   if(!razon) return message.channel.send('Escriba la id de la escuadra');
   if(!razon2) return message.channel.send('Escriba su informe');
   if(!link) return message.channel.send('Mande una imagen de la escuadra');
 message.channel.send("Tu informe ha sido enviado. ** Este mensaje se auto-destruira en 10 segundos**")
 .then(m => {
     m.delete(10000);
   });
   const embed = new Discord.RichEmbed()
   .setColor(0x00AE86)
   .setTitle("Informe generado por : " + message.author.username)
   .addField(":page_facing_up: ID Escuadra :", razon, true)
   .addField(":page_facing_up: Razón :", razon2, true)
   .setImage(link)
   .setThumbnail("https://i.imgur.com/RY6ywrT.png")
   .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
   .setTimestamp()
   const embed2 = new Discord.RichEmbed()
   .setColor(0x00AE86)
   .setTitle(":card_box: Informe")
   .setDescription("Su informe fue generado")
   .addField(":clipboard: Detalles : ", "▔▔▔▔▔▔▔▔▔▔▔▔▔▔" , true)
   .setTitle("Informe por : " + message.author.username)
   .addField(":page_facing_up: ID Escuadra :", razon, true)
   .addField(":page_facing_up: Razón :", razon2, true)
   .setImage(link)
   .addField(":bar_chart: Estado", " Su informe a sido enviado y publicado", true)
   .setThumbnail(`${message.author.avatarURL}`)
   .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
   .setTimestamp()
   message.author.send(embed2)
   canal.send(embed)
   message.delete();
  } else {
    message.channel.send('Lo siento No eres Guía como para generar un informe.');
 }
}
/*

Lanza una moneda al azar, cara o sello usando Math.random()
en mensaje file
*/

if (message.content.startsWith(prefix + 'flip')) {
const coin = 
['https://cdn.discordapp.com/attachments/315914386944557056/369580701269360656/cara.png',
 'https://cdn.discordapp.com/attachments/315914386944557056/369580737919451137/sello.png'];


message.channel.send('**'+message.author.username+'** sacaste:',{files: [coin[Math.floor(coin.length * Math.random())]]});
message.delete()
}

/*if (message.content.startsWith(prefix + 'ausencia')) {
  let canal = (message.channel.id == '484415730566168587')
if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#483418779561492513>")
   if(!args) return message.channel.send('Escriba su ausencia de la siguiente forma !ausencia yaquitextodesuausencia');
 message.channel.send("Tu ausencia ha sido enviada  ** Este mensaje se auto-destruira en 10 segundos**")
 .then(m => {
     m.delete(10000);
   });
    bot.channels.get('481504553620209664').send(box +message.author.username+ " se ausentara por : " +args+box)
    message.delete()
    .then(m => {
      m.delete(604800000);
    });
}*/
if(message.content.startsWith(prefix + 'sinpoder')) { 
  const embed = new Discord.RichEmbed()

.setImage("https://i.imgur.com/7xmyV2H.jpg")
   message.channel.send({embed});
message.delete()
  
}  
if (message.content.startsWith(prefix + 'warnsend')) {
  let canal = (message.channel.id == '484415730566168587')
if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#484415730566168587>")
  let user = message.mentions.users.first()
  let razon = args.split(' ').slice(1).join(' ');
  if(!user) return message.channel.send('Mencione a un usuario.');
  if(!razon) return message.channel.send('Escriba la advertencia que quiere hacer llegar al staff sobre el jugador que la recibirá !warnsend @nombre 1/2 Razón');
message.channel.send("Tu advertencia ha sido enviada  ** Este mensaje se auto-destruira en 10 segundos**")
.then(m => {
    m.delete(10000);
  });
   bot.channels.get('484418797168754698').send(" <@&485041714747146255>  " +box +message.author.username+ " ha mandado una advertencia a " +user.username+ " : " +razon+box)
 message.delete();
}
  
 if (message.content.startsWith(prefix + 'sugerencia')) {
    let canal = (message.channel.id == '484418755816980491')
  message.delete()
if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#484418755816980491>")
    if(!args) return message.channel.send('Escriba lo que sugiere de la siguiente forma !sugerencia yaquitexto a sugerir');
 message.channel.send("Tu sugerencia ha sido enviada ** Este mensaje se auto-destruira en 10 segundos**")
 .then(m => {
     m.delete(10000);
   });
    bot.channels.get('484418755816980491').send(message.author.username+' Ha sugerido <:lumen:486413721686769675> - '+args)
  message.delete();
 }

  
  if (message.content.startsWith(prefix + 'ping')) {
        message.channel.send('Pong! Tu ping es de : `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
    message.delete()
  }
  if (message.content.startsWith(prefix + 'cafe')){
    message.channel.send('Buenos dias guardianes cafe para todos :coffee::coffee::coffee::coffee::coffee::coffee::coffee:');
    message.delete()
  }
  if(message.content.startsWith(prefix + 'emoji')){
    let emoji = bot.emojis.find("name", args) //Esto es busca un emoji de un servidor donde este tu bot
    if(!args) return message.channel.send('Falta el nombre del emoji')  //Esto envia un mensaje cuando falta el nombre de un emoji en el comando
    if(!emoji) return message.channel.send('No puedo usar ese emoji') //Esto envia un mensaje cuando el let emoji no encuentra ningun emoji
    message.channel.send(`${emoji}`) //Y esto obviamente envia el emoji
    message.delete()
    }
  if(message.content.startsWith(prefix + "showemojis")){
    const emoji = message.guild.emojis.map(e=>e.toString()).join(" ");
message.channel.send(emoji);
message.delete()
}
  if(message.content.startsWith(prefix + 'listemoji')) {
  let emojis = bot.emojis.map(nom =>''+nom.name+'').join(' , ');
  var embed = new Discord.RichEmbed()
  .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
      .setThumbnail("https://i.imgur.com/WZwon1a.png")
        .setTitle (`Lista de emoji , cada emoji es independiente. Usa : ejemplo !emoji nombreemoji [${bot.emojis.size}]`)
        .setDescription(emojis)
    message.channel.send(embed)
    message.delete()
}
  
/*if(message.content.startsWith(prefix + 'magoz')){

    message.channel.send('NOTA: Las raid que aquí aparecen pueden no estar actualizadas.\nPara comprobar los huecos disponibles usar --> !lfg id en el canal <#483418779561492513>.\nPara poder entrar en alguna raid , tan solo deberéis poner --> !lfg join id en <#483418779561492513>. \nPara salirse de una escuadra utilizaremos el comando --> !lfg leave id en <#483418779561492513>.');
  
  
  message.delete()
}
  if(message.content.startsWith(prefix + 'pruebas')){

    message.channel.send('NOTA: Las pruebas que aquí aparecen pueden no estar actualizadas.\nPara comprobar los huecos disponibles usar --> !lfg id en el canal <#483418779561492513>.\nPara poder entrar en alguna raid , tan solo deberéis poner --> !lfg join id en <#483418779561492513>. \nPara salirse de una escuadra utilizaremos el comando --> !lfg leave id en <#483418779561492513>.');
  

  message.delete()
}*/


  if(message.content.startsWith(prefix + "ayuda")){
    let canal = (message.channel.id == '484415730566168587') 
  if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#484415730566168587>")
     message.reply("Revise sus mensajes directos para obtener ayuda. ** Este mensaje se auto-destruira en 10 segundos**")
     .then(m => {
         m.delete(10000);
       });
      
         const embed = new Discord.RichEmbed()
          .setColor(0x00AE174)
 .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
 .setThumbnail("https://i.imgur.com/RY6ywrT.png")
 .setTimestamp()
 .setTitle(":small_orange_diamond:Comandos de Ayuda:small_orange_diamond:")
 .setDescription("Lista de comandos de info")
 .addField("!cmd","Te Muestra una lista de comandos para @Espectro")
 .addField("!adm","Te Muestra una lista de comandos para Admins y Mods")
 .addField("!utils","Te cuenta un chiste al azar")
 .addField("!tracker","Pagina donde ver las estadisticas en crisol")
 .addField("!sets","Pagina donde ver los sets que disponemos")
 .addField("!apoyo","Muestra un mensaje de apoyo a su creador")
 .addField("!raidrep","Pagina donde ver estadisticas de raids")
  /*.addField("!sugerencia","<texto que quieres enviar para sugerir> por favor sin los <>")
 .addField("!ausencia","<texto que envias de por que te ausentas> por favor sin los <>")
 .addField("!reporte","!reporte @user|razon|<link de las pruebas> Ejemplo : !reporte @El Rincon Gamer|Le da like a mis mensajes|https://i.imgur.com/imVZYxZ.png (si no la hay pon no hay sin <>).")
.addField("!vote","Ejemplo : !vote @El Rincon Gamer|Me parece un buen guia por bla bla bla|10/10|id de la raid")
.addField("!wlist","Te proporciona una lista de usuarios con strikes")*/

    message.author.send({embed});
      message.delete()
      };
      if(message.content.startsWith(prefix + "utils")){
        let canal = (message.channel.id == '484415730566168587') 
      if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#484415730566168587>")
         message.reply("Revise sus mensajes directos para obtener ayuda. ** Este mensaje se auto-destruira en 10 segundos**")
         .then(m => {
             m.delete(10000);
           });
          
             const embed = new Discord.RichEmbed()
              .setColor(0x00AE174)
     .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
     .setThumbnail("https://i.imgur.com/RY6ywrT.png")
     .setTimestamp()
     .setTitle(":small_orange_diamond:Comandos de Utilidad:small_orange_diamond:")
     .setDescription("Lista de comandos de utils")
     .addField("!chiste","Te cuenta un chiste al azar")
     .addField("!autor","Conoce un poco mas a mi creador")
     .addField("!about","Te muestra mi informacion")
     .addField("!gifs","Te muestra una lista de gif")
     .addField("!galleta","!galleta @user razon ( Da una galleta al usuario q menciones con o sin razon )")
     .addField("!top","!top ( muestra los 5 usuarios con mas experiencia dentro de discord )")
     .addField("!flip","!flip ( lanza una moneda y cae cara o cruz )") 
     .addField("!bola8","!bola8 pregunta ( mitico juego de bola 8 donde te respondera una respuesta al azar )") 
     .addField("!amor","!amor @user y @user ( calcula un % de amor entre ellos )")
     .addField("!emoji","!emoji nombre . Muestra un emoji basandonos en la lista de nombres !listemoji") 
     .addField("!anime","!anime titulo ( Busca el anime en una base de datos y nos muestra su completa información )")
     .addField("!exp","Te muestra tu nivel y experiencia en Discord")
        message.author.send({embed});
          message.delete()
          };
      if(message.content.startsWith(prefix + "reset")){
        if(message.author.id !== "304456885191442442") return message.channel.send(":no_entry:  Lo siento este comando solo lo puede usar el owner")
        const embed = new Discord.RichEmbed()
        .setTitle("Desconectando... <:OFFNEP:420540795326562304>")
        .setDescription("reiniciando el bot para actualizar")
        .setThumbnail("https://i.imgur.com/IsapxnT.gif")
        message.channel.send({embed});
        message.delete()
    .then(() => {
        bot.destroy().then(() => {
            process.exit();
          }).catch((err) => {
            console.log(err);
        });
    });
      }
      if(message.content.startsWith(prefix + 'autor')) { 
        const embed = new Discord.RichEmbed()
    
      .setColor(0x00AE86)
      .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
      .setThumbnail("https://i.imgur.com/WZwon1a.png")
      .setTimestamp()
      .addField("Nombre :"," Jose Alfonso")
       .addField("Profesion : "," Desarrollador y Gamer en tiempos libres")
        .addField("Youtube : ","[My_PeSePe](https://www.youtube.com/user/ThePeSePe)")
         .addField("Twitter : ","[My_PeSePe](https://twitter.com/My_PeSePe)")
         .addField("Twitch : ","[My_PeSePe](https://twitch.com/MyPeSePe)")
         message.channel.send({embed});
      message.delete()
        
    }
 /*if(message.content.startsWith(prefix + "inactivo")){
  let miembro = message.mentions.members.first();
let nombrerol = args.split(' ').slice(1).join(' ');

let role = message.guild.roles.find("name", "Guardian");
let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");

if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro.').catch(console.error);
if(!nombrerol) return message.channel.send('Escriba el nombre del rol a eliminar.');
if(!role) return message.channel.send('Rol no encontrado en el servidor.');

    
miembro.removeRole(role);
message.delete()


 }*/
  
  if(message.content.startsWith(prefix + "welcome")){
  let miembro = message.mentions.members.first();
let nombrerol = args.split(' ').slice(1).join(' ');

let role = message.guild.roles.find("name", "Destiny");
let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");

if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
     
if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro.').catch(console.error);
if(!nombrerol) return message.channel.send('Escriba el nombre del rol a agregar.');
if(!role) return message.channel.send('Rol no encontrado en el servidor.');
    
miembro.addRole(role);
message.delete()
 }
  if(message.content.startsWith(prefix + "adm")){
     if (hasRole(message.member, "Colaborador") || hasRole(message.member, "Fundador")){
      message.reply("Revise sus mensajes directos para obtener ayuda. ** Este mensaje se auto-destruira en 10 segundos**")
      .then(m => {
          m.delete(10000);
        });
       
          const embed = new Discord.RichEmbed()
           .setColor(0x00AE174)
          .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
          .setThumbnail("https://i.imgur.com/WZwon1a.png")
          .setTimestamp()
          .setTitle(":no_entry: Comandos Administrativos :no_entry:")
          .setDescription("Una lista de comandos administrativos!:wrench:️")
          .addField("!clan status","Muestra una lista de gente inactiva del clan")
          .addField("!clan unregistered","Lista la gente que no esta registrada con @Espectro")
          .addField("!rename ","Cambia el apodo de un usuario con !rename @usuario Apodo nuevo")
          .addField("!welcome","Agrega un rol a un usuario ejem: !welcome @Juanito Destiny")
         /* .addField("!inactivo","Elimina un rol a un usuario ejem: !inactivo @Juanito Razon")*/
          .addField("!dice","Haz que el bot diga algo con su comando !dice Hola")
          /*.addField("!acreporte","Acepta un reporte de usuario con el codigo proporcionado en la parte inferior del reporte principal")
          .addField("!rzreporte","Rechaza un reporte de usuario con el codigo proporcionado en la parte inferior del reporte principal")
          .addField("!unwarn","Quita un strike a un usauario Ejem : !unwarn @user")
          .addField("!wremall","Borra toda la lista de strike existentes")
          .addField("!addwarn","Añade a un usuario un strike Ejem : !addwarn @user Razon incluyan el numero de raid en la razon")*/
  
 
     message.author.send({embed});
       message.delete()
     } else {
             message.channel.send('Lo siento No eres Administrador o Moderador.');
          }  
 } 
 if (message.content.startsWith(prefix + "bola8")) {
  let user = message.mentions.users.first();
var rpts = ["Es cierto", "Es decididamente así", "Sin duda", "Sí definitivamente", "Puedes confiar en ello", "Como yo lo veo, sí", "Más probable", "Perspectivas buena", "Sí", "Las señales apuntan a que sí", "Respuesta confusa, intenta otra vez", "Pregunta de nuevo más tarde", "Mejor no decirte ahora", "No se puede predecir ahora", "Concéntrese y pregunte de nuevo", "No cuentes con eso", "Mi respuesta es no", "Mis fuentes dicen que no", "Tal vez", "Muy dudoso"];

if (!args) return message.reply(`Escriba una pregunta.`);
const embed = new Discord.RichEmbed()
                .setColor(0x00AE86)
               //.setAuthor(user.username+'#'+user.discriminator, user.avatarURL)
                .setThumbnail("https://i.imgur.com/i7njcve.gif")
                .setDescription(''+message.member.user+' a su pregunta '+args+' mi respuesta es: '+ rpts[Math.floor(Math.random() * rpts.length)]+'')
                //.setFooter("EL Rincon Gamer© ", "https://i.imgur.com/FIrchx4.png")
                  // .setTimestamp()
                   message.channel.send({embed});
                   message.delete()
}
if(message.content.startsWith(prefix + 'anime')){
  if(!args) return message.channel.send('Uso: -anime <anime>')
const mal = require('mal-scraper') 
const translate = require('google-translate-api');
message.channel.send(':arrows_counterclockwise: Buscando..')
.then(m =>{
return mal.getInfoFromName(args).then((data) => {
translate(data.synopsis, {to: "es"}).then(res => {
const embed = new Discord.RichEmbed()
.setTitle(data.title)
.setURL(data.url)
.setDescription('**Sinopsis**\n'+ res.text)
.addField('Estado', data.status, true)
.addField('Episodios' , data.episodes, true)
.addField('Duración', data.duration, true)
.addField('Puntuación', data.score, true)
.addField('Calificación', data.rating, true)
.addField('Género', data.genres)
.addField('Trailer', data.trailer ? `[link al trailer](${data.trailer})` : `No hay trailer` )
.setThumbnail(data.picture)
.setImage(data.picture)
.setColor(0x66b3ff);
m.edit(embed)
message.delete()
})
})
.catch((err) => {
m.edit(":no_entry: No se han encontrado resultados!");
});
})
}
if (message.content.startsWith("what")) {
  const embed = new Discord.RichEmbed()
.setTitle("What?")
.setImage("https://media.giphy.com/media/q3EFPmq2BdKxy/giphy.gif")
message.channel.send({embed});
message.delete()
  }
 /*if(message.content.startsWith(prefix + "sherp")){
  if (hasRole(message.member, "Colaborador") || hasRole(message.member, "Fundador")){
   message.reply("Revise sus mensajes directos para obtener ayuda. ** Este mensaje se auto-destruira en 10 segundos**")
   .then(m => {
       m.delete(10000);
     });
    
       const embed = new Discord.RichEmbed()
        .setColor(0x00AE174)
.setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
.setThumbnail("https://i.imgur.com/WZwon1a.png")
.setTimestamp()
.setTitle(":no_entry: Comandos Administrativos :no_entry:")
.setDescription("Una lista de comandos administrativos!:wrench:️")
.addField("!informe", "Usa : !informe @tunombre|id de la raid|razon|link . Ejemplo : !informe Id de la raid|Hago este informe a peticion de bla bla bla bla|link de la imagen.")
.addField("!addwarn","Añade a un usuario un strike Ejem : !addwarn @user Razon incluyan el numero de raid en la razon")


  message.author.send({embed});
    message.delete()
  } else {
          message.channel.send('Lo siento No eres Guía como para generar un informe.');
       }  
} */
 if(message.content.startsWith(prefix + 'about')){
  message.delete()

  var server = message.guild;
const actividad = moment.duration(bot.uptime).format(" D [dias], H [hrs], m [mins], s [secs]");
const embed = new Discord.RichEmbed()
.setColor(0x66ff66)

.setAuthor(`Bot info`, bot.user.avatarURL)
.setThumbnail("https://i.imgur.com/WZwon1a.png")
.addField(`Dueño`, `My_PeSePe`, true)
.addField(`Version`, `3.5.8`, true)
.addField(`Librerias`, `Discord ^11.3.2 (Js)`, true)
.addField('Packages (3)','\nmoment\nmoment-duration-format\nfile-system', true)
.addField(`Memoria`, `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true)
.addField(`Tiempo Online`, `${actividad}`, true)
message.channel.send({embed});
  }
  if(message.content.startsWith(prefix + "porn")){
    if(message.channel.nsfw == false) return message.channel.send("Esto no es un canal nsfw!")
    const randomPuppy = require('random-puppy');
  
    randomPuppy("porn").then(url =>{
  
      const embed = new Discord.RichEmbed()
    
      .setImage(url)
         message.channel.send({embed});
         message.delete(); 
      }).catch(err => message.channel.send(" Error! prueba otra vez."));
  }
    if (message.content.startsWith(prefix + "chiste")) { 
    	var sayings =                  ["- ¡Qué metal más raro! - Es estaño - ¿¿A que sí??",
                                        "- Me he comprado un coche de los que se conducen solos. - ¿Y dónde está?  - ¡¡Yo que sé!!",
                                        "- Me he comprado unas Nike en la tienda de deportes de el centro. - ¿Air Max?  - Air muchax max.",
                                        "- María, dime la verdad, ¿cuantos años tienes?  - 25.  - ¡Pero si me dijiste 25 el año pasado!  - ¡A ver si te piensas que soy de esas que primero dice una cosa y después otra!",
                                        "- ¿Cuánto cuesta esta estufa?  - 5.000 euros.  - ¡Pero, oiga, esto es una estafa!  - No, señor, esto es una estufa.",
                                        "-Se abre el telón y aparece un chino tocando un arpa.  ¿Cómo se llama el actor de la película?  Alpa chino.",
                                        "-¿Cómo se dice chino marinero pobre?  Chin chu lancha.",
                                        "- Cariño, ¿qué me vas a regalar por mi cumpleaños? - ¿Ves ese coche de allí?  - ¡¡Síiii!!!  - Pues una licuadora del mismo color.",
                                        "- Yo me río de la gente competitiva. - Yo también. - Ja, ja. - Ja, ja, ja, ja. - Ja, ja, ja, ja, ja. - Ja, ja, ja, ja, ja, ja, ja, ja...",
                                        "- ¿Y dice que sabe de historia del arte? - Sí, soy un experto.  - ¿Y qué opina del Renacimiento?  - ¡Que es imposible! Si te mueres, te mueres.",
                                        "- ¿A dónde le llevo? - ¡¡A donde le dicte su corazón y le lleve el alma!!  - Menos bromitas y bájese del taxi, por favor.",
                                        "-¿En qué se parece una moto y un váter? En la moto te sientas para correr y al váter corres para sentarte. ",
                                        "-¿En qué se parece la campana al papel higiénico? En que una hace 'tilín tilín' y el otro 'tilimpia'.",
                                        "- ¡Soldado López! - ¡Sí, mi capitán!  - No lo vi ayer en la prueba de camuflaje.  - ¡Gracias, mi capitán!",
                                        "- Ayer llamé a la policía porque unos ladrones robaron en mi casa y se llevaron hasta los vasos. - ¿Y los detuvo? -Sí, sí, los de tubo también.",
                                        "- Jefe, este mes me ha pagado de menos. - Pero el mes pasado le pagué de más. - Sí, un error se entiende pero dos...",
                                        "-Inteligencia: 'Cualidad intelectual que atribuimos a quienes están de acuerdo con nosotros'",
                                        "-Una mujer le dice su marido: - Cariño, ¿en qué piensas...? Y el marido contesta agobiado: - No sé, déjame un rato. ¿Tú qué eres? ¿El facebook? ",
                                        "- Papá, ya ha salido el móvil ese con el que estás tan obsesionado… - ¡No digas tonterías, Alfonsiete!",
                                        "- ¡¡Oye!! ¿¿¿Pero por qué golpeas a ese maniquí??? - ¡¡¡¡¡Arrrrrrrg!!!!! ¡¡Es que no soporto a la gente falsa!!"];

			var result = Math.floor((Math.random() * sayings.length) + 0);
			message.channel.send(sayings[result]);
      message.delete()
            
} 
if(message.content.startsWith(prefix + 'botinfo')) { 
  let canal = (message.channel.id == '484415730566168587')
  message.delete()
if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#484415730566168587>")
  
    const embed = new Discord.RichEmbed()
    
  .setColor(0x00AE86)
  .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
  .setThumbnail("https://i.imgur.com/WZwon1a.png")
  .setTimestamp()
  .addField("Nombre :"," Sagira")
   .addField("Profesion : "," Espectro Guia")
    .addField("Version : "," 3.5.8")
     .addField("Descripcion : "," Bot en fase de desarrollo que te ayuda a seguir tu camino en Destiny")
     message.channel.send({embed});
    message.delete()
}
  if(message.content.startsWith(prefix + 'gifs')) { 
  let canal = (message.channel.id == '484415730566168587')
  message.delete()
if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#484415730566168587>")
    const embed = new Discord.RichEmbed() 
  .setColor(0x00AE174)
  .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
  .setThumbnail("https://i.imgur.com/WZwon1a.png") 
  .setDescription("!facepalm \n!remo\n!espec\n!gdestiny\n!barricada\n!diosmio\n!nop\n!cine\n!palomitas\n!hi")
     message.channel.send({embed});
  message.delete()   
}
  if(message.content.startsWith(prefix + 'sets')){ 
    const embed = new Discord.RichEmbed()
      .setColor (0x00ffff)
      .setTitle ("Destiny  Sets")
      .setURL  ("https://destinysets.com")
      .setDescription(":point_up_2: Pagina donde ver los sets que disponemos")
    message.channel.send({embed});
    message.delete()
  }
  if(message.content.startsWith(prefix + 'tracker')){ 
    const embed = new Discord.RichEmbed()
      .setColor (0x00ffff)
      .setTitle ("Destiny  Tracker")
      .setURL  ("https://destinytracker.com")
      .setDescription(":point_up_2: Pagina donde ver las estadisticas en crisol")
    message.channel.send({embed});
    message.delete()
  }
  if(message.content.startsWith(prefix + 'raidrep')){ 
    const embed = new Discord.RichEmbed()
      .setColor (0x00ffff)
      .setTitle ("Destiny  Raid Report")
      .setURL  ("https://raid.report/")
      .setDescription(":point_up_2: Pagina donde ver las raid echas o estadisticas")
    message.channel.send({embed});
    message.delete()
  }
   /*if(message.content.startsWith(prefix + 'comunicado')){
    let emojis = [];
    const nombres = ["emblema", "zfacepalm", "zavalaS", "gZbDwV6", "fAUJu07", "ztCERxx", "JpmD3zK", "EhE9LHz"]
    for(let i = 0, num = nombres.length; i < num; i++){
        emojis.push(bot.emojis.find("name", nombres[i]))
    }
    message.channel.send(`${args}`)
    .then(m => {
      for(index in emojis){
          m.react(emojis[index]);
      }
    });
}*/
   if(message.content.startsWith(prefix + 'eval')){
    if (message.author.id !== '304456885191442442' ) return message.channel.send("Este Comando Solo Lo Puede Usar El Owner Del BOT");  
  let limit = 1950;
  try {
      let code = args;
      let evalued = eval(code);
      if (typeof evalued !== "string")
          evalued = require("util").inspect(evalued);
      let txt = "" + evalued;
      if (txt.length > limit) {
          message.channel.send(`\`\`\`js\n ${txt.slice(0, limit)}\n\`\`\``);
      }
      else
          message.channel.send(`\`\`\`js\n ${txt}\n\`\`\``);
  } catch (err) {
      message.channel.send(`\`ERROR\` \`\`\`js\n${err}\n\`\`\``);
  }
}
   
   
if(message.content.startsWith(prefix + 'dice')){
  let perms = message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS");
  if(!perms) return message.channel.send("Sorry este comando no es para ti");
  if(!args) return message.channel.send(`Escriba un contenido pára decir.`);
message.channel.send(`${args}`);
    message.delete()
  
}

if(message.content.startsWith(prefix + 'welcome')){
  let user = message.mentions.users.first();
  let emojis = [];
    const nombres = ["guardins", "cayde_thumbsup", "petra", "shaxx_amazing", "rahool", "xursday", "lumen"]
    for(let i = 0, num = nombres.length; i < num; i++){
        emojis.push(bot.emojis.find("name", nombres[i]))
    }
        //if (!args) return message.channel.send('**Menciona a un miembro**')
  if(!user) return message.channel.send('Mencione un usuario.');
  bot.channels.get('484415601037803530').send(`<@${user.id}> Bienvenid@ , para cualquier duda puedes escribir !ayuda en <#484415730566168587>, recuerda leer las <#484426146763505664> `)
        .then(m => {
          for(index in emojis){
              m.react(emojis[index]);
          }
        });
      }
if(message.content.startsWith(prefix + 'facepalm')) { 
    const embed = new Discord.RichEmbed()
  
  .setImage("https://i.imgur.com/6JUAQ4G.gif")
     message.channel.send({embed});
  message.delete()
    
}  
  if(message.content.startsWith(prefix + 'barricada')) { 
    const embed = new Discord.RichEmbed()
  
  .setImage("https://i.imgur.com/h87bIVI.gif")
     message.channel.send({embed});
  message.delete()
    
} 
  
  if(message.content.startsWith(prefix + 'nop')) { 
    const embed = new Discord.RichEmbed()
  
  .setImage("https://i.imgur.com/yc6L0yi.gif")
     message.channel.send({embed});
  message.delete()
    
} 
    if(message.content.startsWith(prefix + 'hi')) { 
    const embed = new Discord.RichEmbed()
  
  .setImage("https://i.imgur.com/uKRWSdn.gif")
     message.channel.send({embed});
  message.delete()
    
} 
  if(message.content.startsWith(prefix + 'palomitas')) { 
    const embed = new Discord.RichEmbed()
  
  .setImage("https://media.giphy.com/media/tyqcJoNjNv0Fq/giphy.gif")
     message.channel.send({embed});
  message.delete()
    
}  
    if(message.content.startsWith(prefix + 'cine')) { 
    const embed = new Discord.RichEmbed()
  
  .setImage("https://i.imgur.com/z1Xq2ck.gif")
     message.channel.send({embed});
  message.delete()
    
}  
  if(message.content.startsWith(prefix + 'diosmio')) { 
    const embed = new Discord.RichEmbed()
  
  .setImage("https://i.imgur.com/2rErjWe.gif")
     message.channel.send({embed});
  message.delete()
    
}  
  if(message.content.startsWith(prefix + 'remo')) { 
    const embed = new Discord.RichEmbed()
  
  .setImage("https://i.imgur.com/LEHkpS1.png")
     message.channel.send({embed});
  message.delete()
    
} 
    if(message.content.startsWith(prefix + 'espec')) { 
    const embed = new Discord.RichEmbed()
  
  .setImage("https://i.imgur.com/T7LIOsi.gif")
     message.channel.send({embed});
  message.delete()
    
} 
  if(message.content.startsWith(prefix + 'gdestiny')) { 
    const embed = new Discord.RichEmbed()
  
  .setImage("https://i.imgur.com/8KIDMHl.gif")
     message.channel.send({embed});
  message.delete()
    
} 
  if(message.content.startsWith(prefix + 'guild')){ 
    const embed = new Discord.RichEmbed()
      .setColor (0x00ffff)
      .setTitle ("The Guardi@ns")
      .setURL  ("https://www.bungie.net/es/ClanV2?groupid=2998936")
    message.channel.send({embed});
    message.delete()
  }
  
 if(message.content.startsWith(prefix + 'registro')) { 
   let canal = (message.channel.id == '484415730566168587')
  message.delete()
if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#484415730566168587>")
    const embed = new Discord.RichEmbed()
  
  .setColor(0x00AE174)
  .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
  .setThumbnail("https://i.imgur.com/WZwon1a.png") 
  .setDescription("-Registro:\nRegistrar tu cuenta de Bungie en Charlemagne te permitirá utilizar sus comandos sin introducir tu perfil de Destiny cada vez\nTambien te añadirá a la tabla de clasificacion y rankings de tu servidor/clan.\nPara registrarte usa el comando:\n!register\nCharlemagne te mandará un mensaje directo con un URL para registrarte. Este paso es exclusivo y unico para cada usuario y debe ser tratado como tal.")
     message.channel.send({embed});
   message.delete()
    
}  
if(message.content.startsWith(prefix + 'vendedores')) { 
  let canal = (message.channel.id == '484415730566168587')
  message.delete()
if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#484415730566168587>")
    const embed = new Discord.RichEmbed()
  
  .setColor(0x00AE174)
  .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
  .setThumbnail("https://i.imgur.com/WZwon1a.png") 
  .setDescription("!eververse : Muestra los productos en venta y otra información.\n!gunsmith : Muestra los mods disponibles en el armero (tambien el numero de mods que posees).\n!xur : Muestra el inventario actual de Xur.")
     message.channel.send({embed});
  message.delete()
    
}
if(message.content.startsWith(prefix + 'colección')) { 
  let canal = (message.channel.id == '484415730566168587')
  message.delete()
if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#484415730566168587>")
    const embed = new Discord.RichEmbed()
  
  .setColor(0x00AE174)
  .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
  .setThumbnail("https://i.imgur.com/WZwon1a.png") 
  .setDescription("!collection : Muestra las estadisticas de tu collección de objetos.\n!collection emote  : Muestra la lista de tu colección de gestos.\n!collection armor  : Muestra la lista de tu colección de armaduras.\n!collection weapon : Muestra la lista de tu colección de armas.\n!collection emblem : Muestra la lista de tu colección de emblemas.\n!collection catalysts : Muestra tu colección de catalizadores.\n!collection node : Muestra tu colección de nodos.\n!triumphs : Muestra tu progreso con el cuaderno del triunfo.\n!triumphs event : Muestra los eventos del triunfo \n !triumphs activities : Muestra las actividades del triunfo.\n!triumphs general : Muestra toda la información sobre el triunfo.\n!collection memories : Muestra tu colección de memorias de Ana Bray.")
     message.channel.send({embed});
  message.delete()
    
}
if(message.content.startsWith(prefix + 'meta')) { 
  let canal = (message.channel.id == '484415730566168587')
if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#484415730566168587>")
    const embed = new Discord.RichEmbed()
  
  .setColor(0x00AE174)
  .setFooter("Sagira©", "https://i.imgur.com/WZwon1a.png")
  .setThumbnail("https://i.imgur.com/WZwon1a.png") 
  .setTitle("El comando !meta muestra una lista de armas top en esa categoria")
  .setDescription("Uso:\n\n !pve meta \n!pvp meta\n!lev meta\n!eow meta\n!sos meta\n!sospm metav\n!eowpm meta ")
     message.channel.send({embed});
     message.delete()
    
}
if(message.content.startsWith(prefix + 'ranks')) { 
  let canal = (message.channel.id == '484415730566168587')
if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#484415730566168587>")
    const embed = new Discord.RichEmbed()
  
  .setColor(0x00AE174)
  .setFooter("Sagira© Usa !pvpranks para ver su segunda parte. ", "https://i.imgur.com/WZwon1a.png")
  .setThumbnail("https://i.imgur.com/WZwon1a.png") 
  .setTitle("El comando !rank muestra tablas de ranking del clan/servidor")
  .setDescription("Uso: !rank [subcomando]\nPVE (Jugador contra entorno):\nSubcomandos:\n[nf] Ocaso\n[fastestnf]Ocaso más rápido\n[strikes] Asaltos\n[fasteststrike] Asalto más rápido\n[raids] Total de raids completadas\n[levpm] Total de raids en prestigio completadas\n[eowpm] Muestra total de raids completadas\n[sospm] Muestra total de raids completadas\n[lw] Muestra total de raids completadas\n[lwpm] Muestra total de raid en prestigio completadas.\n[lev] Detalla las Raids completadas\n[eow] Detalla las raids completadas de argos\n[sos] Detalla las raids compeltadas de Espira\n[maxpower] Poder mas alto\n[pe] Eventos públicos\n[hpe] Eventos públicos heróicos\n[pvetime] Tiempo en pve\n[raidtime] Tiempo en raids\n[striketime] Tiempo en asaltos\n!heatmap:Envia un link al ``mapa de calor´´ que muestra cuando has jugado a Destiny y durante cuanto tiempo.\n!nightfall : Muestra información sobre el Ocaso semanal.\n[ep] Rank de Protocolos \n[activetime] Tiempo activo\n[totaltime] Tiempo total\n!rank random : Muestra un rank al azar.")
     message.channel.send({embed});
     message.delete()
    
}
if(message.content.startsWith(prefix + 'pvpranks')) { 
  let canal = (message.channel.id == '484415730566168587')
if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#484415730566168587>")
    const embed = new Discord.RichEmbed()
  
  .setColor(0x00AE174)
  .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
  .setThumbnail("https://i.imgur.com/WZwon1a.png") 
  .setTitle("PVP (jugador contra jugador)")
  .setDescription("[kd] Estadistica Asesinato/muerte\n[eff] Estadistica de eficiencia total\n[pvpkills] Asesinatos en pvp\n[spree] Mayor racha de asesinatos\n[pvpscore] Puntuación de crisol\n[fastestpvp] Partida más rápida\n[winp] Numero de victorias\n[pvptime] Tiempo en pvp\n!rank valorresets : Muestra el rank de los guardianes que han reseteado su nivel de valor.\n!rank pvpmatches : Muestra el total de pvp matches")
    message.channel.send({embed});
    message.delete()
    
}
if(message.content.startsWith(prefix + 'pvpmode')) { 
  let canal = (message.channel.id == '484415730566168587')
  message.delete()
if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#484415730566168587>")
    const embed = new Discord.RichEmbed()
  
  .setColor(0x00AE174)
  .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
  .setThumbnail("https://i.imgur.com/WZwon1a.png") 
  .setDescription("Modos de PVP:\nTodos los modos de pvp se utilizan de la forma: [Nombre de la acividad (en inglés)][Nombre de la estadistica]	Algunos ejemplos:\n!trialstime\n!trialskd\n!clasheff\n!ibkills\n!quickplayspree\n!controlscore\n!trialswinp\n!fastestsurvival")
     message.channel.send({embed});
  message.delete()
    
}
if(message.content.startsWith(prefix + 'crg')) { 
  let canal = (message.channel.id == '484415730566168587')
  message.delete()
if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#484415730566168587>")
    const embed = new Discord.RichEmbed()
  
  .setColor(0x00AE174)
  .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
  .setThumbnail("https://i.imgur.com/WZwon1a.png") 
  .setDescription("(Creación o busqueda de escuadras):\n-!lfg search : Provee una lista de las escuadras creadas en el servidor.Para navegar por la lista usar el raton para hacer click en los iconos adecuados a la acción deseada.\nSubcomandos (para usar subcomandos escribid: !lfg [subcomando] [id de la escruadra]):\n!lfg alert id : Notifica a todos los usuarios de la escuadra.( solo creador de escuadra )\n!lfg create : Abre el dialogo para crear una escuadra.\n!lfg create private : Crea una escuadra privada para partidas privadas eligiendo el modo de la partida con un max de jugadores\n!lfg edit id : Abre el dialogo para editar una escuadra ya creada.( solo creador de escuadra )\n!lfg cancel id : Cancela la escuadra.( solo creador de escuadra )\n!lfg join id [tag o @user] : Te une a la escuadra.(Sin corrchetes)\n!lfg kick id [tag o @user] : Elimina al guardian deseado de la escuadra. ( solo creador de escuadra [Sin corrchetes] )\n!lfg leave id [tag o @user] : Te elimina de la escuadra. (Sin corrchetes)\n!lfg copy id : Genera un duplicado de evento con una nueva id y vacia.")
  .setImage("https://i.imgur.com/phspL0m.gif")
  message.channel.send({embed});
  message.delete()
    
}
if(message.content.startsWith(prefix + 'lastgame')) { 
  let canal = (message.channel.id == '484415730566168587')
  message.delete()
if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#484415730566168587>")
    const embed = new Discord.RichEmbed()
  
  .setColor(0x00AE174)
  .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
  .setThumbnail("https://i.imgur.com/WZwon1a.png") 
  .setDescription("!last : Muestra las estadisticas de tu útima actividad.\nPara ver la ultima actividad completada con exito, añadir ``completed´´ antes del nombre de la actividad.\nSubcomandos:\n!last pve : Muestra tu ultima partida en pve\n!last story : Muestra tu ultima actividad en historia\n!last patrol : Muestra tu ultima patrulla echa\n!last strike : Muestra tu ultimo asalto echo\n!last nf o !last nightfall : Muestra tu ultimo ocaso hecho\n!last raid : Muestra tu ultima raid hecha\n !last private : Muestra tu ultima partida privada.\n!last doubles : Muestra tu ultima partida doble.")
     message.channel.send({embed});
  message.delete()
    
}
  /* if (message.content.startsWith(prefix + 'lxur')) { 
     let canal = (message.channel.id == '414702518874931209')
  message.delete()
if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#414702518874931209>")
    const embed = new Discord.RichEmbed()
  
  .setColor(0x00AE174)
  .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
  //Titan .setImage("https://i.imgur.com/xJro7Jt.png")
 //Titan .setThumbnail("https://i.imgur.com/8ivPlsm.png")
 .setImage("https://i.imgur.com/b7w52n2.png")
  .setThumbnail ("https://i.imgur.com/FejLxr7.png")
   // Io .setImage("https://i.imgur.com/XMXfWnT.png")
  // Io .setThumbnail ("https://i.imgur.com/5aLdIA0.png")
  // Tierra  .setImage("https://i.imgur.com/ItQQKx4.png")
  // Tierra .setThumbnail ("https://i.imgur.com/KHAHdW7.png")
    // En la Torre .setImage("https://i.imgur.com/aQVWSbZ.png")
// En la Torre  .setThumbnail ("https://i.imgur.com/bJnrjLU.png")
  .setTimestamp()
  .setTitle("Localización de Xur : En Nessus Tumba del Vigía ")
     message.channel.send({embed});
     message.delete()
    
}*/
if(message.content.startsWith(prefix + 'lastgame')) { 
  let canal = (message.channel.id == '484415730566168587')
  message.delete()
if (!canal) return message.channel.send("Error, no puedes usar este comando aqui.Para eso esta <#484415730566168587>")
    const embed = new Discord.RichEmbed()
  
  .setColor(0x00AE174)
  .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
  .setThumbnail("https://i.imgur.com/WZwon1a.png") 
  .setDescription("!last pvp o !last crucible o !last match o !last trials : Muestra tu ultima partida en pvp\n!last control : Muestra tu ultima actividad en pvp control\n!last clash : Muestra tu ultima actividad en pvp enfrentamiento\n!last supremacy : Muestra tu ultima actividad en pvp supremacia\n!last survival : Muestra tu ultima actividad en pvp supervivencia\n!last countdown : Muestra tu ultima actividad en pvp cuenta atras\n!last quickplay : Muestra tu ultima actividad en pvp partida rapida\n!last competitive : Muestra tu ultima actividad en pvp competitivo")
     message.channel.send({embed});
  message.delete()
    
}

if(message.content.startsWith(prefix + 'cmd')) {
  message.reply("Revise sus mensajes directos para obtener ayuda. ** Este mensaje se auto-destruira en 10 segundos**")
  .then(m => {
      m.delete(10000);
    });
    } 
if(message.content.startsWith(prefix + 'cmd')) { 
    const embed = new Discord.RichEmbed()
  .setColor(0x00AE174)
  .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
  .setThumbnail("https://i.imgur.com/WZwon1a.png")
   .addField("!registro","Como Registrarse con @Espectro",true)
   .addField("!vendedores","Muestra los Comandos Posibles",true)
   .addField("!colección","Muestra los Comandos Posibles",true)
   .addField("!ranks","Muestra los Comandos Posibles",true)
   .addField("!pvpranks","Muestra la segunda parte de !ranks",true)
   .addField("!crg","Muestra los Comandos Posibles",true)
   .addField("!lastgame","Muestra los Comandos Posibles",true)
   .addField("!sherp","Muestra los Comandos Posibles",true)
     message.author.send({embed});
  message.delete()
    
} 

  if (message.content.startsWith(prefix + "rename")) {
      
      const content = message.content.split(' ').slice(2);
      const args = content.join(' ');
      let perms = message.member.hasPermission("ADMINISTRATOR");
      let miembro = message.mentions.members.first();
      if(!perms) return message.channel.send("Oye tu no puedes hacer eso!");
      if(message.mentions.users.size < 1) return message.reply('Debe mencionar a un miembro señor.').catch(console.error);
      if(!args) return message.channel.send("Señor debe ponerle un apodo...");

      miembro.setNickname(`${args}`)
      message.channel.send(`${miembro.user.username} ha sido renombrado como **${args}**...`)
  }
  // Envia mensaje privado 
  if (message.content.startsWith(prefix + "md")) {
    message.reply("Mensaje enviado a su Destinatario")
    .then(m => {
        m.delete(10000)
      })
    if (!args) return message.channel.send('Decir algo en privado a un usuario');
    let user = message.mentions.users.first();
    bot.users.get(`${user.id}`).send(args)
    message.delete()
    }
    
// Nuevo Warn 
//var fs = require('fs');
//COMANDOS DE MODERACIÓN

  //WARN  
  if (message.content.startsWith(prefix + "addwarn")){
        var canal =  bot.channels.get('489396698985136148')
        let user = message.mentions.users.first();
        let razon = args.split(' ').slice(1).join(' ');
        //let warnperm = message.guild.roles.find("name", "[ Lider Supremo ]") || message.member.roles.find("name", "MOD Destiny") || message.member.roles.find("name", "[ Moderador ]");
        let warns = JSON.parse(fs.readFileSync("./warns.json","utf8"));
     // if(!warnperm) return message.channel.send("Oye tu no puedes hacer eso!");
        
        //Basicos 
        if (hasRole(message.member, "Colaborador") || hasRole(message.member, "Fundador")){
        if(message.author === message.mentions.users.first()) return;
        if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.').catch(console.error);
        if (!razon) return message.reply("Por favor escriba la advertencia que quiere darle al usuario ejemplo : Razon explicada e incluyan el numero de raid")
        
        //Si no existe -> Incremento
        if(!warns[user.username]) warns[user.username] = {
          warns: 0
        };
        warns[user.username].warns++;
       
        //Embeds y Mensajes
        let warnEmbed = new Discord.RichEmbed()
        .setDescription("📟 Sistema de Strikes 📟")
        .setColor("#fc6400")
        .addField("Usuario :", " **"+user.username+"**")
        .addField("Has sido adveritdo por :", message.author.username)
        //.addField("En el canal:", message.channel)
        .addField("Número de strike(s) :", warns[user.username].warns)
        .addField("Razon: ", box + razon + box)
        .setThumbnail(user.avatarURL ? user.avatarURL : "https://i.imgur.com/ecHmnIt.png")
        .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
        .setTimestamp();
       canal.send(warnEmbed)

        let userwarnEmbed = new Discord.RichEmbed()
        .setDescription("📟 Sistema de Strikes 📟")
        .setColor("#fc6400")
        .addField("Has sido adveritdo por :", message.author.username)
        .addField("Tienes un total de strike(s) de :", warns[user.username].warns)
        .addField("Razón :", box + razon + box)
        .setThumbnail(user.avatarURL ? user.avatarURL : "https://i.imgur.com/ecHmnIt.png")
        .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
        .setTimestamp();
        user.send(userwarnEmbed).catch(function(err){
          return message.channel.send('Ocurrió un error al mandarle mi strike por MD')
        })
        message.delete();
        message.channel.send('Strike añadido , gracias por utilizar nuestros servicios ** Este mensaje se auto-destruira en 10 segundos**')
        .then(m => {
          m.delete(10000)
        });
      } else {
        message.channel.send('Lo siento No tienes permisos para añadir strikes.')
        .then(m => {
          m.delete(10000)
         message.delete();    
         });
     }

        //Escritura en warns.json, y log del error si lo hay
        fs.writeFile("./warns.json", JSON.stringify(warns), (err) => {
          if (err) console.log(err)
        });
      }
      if(message.content.startsWith(prefix + "unwarn")){
        //var canal =  bot.channels.get('420910669315964928')
        let warns = JSON.parse(fs.readFileSync("./warns.json","utf8"));
        //let warnperm = message.guild.roles.find("name", "[ Lider Supremo ]") || message.member.roles.find("name", "MOD Destiny") || message.member.roles.find("name", "[ Moderador ]");
        let user = message.mentions.users.first();
        //if(!warnperm) return message.channel.send("Oye tu no puedes hacer eso!");
        if (hasRole(message.member, "Colaborador") || hasRole(message.member, "Fundador")){
          if(!user) return message.reply("A quien?");
          if(warns[user.username].warns === 0 || !warns[user.username].warns) return message.channel.send(user.username + " no tiene ninguna advertencia!");
          warns[user.username].warns = warns[user.username].warns -1;  
        // Mensaje Privado
        let userwarnEmbed = new Discord.RichEmbed()
        .setDescription("📟 Sistema de Strikes 📟")
        .setColor("#fc6400")
        .addField("Strikes eliminados por :", message.author.username)
        .addField("Tienes un total de sanciones de :", warns[user.username].warns)
        .setThumbnail(user.avatarURL ? user.avatarURL : "https://i.imgur.com/ecHmnIt.png")
        .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
        .setTimestamp(); 
        user.send(userwarnEmbed).catch(console.error);
        fs.writeFileSync("./warns.json", JSON.stringify(warns), (err) => {
          if (err) console.log(err)
        });
        //Mensaje a canal x defecto 
        let warnEmbed = new Discord.RichEmbed()
        .setDescription("📟 Sistema de Strikes 📟")
        .setColor("#fc6400")
        .addField("Strikes eliminados por :", message.author.username)
        .addField("Tienes un total de strikes de :", warns[user.username].warns)
        .setThumbnail(user.avatarURL ? user.avatarURL : "https://i.imgur.com/ecHmnIt.png")
        .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
        .setTimestamp(); 
        canal.send(warnEmbed).catch(console.error);
        fs.writeFileSync("./warns.json", JSON.stringify(warns), (err) => {
          if (err) console.log(err)
        });
       message.delete();    
       message.channel.send('Strike borrado , gracias por utilizar nuestros servicios ** Este mensaje se auto-destruira en 10 segundos**')
       .then(m => {
        m.delete(10000)
      });
      } else {
        message.channel.send('Lo siento No tienes permisos para añadir strikes.')
     }
 }
 if(message.content.startsWith(prefix + 'wlist')){
  let json = JSON.parse(fs.readFileSync("./warns.json","utf8"));
  let user = json.warns;
  let wlist = new Discord.RichEmbed()
  .setTitle("Lista de Usuarios con advertencias")
  .setThumbnail("https://i.imgur.com/WZwon1a.png")
  .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
  for (user in json){
    if(json[user].warns > 0) {
      wlist
      .addField(`Usuario :  **${user}** ` , " Tiene : " + ` ${json[user].warns} ` + " Strike(s) ")
    }else{}
  }
  message.channel.send(wlist);
  message.delete(); 
}
if(message.content.startsWith(prefix + "wremall")){
  if (hasRole(message.member, "Colaborador") || hasRole(message.member, "Fundador")){
  let json = JSON.parse(fs.readFileSync("./warns.json","utf8"));
  let user = json.warns;
  for(user in json){
  json[user].warns = 0;
  }
  let warnEmbed = new Discord.RichEmbed()
        .setTitle("📟 Borrado de lista de Strike(s) 📟")
        .setColor("#fc6400")
       .setDescription("Todos los usuarios fueron eliminados correctamente. Disfruta de una semana mas con todos ellos.")
        .setThumbnail("https://i.imgur.com/WZwon1a.png")
        .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
        .setTimestamp(); 
        message.channel.send(warnEmbed).catch(console.error);
  fs.writeFileSync("./warns.json", JSON.stringify(json), (err) => {
    if (err) console.log(err)
  });
  message.delete();    
  message.channel.send('Lista Borrada exitosamente , gracias por utilizar nuestros servicios ** Este mensaje se auto-destruira en 10 segundos**')
       .then(m => {
        m.delete(10000)
      });
} else {
  message.channel.send('Lo siento No tienes permisos para añadir strikes.')
}
}
if (message.mentions.users.size > 0 && message.author.bot == false) {
  if(userAFK.indexOf(message.mentions.users.first().id) > -1){
    message.reply(message.mentions.users.first().username + " esta actualmente AFK. Es posible que no respondan a su mensaje durante un tiempo.");
    message.member.setNickname("[AFK] "+message.author.username)
  }
}
if (message.content.startsWith(prefix + "afk")) {
  let role = message.guild.roles.find("name", "AFK");
if(userAFK.includes(message.author.id)){
    message.reply("**OK:** Ya no estas **AFK**.");
    var index = userAFK.indexOf(message.author.id);
    message.member.setNickname(message.author.username)
    message.member.removeRole(role)
    if(index !== -1){
       userAFK.splice(index, 1);
       
    }
    return;
  }
  message.reply("**OK:** He definido tu estado en **AFK**. Si la gente te menciona en su mensaje, les notificaré que estas en **AFK**.")
  message.member.setNickname('[💤] '+message.author.username)
  message.member.addRole(role)
  userAFK.push(message.author.id); 

  return;
  }
  if(message.content !== prefix + "afk") {
    let role = message.guild.roles.find("name", "AFK");
  if(userAFK.includes(message.author.id)){
  var index = userAFK.indexOf(message.author.id);
    userAFK.splice(index, 1)
    message.member.setNickname(message.author.username)
    message.reply("**OK:** Ya no estas **AFK**.") 
    message.member.removeRole(role)   
  }
}
if (message.content.startsWith(prefix + "afk")) {
if(userAFK.includes(message.author.id)){
  let role = message.guild.roles.find("name", "AFK");
  message.member.removeRole(role)
    message.reply("**OK:** Ya no estas **AFK**.");
    var index = userAFK.indexOf(message.author.id);
    message.member.setNickname(message.author.username)
    
    if(index !== -1){
       userAFK.splice(index, 1);
       
    }
    return;
  }
  message.reply("**OK:** He definido tu estado en **AFK**. Si la gente te menciona en su mensaje, les notificaré que estas en **AFK**.")
  message.member.setNickname('[💤] '+message.author.username)
  userAFK.push(message.author.id); 

  return;
  }
  if(message.content !== prefix + "afk") {
  if(userAFK.includes(message.author.id)){
    let role = message.guild.roles.find("name", "AFK");
  var index = userAFK.indexOf(message.author.id);
    userAFK.splice(index, 1)
    message.member.setNickname(message.author.username)
    message.member.removeRole(role)
    message.reply("**OK:** Ya no estas **AFK**.")
   
  }
}        


if(message.content.startsWith(prefix + 'simbolos')) { 
  const embed = new Discord.RichEmbed()

.setImage("https://i.imgur.com/QzQfG7h.png")

   message.channel.send({embed});
  message.delete()
}  
if(message.content.startsWith(prefix + 'ojos')) { 
const embed = new Discord.RichEmbed()

.setImage("https://i.imgur.com/P1lC1At.png")

 message.channel.send({embed});
message.delete()
}  
if(message.content.startsWith(prefix + 'limpiar')) { 
  let messageCount = parseInt(args);
  var perms = message.member.hasPermission("MANAGE_MESSAGES");
  
  if(!perms) return message.channel.send("`Error` `|` No tienes Permisos para usar este comando.");
  
  if(!args)  message.channel.send('Escriba la cantidad a eliminar');
  messageCount = (args.split(' '))[0];
        
  if(messageCount >= 2 && messageCount <= 100){
  message.channel.fetchMessages({limit: messageCount})
  .then(messages => message.channel.bulkDelete(messages));
  
  }else{
    message.channel.send(args).catch(err => message.reply('El limite a eliminar es de 100 mensajes. Y ha de ser inferior a 14 dias de antiguedad.'));
  } 
  }

/*if (message.content.startsWith(prefix + "inactivo")) {
  message.reply("Mensaje enviado a su Destinatario")
    .then(m => {
        m.delete(10000)
      })
      let razon = args.split(' ').slice(1).join(' ');
      if (!razon) return message.reply("Por favor escriba la razón de expulsión : Razon explicada ")
      let miembro = message.mentions.members.first();
  let user = message.mentions.users.first();
  bot.users.get(`${user.id}`).send(box+ 'EXPULSIONES:\nCada martes por la mañana se realizará un escaneo en el clan y se procederá a expulsar a los miembros que:\n\n1º. No hagan uso de @Espectro\n\n2º. No realicen actividades con el clan. El hecho de aportar la experiencia de clan con tu personaje no basta para cumplir este punto. Es preciso participar con los miembros del clan.\n\n3º. Una ausencia por un período de 1 semanas significa que el juego no te atrae lo suficiente. En el caso de que exista justificación (exámenes, trabajo o cualquier otra actividad mucho más importante que un juego, deberéis de hacer uso del comando !ausencia en #comandos_bots\n\n4º. El reclutamiento de gente de LGI hacia otros clanes para hacer raid, queda totalmente prohibido siendo que en este clan hay gente activa para generar y participar en nuestras propias raids. Única excepción será cuando aquí falte gente y no tengamos gente que quiera pueda hacerlo, significando esto que la gente del clan va siempre primero. Ojo la invitación por privado a otros clanes  será penalizada con expulsión considerándose como spam. A los usuarios nuevos utilizar el !lfg create para generar raids y no esperéis a que los sherpas las generen puesto que ellos generan escuelas.\n\nÉstas son las normas básicas de La Guardia de Ishtar [LGI]. Esperemos que disfrutes tu estancia con nosotros y llegues a ser Leyenda.).'+box+ "\n\n" +box+ "Motivo de expulsión : " +razon+ box)
  bot.channels.get('421417893700567041').send(`**Motivo : **  ${razon}`);
  bot.channels.get('392663841831649281').send(`**Motivo : **  ${razon}`);
  message.delete()
  }

if(message.content.startsWith(prefix + "join")){
let Canalvoz = message.member.voiceChannel;
message.delete(); 
if (!Canalvoz || Canalvoz.type !== 'voice') {
message.channel.send('¡Necesitas unirte a un canal de voz primero!.');

} else if (message.guild.voiceConnection) {
    message.channel.send('Ya estoy conectado en un canal de voz.');

} else {
     message.channel.send('Conectando...').then(m => {
          Canalvoz.join().then(() => {

               m.edit(':white_check_mark: | Conectado exitosamente.');
         });

     });
     

}
}
if(message.content.startsWith(prefix + "leave")){
let Canalvoz = message.member.voiceChannel;
message.delete(); 
if(!Canalvoz){
    message.channel.send('No estoy en un canal de voz.');

} else {
    message.channel.send('Dejando el canal de voz.').then(() => {
        Canalvoz.leave();

    });
    

}
}  
if(message.content.startsWith(prefix + 'play')){
  const ytdl = require('ytdl-core');

  let voiceChannel = message.member.voiceChannel;
  if(!voiceChannel) return message.channel.send('¡Necesitas unirte a un canal de voz primero!.');
  if(!args) return message.channel.send('Ingrese un enlace de youtube para poder reproducirlo.');
  voiceChannel.join()
    .then(connection => {
      const url = ytdl(args, { filter : 'audioonly' });
      const dispatcher = connection.playStream(url);
      message.channel.send('Reproduciendo ahora: '+ args);
      message.delete();
    })
    .catch(console.error);
}/*
dispatcher.on('end', () => {
  // Se activa cuando la transmisión/canción ha terminado.
});

dispatcher.on('error', e => {
  // Se activa cuando detecta cualquier error que pueda surgir.
  console.log(e);
});

dispatcher.setVolume(0.5); // Ajuste el volumen a 50%
dispatcher.setVolume(1); // Ajuste el volumen de nuevo al 100%

dispatcher.time; // El tiempo en milisegundos durante la secuencias que ha estado en transmisión.

dispatcher.pause(); // Detener la secuencia transmisión
dispatcher.resume(); // Continuar la secuencia transmisión

dispatcher.end(); // Finaliza el dispatcher, emite evento 'end'*/
if(message.content.includes('<@484424689742118914>')) {
	message.channel.send("Que cosa ? Bueno mas info sobre mi en !ayuda")
  }
  
  /*if(message.content.startsWith(prefix + 'pedo')){
    if (!message.guild.voiceConnection) return message.channel.send('¡No estoy en un canal de voz!, use `-join` para unirme a un canal.').catch(error => message.channel.send(error));
    const dispatcher = message.guild.voiceConnection.playFile(`C:/Users/Administrator/Documents/DiscordBots/Dropbox/mypesepe/sagira/music/pedo.mp3`);
}
*/
if (message.content.startsWith(prefix + 'limpieza')) {
  if (hasRole(message.member, "Colaborador") || hasRole(message.member, "Fundador")){
  let user = message.mentions.users.first();
 let msg = args.split("|");
 let razon = msg[1]
 let link = msg[2]
   if(!args) return message.channel.send(`Formato incorrecto Usa : !avistado @user|razon|link .`);
   if (message.mentions.users.size < 1) return message.reply('Debe mencionar a alguien.');
   if(!razon) return message.channel.send('Escriba la razzon');
   if(!link) return message.channel.send('Mande una imagen de prueba');
   const embed = new Discord.RichEmbed()
   .setColor(0x00AE86)
   .addField(":page_facing_up: Limpieza en marcha ", '<@'+user.id+'>' +' '+ razon, true)
   .setImage(link)
   .setThumbnail("https://i.imgur.com/Q1azOns.png")
   .setFooter("Sagira© ", "https://i.imgur.com/WZwon1a.png")
   .setTimestamp()
   message.channel.send({embed});
   message.delete();
  } else {
    message.channel.send('Lo siento No eres Guía como para generar un informe.');
 }
}
   /*message.content = message.content.toLowerCase()
if(message.content.includes('carr')) {
  //if(message.author.id !== "230057228911116288") return 
  message.channel.send(message.author.username + ' ¿Carrito? Ya te gustaría a ti hacer carritos')
  const embed = new Discord.RichEmbed()

  .setImage("https://i.imgur.com/8KIDMHl.gif")
     message.channel.send({embed});
  }*/

  message.content = message.content.toLowerCase()
if(message.content.includes('redbull')) {
  //if(message.author.id !== "230057228911116288") return 
  var sayings =                  [message.author.username + ' tomate un <:redbull:486432366584266752> y veras como te carga las pilas. O si eres mas de <:monster:486432571849179152> aqui tienes .',
  message.author.username + ' dejate de tantos <:redbull:486432366584266752> que te va a explotar la cabeza',
  message.author.username + ' yo soy mas de <:monster:486432571849179152>',
'alguien a dicho <:redbull:486432366584266752> ? Que , que ? Donde ? Camarero otro mas por favor'];

var result = Math.floor((Math.random() * sayings.length) + 0);
message.channel.send(sayings[result]);
  /*message.channel.send(message.author.username + ' Tomate un <:redbull:486432366584266752> y veras como te carga las pilas. O si eres mas de <:monster:486432571849179152> aqui tienes .')*/
}
message.content = message.content.toLowerCase()
if(message.content.includes('monster')) {
  //if(message.author.id !== "230057228911116288") return 
  var sayings =                  [message.author.username + ' dejate de tantos <:monster:486432571849179152> que te va a explotar la cabeza',
  message.author.username + ' yo soy mas de <:redbull:486432366584266752>',
'alguien a dicho <:monster:486432571849179152> ? Que , que ? Donde ? Camarero otro mas por favor'];

var result = Math.floor((Math.random() * sayings.length) + 0);
message.channel.send(sayings[result]);
  /*message.channel.send(message.author.username + ' Tomate un <:redbull:486432366584266752> y veras como te carga las pilas. O si eres mas de <:monster:486432571849179152> aqui tienes .')*/
}

  if(message.content.startsWith(prefix + 'reactivar')) {
          message.delete()
          let miembro = message.member;
          let user = message.member;
          let reactivar = message.guild.roles.find("name", "Sin Reg / Sin Actividad")
          let rol = message.guild.roles.find("name", "Destiny");

          if(!rol) return message.channel.send('Rol _Nombre del rol_ no encontrado.');
  
          miembro.removeRole(reactivar)
          miembro.addRole(rol).catch(console.error);
          message.member.setNickname(message.author.username)          
          message.channel.send(`**${miembro.user.username}** reactivación exitosa`)
          .then(m => {
            m.delete(10000)
          })
          bot.channels.get('484415601037803530').send(`<@${user.id}> Cuenta Reactivada Exitosamente . Bienvenido nuevamente . `)
          
          
      }

      if(message.content.startsWith(prefix + 'vaperillos')) {
        message.delete()
        let miembro = message.member;
        let user = message.member;
        let rol = message.guild.roles.find("name", "Vaperillos");

        if(!rol) return message.channel.send('Rol _Nombre del rol_ no encontrado.');

        miembro.addRole(rol).catch(console.error);
        message.member.setNickname(message.author.username)          
        message.channel.send(`**${miembro.user.username}** a vapear se ha dicho ....`)
        .then(m => {
          m.delete(10000)
        })   
        
    }

      if(message.content.startsWith(prefix + 'desactivar')) {
        message.delete()
        let miembro = message.mentions.members.first();
        let username = message.mentions.members.first();
        let reactivar = message.guild.roles.find("name", "Destiny")
        let rol = message.guild.roles.find("name", "Sin Reg / Sin Actividad");

        if(!rol) return message.channel.send('Rol _Nombre del rol_ no encontrado.');

        miembro.removeRole(reactivar)
        miembro.addRole(rol).catch(console.error);    
        miembro.setNickname("💤 "+miembro.displayName)  
        message.channel.send(`**${miembro.user.username}** Usuario Desactivado`)
        .then(m => {
          m.delete(10000)
  
        })  
        
    }
    /* 
      if (message.content.startsWith(prefix + 'regalo')) { 
          message.delete()
          if(cooldown.has(message.author.id)){
      message.channel.send(message.author.username+ " utiliza el comando despues de 5 minutos! que no tengo una tienda.");
      return;
      }
      var userhal = message.guild.members.random().user;
      var userhall = message.guild.members.random().user;
      var sayings =                  [`${userhal} regaló unos 🍬 a ${userhall}. Cuidado que tanto dulce provoca caries.`,
                                    `${userhal} regaló una 💩 a ${userhall}. Jajaja que suerte , como la de <@149958190803582976> q nunca se lleva nada.`,
                                    `${userhal} le dio una 🎃 a ${userhall}`,
                                  `${userhal} le regaló unos 🎧 a <@248569785355337728> para que asi pueda hablar con nosotros. Ya que me han dicho que es timido.`,
                                `${userhal} le regaló un ⏰ a <@250681533873127434> asi no se quedara dormido.`,
                              `${userhal} le regaló un 📡 a <@486853810086477835> para que pueda jugar fluidamente y hacer raids.`,
                            `${userhal} le regaló un 🍀 a <@149958190803582976> para que tenga mas suerte en sus raids.`,
                            `${userhal} le regaló un :video_game: a <@427561913921175572> para que juegue a destiny a 60 fps.`,
                            `${userhal} le regaló un :video_game: a <@406803920971628554> para que juegue a destiny a 60 fps.`,
                            `${userhal} le regaló un pack de 🏳️ a <@205958011330625546> para que los coloque en las raids, que el tio no pone ni una.`,
                           `${userhal} le regaló unas ✋ a <@309654959123857410> para que mejore en crisol y asi no ser tan manco`];
      
      var result = Math.floor((Math.random() * sayings.length) + 0);
      message.channel.send(sayings[result]);
      cooldown.add(message.author.id);
      setTimeout(() => {
      cooldown.delete(message.author.id);
      message.reply(" puedes volver a usar !regalo").then((msg) => {
        msg.delete(10000)
        })
      }, 300000);
      
          
      } 
      if (message.content.startsWith(prefix + 'coger')) { 
        message.delete()
        if(cooldown.has(message.author.id)){
          message.channel.send(message.author.username+ " utiliza el comando despues de 5 minutos! que no tengo una tienda.");
          return;
          }
        let member = message.author
        var sayings =                  [`${member} Toma unos 🍬 y cuidado que tanto dulce provoca caries.`,
                                        `${member} Mejor no te digo que te voy a dar ........ Bueno si una 💩 ..... Jajaja que suerte.`,
                                        `${member} Toma pontela 🎃 a no que ya la tienes puesta jeje`];
      
        var result = Math.floor((Math.random() * sayings.length) + 0);
        message.channel.send(sayings[result]);
        cooldown.add(message.author.id);
            setTimeout(() => {
            cooldown.delete(message.author.id);
            message.reply(" puedes volver a usar !coger").then((msg) => {
              msg.delete(10000)
              })
            }, 300000);
        
              
      }
    
    
    // Añade en apodo el emoji q quieras . Buena idea para festividades como Hallowen o Navidad 
    
    if(message.author.username){
       // if(message.author.id ==="304456885191442442") return;
        if(message.channel.id == '498513809699504148') return;
        if(message.member.displayName.startsWith("🎃 ")) return;
        message.member.setNickname("🎃 "+message.member.displayName+ " 👻")
              }*/

              //Quita el emoji q contenga primero devolviendolo su apodo
              
               /* let test = bot.guilds.get('484414780619096064').members.map(r => r.id)
let test2 = bot.guilds.get('484414780619096064').members.map(r => r.displayName)
  for(let i = 0; i < test.length; i++) {
    let boolean = /\🎃/.test(test2[i]);
    if(boolean === true) {
    message.guild.member(test[i]).setNickname(test2[i].slice(3))
    }
  }*/
});

bot.login("");