import React from 'react';
import {StyleSheet, Text, TextInput, View, Button} from 'react-native';
import firebase from '@react-native-firebase/app';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import '@react-native-firebase/auth';
export default class SignUp extends React.Component {
  state = {email: '', password: '', errorMessage: null};
  handleSignUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(() => {
        this.props.navigation.push('Home');
      })
      .catch(error => this.setState({errorMessage: error.message}));
  };
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Sign Up</Text>
        {this.state.errorMessage && (
          <Text style={{color: 'red'}}>{this.state.errorMessage}</Text>
        )}
        <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({password})}
          value={this.state.password}
        />
        <View style={styles.button}>
          <Button
            title="Submit"
            onPress={this.handleSignUp}
            color={Colors.black}
          />
        </View>
        <Button
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
          color={Colors.black}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  textInput: {
    height: 40,
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    marginTop: 8,
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
  },
});
