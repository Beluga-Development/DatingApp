import Ionicons from "@expo/vector-icons/Ionicons";

import { useState } from "react";
import { Pressable, Text } from "react-native";

import style from "../style.js";

export default (props) => {
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
      {props?.icon ? (
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
};
