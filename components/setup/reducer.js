
const initialState = {
  playerNumber: 7,
  playerNames: '',
  roles: [{name: 'Seer', active: true}, {name: 'Protector', active: false}, {name: 'Witch', active: false}]
}
const setupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PLAYER_NUMBER':
      return { ...state, playerNumber: action.payload}
    case 'UPDATE_PLAYER_NAMES':
      console.log(action.payload);
      return { ...state, playerNames: action.payload}
    case 'UPDATE_PLAYER_ROLES':
      return { ...state, roles: action.payload}
    default:
      return state
  }
}

export default setupReducer
