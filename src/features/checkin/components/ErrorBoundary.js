import React from 'react';
import { View, Text, Image } from 'react-native';
const checkin_1 = require('../../../assets/images/checkin_1.png');

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error, test: false };
  }

  render() {
    const { hasError, error } = this.state;
    const { test } = this.props;

    if (hasError || test) {
      const stringifyError = () => {
        try {
          return JSON.stringify(this.state.error);
        } catch (error) {
          return "Couldn't stringify error.";
        }
      };

      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={checkin_1}
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
      );
    }

    return this.props.children;
  }
}
