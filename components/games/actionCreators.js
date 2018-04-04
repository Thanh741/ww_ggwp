export const nextDay = () => (dispatch, getState) => {

}


export const killHim = (name) => (dispatch, getState) => {
  let { days, currentDay } = getState().game
  const patient = survivors.filter((i) => i.name === name).map((i) => {
     const status = i.status.push('dead')
     return {...i, status}})[0]
  let survivors = days.filter((day) => day === currentDay)[0]
  survivors = survivors.map((i) => {
    if (i.name === name) { i = patient }
    return i
  })
  dispatch({type: 'WEREWOLF_KILL', payload: survivors})
  dispatch({type: 'NEXT_DAY', payload: currentDay + 1})
}

export const witchKillHim = (name) = (dispatch, getState) => {
  let { days, currentDay } = getState().game
  const patient = survivors.filter((i) => i.name === name).map((i) => {
    const status = i.status.push('deadByWitch')
    return {...i, status}})[0]
  let survivors = days.filter((day) => day === currentDay)[0]
  survivors = survivors.map((i) => {
    if (i.name === name) { i = patient }
    return i
  })
  dispatch({type: 'WEREWOLF_KILL', payload: survivors})
  dispatch({type: 'NEXT_DAY', payload: currentDay + 1})
}

export const witchSaveHime = (name) = (dispatch, getState) => {
  let { days, currentDay } = getState().game
  const patient = survivors.filter((i) => i.name === name).map((i) => {
    const status = i.status.push('saveByWitch')
    return {...i, status}})[0]
  let survivors = days.filter((day) => day === currentDay)[0]
  survivors = survivors.map((i) => {
    if (i.name === name) { i = patient }
    return i
  })
  dispatch({type: 'WEREWOLF_KILL', payload: survivors})
  dispatch({type: 'NEXT_DAY', payload: currentDay + 1})
}

export const protectHim = (name) => (dispatch, getState) => {
  let { days, currentDay } = getState().game
  const patient = survivors.filter((i) => i.name === name).map((i) => {
    const status = i.status.push('protected')
    return {...i, status}})[0]
  let survivors = days.filter((day) => day === currentDay)[0]
  survivors = survivors.map((i) => {
    if (i.name === name) { i = patient }
    return i
  })
  dispatch({type: 'WEREWOLF_KILL', payload: survivors})
  dispatch({type: 'NEXT_DAY', payload: currentDay + 1})
}

export const checkRoleOfHim = (name) => (dispatch, getState) =>  {
  let { days, currentDay } = getState().game
  const patient = survivors.filter((i) => i.name === name).map((i) => {
    const status = i.status.push('checked')
    return {...i, status}})[0]
  let survivors = days.filter((day) => day === currentDay)[0]
  survivors = survivors.map((i) => {
    if (i.name === name) { i = patient }
    return i
  })
  dispatch({type: 'WEREWOLF_KILL', payload: survivors})
  dispatch({type: 'NEXT_DAY', payload: currentDay + 1})
}
