module.exports.run = async (bot, message, args) => {
    var str = "Shitty List for now\n";

    for(let key in bot.food){
        str += `${key}: ${bot.food[key].count}\n`
    }

    bot.channels.find("id", "504311345202724877").send(str);
}

module.exports.help = {
    name: "hi"
}
