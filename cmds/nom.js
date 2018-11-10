const fs = module.require("fs");
const mongoose = require("mongoose");
mongoose.connect(process.env.mongooseConnection);
const Foods = require("../models/food.js");

module.exports.run = async (bot, message, args) => {

    let food = "";

    switch (args[0]) {
        case "add":
            message.delete();
            food = args[1];
            let count = args[2];

            const foods = new Foods({
                _id: mongoose.Types.ObjectId(),
                username: message.author.username,
                userID: message.author.id,
                food: food,
                count: count
            })

            foods.save()
                .then(result => {
                    console.log(result)
                    refreshList(bot)                    
                })
                .catch(err => console.log("err:" + err))


            break;
        case "delete":
            message.delete();
            Foods.deleteOne({ food: args[1] }, (err) => {
            if (err) console.log(err)
            })   
            .then(() => {
                refreshList(bot)
            })
            break;
    }




}

module.exports.help = {
    name: "nom"
}

function refreshList(bot) {

    Foods.find({}, (err, f) => {
        if (err) return console.log(err)

        var str = "Shitty List for now\n";
        for (let j = 0; j < f.length; j++) {
            let count = f[j].count;
            str += `${f[j].food}: ${count}\n`
        }
        bot.channels.find("id", "504311345202724877").fetchMessage("504312558858272816")
            .then(message => message.edit(str))
    })

}
