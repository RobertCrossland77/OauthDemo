import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';

const Form: FC = props => <View style={styles.form} {...props} />;

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
});

export default Form;
