import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Colors from '../constants/Colors';
import CheckinTab from '../features/checkin/containers/CheckinContainer';
import InsightsTab from '../features/checkin/containers/InsightsContainer';
import SettingsTab from '../features/settings/SettingsScreen';
import CheckinIcon from './components/CheckinIcon';
import FlashFillIcon from './components/FlashFillIcon';
import FlashIcon from './components/FlashIcon';
import TabBarSvgIcon from './components/TabBarSvgIcon';

const CheckinStack = createStackNavigator({
  Checkin: CheckinTab,
});

const InsightsStack = createStackNavigator({
  Insights: InsightsTab,
});

const SettingsStack = createStackNavigator({
  Settings: SettingsTab,
});

const stacks = {
  InsightsStack,
  CheckinStack,
};

if (__DEV__) stacks.SettingsStack = SettingsStack;

CheckinStack.navigationOptions = {
  tabBarLabel: 'Check-in',
  tabBarIcon: ({ focused }) => (
    <TabBarSvgIcon focused={focused}>
      <CheckinIcon />
    </TabBarSvgIcon>
  ),
};

InsightsStack.navigationOptions = {
  tabBarLabel: 'Insights',
  tabBarIcon: ({ focused }) => (
    <TabBarSvgIcon focused={focused}>{focused ? <FlashFillIcon /> : <FlashIcon />}</TabBarSvgIcon>
  ),
};

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <Ionicons
      name={focused ? 'settings' : 'settings-outline'}
      size={24}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  ),
};

export default createMaterialBottomTabNavigator(
  {
    ...stacks,
  },
  {
    activeColor: Colors.tabLabelSelected,
    inactiveColor: Colors.tabLabelDefault,
  }
);
