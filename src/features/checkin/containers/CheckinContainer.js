import React from 'react';
import { connect } from 'react-redux';
import { Appbar } from 'react-native-paper';
import { checkinsAdd } from '../actions/checkins';
import ErrorBoundary from '../components/ErrorBoundary';
import CheckinScreen from '../components/CheckinScreen';

class CheckinContainer extends React.Component {
  static navigationOptions = {
    title: 'Check-in',
    header: () => (
      <Appbar.Header dark>
        <Appbar.Content title="Check-in" />
      </Appbar.Header>
    ),
  };

  render() {
    const { isLoading, hasErrored, add } = this.props;

    return (
      <ErrorBoundary>
        <CheckinScreen isLoading={isLoading} hasErrored={hasErrored} add={add} />
      </ErrorBoundary>
    );
  }
}

const mapStateToProps = state => {
  return {
    hasErrored: state.checkinsHasErrored,
    isLoading: state.checkinsIsLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: checkin => dispatch(checkinsAdd(checkin)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckinContainer);
