var assert = require('assert');
var expect = require('expect.js');
var elevator = require('./elevator.js');
var ns = elevator.new_state

require('./utils.js')

var state
var next_state
var result

// add next target
next_state = elevator.call(ns({floor: 0}), 1)
expect(next_state.path).to.eql([1])

// add next target event if at floor
next_state = elevator.call(ns({floor: 0}), 0)
expect(next_state.path).to.eql([0])

// do not add if already last target
next_state = elevator.call(ns({floor: 0}), 0)
next_state = elevator.call(next_state, 0)
expect(next_state.path).to.eql([0])

// do not move if nowhere to go
result = elevator.next(ns())
expect(result.cmd).to.eql('NOTHING')

// open then close if at next floor
state = ns({floor: 0, path: [0, 1]})
result = elevator.next(state)
expect(result.cmd).to.eql('OPEN')
expect(result.state.path).to.eql([1])

result = elevator.next(state)
expect(result.cmd).to.eql('CLOSE')
expect(result.state.open).not.to.be.ok()

// goes toward next floor (UP)
state = ns({floor: 0, path: [1, 2]})
result = elevator.next(state)
expect(result.cmd).to.eql('UP')
expect(result.state.floor).to.eql(1)

// goes toward next floor (DOWN)
state = ns({floor: 6, path: [1, 2]})
result = elevator.next(state)
expect(result.cmd).to.eql('DOWN')
expect(result.state.floor).to.eql(5)
