import React from 'react';
import {Text, StyleSheet, TextProps} from 'react-native';

type FormValueProps = JSX.IntrinsicAttributes &
  JSX.IntrinsicClassAttributes<Text> &
  Readonly<TextProps> &
  Readonly<{children?: React.ReactNode}>;

const FormValue = (props: FormValueProps) => (
  <Text
    style={styles.text}
    numberOfLines={10}
    ellipsizeMode="tail"
    {...props}
  />
);

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
});

export default FormValue;
