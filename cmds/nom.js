const fs = module.require("fs");

module.exports.run = async (bot, message, args) => {

    switch(args[0]){
        case "add":
            message.delete();
            let food  = args[1];
            let count = args[2];

            bot.food[food] = {
                count: count
            }
            break;
        case "delete":
            message.delete();
            let food = args[1];
            
            delete bot.food[food];
            break;
        default
            console.log("err");
        }
        await fs.writeFile("./food.json", JSON.stringify(bot.food, null, 4), err => {
                if (err) throw err;
        });
        refreshList(bot);
    
        
        
}

module.exports.help = {
    name: "nom"
}

function refreshList(bot){

    var str = "Shitty List for now\n";

    for(let key in bot.food){
        str += `${key}: ${bot.food[key].count}\n`
    }

    bot.channels.find("id", "504311345202724877").fetchMessage("504312558858272816")
        .then(message => message.edit(str))
}
