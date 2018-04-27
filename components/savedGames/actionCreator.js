import { AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation'

export const loadSavedGames = () => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getAllKeys((err, keys) => {
      AsyncStorage.multiGet(keys, (err, stores) => {
        console.log(stores);
        const data = stores.map((game) => {
          const parseData = {
            time: game[0],
            day: JSON.parse(game[1])
          }
          return parseData
        })
        console.log("data", data);
        dispatch({type: 'INIT_SAVED_GAMES', payload: data})
      });
    });
  });
}

export const redirectToDetail = (time) => (dispatch, getState) => {
  console.log('time', time);
  const { games } = getState().savedGames;
  const game = games.filter((item) => item.time == time)[0]
  game && dispatch({type: 'INIT_DETAIL_GAME', payload: game})
  dispatch(NavigationActions.navigate({routeName: 'DetailGame'}))
}
