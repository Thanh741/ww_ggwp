export const nextPlayer = () => (dispatch, getState) => {
  const { assigning } = getState();
  dispatch({
    type: 'NEXT_PLAYER',
    payload: assigning.current + 1
  })
}
