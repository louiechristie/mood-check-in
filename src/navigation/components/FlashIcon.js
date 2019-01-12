import React from 'react';
import { Svg } from 'expo';

export default class FlashIcon extends React.Component {
  render() {
    return (
      <Svg.G>
        <Svg.Path d="M14.667 29.333c-0.133 0-0.267 0-0.4-0.133-0.533-0.133-0.933-0.667-0.933-1.2v-9.333h-6.667c-0.533 0-0.933-0.267-1.2-0.8s-0.133-0.933 0.133-1.333l10.667-13.333c0.4-0.4 0.933-0.667 1.467-0.4 0.533 0.133 0.933 0.667 0.933 1.2v9.333h6.667c0.533 0 0.933 0.267 1.2 0.8s0.133 1.067-0.133 1.467l-10.667 13.333c-0.267 0.267-0.667 0.4-1.067 0.4zM9.467 16h5.2c0.8 0 1.333 0.533 1.333 1.333v6.8l6.533-8.133h-5.2c-0.8 0-1.333-0.533-1.333-1.333v-6.933l-6.533 8.267z" />
      </Svg.G>
    );
  }
}
