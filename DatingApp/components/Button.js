import Ionicons from "@expo/vector-icons/Ionicons";

import { useState } from "react";
import { Pressable, Text, Image } from "react-native";

import style from "../style.js";

function Button(props) {
  const [isPressed, setIsPressed] = useState(false);
  const pressIn = () => setIsPressed(true);
  const pressOut = () => setIsPressed(false);

  let buttonStyle = isPressed ? style.buttonPressed : style.button;

  // Style overwrites
  buttonStyle = { ...buttonStyle, ...props.style };
  let buttonTextStyle = { ...style.buttonText, ...props.textStyle };

  return (
    <Pressable
      style={buttonStyle}
      onPress={props.onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
    >
      {props?.picture ? (
        <Image
          source={{ uri: props.picture }}
          style={{ width: "100%", height: "100%", borderRadius: 32 }}
        />
      ) : props?.icon ? (
        <Ionicons
          name={props.icon.name}
          size={props.icon.size}
          color={style.icon.color}
        />
      ) : (
        <Text style={buttonTextStyle}>{props.text}</Text>
      )}
    </Pressable>
  );
}
export default Button;
