import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import TabBarSvgIcon from './components/TabBarSvgIcon';
import CheckinIcon from './components/CheckinIcon';
import FlashIcon from './components/FlashIcon';
import FlashFillIcon from './components/FlashFillIcon';
import CheckinTab from '../features/checkin/containers/CheckinContainer';
import InsightsTab from '../features/checkin/containers/InsightsContainer';
import SettingsTab from '../features/settings/SettingsScreen';

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
    <MaterialCommunityIcons
      name={focused ? 'settings' : 'settings-outline'}
      size={26}
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
