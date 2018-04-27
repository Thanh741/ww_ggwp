import SavedGameDetail from './savedGameDetail'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
// import * as assigningActionCreators from './actionCreator'

const mapStateToProps = (state: Object) => (
  {
    game: state.detailGame.game
  }
)
// const mapDispatchToProps = (dispatch: Function) => bindActionCreators({
//   ...assigningActionCreators
// }, dispatch)

export default connect(mapStateToProps)(SavedGameDetail)
