const initialState = {
  games : []
}
const saveGames = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_SAVED_GAMES': return {...state, games: action.payload}
    default: return state
  }
}
export default saveGames
