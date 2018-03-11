import { connect } from 'react-redux';
import setupComponent from '../setup';


const mapStateToProps = (state: Object) => getWeatherSelector(state);

const mapDispatchToProps = (dispatch: Function) => ({
  // fetchData: () => dispatch(fetchData()),
  updateSetupRule: (rule) => dispatch({
    type: 'SAVE_PLAYER_NUMBER',
    payload: rule
  })
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(setupComponent);
