import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';

type ButtonContainerProps = JSX.IntrinsicAttributes &
  JSX.IntrinsicClassAttributes<View> &
  Readonly<ViewProps> &
  Readonly<{children?: React.ReactNode}>;

const ButtonContainer = (props: ButtonContainerProps) => (
  <View style={styles.view} {...props} />
);

const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    alignSelf: 'flex-end',
    flexDirection: 'row',
    margin: 5,
  },
});

export default ButtonContainer;
