import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from './components/TabBarIcon';
import TabBarSvgIcon from './components/TabBarSvgIcon';
import CheckinIcon from './components/CheckinIcon';
import FlashIcon from './components/FlashIcon';
import FlashFillIcon from './components/FlashFillIcon';
import CheckinScreen from '../features/checkin/containers/CheckinContainer';
import InsightsScreen from '../features/insights/containers/InsightsContainer';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const CheckinStack = createStackNavigator({
  Checkin: CheckinScreen,
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
  Insights: InsightsScreen,
});

InsightsStack.navigationOptions = {
  tabBarLabel: 'Insights',
  tabBarIcon: ({ focused }) => (
    <TabBarSvgIcon focused={focused}>{focused ? <FlashFillIcon /> : <FlashIcon />}</TabBarSvgIcon>
  ),
};

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-options' : 'md-options'} />
  ),
};

export default createBottomTabNavigator({
  CheckinStack,
  InsightsStack,
  HomeStack,
  LinksStack,
  SettingsStack,
});
