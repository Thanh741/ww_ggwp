import Games from './games'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
import * as gameActionCreators from './actionCreators'

const mapStateToProps = (state: Object) => ({
    currentDay: state.game.currentDay,
    currentShift: state.game.currentShift,
    days: state.game.days,
    order: state.game.order
})

const mapDispatchToProps = (dispatch: Function) => bindActionCreators({
  ...gameActionCreators
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Games);
