import React, { useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';


export default function IntoTheDiamond({ navigation }) {

	const [input, setInput] = useState("");
	const [dias, setDias] = useState("");


	function diamond(size){

		const arr = [];

	  for(var i=1;i<=size;i++){
	    for(var s=size-1;s>=i;s--){
	      process.stdout.write(" ");
	      arr[i][s] = " ";
	    }
	    for(var j=1;j<=i;j++){
	      process.stdout.write("* ");
	      arr[i][j] = "* ";
	    }
	    console.log();
	  }
   	if(i==size+1){
      for(var i=1;i<=size-1;i++){
       	for(var s=1;s<=i;s++){
          process.stdout.write(" ");
          arr[i][s] = " ";
       	}
       	for(j=i;j<=size-1;j++){
          process.stdout.write("* ");
          arr[i][j] = "* ";
       	}
        console.log();
      }
   	}
	  
		/*let f = input;
		const matrix = new Array(Number(input)).fill("*").map(() => new Array(Number(input)).fill("*"));*/
		console.log(arr);
		setDias(arr);
	}

  return(
  	<>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Into the Diamond</Text>
      <TextInput
        placeholder="Input value"
        value={input}
        onChangeText={setInput}
      />
      <Button
        title="Generate"
        onPress={() => diamond({input})}
      />
    </View>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    	<Text>{dias}</Text>
    </View>
    </>
  );
}