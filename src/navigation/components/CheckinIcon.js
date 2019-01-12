import React from 'react';
import { Svg } from 'expo';

export default class CheckinIcon extends React.Component {
  render() {
    return (
      <Svg.G>
        <Svg.Path d="M12 14.667c1.467 0 2.667-1.2 2.667-2.667h-5.333c0 1.467 1.2 2.667 2.667 2.667z" />
        <Svg.Path d="M20 14.667c1.467 0 2.667-1.2 2.667-2.667h-5.333c0 1.467 1.2 2.667 2.667 2.667z" />
        <Svg.Path d="M16 2.667c-7.333 0-13.333 6-13.333 13.333s6 13.333 13.333 13.333 13.333-6 13.333-13.333c0-7.333-6-13.333-13.333-13.333zM16 26.667c-5.867 0-10.667-4.8-10.667-10.667s4.8-10.667 10.667-10.667 10.667 4.8 10.667 10.667-4.8 10.667-10.667 10.667z" />
        <Svg.Path d="M16 21.333c-1.733 0-3.2-0.8-4.267-2.133l-2.133 1.6c1.6 2 3.867 3.2 6.4 3.2s4.933-1.2 6.4-3.2l-2.133-1.6c-1.067 1.333-2.533 2.133-4.267 2.133z" />
      </Svg.G>
    );
  }
}
