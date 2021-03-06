import React from 'react';
import { View, Text, Image, Dimensions } from 'react-native';
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
    const outer = smallerDimension * (2 / 3);
    const inner = 60;
    const { data, total } = this.props;
    const selectedDataRow = data.find(dataRow => {
      return dataRow.mood === this.state.selected;
    });
    const percentage = (selectedDataRow && selectedDataRow.percentage) || 0;

    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: outer,
              height: outer,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              resizeMode="contain"
              source={getImage(this.state.selected)}
              style={{ width: inner, height: inner }}
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
            }}>
            <Svg width={width} height={outer} viewBox={`0 0 ${outer} ${outer}`}>
              <VictoryPie
                width={outer}
                height={outer}
                name="pie"
                standalone={false}
                colorScale={data.map(row => {
                  return Colors[row.mood];
                })}
                x="mood"
                y="tally"
                innerRadius={inner}
                padAngle={3}
                radius={datum => {
                  return datum.mood === this.state.selected ? 110 : 100;
                }}
                labels={() => null}
                data={data}
                events={[
                  {
                    target: 'data',
                    eventHandlers: {
                      onPressIn: (evt, clickedProps) => {
                        this.setState({ selected: clickedProps.datum.mood });
                        return null;
                      },
                    },
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
          }}>
          <Text style={{ fontSize: 40, color: Colors[this.state.selected] }}>{percentage}%</Text>
          <Text style={{ fontSize: 16 }}>Based on {total} entries</Text>
        </View>
      </View>
    );
  }
}

export default AverageMoodChart;
