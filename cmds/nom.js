const fs = module.require("fs");

module.exports.run = async (bot, message, args) => {

    switch(args[0]){
        case "add":
            let food  = args[1];
            let digit = args[2];

            bot.food[food] = {
                digit: digit
            }
            fs.writeFile("./food.json", JSON.stringify(bot.food, null, 4), err => {
                if (err) throw err;
            });
            break;
        
        
        
    }
        
    

}

module.exports.help = {
    name: "nom"
}
