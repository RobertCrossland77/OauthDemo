import React, {FC} from 'react';
import {Text, StyleSheet} from 'react-native';

const FormLabel: FC = props => <Text style={styles.formText} {...props} />;

const styles = StyleSheet.create({
  formText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'black',
    marginBottom: 10,
  },
});

export default FormLabel;
