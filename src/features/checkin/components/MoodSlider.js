import React from 'react';
import { StyleSheet, View, Slider, Image } from 'react-native';
import Colors from '../../../constants/Colors';
import checkin_1 from '../../../assets/images/checkin_1.png';
import checkin_2 from '../../../assets/images/checkin_2.png';
import checkin_3 from '../../../assets/images/checkin_3.png';
import checkin_4 from '../../../assets/images/checkin_4.png';
import checkin_5 from '../../../assets/images/checkin_5.png';
import checkin_6 from '../../../assets/images/checkin_6.png';
import checkin_7 from '../../../assets/images/checkin_7.png';

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

    const getImageSource = mood => {
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
          flex: 1,
          width: 100,
          height: 100,
        }}
      />
    );
  }

  render() {
    const { value } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
          {this.renderImage()}
        </View>

        <Slider
          step={1}
          minimumValue={1}
          maximumValue={7}
          onValueChange={this.change}
          value={value}
          thumbTintColor={Colors.tintColor}
          style={{ flex: 1, paddingTop: 20 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    marginVertical: 10,
  },
  image: {
    flex: 1,
    width: 100,
    height: 100,
  },
});
