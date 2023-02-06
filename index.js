 /**
  * = opcjonalne do komendy
  Komendy do dodanie (użytkownicy)
  * - rank/lvl  [osoba]                   wyślietla range osoby
  * + avatar    [osoba]                   wyślietla zdj osoby ( najlepiej w jakimś embedzie ) 
  Komendy do dodania (admin)
  * - warn_max  [number/[null/0]]         ustawia maksymalna ilosc warn do bana/kicka
  * - warn      [osoba] [powód]           ostrzega uzytkownika
  * - mute      [osoba] [powód]           daje role wyciszenia urzytkownikowi
  * - ban       [osoba] *[czas] [powód]   banuje uczytkownika czasowo lub permamentnie
  * - kick      [osoba] [powód]           wywala osobe
  * - notify    [osoba/ranga] [tekst]     wysyla dm do osub z dana rangą lub wybraną osobe
  */

  const { Client, GatewayIntentBits, ActivityType, messageLink, MessageFlags, EmbedBuilder, Guild, Embed, ModalSubmitFields, ReactionEmoji, GuildMember, KickMemers, SlashCommandBuilder, Collection, Discord} = require("discord.js");
  const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers
    ] 
  })
  const { forEach } = require("fs");
  
  // Bot Config
  const config = require('./config.json')
    const prefix = config.prefix
    const token = config.token
    client.events = new Collection()
    client.commands = new Collection()

    module.exports = client;


    [
      'eventhandler',
      'commandshandler'
    ].forEach(file => {
      console.log(file)
      require(`./handlers/eventhandler`)(client);
    });


/*  client.on("ready", () =>{
      console.log('Logged in')
      client.user.setStatus("Simple")
  })*/
  
      //const kicks = reason.mentions.users.first()
  
  // Running / Main
  
  client.on("messageCreate", async msg =>{
    if(msg.content === "Hello"){
      msg.reply('witaj')
      msg.react("👋")
    }
    if(reason = msg.content.match(`${prefix}avatar (.*)`)){
      let user = msg.mentions.users.first()
      
      let kocham = new EmbedBuilder()
      .setColor('#FFA500') 
      .setTitle("Avatar")
      .setDescription("The avatar of " + user.username)
      .setImage(user.avatarURL())
     
      msg.channel.send({embeds : [kocham]});
    }
    if(reason = msg.content.match(`${prefix}kick (.*?) (.*)`)){
      const user = msg.mentions.users.first().kick()
        msg.channel.send(`uzytkownik ${reason[1]} zostal wykopany z przyczyny: ${reason[2]}`)
    }
    if(reason = msg.content.match(`${prefix}ban (.*?) (.*)`)){
      msg.channel.send(`uzytkownik ${reason[1]} zostal zbanowany z przyczyny: ${reason[2]}`)
    }
    if(reason = msg.content.match(`${prefix}mute (.*?) (.*)`)){
      msg.channel.send(`uzytkownik ${reason[1]} zostal zmutowany z przyczyny: ${reason[2]}`)
    }
    if(reason = msg.content.match(`${prefix}notify (.*?) (.*)`)){
      //msg.mentions.users.first().send(reason[2])
      msg.mentions.roles.first().members.forEach(async (user) => {await user.send(reason[2])})
  
    }
  })
  
  client.on('messageCreate', async msg =>{
    const user = msg.mentions.users.first()
    const reason = msg.content.split(" ").slice(2).join(" ")
    
  
    if(msg.content.startsWith(prefix+"ki")){
      if(!msg.member.permissions.has("KICK_MEMBERS")) return msg.reply("nie masz uprawnien dorobienia tego")
      if(msg.mentions.users.size < 1) return msg.reply("zpinguj uzytkownika")
      if(user === msg.author) return msg.reply("nie mozesz wykopac siebie")
      if(!reason) return msg.reply("podaj przyczyne na wykopanie uzytkownika")
      else if(msg.member.kickable){
        msg.guild.members.kick(user).then(user=>{
          const kickembed = new EmbedBuilder()
          .setColor('#bfbf11')
          .setTitle(`Użytkownik ${user.username} został wykopany`)
          .setDescription(`Z powodu:\n${reason}`)
          msg.channel.send({embeds : [kickembed]})
        })
      }
    }
  })
  
  client.login(token)