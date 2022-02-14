import React, {FC} from 'react';
import {Text, StyleSheet} from 'react-native';

const FormValue: FC = props => (
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
    backgroundColor: 'lightslategray',
    marginBottom: 20,
    color: '#FFFD37',
  },
});

export default FormValue;
