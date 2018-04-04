export const nextDay = () => (dispatch, getState) => {

}

const setStatus = (name, status, days, currentDay) => {
  return days.map((day) => {
    if (day.day === currentDay) {
        day.survivors = day.survivors.map((survivor) => {
          if (survivor.name === name) {
            survivor.status = survivor.status.push(status)
          }
          return survivor
        })
    }
    return day
  })
}

export const killByWerewolf = (name) => (dispatch, getState) => {
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
  const newShift = currentShift ? 0 : 1
  dispatch({type: 'CHANGE_SHIFT', payload: newShift})
}
