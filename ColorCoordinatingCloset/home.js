import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import firebase from '@react-native-firebase/app';
import '@react-native-firebase/auth';
import ImageElement from './ImageElement';

const homeImg = require('./img/CCC.jpg');
const styles = StyleSheet.create({
  homeImg: {
    width: "100%",
    height: 400,
  },
  scrollView: {
    backgroundColor: Colors.white,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  button: {
    marginTop: 32,
    marginLeft: '13%',
    backgroundColor: Colors.light,
    borderRadius: 100,
    width: '74%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signOutBtn: {
    width: '30%',
    height: '5%',
    flex: 1,
    marginLeft: '65%',
    marginTop: '2%',
    justifyContent: 'flex-end',
    borderRadius: 100,
    backgroundColor: Colors.light,
  },
  text: {
    fontSize: 40,
    fontWeight: '600',
    textAlign: 'center',
    color: Colors.black,
    paddingBottom: 40,
    paddingTop: 94,
    paddingHorizontal: 32,
  },
});

export default function Playground({navigation}) {
  state = {currentUser: null};

  componentDidMount = () => {
    const {currentUser} = firebase.auth();
    this.setState({currentUser});
    console.log(currentUser);
  };

  const pressHandler = () => {
    navigation.navigate('Camera');
  };

  const signOut = () => {
    firebase
      .auth()
      .signOut()
      .then(function() {
        navigation.push('InitialAuth');
      })
      .catch(function(error) {
        navigation.push('InitialAuth');
      });
  };

  const viewInventory = () => {
    navigation.navigate('Inventory');
  };

  const recommendOutfit = () => {
    navigation.navigate('ReturnOutfit', {text: 'test this'});
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <ScrollView
            scrollEnabled={false}
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.signOutBtn}>
              <Button
                title={'Sign Out'}
                onPress={signOut}
                color={Colors.black}
              />
            </View>
            <View>
              <Text style={styles.text}>
                Welcome to Color Coordinating Closet
              </Text>
            </View>
            <View style={styles.button}>
              <Button
                title={'Add to Inventory'}
                onPress={pressHandler}
                color={Colors.black}
              />
            </View>
            <View style={styles.button}>
              <Button
                title={'View Inventory'}
                onPress={viewInventory}
                color={Colors.black}
              />
            </View>
          </ScrollView>
          <View>
            <Image source={homeImg} style={styles.homeImg}/>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
