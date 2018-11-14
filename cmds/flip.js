module.exports.run = async (bot, message, args) => {
    message.delete();
    var x = (Math.floor(Math.random() * 2) == 0);
    if (x)
      message.channel.send("HEAD!");
    else 
      message.channel.send("TAIL!");    
}

module.exports.help = {
    name: "flip"
}
