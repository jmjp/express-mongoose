const dotenv = require('dotenv').config();

require('require-all')(__dirname + '\\src\\models');

const app = require('./src/app');

app.listen(process.env.PORT,function(){
    console.log(`Rodando na porta ${process.env.PORT}`)
});