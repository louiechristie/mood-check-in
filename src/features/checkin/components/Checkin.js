import React from 'react';
import moment from 'moment';
import { View, Image } from 'react-native';
import { Divider, List, Chip, IconButton } from 'react-native-paper';
import Colors from '../../../constants/Colors';

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
    const dateString = moment(timestamp).format('D MMM');
    const timeString = moment(timestamp).format('hh:mm');

    return (
      <View>
        <Divider />

        <List.Accordion
          key={id}
          left={() => (
            <Image
              resizeMode="contain"
              source={getImage(mood)}
              style={{ width: 50, height: 50, marginTop: 20, marginRight: 20 }}
            />
          )}
          title={dateString}
          description={timeString}>
          {feelings.length > 0 && (
            <List.Item
              left={() => {
                return feelings.map(feeling => {
                  return (
                    <Chip style={{ marginRight: 6 }} key={feeling}>
                      {feeling}
                    </Chip>
                  );
                });
              }}
            />
          )}

          <List.Item
            description={comment || 'Comments: N/A'}
            right={() => (
              <IconButton
                icon="delete"
                color={Colors.iconButtonColor}
                disabled={deleteButtonDisabled}
                onPress={() => this.props.onPressDelete(checkin.id)}
              />
            )}
          />
        </List.Accordion>
      </View>
    );
  }
}
