const Discord = require('discord.js');
const ms = require('ms');
const client = new Discord.Client();
 
const prefix = '-';
 
const fs = require('fs');
const { execute } = require('./commands/ping');
 
client.commands = new Discord.Collection();
 
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}
 
 
client.once('ready', () => {
    console.log('Online!');
});
 
client.on('message', message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;
 
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
 
    if(command === 'ping'){
        client.commands.get('ping').execute(message, args);
    }
    if(command === "wtimer"){
        let Timer = args[0];

        if(!args[0]){
            return message.channel.send("Usage: !timer + duratiopn + s|m|h")
        }

        if(args[0] <= 0){
            return message.channel.send("Usage: !timer + duratiopn + s|m|h")
        }

        message.channel.send("Timer: "+ ms(ms(Timer), {long: true}))
        setTimeout(function(){
            message.channel.send(message.author.toString()+ ` Drink some damn water or something, duration of timer: ${ms(ms(Timer), {long: true})}`)
        }, ms(Timer));
    } 
});
 
client.login('  ');
