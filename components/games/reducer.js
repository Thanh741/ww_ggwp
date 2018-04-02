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
}

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_DAY':
      return state
    default:
      return state
  }
}

export default gameReducer;
