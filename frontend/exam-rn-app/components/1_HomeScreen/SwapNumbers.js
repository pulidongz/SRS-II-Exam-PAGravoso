import React, { useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';


export default function SwapNumbers({ navigation }) {

	const [int1, setInt1] = useState("");
	const [int2, setInt2] = useState("");

	const handleSwap = (value) => {
		setInt1(value.int2);
		setInt2(value.int1);
  };

  return (
    <>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Swap Numbers</Text>
      
      <Text>Variable A:</Text>
      <TextInput
        placeholder="Input value"
        value={int1}
        onChangeText={setInt1}
      />
      <Text>Variable B:</Text>
      <TextInput
        placeholder="Input value"
        value={int2}
        onChangeText={setInt2}
      />
      <Button
        title="SWAP"
        onPress={() => handleSwap({ int1, int2 })}
      />
    </View>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
      <Text>Variable A: {int1}</Text>
      <Text>Variable B: {int2}</Text>
    </View>
    </>
  );
}