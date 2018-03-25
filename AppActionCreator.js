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
