const initialState = {
  players : [],
  current: 0,
}
const assigningReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_ASSIGN_STATE': return {...state, players: action.payload}
    case 'NEXT_PLAYER' : return {...state, current: action.payload}
    default: return state
  }
}
export default assigningReducer;
