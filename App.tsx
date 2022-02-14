import React, {useState, useCallback, useMemo} from 'react';
import {Alert} from 'react-native';
import {
  authorize,
  refresh,
  revoke,
  prefetchConfiguration,
  AuthConfiguration,
} from 'react-native-app-auth';
import {
  Page,
  Button,
  ButtonContainer,
  Form,
  FormLabel,
  FormValue,
  Heading,
} from './components';

const configs: Record<string, AuthConfiguration> = {
  identityserver: {
    issuer: 'https://demo.identityserver.io',
    clientId: 'interactive.public',
    redirectUrl: 'io.identityserver.demo:/oauthredirect',
    additionalParameters: {},
    scopes: ['openid', 'profile', 'email', 'offline_access'],

    serviceConfiguration: {
      authorizationEndpoint: 'https://demo.identityserver.io/connect/authorize',
      tokenEndpoint: 'https://demo.identityserver.io/connect/token',
      revocationEndpoint: 'https://demo.identityserver.io/connect/revoke',
    },
  },
  B2C: {
    issuer: 'https://demo.identityserver.io',
    clientId: 'interactive.public',
    redirectUrl: 'io.identityserver.demo:/oauthredirect',
    additionalParameters: {},
    scopes: ['openid', 'profile', 'email', 'offline_access'],

    serviceConfiguration: {
      authorizationEndpoint: 'https://demo.identityserver.io/connect/authorize',
      tokenEndpoint: 'https://demo.identityserver.io/connect/token',
      revocationEndpoint: 'https://demo.identityserver.io/connect/revoke',
    },
  },
  okta: {
    issuer: 'https://dev-27558975.okta.com/oauth2/default',
    clientId: '0oa3vrk1o6uDlqoyb5d7',
    redirectUrl: 'com.okta.dev-27558975:/callback',
    additionalParameters: {},
    scopes: ['openid', 'profile', 'email', 'offline_access'],

    serviceConfiguration: {
      authorizationEndpoint:
        'https://dev-27558975.okta.com/oauth2/default/v1/authorize',
      tokenEndpoint: 'https://dev-27558975.okta.com/oauth2/default/v1/token',
      revocationEndpoint:
        'https://dev-27558975.okta.com/oauth2/default/v1/revoke',
    },
  },
};

// Lambda endpoint: https://oz739t0vgj.execute-api.us-west-2.amazonaws.com/hello

type TokenState = {
  hasLoggedInOnce?: boolean;
  provider: string;
  accessToken: string;
  accessTokenExpirationDate: string;
  refreshToken: string;
  scopes?: Array<string>;
};

export default function App() {
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
      ...configs.identityserver,
    });
  }, []);

  const handleAuthorize = useCallback(
    async provider => {
      try {
        const config = configs[provider];
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
      const config = configs[authState.provider];
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
      const config = configs[authState.provider];

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
      const config = configs[authState.provider];

      return config.issuer || config.serviceConfiguration?.revocationEndpoint;
    }

    return false;
  }, [authState]);

  return (
    <Page>
      {authState.accessToken ? (
        <Form>
          <FormLabel>accessToken</FormLabel>
          <FormValue>{authState.accessToken}</FormValue>
          <FormLabel>accessTokenExpirationDate</FormLabel>
          <FormValue>{authState.accessTokenExpirationDate}</FormValue>
          <FormLabel>refreshToken</FormLabel>
          <FormValue>{authState.refreshToken}</FormValue>
          <FormLabel>scopes</FormLabel>
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
            {/* <Button
              onPress={() => handleAuthorize('identityserver')}
              text="Authorize IdentityServer"
              color="#DA2536"
            /> */}
            <Button
              onPress={() => handleAuthorize('okta')}
              text="Authorize Okta"
              color="#90DA25"
            />
            {/* <Button
              onPress={() => handleAuthorize('b2c')}
              text="Authorize Azure B2C"
              color="#DA2536"
            /> */}
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
}
