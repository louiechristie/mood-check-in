import React from 'react';
import Svg from 'react-native-svg';
import Colors from '../../constants/Colors';

export default class TabBarSvgIcon extends React.Component {
  render() {
    return (
      <Svg
        height={32}
        width={32}
        viewBox="0 0 36 36"
        fill={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}>
        {this.props.children}
      </Svg>
    );
  }
}
