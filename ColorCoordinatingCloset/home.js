import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import React from 'react';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
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
    paddingTop: 96,
    paddingHorizontal: 32,
    backgroundColor: Colors.lighter,
  },
});

export default function Playground({navigation}) {
  const pressHandler = () => {
    navigation.navigate('CameraView');
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.signOutBtn}>
            <Button
              title={'Sign Out'}
              onPress={() => Alert.alert('Sign out button pressed')}
            />
          </View>
          <Text style={styles.text}>Welcome to Color Coordinating Closet</Text>
          <View style={styles.button}>
            <Button title={'Recommend Outfit'} onPress={pressHandler} />
          </View>
          <View style={styles.button}>
            <Button
              title={'Add to Inventory'}
              onPress={() => Alert.alert('Recommend Outfit button pressed')}
            />
          </View>
          <View style={styles.button}>
            <Button
              title={'View Inventory'}
              onPress={() => Alert.alert('View Inventory button pressed')}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
