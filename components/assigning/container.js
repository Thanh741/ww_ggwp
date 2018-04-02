import Assigning from './assigning'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as assigningActionCreators from './actionCreator'

const mapStateToProps = (state: Object) => (
  {
    player: state.assigning.players[state.assigning.current]
  }
)
const mapDispatchToProps = (dispatch: Function) => bindActionCreators({
  ...assigningActionCreators
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Assigning)
