import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useContext, useEffect} from 'react';
import {RootStackParamList} from '../../RootStackParamsList';
import {Page, Button, ButtonContainer} from '../components';
import AuthContext, {AuthContextProps} from '../contexts/AuthContext';

type AuthScreenProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

const AuthScreen: FC<AuthScreenProp> = () => {
  const navigation = useNavigation<AuthScreenProp>();
  const {authState, handleAuthorize} =
    useContext<AuthContextProps>(AuthContext);

  useEffect(() => {
    if (
      authState.accessToken !== null &&
      authState.accessToken !== undefined &&
      authState.accessToken !== ''
    ) {
      console.log(`navigating ${authState.accessToken}`);
      navigation.navigate('Lambda');
    }
  }, [authState]);

  return (
    <Page>
      <ButtonContainer>
        <Button
          onPress={() => handleAuthorize('okta')}
          text="Authorize Okta"
          color="#90DA25"
        />
      </ButtonContainer>
    </Page>
  );
};

export default AuthScreen;
