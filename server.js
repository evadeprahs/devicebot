'use strict'
const express = require('express')
const Slapp = require('slapp')
const BeepBoopConvoStore = require('slapp-convo-beepboop')
const BeepBoopContext = require('slapp-context-beepboop')
const Witbot = require('witbot')
if (!process.env.PORT) throw Error('PORT missing but required')

var witToken = Z3OMXNIJPZQFGH2VPXQMIM5V6RSSQ2VP

var slapp = Slapp({
  convo_store: BeepBoopConvoStore(),
  context: BeepBoopContext()
})

var app = slapp.attachToExpress(express())
var witbot = Witbot(witToken)

// messages
slapp.message('.*', (msg, text, match1) => {
  msg.say('How are you?').route('handleHi', { what: match1 })
})

// routes
slapp.route('handleHi', (msg, state) => {
  msg.say(':smile: ' + state.what)
})

app.get('/', function (req, res) {
  res.send('Hello')
})

console.log('Listening on :' + process.env.PORT)
app.listen(process.env.PORT)