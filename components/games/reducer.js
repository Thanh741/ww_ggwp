// status: 0, 1, 3
// 0: alive
// 1: death by WEREWOLF
// 2: death by witch

const initialState = {
  currentDay: 1,
  currentShift: 0,
  days: [],
  order: 0,
  callOrder: [],
  clock: {
    minutes: 2,
    seconds: 30
  },
  killingDiscussion: false,
  discussion: false
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_FIRST_DAY':
      return  {...state, days: action.payload}
    case 'INIT_CALL_ORDER':
      return {...state, callOrder: action.payload}
    case 'NEXT_ORDER':
      return {...state, order: action.payload}
    case 'WEREWOLF_KILL':
      return {...state, days: action.payload}
    case 'DOCTOR_HEAL':
      return {...state, days: action.payload}
    case 'WITCH_KILL':
      return {...state, days: action.payload}
    case 'WITCH_SAVE':
      return {...state, days: action.payload}
    case 'PEOPLE_KILL':
        return {...state, days: action.payload}
    case 'CHANGE_SHIFT':
      return {...state, currentShift: action.payload}
    case 'SEER_SEE':
      return {...state, currentShift: action.payload}
    case 'NEXT_DAY':
      return {
        ...state,
        currentDay: action.payload.currentDay,
        currentShift: action.payload.currentShift,
        days: action.payload.days,
        order: action.payload.order,
        discussion: false,
        killingDiscussion: false
      }
    case 'TOGGLE_VOTING':
      return {
        ...state,
        killingDiscussion: action.payload
      }
    case 'TOGGLE_DISCUSSION':
      return {
        ...state,
        discussion: action.payload
      }
    case 'RESET_GAME':
      return initialState
    default:
      return state
  }
}

export default gameReducer;
