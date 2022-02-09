import React from 'react';
import {ImageBackground, StyleSheet, SafeAreaView} from 'react-native';

type PageProps = {
  children: any;
};

const Page: React.FC<PageProps> = ({children}) => (
  <ImageBackground
    source={require('../assets/background.jpg')}
    style={[styles.background, {width: '100%', height: '100%'}]}>
    <SafeAreaView style={styles.safe}>{children}</SafeAreaView>
  </ImageBackground>
);

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  safe: {
    flex: 1,
  },
});

export default Page;
