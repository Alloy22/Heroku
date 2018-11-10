const Discord = require("discord.js");
const fs = require("fs");

const mongoose = require("mongoose");
mongoose.connect(process.env.mongooseConnection);
const Foods = require("./models/food.js");

const prefix = "!";
const token = process.env.token;
const bot = new Discord.Client({});
bot.commands = new Discord.Collection();
bot.food = new require("./food.json");
let lastDay = new Date("Feburary 8, 2019 09:30:00");
//=============================================================================
fs.readdir("./cmds/", (err, files) => {
    if (err) console.error(err);

    let jsfiles = files.filter(f => f.split(".").pop() === "js");
    if (jsfiles.length <= 0) {
        console.log("No commands to load!");
        return;
    }

    console.log(`Loading ${jsfiles.length} commands!`);

    jsfiles.forEach((f, i) => {
        let props = require(`./cmds/${f}`);
        console.log(`${i + 1}: ${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });
});

bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if (!command.startsWith(prefix)) return;

    let cmd = bot.commands.get(command.slice(prefix.length));
    if (cmd) cmd.run(bot, message, args);
})

bot.login(token);
//=============================================================================
bot.on("ready", async () => {

    try {
        let link = await bot.generateInvite(["ADMINISTRATOR"]);
        console.log(link);
    } catch (e) {
        console.log(e.stack);
    }

    setInterval(()=>{
        
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();

        if(hours == 3 && minutes == 45){
            sendText();
        }

    },60000)
    
});

function sendText() {
    let arrayFood = [];
    let chosen = "";

    Foods.find({}, (err, f) => {
        if (err) return console.log(err)

        for (let j = 0; j < f.length; j++) {
            let count = f[j].count;
            for (let i = 0; i < count; i++) {
                arrayFood.push(f[j].food)
            }
        }
        //Generate Food
        let geneFood = arrayFood[Math.floor(Math.random() * arrayFood.length)];
        //Generate Days Left
        let now = new Date();
        let geneLeft = Math.floor((lastDay - now) / 86400000);
        //Combine String
        let str = `Today's Food: ${geneFood}\nDays Left: ${geneLeft}`

        bot.channels.find("id", "504311164851978243").send(str); //475990509505085442
    })


}

