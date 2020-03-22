/*This is an Example of Grid View in React Native*/
import React, {Component} from 'react';
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Modal,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
//import all the components we will need

import {firebase} from '@react-native-firebase/storage';
import ImageElement from './ImageElement';

var userImagesRef = firebase.storage().ref('Images/');
var images = [];

userImagesRef
  .child(firebase.auth().currentUser.uid)
  .listAll()
  .then(message => {
    let id = 0;
    message.items.forEach(item => {
      console.log(item.path);
      const imageRef = firebase.storage().ref(item.path);
      imageRef.getDownloadURL().then(img => {
        images.push(img);
        id++;
      });
    });
    console.log('message printed');
  });

var myUrl = null;

export default class App extends Component {
  state = {
    modalVisible: false,
    modalImage: null,
  };

  setModalVisible(visible, imageKey) {
    this.setState({modalImage: images[imageKey]});
    this.setState({modalVisible: visible});
  }

  constructor() {
    super();
    this.state = {
      dataSource: {},
    };
  }

  componentDidMount() {
    userImagesRef = firebase.storage().ref('Images/');
    userImagesRef
      .child(firebase.auth().currentUser.uid)
      .listAll()
      .then(message => {
        message.items.forEach(item => {
          console.log(item.path);
          const imageRef = firebase.storage().ref(item.path);
          imageRef.getDownloadURL().then(img => {
            var isAdded = false;
            images.forEach(item => {
              if (item == img) {
                isAdded = true;
              }
            });
            if (isAdded == false) {
              images.push(img);
            }
          });
        });
        var that = this;
        let items = Array.apply(null, Array(images.length)).map((v, i) => {
          return {id: i, src: images[i]};
        });
        that.setState({
          dataSource: items,
        });
        console.log('Images loaded');
      });
  }
  render() {
    return (
      <View style={styles.MainContainer}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'column', margin: 1}}>
              <TouchableOpacity onPress={(event) => {
                        // onPress event fires with an event object
                        const { navigate } = this.props.navigation;
                        navigate('ReturnOutfit', { imageUrl: item.src });
                    }}>
                <Image style={styles.imageThumbnail} source={{uri: item.src}} />
              </TouchableOpacity>
            </View>
          )}
          //Setting the number of column
          numColumns={3}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingTop: 30,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  modal: {
    flex: 1,
    padding: 40,
    backgroundColor: 'rgba(0,0,0, 0.9)',
  },
  text: {
    color: '#fff',
  },
});

/*<View style={{flex: 1, flexDirection: 'column', margin: 1}}>*/
/*  <Image style={styles.imageThumbnail} source={{uri: item.src}} />*/
/*</View>*/
