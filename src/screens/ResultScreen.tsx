import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {FC, useContext, useEffect} from 'react';
import {RootStackParamList} from '../../RootStackParamsList';
import {
  Page,
  Button,
  ButtonContainer,
  Form,
  FormLabel,
  FormValue,
} from '../components';
import AuthContext from '../contexts/AuthContext';
import useLambda from '../hooks/useLambda';

type ResultScreenProp = NativeStackNavigationProp<RootStackParamList, 'Result'>;

const ResultScreen: FC = () => {
  const navigation = useNavigation<ResultScreenProp>();
  const [sayHello, results, errorMessage] = useLambda();
  const {authState} = useContext(AuthContext);
  const {accessToken} = authState;

  useEffect(() => {
    if (
      accessToken === null ||
      accessToken === undefined ||
      accessToken === ''
    ) {
      navigation.navigate('Auth');
    } else {
      sayHello(accessToken);
    }
  }, [authState]);

  return (
    <Page>
      <Form>
        <FormLabel>API Gateway Result</FormLabel>
        <FormValue>{results}</FormValue>
      </Form>

      <ButtonContainer>
        <Button
          onPress={() => sayHello(accessToken)}
          text="Hit It Again!"
          color="#7D24CB"
        />
      </ButtonContainer>
    </Page>
  );
};

export default ResultScreen;
