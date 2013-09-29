var express = require('express')
var app = express()

require('./utils.js')

var elevator = require('./elevator')
var state = elevator.new_state()

app.use(express.bodyParser())
app.use(express.logger("dev"))

app.get('/reset', function(req, res) {
  console.log('--- RESET ---')
  state = elevator.new_state()
  res.send('dtc')
})
app.get('/call', function(req, res) {
  state = elevator.call(state, parseInt(req.param('atFloor')))
  log(state)
  res.send('dtc')
})
app.get('/go', function(req, res) {
  state = elevator.call(state, parseInt(req.param('floorToGo')))
  log(state)
  res.send('dtc')
})
app.get('/userHasEntered', function(req, res) {
  res.send('dtc')
})
app.get('/userHasExited', function(req, res) {
  res.send('dtc')
})
app.get('/nextCommand', function(req, res) {
  //UP|DOWN|OPEN|CLOSE|NOTHING
  result = elevator.next(state)
  state = result.state
  log(state)
  res.send(result.cmd)
})

function log(state) {
  console.log('__' + state.floor + '__') 
  console.log(state.path)
}

app.listen(12043)
console.log("Server started")
