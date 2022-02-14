import React, {useState, useCallback, useMemo, FC} from 'react';
import {Alert} from 'react-native';
import {
  authorize,
  refresh,
  revoke,
  prefetchConfiguration,
} from 'react-native-app-auth';
import {
  Page,
  Button,
  ButtonContainer,
  Form,
  FormLabel,
  FormValue,
  Heading,
} from '../components';
import AuthConfigs from '../configs/AuthConfigs';

// Lambda endpoint: https://oz739t0vgj.execute-api.us-west-2.amazonaws.com/hello

type TokenState = {
  hasLoggedInOnce?: boolean;
  provider: string;
  accessToken: string;
  accessTokenExpirationDate: string;
  refreshToken: string;
  scopes?: Array<string>;
};

const AuthScreen: FC = () => {
  const [authState, setAuthState] = useState<TokenState>({
    hasLoggedInOnce: false,
    provider: '',
    accessToken: '',
    accessTokenExpirationDate: '',
    refreshToken: '',
  });

  React.useEffect(() => {
    prefetchConfiguration({
      warmAndPrefetchChrome: true,
      connectionTimeoutSeconds: 5,
      ...AuthConfigs.identityserver,
    });
  }, []);

  const handleAuthorize = useCallback(
    async provider => {
      try {
        const config = AuthConfigs[provider];
        const newAuthState = await authorize({
          ...config,
          connectionTimeoutSeconds: 5,
        });

        setAuthState({
          hasLoggedInOnce: true,
          provider: provider,
          ...newAuthState,
        });
      } catch (error) {
        Alert.alert(
          'Failed to log in',
          error instanceof Error ? error.message : undefined,
        );
      }
    },
    [authState],
  );

  const handleRefresh = useCallback(async () => {
    try {
      const config = AuthConfigs[authState.provider];
      const newAuthState = await refresh(config, {
        refreshToken: authState.refreshToken,
      });

      setAuthState(current => ({
        ...current,
        ...newAuthState,
        refreshToken: newAuthState.refreshToken || current.refreshToken,
      }));
    } catch (error) {
      Alert.alert(
        'Failed to refresh token',
        error instanceof Error ? error.message : undefined,
      );
    }
  }, [authState]);

  const handleRevoke = useCallback(async () => {
    try {
      const config = AuthConfigs[authState.provider];

      await revoke(config, {
        tokenToRevoke: authState.accessToken,
        sendClientId: true,
      });

      setAuthState({
        provider: '',
        accessToken: '',
        accessTokenExpirationDate: '',
        refreshToken: '',
      });
    } catch (error) {
      Alert.alert(
        'Failed to revoke token',
        error instanceof Error ? error.message : undefined,
      );
    }
  }, [authState]);

  const showRevoke = useMemo(() => {
    if (authState.accessToken) {
      const config = AuthConfigs[authState.provider];

      return config.issuer || config.serviceConfiguration?.revocationEndpoint;
    }

    return false;
  }, [authState]);

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
