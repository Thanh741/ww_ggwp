import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import setupComponent from './setup';
import * as actionCreators from './actionCreator'


const mapStateToProps = (state: Object) => ({
  roles: state.rules.roles,
  playerNames: state.rules.playerNames,
  playerNumber: state.rules.playerNumber,
  nav: state.nav
})

const mapDispatchToProps = (dispatch: Function) => {
  return Object.assign({dispatch: dispatch}, bindActionCreators(actionCreators, dispatch));
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(setupComponent);
