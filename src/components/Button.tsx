import React, {FC} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
} from 'react-native';

type ButtonProps = {
  text: string;
  color: string;
  onPress: (event: GestureResponderEvent) => void;
};

const Button: FC<ButtonProps> = ({text, color, onPress}) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={onPress}
    style={[styles.buttonBox, {backgroundColor: color}]}>
    <Text style={styles.text}>{text}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  text: {
    color: 'white',
  },
  buttonBox: {
    height: 50,
    flex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Button;
