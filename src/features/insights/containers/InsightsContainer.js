import React from 'react';
import { connect } from 'react-redux';
import { checkinsFetchData, checkinsDelete } from '../actions/checkins';
import Insights from '../components/Insights';

class InsightsContainer extends React.Component {
  static navigationOptions = {
    title: 'Insights',
  };

  componentDidMount() {
    this.props.fetchData();
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
    fetchData: () => dispatch(checkinsFetchData()),
    delete: id => dispatch(checkinsDelete(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsightsContainer);
