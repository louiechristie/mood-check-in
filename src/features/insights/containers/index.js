import React from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { checkinsFetchData } from '../actions/checkins';
import { URL_BASE_API, URL_PATH_CHECKINS } from '../../../constants/API';

class InsightsScreen extends React.Component {
  static navigationOptions = {
    title: 'Insights',
  };

  constructor(props) {
    super(props);
    this.renderCheckin = this.renderCheckin.bind(this);
  }

  componentDidMount() {
    this.props.fetchData(`${URL_BASE_API}${URL_PATH_CHECKINS}`);
  }

  renderCheckin(checkin) {
    return (
      <View key={checkin.id}>
        <Text>{JSON.stringify(checkin)}</Text>
      </View>
    );
  }

  render() {
    const { checkins, isLoading, hasErrored } = this.props;

    if (hasErrored) {
      return (
        <View>
          <Text>Sorry, something went wrong. Please try again later.</Text>
        </View>
      );
    }

    if (checkins && checkins.length > 0) {
      return (
        checkins && (
          <ScrollView>
            <View>
              <Text>Checkins</Text>

              {isLoading && <ActivityIndicator />}

              {checkins.map(checkin => this.renderCheckin(checkin))}
            </View>
          </ScrollView>
        )
      );
    }

    return (
      <View>
        <Text>No checkins yet</Text>

        {isLoading && <ActivityIndicator />}
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
    fetchData: url => dispatch(checkinsFetchData(url)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InsightsScreen);
