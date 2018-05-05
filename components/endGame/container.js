import EndGame from './endGame'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as gameActionCreators from './actionCreators'


const mapDispatchToProps = (dispatch: Function) => bindActionCreators({
  ...gameActionCreators
}, dispatch)

export default connect(null ,mapDispatchToProps)(EndGame);
