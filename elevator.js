function new_state(values) {
  var new_state = {
    open: false,
    floor: 0,
    called_at: [],
    asked_to_go_to: [],
    nb_users: 0,
  }
  for (key in values) new_state[key] = values[key]

  return new_state
}

function called_at(state, floor) {
  state.called_at.push(floor)
  return state
}

function enter(state) {
  state.nb_users ++
  return state
}

function exit(state) {
  state.nb_users -- 
  return state
}

function go(state, floor) {
  state.asked_to_go_to.push(floor)
  return state
}

function next(state) {
  if (state.open) state = close(state)
  else if (called_at_current_floor(state)) state = open(state)
  else if (goes_at_current_floor(state)) state = open(state)
  else if (wish_to_go_higher(state)) state = up(state)
  else if (wish_to_go_down(state)) state = down(state)
  else nothing(state)
  return state
}

function wish_to_go_higher(state) {
  for(var i = 0; i < state.called_at.length; i++) {
    if (state.called_at[i] > state.floor) return true
  }
  for(var i = 0; i < state.asked_to_go_to.length; i++) {
    if (state.asked_to_go_to[i] > state.floor) return true
  }
  return false
}

function wish_to_go_down(state) {
  for(var i = 0; i < state.asked_to_go_to.length; i++) {
    if (state.asked_to_go_to[i] < state.floor) return true
  }
  for(var i = 0; i < state.called_at.length; i++) {
    if (state.called_at[i] < state.floor) return true
  }
  return false
}


function called_at_current_floor(state) {
  return state.called_at.contains(state.floor)
}

function goes_at_current_floor(state) {
  return state.asked_to_go_to.contains(state.floor)
}

function open(state) {
  state.cmd = 'OPEN'
  state.open = true
  state.called_at.pop(state.called_at.indexOf(state.floor))
  state.asked_to_go_to.pop(state.called_at.indexOf(state.floor))
  return state
}

function close(state) {
  if (state.cmd == 'OPEN') {
    //just opened, wait a little
    state.cmd = 'NOTHING'
  } else {
    state.open = false
    state.cmd = 'CLOSE'
  }
  return state
}

function nothing(state) {
  state.cmd = 'NOTHING'
  return state
}

function up(state) {
  state.cmd = 'UP'
  state.floor ++
  return state
}

function down(state) {
  state.cmd = 'DOWN'
  state.floor --
  return state
}


exports.next = next
exports.new_state = new_state
exports.called_at = called_at
exports.go = go
exports.enter = enter
exports.exit = exit
