import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SwapNumbers from './SwapNumbers';
import IntoTheDiamond from './IntoTheDiamond';
import KeepMeInMemory from './KeepMeInMemory';


const HomeTab = createBottomTabNavigator();

export default function HomeScreen({ navigation }) {
  return (
    <HomeTab.Navigator>
      <HomeTab.Screen name="Swap Numbers" component={SwapNumbers} />
      <HomeTab.Screen name="Into the Diamond" component={IntoTheDiamond} />
      <HomeTab.Screen name="Keep Me in Memory" component={KeepMeInMemory} />
    </HomeTab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});