import React from 'react';
import { connect } from 'react-redux';
import { checkinsFetchData } from '../actions/checkins';
import { URL_BASE_API, URL_PATH_CHECKINS } from '../../../constants/API';
import Insights from '../components/Insights';

class InsightsContainer extends React.Component {
  static navigationOptions = {
    title: 'Insights',
  };

  componentDidMount() {
    this.props.fetchData(`${URL_BASE_API}${URL_PATH_CHECKINS}`);
  }

  render() {
    return <Insights {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    checkins: state.checkins,
    hasErrored: state.checkinsHasErrored,
    isLoading: state.checkinsIsLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(checkinsFetchData(url)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsightsContainer);
