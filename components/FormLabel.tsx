import React from 'react';
import {Text, StyleSheet, TextProps} from 'react-native';

type FormLabelProps = JSX.IntrinsicAttributes &
  JSX.IntrinsicClassAttributes<Text> &
  Readonly<TextProps> &
  Readonly<{children?: React.ReactNode}>;

const FormLabel = (props: FormLabelProps) => (
  <Text style={styles.formText} {...props} />
);

const styles = StyleSheet.create({
  formText: {
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
});

export default FormLabel;
