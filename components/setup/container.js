import { connect } from 'react-redux';
import setupComponent from './setup';


const mapStateToProps = (state: Object) => ({
  roles: state.rules.roles,
  playerNames: state.rules.playerNames,
  playerNumber: state.rules.playerNumber
})

const mapDispatchToProps = (dispatch: Function) => ({
  updatePlayerNumber: (playerNumber) => {
    dispatch({
      type: 'UPDATE_PLAYER_NUMBER',
      payload: playerNumber
    })
  },
  updatePlayerNames: (playerNames) => {
    dispatch({
      type: 'UPDATE_PLAYER_NAMES',
      payload: playerNames
    })
  },
  updateRoles: (roles) => {
    console.log('roles', roles);
    dispatch({
      type: 'UPDATE_PLAYER_ROLES',
      payload: roles
    })
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(setupComponent);
