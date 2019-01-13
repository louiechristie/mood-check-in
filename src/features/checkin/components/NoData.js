import React from 'react';
import { withNavigation } from 'react-navigation';
import { View, Text, Image, Button, ActivityIndicator } from 'react-native';
const checkin_7 = require('../../../assets/images/checkin_7.png');

class NoData extends React.Component {
  render() {
    const { isLoading } = this.props;

    return (
      <View
        style={{
          flex: 0,
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={checkin_7}
          resizeMode="contain"
          style={{
            width: 100,
            height: 100,
          }}
        />

        {isLoading && <ActivityIndicator style={{ padding: 10 }} />}

        <View
          style={{
            flex: 0,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{ padding: 10 }}>
            <Text>No check-ins data yet. Why not check-in now?</Text>
          </View>

          <View style={{ width: 100 }}>
            <Button
              title="Check-in"
              onPress={() => {
                this.props.navigation.navigate('Checkin');
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default withNavigation(NoData);
