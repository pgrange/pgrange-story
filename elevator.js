function new_state(values) {
  var new_state = {
    floor: 0,
    open: false,
    path: []
  }
  for (key in values) 
    new_state[key] = values[key]

  return new_state
}

function call(state, floor) {
  if (state.path.last() != floor) {
    state.path.push(floor)
  }
  return state
}

function next(state) {
  if (nowhere_to_go(state))  return nothing(state)
  if (should_close(state))   return close(state)
  if (should_open(state))    return open(state)
  if (should_go_up(state))   return up(state)
  if (should_go_down(state)) return down(state)
  return nothing()
}

function nothing(state) {
  return {cmd: 'NOTHING', state: state}
}

function open(state) {
  state.path.shift()
  state.open = true
  return {cmd: 'OPEN', state: state}
}

function close(state) {
  state.open = false
  return {cmd: 'CLOSE', state: state}
}

function up(state) {
  state.floor ++
  return {cmd: 'UP', state: state}
}

function down(state) {
  state.floor --
  return {cmd: 'DOWN', state: state}
}


 

function should_open(state) {
  return (state.floor == state.path[0])
}

function should_close(state) {
  return state.open
}

function should_go_up(state) {
  return state.path[0] > state.floor 
}

function should_go_down(state) {
  return state.path[0] < state.floor 
}

function nowhere_to_go(state) {
  return state.path.length == 0
}

exports.new_state = new_state
exports.call = call
exports.next = next
