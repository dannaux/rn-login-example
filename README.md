Trying to use KeyCloack as a login server for a React Native app. 

## Setup

1. Connected android device (One Plus 3000, but that is irrelevant)
2. KeyCloak instance running on local machine

The intent was to show the app using Expo, but keycloak has to be configured with a redirect URI. This is a URI your device will pick up and has to redirect to your app, e.g. meerdaal://login. Unfortunately I have not found how to configure that this URI will be picked by your API in JS only. So the app requires a native part to have this done. Meaning it can no longer be distributed via EXPO.

## Development setup

1. Keycloak in /Work/Development/keycloak-4.0.0.Beta1/, start with
    `./standalone.sh -Djboss.socket.binding.port-offset=100 -b=0.0.0.0` 
  * Offset for no particular reason, but this makes KeyCloak run on port 8180.
  * Second parameter is required to be able to access Keycloack on the local network from Expo.  Otherwise it is only accessible from localhost.  

2. KeyCloak configuration in the app (development.config.js):
    authConfig : {
        url: 'http://192.168.0.99:8180/auth',
        realm: 'rn-login',
        client_id: 'rn-login-app',
        redirect_uri: 'meerdaal://login',
        appsite_uri: 'http://192.168.0.99:9000/dev/vttl/app',
    }
 
    * url: URL of your KeyCloak instance. 
    * realm: defined in KeyCloack. This is a like a namespace.
    * clientID: defined in KeyCloack. This is the identifier for applications using that namespace. Just one for now. Could be multiple later on.
    * redirect_uri: this is where you go on succes. Should be a URI that your app picks up. Do this with Linking. **This URI must also be defined in KeyCloak.** If not it will not redirect. 
    * appsite_uri: not tried yet. But from the code, these 

3. 