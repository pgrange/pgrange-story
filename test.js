require('source-map-support').install()

var assert = require('assert');
var elevator = require('./elevator.js');
var ns = elevator.new_state

require('./utils.js')

function assert_path_when_called_at(state, floor, expected_path) {
  assert.deepEqual(elevator.call(state, floor).path, expected_path)
}

describe('Elevator', function() {
 describe('when called', function() {
  it('should target floor', function() {
    assert_path_when_called_at(ns(), 1, [1])
  })
  it('should target floor event if it is current floor', function() {
    assert_path_when_called_at(ns({floor: 0}), 0, [0])
  })
  it('should ignore if already targets floor', function() {
    var state = elevator.call(ns({floor: 0}), 0)
    assert_path_when_called_at(state, 0, [0])
  })
 })
 describe('when asked what to do next', function() {
  it('should not move if nowhere to go', function() {
    var result = elevator.next(ns())
    assert.equal(result.cmd, "NOTHING")
  })
  it('should go up toward next floor', function() {
    var state = ns({floor: 0, path: [1, 2]})
    var result = elevator.next(state)
    assert.equal(result.cmd, "UP")
    assert.equal(result.state.floor, 1)
  })
  it('should go down toward next floor', function() {
    var state = ns({floor: 6, path: [1, 2]})
    var result = elevator.next(state)
    assert.equal(result.cmd, "DOWN")
    assert.equal(result.state.floor, 5)
  })
  it('should open then close if at targeted floor', function() {
    var state = ns({floor: 0, path: [0, 1]})
    var result = elevator.next(state)
    assert.equal(result.cmd, "OPEN")
    assert.deepEqual(result.state.path, [1])
    
    result = elevator.next(result.state)
    assert.equal(result.cmd, "CLOSE")
    assert.equal(result.state.open, false)
  })
 })
})
