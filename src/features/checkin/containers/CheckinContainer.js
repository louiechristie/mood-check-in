import React from 'React';
import {
  KeyboardAvoidingView,
  ScrollView,
  View,
  Text,
  Dimensions,
  TextInput,
  Switch,
  Button,
  StatusBar,
  Platform,
} from 'react-native';
import MoodSlider from '../components/MoodSlider';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const smallerDimension = Math.min(width, height);

const feelingsList = ['depressed', 'optimistic', 'bored', 'happy'];

export default class CheckinContainer extends React.Component {
  static navigationOptions = {
    title: 'Check-in',
  };

  constructor(props) {
    super(props);
    this.state = {
      mood: 4,
      feelings: [],
      comment: 'Type your optional note here...',
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
        <Text>{thisFeeling}</Text>
        <Switch
          onValueChange={() => {
            if (includes) {
              this.setState({
                feelings: feelings.filter(feeling => {
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
    return (
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        enabled
        keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : 80}>
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
                padding: 10,
              }}>
              <MoodSlider
                onChange={mood => {
                  this.setState({
                    mood,
                  });
                }}
              />

              {feelingsList.map(feeling => {
                return this.renderFeeling(feeling);
              })}

              <TextInput
                value={this.state.comment}
                style={{
                  height: 40,
                  borderColor: 'gray',
                  borderWidth: 1,
                  marginVertical: 10,
                  padding: 8,
                  fontSize: 12,
                }}
                onChange={comment => {
                  this.setState({
                    comment,
                  });
                }}
              />

              <Button title="submit" onPress={() => {}} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
