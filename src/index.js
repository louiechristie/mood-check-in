import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import AppNavigator from './navigation/AppNavigator';

const store = configureStore();

export default class CheckinApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}
