import React, {FC} from 'react';
import {Text, StyleSheet} from 'react-native';

const FormValue: FC = props => (
  <Text
    selectable
    style={styles.text}
    numberOfLines={20}
    ellipsizeMode="tail"
    {...props}
  />
);

const styles = StyleSheet.create({
  text: {
    fontSize: 14,
    backgroundColor: '#778899',
    color: '#FFFD37',
  },
});

export default FormValue;
