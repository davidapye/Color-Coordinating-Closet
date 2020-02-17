'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {Platform} from 'react-native';
import storage from '@react-native-firebase/storage';
import {firebase} from '@react-native-firebase/storage';

const androidConfig = {
  projectId : 'color-coordinating-closet',
  apiKey : 'AIzaSyD_5VQxGB_pOsIlHajeukNTo4o39snAEZY',
};

class CameraView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={({barcodes}) => {
            console.log(barcodes);
          }}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
          <TouchableOpacity
            onPress={this.takePicture.bind(this)}
            style={styles.capture}>
            <Text style={{fontSize: 14}}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  takePicture = async () => {
    if (this.camera) {
      const options = {quality: 0.5, base64: true};
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);
      firebase.initializeApp();

      //things below this line do not work yet
      const ref = firebase.storage().ref(data.path);
      const path = '${firebase.storage.Path.Images}/' + data.path;
      const uploadTask = ref.putFile(path);
      alert(JSON.stringify(uploadTask));

      const {app} = firebase.storage();
      alert(JSON.stringify(app));

      //await firebase.storage().ref().putFile(data);
      //firebase.initializeApp()
      //alert(JSON.stringify(firebase.storage(Platform.OS ==='ios' ? null : androidConfig, 'ColorCoordinatingCloset',)));
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default CameraView;
