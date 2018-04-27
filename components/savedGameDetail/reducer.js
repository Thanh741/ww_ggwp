const initialState = {
  game : []
}
const gameDetail = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_DETAIL_GAME': return {...state, game: action.payload}
    default: return state
  }
}
export default gameDetail
