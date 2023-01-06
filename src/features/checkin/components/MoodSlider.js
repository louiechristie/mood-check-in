import Slider from '@react-native-community/slider';
import React from 'react';
import { View, Image } from 'react-native';

import Colors from '../../../constants/Colors';

const checkin_1 = require('../../../assets/images/checkin_1.png');
const checkin_2 = require('../../../assets/images/checkin_2.png');
const checkin_3 = require('../../../assets/images/checkin_3.png');
const checkin_4 = require('../../../assets/images/checkin_4.png');
const checkin_5 = require('../../../assets/images/checkin_5.png');
const checkin_6 = require('../../../assets/images/checkin_6.png');
const checkin_7 = require('../../../assets/images/checkin_7.png');

const DEBUG = false;

export default class MoodSlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 4,
    };
    this.change = this.change.bind(this);
    this.renderImage = this.renderImage.bind(this);
  }

  change(valueString) {
    const value = parseFloat(valueString);

    this.setState({
      value,
    });
    this.props.onChange(value);
  }

  renderImage() {
    const value = this.state.value;

    const getImageSource = (mood) => {
      switch (mood) {
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
        case 7:
          return checkin_7;
        default:
          return checkin_4;
      }
    };

    return (
      <Image
        source={getImageSource(value)}
        resizeMode="contain"
        style={{
          minHeight: 75, // fix for web
          minWidth: 75, // fix for web
          flexBasis: 75,
          flexShrink: 1,
          flexGrow: 2,
        }}
      />
    );
  }

  render() {
    const { value } = this.state;
    return (
      <View
        style={{ borderWidth: DEBUG ? 8 : 0, borderColor: 'red', justifyContent: 'space-around' }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: DEBUG ? 4 : 0,
            borderColor: 'orange',
            paddingBottom: 20,
          }}>
          {this.renderImage()}
        </View>

        <View style={{ borderWidth: DEBUG ? 4 : 0, borderColor: 'orange' }}>
          <Slider
            step={1}
            minimumValue={1}
            maximumValue={7}
            onValueChange={this.change}
            value={value}
            thumbTintColor={Colors.tintColor}
            style={{ paddingTop: 20, borderWidth: DEBUG ? 2 : 0, borderColor: 'yellow' }}
          />
        </View>
      </View>
    );
  }
}
