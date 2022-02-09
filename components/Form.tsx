import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

type FormProps = JSX.IntrinsicAttributes &
  JSX.IntrinsicClassAttributes<View> &
  Readonly<ViewProps> &
  Readonly<{children?: React.ReactNode}>;

const Form = (props: FormProps) => <View style={styles.form} {...props} />;

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
});

export default Form;
