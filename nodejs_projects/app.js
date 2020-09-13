// const validator = require('validator')
const chalk = require('chalk')
const notes = require('./notes.js')
const yargs = require('yargs')
const { argv } = require('yargs')
yargs.version('1.1.0')


//Add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Content body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function () {
        console.log('Body: ' + argv.body)
    }
})
yargs.parse();