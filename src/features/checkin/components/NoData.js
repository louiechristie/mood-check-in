import React from 'react';
import { View, Text, Image, Button, ActivityIndicator } from 'react-native';
import { withNavigation } from 'react-navigation';

const checkin_7 = require('../../../assets/images/checkin_7.png');

const DEBUG = false;

class NoData extends React.Component {
  render() {
    const { isLoading, navigation } = this.props;

    return (
      <View
        style={{
          borderWidth: DEBUG ? 8 : null,
          borderColor: 'red',
          height: '100%',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View
          style={{
            justifyContent: 'space-around',
            alignItems: 'center',
            borderWidth: DEBUG ? 4 : null,
            borderColor: 'orange',
            padding: 10,
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: DEBUG ? 2 : null,
              borderColor: 'yellow',
              padding: 20,
            }}>
            <Image
              source={checkin_7}
              resizeMode="contain"
              style={{
                width: 100,
                height: 100,
              }}
            />
          </View>

          {isLoading && <ActivityIndicator style={{ padding: 10 }} />}

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: DEBUG ? 2 : null,
              borderColor: 'yellow',
            }}>
            <View style={{ padding: 10 }}>
              <Text>No check-ins data yet. Why not check-in now?</Text>
            </View>

            <View style={{ width: 100 }}>
              <Button
                title="Check-in"
                onPress={() => {
                  navigation.navigate('Checkin');
                }}
              />
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default withNavigation(NoData);
