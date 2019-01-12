import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
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
    return (
      <View>
        <NavigationEvents onDidFocus={this.props.fetchData} />
        <Insights {...this.props} />
      </View>
    );
  }
}

<NavigationEvents
  onWillFocus={payload => console.log('will focus', payload)}
  onDidFocus={payload => console.log('did focus', payload)}
  onWillBlur={payload => console.log('will blur', payload)}
  onDidBlur={payload => console.log('did blur', payload)}
/>;

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
