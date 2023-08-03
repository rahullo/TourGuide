const mongoose = require('mongoose')
const dotenv = require('dotenv');


process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION: 🙋🙋 SHUTTING DOWN');
    console.log('💥🙋', err.name, err.message);
    process.exit(1);
})

dotenv.config({ path: './config.env' });
const app = require('./app')

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() =>
    console.log('DB connection succesful')
)

//STARTED SERVER
const port = 3000 // process.env.PORT ||

const server = app.listen(port, () => {
    console.log(`App running on port ${port}....`);
})



process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION: 🙋🙋 SHUTTING DOWN');
    console.log('💥🙋', err.name, err.message);
    server.close(() => {
        process.exit(1);

    })
})