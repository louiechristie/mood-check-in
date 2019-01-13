import React from 'react';
import { View, Text, Button, Image } from 'react-native';

const checkin_1 = require('../../../assets/images/checkin_1.png');
const checkin_2 = require('../../../assets/images/checkin_2.png');
const checkin_3 = require('../../../assets/images/checkin_3.png');
const checkin_4 = require('../../../assets/images/checkin_4.png');
const checkin_5 = require('../../../assets/images/checkin_5.png');
const checkin_6 = require('../../../assets/images/checkin_6.png');
const checkin_7 = require('../../../assets/images/checkin_7.png');

const getImage = number => {
  switch (number) {
    case 1:
      return checkin_1;
    case 2:
      return checkin_2;
    case 3:
      return checkin_3;
    case 4:
      return checkin_4;
    case 5:
      return checkin_5;
    case 6:
      return checkin_6;
    default:
      return checkin_7;
  }
};

export default class Checkin extends React.Component {
  render() {
    const { checkin, deleteButtonDisabled } = this.props;
    const { id, mood, feelings, timestamp, comment } = checkin;
    const dateString = new Date(timestamp).toLocaleDateString('en-GB');

    return (
      <View
        key={id}
        style={{
          flex: 1,
          justifyContent: 'space-around',
          paddingVertical: 10,
          borderTopWidth: 1,
          borderTopColor: '#DDDDDD',
        }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            paddingVertical: 10,
            alignItems: 'center',
          }}>
          <View style={{ flex: 1 }}>
            <Text>{dateString}</Text>
          </View>
          <Image
            resizeMode="contain"
            source={getImage(mood)}
            style={{ width: 50, height: 50, paddingVertical: 10, marginRight: 20 }}
          />
        </View>

        <View style={{ flex: 1, flexDirection: 'row', paddingVertical: 10 }}>
          <View style={{ flex: 8, flexDirection: 'row', justifyContent: 'flex-start' }}>
            {feelings.map(feeling => {
              return (
                <View
                  key={feeling}
                  style={{ padding: 4, marginRight: 4, backgroundColor: '#DDDDDD' }}>
                  <Text>{feeling}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
          <View>
            <Text>{comment}</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
          <View style={{ width: 100 }}>
            <Button
              title="Delete"
              disabled={deleteButtonDisabled}
              onPress={() => this.props.onPressDelete(checkin.id)}
            />
          </View>
        </View>
      </View>
    );
  }
}
