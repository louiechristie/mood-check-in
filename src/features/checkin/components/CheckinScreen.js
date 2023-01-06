import React from 'react';
import { ScrollView, View, Text, Dimensions, Switch, ActivityIndicator } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { withNavigation } from 'react-navigation';

import Colors from '../../../constants/Colors';
import ErrorBoundary from '../components/ErrorBoundary';
import MoodSlider from '../components/MoodSlider';
import SomethingWentWrong from '../components/SomethingWentWrong';

const DEBUG = false;

const feelingsList = ['optimistic', 'happy', 'bored', 'depressed'];

class CheckinScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mood: 4,
      feelings: [],
      comment: '',
    };
    this.renderFeeling = this.renderFeeling.bind(this);
  }

  renderFeeling(thisFeeling) {
    const { feelings } = this.state;
    const includes = feelings.includes(thisFeeling);
    return (
      <View
        key={thisFeeling}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 2,
          borderWidth: DEBUG ? 1 : 0,
          borderColor: 'blue',
        }}>
        <Text>{thisFeeling.charAt(0).toUpperCase() + thisFeeling.slice(1)}</Text>
        <Switch
          style={{ borderWidth: DEBUG ? 1 : 0, borderColor: 'indigo' }}
          onValueChange={() => {
            if (includes) {
              this.setState({
                feelings: feelings.filter((feeling) => {
                  return feeling !== thisFeeling;
                }),
              });
            } else {
              this.setState({
                feelings: [...feelings, thisFeeling],
              });
            }
          }}
          value={includes}
        />
      </View>
    );
  }

  render() {
    const { isLoading, hasErrored, add, navigation } = this.props;
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const smallerDimension = Math.min(width, height);

    if (hasErrored) {
      return <SomethingWentWrong />;
    }

    return (
      <ErrorBoundary>
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
            justifyContent: 'space-around',
            height: '100%',
            borderWidth: DEBUG ? 8 : 0,
            borderColor: 'red',
            padding: 10,
          }}>
          <View
            style={{
              width: smallerDimension,
              padding: 10,
              borderWidth: DEBUG ? 2 : 0,
              borderColor: 'orange',
            }}>
            <MoodSlider
              onChange={(mood) => {
                this.setState({
                  mood,
                });
              }}
            />
          </View>

          <View
            style={{
              padding: 10,
              borderWidth: DEBUG ? 2 : 0,
              borderColor: 'orange',
            }}>
            {feelingsList.map((feeling) => {
              return this.renderFeeling(feeling);
            })}

            <TextInput
              mode="outlined"
              value={this.state.comment}
              placeholder="Type your optional note here..."
              onChangeText={(comment) => {
                this.setState({
                  comment,
                });
              }}
              dense
            />
          </View>

          <View
            style={{
              borderWidth: DEBUG ? 2 : 0,
              borderColor: 'orange',
            }}>
            <Button
              mode="contained"
              dark
              disabled={isLoading}
              loading={isLoading}
              color={Colors.iconButtonAltColor}
              onPress={() => {
                const timestamp = Date.now();
                add({
                  ...this.state,
                  timestamp,
                });
                navigation.navigate('Insights');
              }}>
              Finish
            </Button>
            {isLoading && <ActivityIndicator />}
          </View>
        </ScrollView>
      </ErrorBoundary>
    );
  }
}

export default withNavigation(CheckinScreen);
