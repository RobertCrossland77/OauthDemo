import React, {FC, useMemo, useCallback, useState} from 'react';
import {authorize, refresh, revoke} from 'react-native-app-auth';
import {Alert} from 'react-native';
import AuthConfigs from '../configs/AuthConfigs';

export type AuthState = {
  hasLoggedInOnce?: boolean;
  provider: string;
  accessToken: string;
  accessTokenExpirationDate: string;
  refreshToken: string;
  scopes?: Array<string>;
};

export type AuthContextProps = {
  authState: AuthState;
  showRevoke: string | false | undefined;
  handleAuthorize: (provider: any) => Promise<void>;
  handleRefresh: () => Promise<void>;
  handleRevoke: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextProps>({
  authState: {
    hasLoggedInOnce: false,
    provider: '',
    accessToken: '',
    accessTokenExpirationDate: '',
    refreshToken: '',
    scopes: [],
  },
  showRevoke: false,
  handleAuthorize: (_: any) => Promise.resolve(),
  handleRefresh: () => Promise.resolve(),
  handleRevoke: () => Promise.resolve(),
});

export const AuthProvider: FC = ({children}) => {
  const [authState, setAuthState] = useState<AuthState>({
    hasLoggedInOnce: false,
    provider: '',
    accessToken: '',
    accessTokenExpirationDate: '',
    refreshToken: '',
  });

  const handleAuthorize = useCallback(
    async provider => {
      try {
        const config = AuthConfigs[provider];
        const newAuthState = await authorize({
          ...config,
          connectionTimeoutSeconds: 5,
        });

        console.log(newAuthState);

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
    <AuthContext.Provider
      value={{
        authState,
        showRevoke,
        handleAuthorize,
        handleRefresh,
        handleRevoke,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
