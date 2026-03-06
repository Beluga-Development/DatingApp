import { Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as api from "./util/api.js";
import { useState } from "react";

function App() {
  const [text, setText] = useState("Before Call");

  const getData = async () => {
    try {
      let result = await api.data.getHelloWorld();
      setText(result.message);
    } catch (error) {
      setText(`Request failed: ${error.message}`);
    }
  };

  return (
    <>
      <SafeAreaView>
        <Text>Hello World</Text>
        <Text>{text}</Text>
        <Button title="Click Me" onPress={getData} />
      </SafeAreaView>
    </>
  );
}

export default App;
