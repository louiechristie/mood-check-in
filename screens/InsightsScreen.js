import React from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';

export default class InsightsScreen extends React.Component {
  static navigationOptions = {
    title: 'Insights',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      hasErrored: false,
      checkins: [],
    };
    this.renderCheckin = this.renderCheckin.bind(this);
  }

  componentDidMount() {
    return fetch('https://mood-check-in-api.herokuapp.com/checkins')
      .then(response => response.json())
      .then(responseJson => {
        this.setState(
          {
            isLoading: false,
            checkins: responseJson,
          },
          function() {}
        );
      })
      .catch(error => {
        this.setState({ hasErrored: true });
        console.error(error);
      });
  }

  renderCheckin(checkin) {
    return (
      <View key={checkin.id}>
        <Text>{JSON.stringify(checkin)}</Text>
      </View>
    );
  }

  render() {
    if (this.state.checkins && this.state.checkins.length > 0) {
      return (
        this.state.checkins && (
          <ScrollView>
            <View>
              <Text>Checkins</Text>

              {this.state.isLoading && <ActivityIndicator />}

              {this.state.checkins.map(checkin => this.renderCheckin(checkin))}
            </View>
          </ScrollView>
        )
      );
    }

    return (
      <View>
        <Text>No checkins yet</Text>

        {this.state.isLoading && <ActivityIndicator />}
      </View>
    );
  }
}
