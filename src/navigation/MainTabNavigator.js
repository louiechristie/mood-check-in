import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Colors from '../constants/Colors';
import TabBarSvgIcon from './components/TabBarSvgIcon';
import CheckinIcon from './components/CheckinIcon';
import FlashIcon from './components/FlashIcon';
import FlashFillIcon from './components/FlashFillIcon';
import CheckinTab from '../features/checkin/containers/CheckinContainer';
import InsightsTab from '../features/checkin/containers/InsightsContainer';

const CheckinStack = createStackNavigator({
  Checkin: CheckinTab,
});

CheckinStack.navigationOptions = {
  tabBarLabel: 'Check-in',
  tabBarIcon: ({ focused }) => (
    <TabBarSvgIcon focused={focused}>
      <CheckinIcon />
    </TabBarSvgIcon>
  ),
};

const InsightsStack = createStackNavigator({
  Insights: InsightsTab,
});

InsightsStack.navigationOptions = {
  tabBarLabel: 'Insights',
  tabBarIcon: ({ focused }) => (
    <TabBarSvgIcon focused={focused}>{focused ? <FlashFillIcon /> : <FlashIcon />}</TabBarSvgIcon>
  ),
};

export default createMaterialBottomTabNavigator(
  {
    InsightsStack,
    CheckinStack,
  },
  {
    activeColor: Colors.tabLabelSelected,
    inactiveColor: Colors.tabLabelDefault,
  }
);
