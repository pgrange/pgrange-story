require('source-map-support').install()

express = require('express')
app = express()

elevator = require('./elevator')
state = elevator.new_state()

app.use(express.bodyParser())
app.use(express.logger("dev"))

app.get '/reset', (req, res) ->
  console.log('--- RESET ---')
  state = elevator.new_state()
  res.send('dtc')

app.get '/call', (req, res) ->
  state = elevator.call(state, parseInt(req.param('atFloor')))
  log(state)
  res.send('dtc')

app.get '/go', (req, res) ->
  state = elevator.call(state, parseInt(req.param('floorToGo')))
  log(state)
  res.send('dtc')

app.get '/userHasEntered', (req, res) ->
  res.send('dtc')

app.get '/userHasExited', (req, res) ->
  res.send('dtc')

app.get '/nextCommand', (req, res) ->
  #UP|DOWN|OPEN|CLOSE|NOTHING
  result = elevator.next(state)
  state = result.state
  log(state)
  res.send(result.cmd)

log = (state) ->
  console.log('__' + state.floor + '__') 
  console.log(state.path)

app.listen(12043)
console.log("Server started")
