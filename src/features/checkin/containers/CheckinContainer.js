import React from 'React';
import { ScrollView, View, StyleSheet, Dimensions } from 'react-native';
import MoodSlider from '../components/MoodSlider';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const smallerDimension = Math.min(width, height);

export default class CheckinContainer extends React.Component {
  static navigationOptions = {
    title: 'Check-in',
  };

  render() {
    return (
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <View
            style={{
              flex: 1,
              width: smallerDimension,
            }}>
            <MoodSlider />
          </View>
        </View>
      </ScrollView>
    );
  }
}
