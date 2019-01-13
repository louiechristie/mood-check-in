import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import { NavigationEvents } from 'react-navigation';
import { Appbar } from 'react-native-paper';
import { checkinsFetchData, checkinsDelete } from '../actions/checkins';
import InsightsScreen from '../components/InsightsScreen';

class InsightsContainer extends React.Component {
  static navigationOptions = {
    title: 'Insights',
    header: (
      <Appbar.Header dark>
        <Appbar.Content title="Insights" />
      </Appbar.Header>
    ),
  };

  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    return (
      <View>
        <NavigationEvents onDidFocus={this.props.fetchData} />
        <InsightsScreen {...this.props} />
      </View>
    );
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
