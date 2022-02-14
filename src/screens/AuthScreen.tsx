import React, {FC} from 'react';
import {
  Page,
  Button,
  ButtonContainer,
  Form,
  FormLabel,
  FormValue,
  Heading,
} from '../components';
import useAuth from '../hooks/useAuth';

// Lambda endpoint: https://oz739t0vgj.execute-api.us-west-2.amazonaws.com/hello

const AuthScreen: FC = () => {
  const [authState, showRevoke, handleAuthorize, handleRefresh, handleRevoke] =
    useAuth();

  return (
    <Page>
      {authState.accessToken ? (
        <Form>
          <FormLabel>Access Token</FormLabel>
          <FormValue>{authState.accessToken}</FormValue>
          <FormLabel>Access Token Expiration Date</FormLabel>
          <FormValue>{authState.accessTokenExpirationDate}</FormValue>
          <FormLabel>Refresh Token</FormLabel>
          <FormValue>{authState.refreshToken}</FormValue>
          <FormLabel>Scopes</FormLabel>
          <FormValue>{authState.scopes?.join(', ')}</FormValue>
        </Form>
      ) : (
        // @ts-ignore
        <Heading>
          {authState.hasLoggedInOnce ? 'Goodbye.' : 'Hello, stranger.'}
        </Heading>
      )}

      <ButtonContainer>
        {!authState.accessToken ? (
          <>
            <Button
              onPress={() => handleAuthorize('okta')}
              text="Authorize Okta"
              color="#90DA25"
            />
          </>
        ) : (
          <Button
            onPress={() => console.log('hello worlds')}
            text="Hit Lambda"
            color="#7D24CB"
          />
        )}
        {authState.refreshToken ? (
          <Button onPress={handleRefresh} text="Refresh" color="#24C2CB" />
        ) : null}
        {showRevoke ? (
          <Button onPress={handleRevoke} text="Revoke" color="#EF525B" />
        ) : null}
      </ButtonContainer>
    </Page>
  );
};

export default AuthScreen;
