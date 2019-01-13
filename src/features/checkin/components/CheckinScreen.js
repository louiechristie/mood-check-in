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
  Platform,
  ActivityIndicator,
} from 'react-native';
import { withNavigation } from 'react-navigation';
import MoodSlider from '../components/MoodSlider';
import ErrorBoundary from '../components/ErrorBoundary';
import SomethingWentWrong from '../components/SomethingWentWrong';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const smallerDimension = Math.min(width, height);

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
    const { isLoading, hasErrored, add, navigation } = this.props;

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
                  placeholder={'Type your optional note here...'}
                  style={{
                    height: 40,
                    borderColor: '#999999',
                    borderWidth: 1,
                    marginVertical: 10,
                    padding: 8,
                    fontSize: 12,
                  }}
                  onChangeText={comment => {
                    this.setState({
                      comment,
                    });
                  }}
                />

                <Button
                  title="submit"
                  disabled={isLoading}
                  onPress={() => {
                    const timestamp = Date.now();
                    add({
                      ...this.state,
                      timestamp,
                    });
                    navigation.navigate('Insights');
                  }}
                />
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
