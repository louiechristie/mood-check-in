import React from 'react';
import { ScrollView, Text } from 'react-native';
import { Appbar, Portal, Modal, Drawer, Surface } from 'react-native-paper';

import Constants from 'expo-constants';
import { version } from 'moment';

const manifest = Constants.manifest;

class SettingsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Insights',
      header: (
        <Appbar.Header dark>
          <Appbar.Content title="Settings" />
        </Appbar.Header>
      ),
    };
  };

  render() {
    const { version, sdkVersion } = manifest;

    return (
      <ScrollView>
        <Text>Version: {version}</Text>
        <Text>sdkVersion: {sdkVersion}</Text>
        <Text>{JSON.stringify(manifest, null, 2)}</Text>
      </ScrollView>
    );
  }
}

export default SettingsScreen;
