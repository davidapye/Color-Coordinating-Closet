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
import * as RNFS from 'react-native-fs';

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

      /*var uploadUrl = 'https://api.imagga.com/v2/colors';
      var files = [
          {
              name: 'image',
              filename: data.filename,
              filepath: data.uri,
              filetype: data.type
          }
      ];
      var uploadBegin = (response) =>{
          var jobId = response.jobId;
          console.log('UPLOAD HAS BEGUN! JobId: ' + jobId);
      };
      var uploadProgress = (response) =>{
        var percentage = Math.floor((response.totalBytesSent/response.totalBytesExpectedToSend) * 100);
        console.log('UPLOAD IS ' + percentage + '% DONE!');
      };
      RNFS.uploadFiles({
          toUrl: uploadUrl,
          files: files,
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Authorization': 'Basic YWNjXzQwNTFiMzU3OTM1ODFhNDo5ZjJlZjI1YWM5ZjI1YzI0MTM2MDEyYWNkOWE3MzU4YQ==',
          },
          begin: uploadBegin,
          progress: uploadProgress,
      }).promise.then(response =>{
          console.log(response.body);
      }).catch(error =>{
          console.log(error);
      });*/

      var formData = new FormData();
      formData.append('image_base64', data.base64);
      fetch('https://api.imagga.com/v2/colors', {
          method: 'POST',
          headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': 'Basic YWNjXzQwNTFiMzU3OTM1ODFhNDo5ZjJlZjI1YWM5ZjI1YzI0MTM2MDEyYWNkOWE3MzU4YQ==',
          },
          body: formData,
      }).then(response => response.json())
          .then(responseData =>{
              console.log(responseData.result.colors.foreground_colors);
          }
      ).catch(ex =>{
          console.log(ex);
      });

      /*const image_data = new FormData();
      image_data.append('photo', {
        name: data.filename,
        uri: data.uri,
        type: data.type,
      });

      fetch('https://us-central1-carbon-inkwell-271715.cloudfunctions.net/testHttps',{
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: image_data
      }).then(response =>{
        console.log(response);
      }).catch(exception =>{
        console.log(exception);
      });*/

      // fetch('https://api.imagga.com/v2/colors', {
      //   method: 'post',
      //   body: image_data,
      //   headers: {
      //     'Authorization': 'Basic YWNjXzQwNTFiMzU3OTM1ODFhNDo5ZjJlZjI1YWM5ZjI1YzI0MTM2MDEyYWNkOWE3MzU4YQ==',
      //     'Content-Type': 'multipart/form-data; boundary=<calculated when request is sent>',
      //     'Content-Length': '<calculated when request is sent>',
      //     'Host': '<calculated when request is sent>'
      //   },
      // }).then(res =>{
      //   console.log(res);
      // }).catch(exception =>{
      //   console.log(exception);
      // });

      // const test = fetch('https://api.imagga.com/v2/colors', {
      //   method: 'post',
      //   headers: {
      //     'Authorization': 'Basic YWNjXzQwNTFiMzU3OTM1ODFhNDo5ZjJlZjI1YWM5ZjI1YzI0MTM2MDEyYWNkOWE3MzU4YQ==',
      //   },
      //   body: image_data,
      // }).then((response) => {
      //   console.log('response');
      //   console.log(response);
      // }).catch(exceptoin =>{
      //   console.log('expection');
      //   console.log(exceptoin);
      // });
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
