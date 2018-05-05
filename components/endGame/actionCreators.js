import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation'

export const saveGame = () => (dispatch, getState) => {
  const saveData = getState().game.days
  AsyncStorage.setItem(`@wereWolf:${Date.now()}`, JSON.stringify(saveData))

  dispatch({type: 'RESET_GAME'})
  dispatch({type: 'RESET_SETUP'})
  dispatch({type: 'RESET_ASSIGNING'})
  // Actions.project()
  const reset = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'SetUp'})]
  })
  dispatch(reset)
}

export const backHome = () => (dispatch, getState) => {
  dispatch({type: 'RESET_GAME'})
  dispatch({type: 'RESET_SETUP'})
  dispatch({type: 'RESET_ASSIGNING'})
  const reset = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName: 'SetUp'})]
  })
  dispatch(reset)
}
