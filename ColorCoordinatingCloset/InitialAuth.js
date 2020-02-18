import {
  Button,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  button: {
    marginTop: 32,
    marginLeft: '13%',
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
export default class InitialAuth extends React.Component {
  goToLogin = () => {
    this.props.navigation.push('Login');
  }
  goToSignup = () => {
    this.props.navigation.push('Signup');
  }
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Color Coordinating Closet</Text>
          <View style={styles.button}>
            <Button title={'Login'} onPress={this.goToLogin} />
          </View>
          <View style={styles.button}>
            <Button
              title={'Signup'}
              onPress={this.goToSignup}
            />
          </View>
      </View>
    )
  }
}