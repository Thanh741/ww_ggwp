import { checkDeadStatus, checkDeadByPeople } from '../util/helper'
import { Actions } from 'react-native-router-flux'
import { NavigationActions } from 'react-navigation'
export const nextDay = () => (dispatch, getState) => {
  let { currentDay, currentShift, days } = getState().game
  const survivors =  days[days.length - 1].survivors.filter((survivor) => !checkDeadStatus(survivor.status)).map((survivor) => { return {...survivor, status: []}})
  console.log('survivor', survivors);
  const werewolfAmount = survivors.filter(survivor => survivor.role === 'Werewolf').length
  //check is there is next day
  if (werewolfAmount * 2 >= survivors.length) {
    alert('GAME END WEREWOLF WIN')
    dispatch({type: 'RESET_GAME'})
    dispatch({type: 'RESET_SETUP'})
    dispatch({type: 'RESET_ASSIGNING'})
    // Actions.project()
    dispatch(NavigationActions.navigate({routeName: 'SetUp'}))
    return;
  }
  if (werewolfAmount === 0) {
    alert('GAME END PEOPLE WIN')
    dispatch({type: 'RESET_GAME'})
    dispatch({type: 'RESET_SETUP'})
    dispatch({type: 'RESET_ASSIGNING'})
    // Actions.project()
    dispatch(NavigationActions.navigate({routeName: 'SetUp'}))
    return;
  }
  const nextDay = {
    day: currentDay + 1,
    shift: 0,
    survivorsAmount: survivors.length,
    survivors: survivors
  }
  days.push(nextDay)
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

export const nextOrder = () => (dispatch, getState) => {
  let { days, currentDay, order, callOrder } = getState().game
  if (callOrder.length === order + 1) {
    dispatch(nextDay())
  } else {
    dispatch({type: 'NEXT_ORDER', payload: order + 1})
  }
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
        if (status === 'deadByPeople') day.survivorsAmount = day.survivorsAmount - 1
    }
    return day
  })
}

export const killByWerewolf = (name) => (dispatch, getState) => {
  console.log('name', name);
  let { days, currentDay, order } = getState().game

  const updateState = setStatus(name, 'deadByWerewolf', days, currentDay)

  dispatch({type: 'WEREWOLF_KILL', payload: updateState})
  dispatch(nextOrder())
}

export const killByWitch = (name) => (dispatch, getState) => {
  let { days, currentDay, order } = getState().game

  const updateState = setStatus(name, 'deadByWitch', days, currentDay)

  dispatch({type: 'WITCH_KILL', payload: updateState})
  dispatch(nextOrder())
}

export const saveByWitch = (name) => (dispatch, getState) => {
  let { days, currentDay, order } = getState().game

  const updateState = setStatus(name, 'saveByWitch', days, currentDay)

  dispatch({type: 'WITCH_SAVE', payload: updateState})
  dispatch(nextOrder())
}

export const healByDoctor = (name) => (dispatch, getState) => {
  let { days, currentDay, order } = getState().game

  const updateState = setStatus(name, 'healByDoctor', days, currentDay)

  dispatch({type: 'DOCTOR_HEAL', payload: updateState})
  dispatch({type: 'MARK_HEAL', payload: name})
  dispatch(nextOrder())
}

export const seeBySeer = (name) => (dispatch, getState) =>  {
  let { days, currentDay, order, currentShift } = getState().game

  const updateState = setStatus(name, 'seeBySeer', days, currentDay)

  dispatch({type: 'SEER_SEE', payload: updateState})
  dispatch(nextOrder())
}

export const killByPeople = (name) => (dispatch, getState) => {
  let { days, currentDay, order, currentShift } = getState().game

  const updateState = setStatus(name, 'deadByPeople', days, currentDay)
  dispatch({type: 'PEOPLE_KILL', payload: updateState})
  dispatch(changeShift())
}

export const changeShift = () => (dispatch, getState) => {
  const { currentShift } = getState().game
  const newShift = currentShift ? 0 : 1
  dispatch({type: 'CHANGE_SHIFT', payload: newShift})
}

export const toggleDiscussion = () => (dispatch, getState) => {
  let { discussion } = getState().game
  if (discussion) {
    dispatch({type: 'TOGGLE_VOTING', payload: true})
  }
  dispatch({type: 'TOGGLE_DISCUSSION', payload: !discussion})
}
export const toggleVoting = () => (dispatch, getState) => {
  let { killingDiscussion } = getState().game
  dispatch({type: 'TOGGLE_VOTING', payload: !killingDiscussion})
}
