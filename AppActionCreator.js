export const validateRules = () => (dispatch, getState) => {
  const rules = getState().rules;
  if (rules.playerNumber != rules.playerNames.split(',').length) {
    return { valid: false, message: `Player names don't match player number` }
  }
  if (checkDuplicate(rules.playerNames.split(','))) {
    return { valid: false, message: `Players have duplicate name`}
  }
  return { valid: true, message: 'Validation success'}
}

export const randomRoles = () => (dispatch, getState) => {
  const rules = getState().rules;

  const extendRoles = rules.roles.filter(role => role.active).map(role => role.name)
  const wereWolfNo = Math.floor(rules.playerNumber / 3)
  const villagerNo = rules.playerNumber - wereWolfNo - extendRoles.length

  let wereWolf = []
  for(let i = 0; i < wereWolfNo; i++) { wereWolf.push('Werewolf')}

  let villagers = []
  for(let i = 0; i < villagerNo; i++) { villagers.push('Villager')}

  const allRoles =  wereWolf.concat(villagers, extendRoles)
  let randomArray = []
  for(let i = 0; i < rules.playerNumber; i++) { randomArray.push(i)}
  randomArray = shuffle(randomArray)

  let players = rules.playerNames.split(',')
  // for(let i = 0; i < players.length; i++) { players[i].role = allRoles[randomArray[i]]}
  players = players.map((player, index) => {
    return {
      name: player,
      role: allRoles[randomArray[index]]
    }
  })

  console.log('player', players);
  dispatch({type: 'INIT_ASSIGN_STATE', payload: players})
}
export const startGame = () => (dispatch, getState) => {
  const rules = getState().rules;
  const currentDay = 1;
  const currentShift = 1;
  const dayOne = {
    day: 1,
    shift: 0,
    survivorsAmount: rules.playerNumber,
    survivors: []
  }
}

const checkDuplicate = (list) => {
  const tempList = []
  for(let i = 0; i < list.length; i++) {
    if(tempList.indexOf(list[i]) > -1) {
      return true
    }
    tempList.push(list[i]);
  }
  return false
}

const shuffle = (array) => {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
