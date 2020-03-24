'use strict';
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {RNCamera} from 'react-native-camera';
import {firebase} from '@react-native-firebase/storage';

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

      const filename = data.uri.split('/').pop();
      // still need to upload with user id as examples in db have
      const upload = firebase.storage().ref('Images/' + firebase.auth().currentUser.uid +'/' +filename).putFile(data.uri).then(file => {file.ref; console.log('Photo uploaded');});

      const image_data = new FormData();
      image_data.append('image', {
        name: data.filename,
        uri: data.uri,
        type: data.type,
      });
      const test = fetch('https://api.imagga.com/v2/colors', {
        method: 'post',
        headers: {
          'Authorization': 'Basic YWNjXzQwNTFiMzU3OTM1ODFhNDo5ZjJlZjI1YWM5ZjI1YzI0MTM2MDEyYWNkOWE3MzU4YQ==',
        },
        body: image_data,
      }).then((response) => {
        console.log(response);
      }).catch(exceptoin =>{
        console.log(exceptoin);
      });
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
