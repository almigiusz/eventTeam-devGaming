const mongoose = require('mongoose');
const chalk = require('chalk');
mongoose.set('useCreateIndex', true);

module.exports = (client) => {
    console.log(chalk.green("Połączono przy użyciu Discord API."))

    mongoose.connect(process.env.MONGODB_SRV, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
        .then(() => {
            console.log(chalk.green("Połączono z bazą danych MongoDB."))
        })
        .catch((err) => {
            console.log(err);
        })
};