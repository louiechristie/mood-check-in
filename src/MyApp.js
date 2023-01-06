import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';

import Colors from './constants/Colors';
import AppNavigator from './navigation/AppNavigator';
import configureStore from './store/configureStore';

const store = configureStore();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.tintColor,
    accent: Colors[5],
  },
};

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <Provider store={store}>
          <PaperProvider theme={theme}>
            <AppNavigator />
          </PaperProvider>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
