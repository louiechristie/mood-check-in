import React from 'react';
import { ScrollView, View, Text, ActivityIndicator, Button } from 'react-native';
import AverageMoodContainer from '../../containers/AverageMoodContainer';

class Insights extends React.Component {
  constructor(props) {
    super(props);
    this.renderCheckin = this.renderCheckin.bind(this);
  }

  // renderDeleteAllButton() {
  //   return (
  //     <Button
  //       title="DeleteAll"
  //       onPress={() => this.props.deleteMultiple(this.props.checkins.map(({ id }) => id))}
  //     />
  //   );
  // }

  renderCheckin(checkin) {
    return (
      <View key={checkin.id}>
        <Text>{JSON.stringify(checkin)}</Text>
        <Button title="Delete" onPress={() => this.props.delete(checkin.id)} />
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
            <View style={{ flex: 1 }}>
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
