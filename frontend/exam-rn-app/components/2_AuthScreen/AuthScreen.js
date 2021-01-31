import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Login from './Login';
import SignUp from './SignUp';

const AuthTab = createBottomTabNavigator();

export default function AuthScreen({ navigation }) {

  return (
    <>
    <AuthTab.Navigator>
      <AuthTab.Screen name="Login" component={Login} />
      <AuthTab.Screen name="Sign Up" component={SignUp} />
    </AuthTab.Navigator>
    </>
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