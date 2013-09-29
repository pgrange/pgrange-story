var express = require('express')
var app = express()

var elevator = require('./elevator')
var state = elevator.new_state()

require('./utils.js')

app.use(express.bodyParser());

app.get('/reset', function(req, res) {
  console.log('--- RESET ---')
  state = elevator.new_state()
  res.send('dtc')
})
app.get('/call', function(req, res) {
  state = elevator.called_at(state, parseInt(req.param('atFloor')))
  res.send('dtc')
})
app.get('/go', function(req, res) {
  state = elevator.go(state, parseInt(req.param('floorToGo')))
  res.send('dtc')
})
app.get('/userHasEntered', function(req, res) {
  state = elevator.enter(state)
  res.send('dtc')
})
app.get('/userHasExited', function(req, res) {
  state = elevator.exit(state)
  res.send('dtc')
})
app.get('/nextCommand', function(req, res) {
  //UP|DOWN|OPEN|CLOSE|NOTHING
  state = elevator.next(state)
  log(state)
  res.send(state.cmd)
})

function log(state) {
  console.log('__' + state.floor + '__')
  console.log('[[' + state.nb_users + ']] ' + state.cmd)
  console.log(state.called_at, state.asked_to_go_to)
}

app.listen(12044)
console.log("Server started")
