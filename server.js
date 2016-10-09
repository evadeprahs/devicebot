'use strict'
const express = require('express')
const Slapp = require('Slapp')

const BeepBoopContext = require('slapp-context-beepboop')
if (!process.env.PORT) throw Error('PORT missing but required')

var slapp = Slapp({ context: BeepBoopContext() })

// attach handlers to an Express app
var app = slapp.attachToExpress(express())

slapp.message('^(hi|hello|hey).*', ['direct_mention', 'direct_message'], (msg, text, greeting) => {
  msg
    .say(`${greeting}, how are you?`)
    .route('handleHowAreYou')  // where to route the next msg in the conversation
})

// register a route handler
slapp.route('handleHowAreYou', (msg) => {
  // respond with a random entry from array
  msg.say(['Me too', 'Noted', 'That is interesting'])
})

console.log('Listening on: ' + process.env.PORT)
app.listen(process.env.PORT) 