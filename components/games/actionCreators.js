export const checkStatus = (status) => (status.filter((i) => i.includes('dead')).length > 0)

export const nextDay = () => (dispatch, getState) => {
  let { currentDay, currentShift, days } = getState().game
  const survivors =  days[days.length - 1].survivors.filter((survivor) => checkStatus(survivor.status))
  const nextDay = {
    day: currentDay + 1,
    shift: 0,
    survivorsAmount: survivors.length,
    survivors: survivors
  }
  console.log('1', JSON.parse(JSON.stringify(days)));
  console.log('2', nextDay);
  days.push(nextDay)
  console.log('day', days);
  dispatch({
    type: 'NEXT_DAY',
    payload: {
      currentDay: currentDay + 1,
      currentShift: 1,
      days: days,
      order: 0
    }
  })
}

const setStatus = (name, status, days, currentDay) => {
  console.log('// DEBUG: ');
  return days.map((day) => {
    if (day.day === currentDay) {
        day.survivors = day.survivors.map((survivor) => {
          if (survivor.name === name) {
            survivor.status.push(status)
          }
          return survivor
        })
    }
    return day
  })
}

export const killByWerewolf = (name) => (dispatch, getState) => {
  console.log('name', name);
  let { days, currentDay, order } = getState().game

  const updateState = setStatus(name, 'deadByWerewolf', days, currentDay)

  dispatch({type: 'WEREWOLF_KILL', payload: updateState})
  dispatch({type: 'NEXT_ORDER', payload: order + 1})
}

export const killByWitch = (name) => (dispatch, getState) => {
  let { days, currentDay, order } = getState().game

  const updateState = setStatus(name, 'deadByWitch', days, currentDay)

  dispatch({type: 'WITCH_KILL', payload: updateState})
  dispatch({type: 'NEXT_ORDER', payload: order + 1})
}

export const saveByWitch = (name) => (dispatch, getState) => {
  let { days, currentDay, order } = getState().game

  const updateState = setStatus(name, 'saveByWitch', days, currentDay)

  dispatch({type: 'WITCH_SAVE', payload: updateState})
  dispatch({type: 'NEXT_ORDER', payload: order + 1})
}

export const healByDoctor = (name) => (dispatch, getState) => {
  let { days, currentDay, order } = getState().game

  const updateState = setStatus(name, 'healByDoctor', days, currentDay)

  dispatch({type: 'DOCTOR_HEAL', payload: updateState})
  dispatch({type: 'NEXT_ORDER', payload: order + 1})
}

export const seeBySeer = (name) => (dispatch, getState) =>  {
  let { days, currentDay, order, currentShift } = getState().game

  const updateState = setStatus(name, 'seeBySeer', days, currentDay)

  dispatch({type: 'SEER_SEE', payload: updateState})
  // dispatch({type: 'NEXT_ORDER', payload: order + 1})

  dispatch(nextDay())
}

export const killByPeople = (name) => (dispatch, getState) => {
  let { days, currentDay, order, currentShift } = getState().game

  const updateState = setStatus(name, 'deadByPeople', days, currentDay)
  dispatch({type: 'PEOPLE_KILL', payload: updateState})
}

export const changeShift = () => (dispatch, getState) => {
  const { currentShift } = getState().game
  const newShift = currentShift ? 0 : 1
  dispatch({type: 'CHANGE_SHIFT', payload: newShift})
}
