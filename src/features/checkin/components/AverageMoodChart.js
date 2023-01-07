import React from 'react';
import { View, Text, Image, Dimensions, Platform } from 'react-native';
import Svg from 'react-native-svg';
import { VictoryPie } from 'victory-native';

import Colors from '../../../constants/Colors';

const checkin_1 = require('../../../assets/images/checkin_1.png');
const checkin_2 = require('../../../assets/images/checkin_2.png');
const checkin_3 = require('../../../assets/images/checkin_3.png');
const checkin_4 = require('../../../assets/images/checkin_4.png');
const checkin_5 = require('../../../assets/images/checkin_5.png');
const checkin_6 = require('../../../assets/images/checkin_6.png');
const checkin_7 = require('../../../assets/images/checkin_7.png');

const getImage = (number) => {
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

const DEBUG = false;

const moodNumberToColorName = (number) => {
  switch (number) {
    case 1:
      return 'Black';
    case 2:
      return 'Dark blue';
    case 3:
      return 'Blue';
    case 4:
      return 'Sea Green';
    case 5:
      return 'Green';
    case 6:
      return 'Light green';
    case 7:
      return 'Yellow';
    default:
      return undefined;
  }
};

class AverageMoodChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.modalAverage || 4,
    };
  }

  render() {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    const smallerDimension = Math.min(width, height);
    const radius = smallerDimension / 4 - 20;
    const outer = radius * 2;
    const inner = radius * 0.6;
    const { data, total } = this.props;
    const selectedDataRow = data.find((dataRow) => {
      return dataRow.mood === this.state.selected;
    });
    const percentage = (selectedDataRow && selectedDataRow.percentage) || 0;
    const mood = moodNumberToColorName(selectedDataRow?.mood);

    const eventHandlers =
      Platform.OS === 'web'
        ? {
            onClick: (evt, clickedProps) => {
              this.setState({ selected: clickedProps.datum.mood });
              return null;
            },
          }
        : {
            onPressIn: (evt, clickedProps) => {
              this.setState({ selected: clickedProps.datum.mood });
              return null;
            },
          };

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderWidth: DEBUG ? 8 : null,
          borderColor: 'red',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: DEBUG ? 4 : null,
            borderColor: 'orange',
            padding: 20,
          }}>
          <View
            style={{
              width: outer,
              height: outer,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: DEBUG ? 10 : null,
              borderColor: 'yellow',
            }}>
            <Image
              resizeMode="contain"
              source={getImage(this.state.selected)}
              style={{
                width: inner,
                height: inner,
                borderWidth: DEBUG ? 1 : null,
                borderColor: 'pink',
              }}
            />
          </View>
          <View
            style={{
              width: outer,
              height: outer,
              position: 'absolute',
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: DEBUG ? 2 : null,
              borderColor: 'yellow',
            }}>
            <Svg height="100%" width="100%" viewBox={`0 0 ${outer} ${outer}`}>
              <VictoryPie
                width={outer}
                height={outer}
                name="pie"
                standalone={false}
                colorScale={data.map((row) => {
                  return Colors[row.mood];
                })}
                x="mood"
                y="tally"
                innerRadius={inner}
                padAngle={3}
                radius={(datum) => {
                  return datum.mood === this.state.selected ? radius * 1.1 : radius;
                }}
                labels={() => null}
                data={data}
                events={[
                  {
                    target: 'data',
                    eventHandlers,
                  },
                ]}
              />
            </Svg>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingVertical: 10,
            borderWidth: DEBUG ? 4 : null,
            borderColor: 'orange',
            padding: 20,
          }}>
          <Text
            style={{
              fontSize: 40,
              color: Colors[this.state.selected],
              borderWidth: DEBUG ? 2 : null,
              borderColor: 'yellow',
            }}>
            {percentage}% {mood}
          </Text>
          <Text style={{ fontSize: 16, borderWidth: DEBUG ? 2 : null, borderColor: 'yellow' }}>
            Based on {total} entries
          </Text>
        </View>
      </View>
    );
  }
}

export default AverageMoodChart;
