require('source-map-support').install()

assert = require('assert');
elevator = require('./elevator.js');
ns = elevator.new_state

#require('./utils.js')

assert_path_when_called_at = (state, floor, expected_path) ->
  assert.deepEqual(elevator.call(state, floor).path, expected_path)

describe 'Elevator', ->
 describe 'when called', ->
  it 'should target floor', ->
   assert_path_when_called_at(ns(), 1, [1])

  it 'should target floor event if it is current floor', ->
   assert_path_when_called_at(ns({floor: 0}), 0, [0])

  it 'should ignore if already targets floor', ->
   state = elevator.call(ns({floor: 0}), 0)
   assert_path_when_called_at(state, 0, [0])

 describe 'when asked what to do next', ->
  it 'should not move if nowhere to go', ->
   result = elevator.next(ns())
   assert.equal(result.cmd, "NOTHING")

  it 'should go up toward next floor', ->
   state = ns({floor: 0, path: [1, 2]})
   result = elevator.next(state)
   assert.equal(result.cmd, "UP")
   assert.equal(result.state.floor, 1)

  it 'should go down toward next floor', ->
   state = ns({floor: 5, path: [1, 2]})
   result = elevator.next(state)
   assert.equal(result.cmd, "DOWN")
   assert.equal(result.state.floor, 4)

 it 'should open then close if at targeted floor', ->
   state = ns({floor: 0, path: [0, 1]})
   result = elevator.next(state)
   assert.equal(result.cmd, "OPEN")
   assert.deepEqual(result.state.path, [1])
   
   result = elevator.next(result.state)
   assert.equal(result.cmd, "CLOSE")
   assert.equal(result.state.open, false)
