const Agenda = require('agenda')

const agenda = new Agenda({
    db: {address: process.env.MONGODB_URL, collection: 'hangs'},
    processEvery: '30 seconds'
})

agenda.define("test", (job) => {
        console.log('TTEESSTT')
    });

module.exports = agenda