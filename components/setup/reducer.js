
const initialState = {
  playerNumber: 7,
  playerNames: 'Alex, Bray, Dat, Emoji, Frank, Geti, Jenny',
  roles: [{name: 'Witch', active: true}, {name: 'Doctor', active: false}, {name: 'Seer', active: false}]
}
const setupReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PLAYER_NUMBER':
      return { ...state, playerNumber: action.payload}
    case 'UPDATE_PLAYER_NAMES':
      return { ...state, playerNames: action.payload}
    case 'UPDATE_PLAYER_ROLES':
      return { ...state, roles: action.payload}
    case 'RESET_SETUP':
      return {
        playerNumber: 7,
        playerNames: '',
        roles: [{name: 'Witch', active: true}, {name: 'Doctor', active: false}, {name: 'Seer', active: false}]
      }
    default:
      return state
  }
}

export default setupReducer
