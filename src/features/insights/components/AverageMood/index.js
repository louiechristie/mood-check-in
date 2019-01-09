import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Image } from 'react-native-svg';
import { VictoryPie } from 'victory-native';
import Colors from '../../../../constants/Colors';
import Layout from '../../../../constants/Layout';

import checkin_1 from '../../../../assets/images/checkin_1.png';
import checkin_2 from '../../../../assets/images/checkin_2.png';
import checkin_3 from '../../../../assets/images/checkin_3.png';
import checkin_4 from '../../../../assets/images/checkin_4.png';
import checkin_5 from '../../../../assets/images/checkin_5.png';
import checkin_6 from '../../../../assets/images/checkin_6.png';
import checkin_7 from '../../../../assets/images/checkin_7.png';

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

class AverageMood extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: this.props.modalAverage,
    };
  }

  render() {
    const { data, total } = this.props;
    const width = Layout.window.width;
    const inner = 60;
    const row = data.find(row => {
      return row.mood === this.state.selected;
    });
    const percentage = row.percentage;

    return (
      <View>
        <Text>Average Mood</Text>
        <Svg
          width={width}
          height={width}
          viewBox={`0 0 ${width} ${width}`}
          style={{ width: '100%', height: 'auto' }}>
          <Image
            x={width / 2 - inner / 2}
            y={width / 2 - inner / 2}
            width={inner}
            height={inner}
            href={getImage(this.state.selected)}
          />
          <VictoryPie
            width={width}
            height={width}
            nampe="pie"
            standalone={false}
            colorScale={data.map(row => {
              return Colors[row.mood];
            })}
            x="mood"
            y="tally"
            innerRadius={60}
            padAngle={3}
            radius={datum => {
              return datum.mood === this.state.selected ? 110 : 100;
            }}
            labels={() => null}
            data={data}
            animate={{ duration: 1500 }}
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
        <View>
          <Text>{percentage}%</Text>
          <Text>Based on {total} entries</Text>
        </View>
      </View>
    );
  }
}

export default AverageMood;
