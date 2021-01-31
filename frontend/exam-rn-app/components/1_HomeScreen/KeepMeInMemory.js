import React, { useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function KeepMeInMemory({ navigation }) {

	const [first_name, setFirstName] = useState("");
	const [last_name, setLastName] = useState("");

	const [showData, setShowData] = useState("");

	const retrieveData = async () => {
		try {
	    const resp = await AsyncStorage.getAllKeys()
	    if(resp !== null) {
	      setShowData(resp);
	    }
	  } catch(e) {
	    console.log(e);
	  }
  };

	const storeData = async (value) => {
		try {
		  await AsyncStorage.setItem(JSON.stringify(value))
		} catch (e) {
		  console.log(e);
		}
  };

  return (
  	<>
	    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
	      <Text>Keep Me in Memory</Text>
	      <TextInput
	        placeholder="First Name"
	        value={first_name}
	        onChangeText={setFirstName}
	      />
	      <TextInput
	        placeholder="Last Name"
	        value={last_name}
	        onChangeText={setLastName}
	      />
	      <Button
	        title="Store"
	        onPress={() => storeData({ first_name, last_name })}
	      />
	    </View>
	    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
	    	<Button
	        title="Retrieve all"
	        onPress={() => retrieveData()}
	      />
	    	<Text>{showData}</Text>
	    </View>
	  </>
  );
}