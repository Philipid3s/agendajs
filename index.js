const Agenda = require('agenda');
var fs = require('fs');

const mongoConnectionString = 'mongodb://127.0.0.1/agenda';

const agenda = new Agenda({db: {address: mongoConnectionString, useNewUrlParser: true}});

// simple / dumb example where I will log text in a file...
agenda.define('append log file', (job, done) => {
    fs.appendFile('log.txt', 'new content...\n', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
});

(async function() { // IIFE to give access to async/await
    await agenda.start();

    await agenda.every('3 minutes', 'append log file');
})();