import {AuthConfiguration} from 'react-native-app-auth';

const AuthConfigs: Record<string, AuthConfiguration> = {
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

export default AuthConfigs;
