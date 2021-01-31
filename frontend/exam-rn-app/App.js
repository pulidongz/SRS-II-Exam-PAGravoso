import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { NavigationContainer, DrawerActions, getFocusedRouteNameFromRoute, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AuthScreen from './components/2_AuthScreen/AuthScreen';
import HomeScreen from './components/1_HomeScreen/HomeScreen';
import AuthContext from './components/constants/AuthContext';


const ScreenStack = createStackNavigator();

export default function App({ navigation }) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isLoggedIn: true,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isLoggedIn: false,
          };
      }
    },
    {
      isLoggedIn: false,
    }
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        await fetch('http://localhost:5000/api/login',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: data.username,
              password: data.password
            })
          }
        )
        .then(response => {
          if (response.status == 200) {
            dispatch({ type: 'SIGN_IN'});
            return Promise.resolve();
          }
        })
        .catch(function (error) {
          console.log(error);
          return Promise.reject();
        })
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        await fetch('http://localhost:5000/api/signup',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              username: data.username,
              password: data.password
            })
          }
        )
        .then(response => {
          if (response.status == 201) {
            dispatch({ type: 'SIGN_IN'});
            return Promise.resolve();
          }
        })
        .catch(function (error) {
          console.log(error);
          return Promise.reject();
        })
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <ScreenStack.Navigator>
          {state.isLoggedIn == true ? 
            (
              <>
              <ScreenStack.Screen name="Home" component={HomeScreen}
              options={({ route, navigation }) => ({
                headerTitle: getFocusedRouteNameFromRoute(route),
                headerRight: () => (
                  <Button onPress={() => dispatch({ type: 'SIGN_OUT' })} title="Sign Out" />
                ),
              })} />
              </>
            ):(
              <>
              <ScreenStack.Screen name="Auth" component={AuthScreen} />
              </>
            )
          }
        </ScreenStack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
