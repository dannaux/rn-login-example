import React from 'react';
import { Button, Linking, StyleSheet, Text, View } from 'react-native';
import Login from 'react-native-login';
import Constants from 'expo';

import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'Warning: componentWillMount is deprecated',
  'Warning: componentWillReceiveProps is deprecated',
]);

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tokens: null,
    };

    Login.tokens().then(tokens => this.setState({tokens})).catch(() => this.setState({tokens: null}));
  }

  componentDidMount() {
    Linking.addEventListener('url', this._handleOpenURL);
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this._handleOpenURL);
  }

  _handleOpenURL(event) {
    console.log(event.url);
  }

  onLogin() {
    const config = Expo.Constants.manifest.extra.authConfig;
    Login.start(config).then(tokens => {
     this.setState({tokens: tokens});
    }).catch(() => this.setState({tokens: null}));
  }

  onLogout() {
    Login.end();
    this.setState({tokens: null});
  }

  render() {
    return this.state.tokens ? this.renderAppScreen() : this.renderLoginScreen();
  }

  renderAppScreen() {
    const details = Login.decodeToken(this.state.tokens.id_token);

    return (
      <View style={styles.container}>
        <View style={styles.profile}>
          <Text style={styles.text}>Welcome!</Text>
          <Text style={styles.text}>{details.name}</Text>
          <Text style={styles.text}>{details.email}</Text>
        </View>
        <Button borderRadius={30} backgroundColor="#5cb85c" title='Logout' onPress={() => this.onLogout()} />
      </View>
    );
  }

  renderLoginScreen() {
    return (
      <View style={styles.container}>
        <Button title='Sign In With KeyCloak' button type='facebook' onPress={() => this.onLogin()} />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
