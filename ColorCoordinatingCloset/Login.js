import React from 'react';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';
import firebase from '@react-native-firebase/app';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import '@react-native-firebase/auth';

export default class Login extends React.Component {
  state = { email: '', password: '', errorMessage: null }
  handleLogin = () => {
    // TODO: Firebase stuff...
    console.log('1');
    const { email, password } = this.state
    firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user);
      this.goToHome();
    })
    .catch(error => this.setState({ errorMessage: error.message }));
  }
  goToHome = () => {
    console.log('going home');
    this.props.navigation.push('Home');
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Login</Text>
        {this.state.errorMessage &&
          <Text style={{ color: 'red' }}>
            {this.state.errorMessage}
          </Text>}
        <TextInput
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Email"
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          style={styles.textInput}
          autoCapitalize="none"
          placeholder="Password"
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
        />
        <View style={styles.button}>
          <Button title="Submit" onPress={this.handleLogin} />
        </View>
        <Button
          title="Don't have an account? Sign Up"
          onPress={() => this.props.navigation.push('Signup')}
        />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8
  },
  button: {
    marginTop: 32,
    backgroundColor: Colors.light,
    borderRadius: 100,
    width: '74%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
    paddingBottom: 40,
    paddingTop: 96,
    paddingHorizontal: 32,
    backgroundColor: Colors.lighter,
  }
})