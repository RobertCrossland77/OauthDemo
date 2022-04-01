import {AuthConfiguration} from 'react-native-app-auth';

const AuthConfigs: Record<string, AuthConfiguration> = {
  okta: {
    issuer: 'https://dev-27558975.okta.com/oauth2/default',
    clientId: '0oa3vrk1o6uDlqoyb5d7',
    redirectUrl: 'com.okta.dev-27558975:/callback',
    additionalParameters: {},
    scopes: [
      'openid',
      'profile',
      'email',
      'offline_access',
      'heartland_lambda',
    ],

    serviceConfiguration: {
      authorizationEndpoint:
        'https://dev-27558975.okta.com/oauth2/default/v1/authorize',
      tokenEndpoint: 'https://dev-27558975.okta.com/oauth2/default/v1/token',
      revocationEndpoint:
        'https://dev-27558975.okta.com/oauth2/default/v1/revoke',
    },
  },
  AAD: {
    issuer: 'https://login.microsoftonline.com/common/oauth2',
    clientId: 'b1e3f237-c11a-43c0-acab-e2b69d527826',
    redirectUrl: 'msauth.org.reactjs.native.example.OauthDemo://auth/',
    additionalParameters: {},
    scopes: ['openid', 'offline_access'],

    serviceConfiguration: {
      authorizationEndpoint:
        'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      tokenEndpoint:
        'https://login.microsoftonline.com/common/oauth2/v2.0/token',
    },
  },
  B2c: {
    issuer: 'http://gpcustomersbx.onmicrosoft.com/B2C_1A_hrpos_SusiMfa',
    clientId: '45741854-c258-4813-a264-65f1cb87ba59',
    redirectUrl: 'msauth.org.reactjs.native.example.OauthDemo://auth/',
    additionalParameters: {},
    scopes: ['openid', 'offline_access'],

    serviceConfiguration: {
      authorizationEndpoint:
        'https://gpcustomersbx.b2clogin.com/gpcustomersbx.onmicrosoft.com/B2C_1A_hrpos_SusiMfa/oauth2/v2.0/authorize',
      tokenEndpoint:
        'https://gpcustomersbx.b2clogin.com/gpcustomersbx.onmicrosoft.com/B2C_1A_hrpos_SusiMfa/oauth2/v2.0/token',
    },
  },
  B2c2: {
    issuer: 'http://gpcustomerdev.onmicrosoft.com/B2C_1A_hrpos_SusiMfa',
    clientId: '45741854-c258-4813-a264-65f1cb87ba59',
    redirectUrl: 'msauth.org.reactjs.native.example.OauthDemo://auth/',
    additionalParameters: {},
    scopes: ['openid', 'offline_access'],

    serviceConfiguration: {
      authorizationEndpoint:
        'https://gpcustomerdev.b2clogin.com/gpcustomerdev.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1A_hrpos_SUSIMFA',
      tokenEndpoint:
        'https://gpcustomerdev.b2clogin.com/gpcustomerdev.onmicrosoft.com/oauth2/v2.0/token?p=B2C_1A_hrpos_SUSIMFA',
    },
  },
};

export default AuthConfigs;
