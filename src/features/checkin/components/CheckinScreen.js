import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  Dimensions,
  Switch,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { withNavigation } from 'react-navigation';

import Colors from '../../../constants/Colors';
import ErrorBoundary from '../components/ErrorBoundary';
import MoodSlider from '../components/MoodSlider';
import SomethingWentWrong from '../components/SomethingWentWrong';

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
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 6,
        }}>
        <Text>{thisFeeling.charAt(0).toUpperCase() + thisFeeling.slice(1)}</Text>
        <Switch
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
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'position' : 'padding'}
          enabled
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 80}>
          <ScrollView>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
              }}>
              <View
                style={{
                  flex: 1,
                  width: smallerDimension,
                  padding: 10,
                }}>
                <MoodSlider
                  onChange={(mood) => {
                    this.setState({
                      mood,
                    });
                  }}
                />

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
                  style={{ flex: 1, marginVertical: 6 }}
                />

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
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </ErrorBoundary>
    );
  }
}

export default withNavigation(CheckinScreen);
