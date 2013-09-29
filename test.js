var assert = require('assert');
var expect = require('expect.js');
var elevator = require('./elevator.js');
var ns = elevator.new_state

require('./utils.js')
 
var next_state

//never in the cave
next_state = elevator.next(ns({floor: 0}))
expect(next_state.cmd).not.eql('cmd', 'DOWN')

//never move with door open
next_state = elevator.next(ns({open: true}))
expect(next_state.cmd).not.eql('cmd', 'DOWN')
expect(next_state.cmd).not.eql('cmd', 'UP')

//never move if no one is waiting
next_state = elevator.next(ns({called_at: []}))
expect(next_state.cmd).not.eql('DOWN')
expect(next_state.cmd).not.eql('UP')

//opens when at a called at floor
next_state = elevator.next(ns({called_at: [2], floor: 2}))
expect(next_state.cmd).to.eql('OPEN')
expect(next_state.open).to.be.ok()
expect(next_state.called_at).to.eql([])

//closes when opened (but with a delay)
next_state = elevator.next(ns({open: true, floor: 1, cmd: 'OPEN'}))
expect(next_state.cmd).to.eql('NOTHING')
expect(next_state.open).to.be.ok()
expect(next_state.floor).to.eql(1)
next_state = elevator.next(next_state)
expect(next_state.open).not.to.be.ok()
expect(next_state.cmd).to.eql('CLOSE')
expect(next_state.floor).to.eql(1)

//opens if asked to go to this floor
next_state = elevator.next(ns({floor: 1, asked_to_go_to: [1]}))
expect(next_state.cmd).to.eql('OPEN')

//goes up if asked to go or called only at a higher floor
next_state = elevator.next(ns({floor: 1, 
                               asked_to_go_to: [3], 
                               called_at: [2, 4]}))
expect(next_state.cmd).to.eql('UP')

next_state = elevator.next(ns({floor: 5, 
                               asked_to_go_to: [3], 
                               called_at: [2, 4]}))
expect(next_state.cmd).to.eql('DOWN')

//can call at floor
next_state = elevator.called_at(ns(), 2)
expect(next_state.called_at.contains(2)).be.ok()

//can ask to go to floor
next_state = elevator.go(ns(), 2)
expect(next_state.asked_to_go_to.contains(2)).be.ok()

//a user can enter
next_state = elevator.enter(ns())
expect(next_state.nb_users).to.eql(1)

//a user can exit
next_state = elevator.exit(ns({nb_users: 1}))
expect(next_state.nb_users).to.eql(0)

//open if called at current floor
next_state = elevator.called_at(ns({floor: 0, asked_to_go_to: [0]}), 0)
next_state = elevator.next(next_state)
expect(next_state.cmd).to.eql('OPEN')
expect(next_state.asked_to_go_to.contains(0)).not.be.ok()
expect(next_state.called_at.contains(0)).not.be.ok()

