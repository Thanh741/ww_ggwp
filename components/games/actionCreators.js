export const nextDay = () => (dispatch, getState) => {
  const { players, current } = getState().assigning;
  console.log(current);
  if (players.length > (current + 1)) {
    dispatch({
      type: 'NEXT_PLAYER',
      payload: current + 1
    })
  } else {
    const firstDay = {
          day: 1,
          shift: 0,
          survivorsAmount: players.length,
          survivors: players.map((player) => {
            return {...player, status: [0]}
          })
        }
    dispatch({
      type: 'INIT_FIRST_DAY',
      payload: firstDay
    })
    Actions.push('game')
  }
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
