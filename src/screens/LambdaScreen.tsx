import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useContext, useEffect} from 'react';
import {RootStackParamList} from '../../RootStackParamsList';
import {
  Page,
  Button,
  ButtonContainer,
  Heading,
  Form,
  FormLabel,
  FormValue,
} from '../components';
import AuthContext from '../contexts/AuthContext';

// Lambda endpoint: https://oz739t0vgj.execute-api.us-west-2.amazonaws.com/hello

type LambdaScreenProp = NativeStackNavigationProp<RootStackParamList, 'Lambda'>;

const LambdaScreen: FC = () => {
  const navigation = useNavigation<LambdaScreenProp>();
  const {authState, handleRefresh, handleRevoke, showRevoke} =
    useContext(AuthContext);
  const {
    accessToken,
    accessTokenExpirationDate,
    refreshToken,
    scopes,
    hasLoggedInOnce,
  } = authState;

  useEffect(() => {
    if (
      accessToken === null ||
      accessToken === undefined ||
      accessToken === ''
    ) {
      console.log(`definitely navigating ${accessToken}`);
      navigation.navigate('Auth');
    }
  }, [authState]);

  return (
    <Page>
      <Form>
        <FormLabel>Access Token</FormLabel>
        <FormValue>{accessToken}</FormValue>
        <FormLabel>Access Token Expiration Date</FormLabel>
        <FormValue>{accessTokenExpirationDate}</FormValue>
        <FormLabel>Refresh Token</FormLabel>
        <FormValue>{refreshToken}</FormValue>
        <FormLabel>Scopes</FormLabel>
        <FormValue>{scopes?.join(', ')}</FormValue>
      </Form>
      <Heading>{hasLoggedInOnce ? 'Goodbye.' : 'Hello, stranger.'}</Heading>

      <ButtonContainer>
        <Button
          onPress={() => console.log('hello worlds')}
          text="Hit Lambda"
          color="#7D24CB"
        />
        {refreshToken ? (
          <Button onPress={handleRefresh} text="Refresh" color="#24C2CB" />
        ) : null}
        {showRevoke ? (
          <Button onPress={handleRevoke} text="Revoke" color="#EF525B" />
        ) : null}
      </ButtonContainer>
    </Page>
  );
};

export default LambdaScreen;
