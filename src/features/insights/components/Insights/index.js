import React from 'react';
import { ScrollView, View, Text, ActivityIndicator } from 'react-native';
import AverageMoodContainer from '../../containers/AverageMoodContainer';

class Insights extends React.Component {
  constructor(props) {
    super(props);
    this.renderCheckin = this.renderCheckin.bind(this);
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
              <AverageMoodContainer checkins={checkins} />

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

export default Insights;
