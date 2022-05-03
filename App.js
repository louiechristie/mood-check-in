import * as Icon from '@expo/vector-icons';
import AppLoading from 'expo-app-loading';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import React from 'react';

import MyApp from './src/MyApp';
import ErrorBoundary from './src/features/checkin/components/ErrorBoundary';

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <ErrorBoundary>
          <MyApp />
        </ErrorBoundary>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./src/assets/images/checkin_1.png'),
        require('./src/assets/images/checkin_2.png'),
        require('./src/assets/images/checkin_3.png'),
        require('./src/assets/images/checkin_4.png'),
        require('./src/assets/images/checkin_5.png'),
        require('./src/assets/images/checkin_6.png'),
        require('./src/assets/images/checkin_7.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ]);
  };

  _handleLoadingError = (error) => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}
