import SavedGames from './savedGames'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as assigningActionCreators from './actionCreator'

const mapStateToProps = (state: Object) => (
  {
    games: state.savedGames.games
  }
)
const mapDispatchToProps = (dispatch: Function) => bindActionCreators({
  ...assigningActionCreators
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(SavedGames)
