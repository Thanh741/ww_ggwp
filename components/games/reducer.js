// status: 0, 1, 3
// 0: alive
// 1: death by WEREWOLF
// 2: death by witch

const initialState = {
  currentDay: 1,
  currentShift: 0,
  days: [
    {
      day: 1,
      shift: 0,
      survivorsAmount: 7,
      survivors: [
        {
          name: '',
          status: [],
          role: ''
        }
      ]
    }
  ],
  order: 0
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_FIRST_DAY':
      return {...state, days: [action.payload]}
    case 'NEXT_DAY':
      return state
    default:
      return state
  }
}

export default gameReducer;