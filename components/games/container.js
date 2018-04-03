import Games from './games'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = (state: Object) => ({
    currentDay: state.game.currentDay,
    currentShift: state.game.currentShift,
    days: state.game.days,
    order: state.game.order
})

const mapDispatchToProps = (dispatch: Function) => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Games);
