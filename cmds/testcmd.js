module.exports.run = async (bot, message, args) => {
    var date = new Date();
    console.log(date.getHours());
    console.log(date.getMinutes());
    console.log(date);
}

module.exports.help = {
    name: "hi"
}
