Trying to use KeyCloack as a login server for a React Native app. 

This code is based on [react-native-login](https://github.com/ak1394/react-native-login), but copied to the version I am working with. 

## Setup

1. Connected android device (One Plus 3000, but that is irrelevant)
2. KeyCloak instance running on local machine

The intent was to show the app using Expo, but keycloak has to be configured with a redirect URI. This is a URI your device will pick up and has to redirect to your app, e.g. meerdaal://login. Unfortunately I have not found how to configure that this URI will be picked by your API in JS only. So the app requires a native part to have this done. Meaning it can no longer be distributed via EXPO.

## Development setup

(Personal use only. This is just as a help for when I pick up this code again, in a couple of days, weeks, months.)

0. Code in /Work/Development/rn-login-example
1. Keycloak in /Work/Development/keycloak-4.0.0.Beta1/, start with
>    ./standalone.sh -Djboss.socket.binding.port-offset=100 -b=0.0.0.0 

  * Offset for no particular reason, but this makes KeyCloak run on port 8180.
  * Second parameter is required to be able to access Keycloack on the local network from Expo.  Otherwise it is only accessible from localhost.  

2. KeyCloak configuration in the app (development.config.js):
 >   authConfig : {
 >       url: 'http://192.168.0.99:8180/auth',
 >       realm: 'rn-login',
 >       client_id: 'rn-login-app',
 >       redirect_uri: 'meerdaal://login',
 >       appsite_uri: 'http://192.168.0.99:9000/dev/vttl/app',
 >   }
 
    * url: URL of your KeyCloak instance. 
    * realm: defined in KeyCloack. This is a like a namespace.
    * clientID: defined in KeyCloack. This is the identifier for applications using that namespace. Just one for now. Could be multiple later on.
    * redirect_uri: this is where you go on succes. Should be a URI that your app picks up. Do this with Linking. **This URI must also be defined in KeyCloak.** If not it will not redirect. Luckily it displays a clear message.  
    * appsite_uri: not tried yet. But from the code, these look like the URIs that get the token sent with them. 

## Useful links

### React native - Login - Keycloak
* https://github.com/ak1394/react-native-login
* https://github.com/ak1394/react-native-login-example
* https://medium.com/@ak1394/simple-social-login-for-react-native-apps-71279bf80ffc
* https://medium.com/@alexmngn/the-essential-boilerplate-to-authenticate-users-on-your-react-native-app-f7a8e0e04a42


### Linking
* https://medium.com/react-native-training/deep-linking-your-react-native-app-d87c39a1ad5e
* https://facebook.github.io/react-native/docs/linking.html
* https://www.oauth.com/oauth2-servers/redirect-uris/redirect-uris-native-apps/
* https://developer.android.com/training/app-links/deep-linking.html#adding-filters

### Native modules

* create a project with native code running `react-native init projectname` 
* when you have done this, instructions on how to run are displayed:
> To run your app on iOS:
>
>  cd /home/philip/Work/Development/rn-test2/testnative2
>
>  react-native run-ios
>
>   or
>
>   Open ios/testnative2.xcodeproj in Xcode
>
>   Hit the Run button
>
>To run your app on Android:
>
>   cd /home/philip/Work/Development/rn-test2/testnative2
>
>   Have an Android emulator running (quickest way to get started), or a device connected
>
>   react-native run-androido
* [Ejecting](https://github.com/react-community/create-react-native-app/blob/master/EJECTING.md)
* [Creating rn apps](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md)