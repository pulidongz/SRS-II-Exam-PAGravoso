import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import AuthContext from '../constants/AuthContext';


export default function SignUp({ navigation }) {

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

  const { signUp } = React.useContext(AuthContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Sign Up</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={() => signUp({ username, password })} />
    </View>
  );
}