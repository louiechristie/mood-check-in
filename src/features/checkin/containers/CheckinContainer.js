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
import { connect } from 'react-redux';
import { checkinsAdd, checkinsDelete } from '../../insights/actions/checkins';
import MoodSlider from '../components/MoodSlider';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const smallerDimension = Math.min(width, height);

const feelingsList = ['optimistic', 'happy', 'bored', 'depressed'];

class CheckinContainer extends React.Component {
  static navigationOptions = {
    title: 'Check-in',
  };

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
    const { isLoading, hasErrored } = this.props;

    if (hasErrored) {
      return (
        <View>
          <Text>Sorry, something went wrong. Please try again later.</Text>
        </View>
      );
    }

    return (
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
                onPress={() => {
                  const timestamp = Date.now();
                  this.props.add({
                    ...this.state,
                    timestamp,
                  });
                  this.props.navigation.navigate('Insights');
                }}
              />
              {isLoading && <ActivityIndicator />}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => {
  return {
    hasErrored: state.checkinsHasErrored,
    isLoading: state.checkinsIsLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: checkin => dispatch(checkinsAdd(checkin)),
    delete: id => dispatch(checkinsDelete(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckinContainer);
