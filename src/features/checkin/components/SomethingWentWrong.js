import React from 'react';
import { View, Text, Image } from 'react-native';
const checkin_4 = require('../../../assets/images/checkin_4.png');

export default class SomethingWentWrong extends React.Component {
  render() {
    const { error } = this.props;

    const stringifyError = () => {
      try {
        return JSON.stringify(this.state.error);
      } catch (error) {
        return "Couldn't stringify error.";
      }
    };

    return (
      <View
        style={{
          flex: 0,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={checkin_4}
            resizeMode="contain"
            style={{
              width: 100,
              height: 100,
            }}
          />
          <View style={{ padding: 10 }}>
            <Text>Something went wrong. Please try again later.</Text>
          </View>

          {__DEV__ && (
            <View style={{ padding: 10, borderWidth: 1, borderColor: '#CCCCCC' }}>
              <Text>Error:</Text>
              <Text>{error && stringifyError(error)}</Text>
            </View>
          )}
        </View>
      </View>
    );
  }
}
