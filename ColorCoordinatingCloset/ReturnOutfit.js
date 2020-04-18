import React, {Component} from 'react';
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
} from 'react-native';
//import all the components we will need
import {firebase} from '@react-native-firebase/storage';

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

export default class RecommendedOutfit extends Component {

  state = {
    isLoading: true,
    modalVisible: false,
    modalImage: '',
  };

  constructor(props) {
    super(props);
    // get url of selected image from flatlist screen
    var originalImageItem = props.navigation.state.params.imageUrl;
    //console.log(originalImageUrl);
    this.state.originalImageItem = originalImageItem;

    path = this.state.originalImageItem.path;
    pathParts = path.split("/");
    filename = pathParts[2];
    this.state.originalImageFilename = filename;
  }

  async componentDidMount(){
    return fetch('https://us-central1-carbon-inkwell-271715.cloudfunctions.net/matchClothes', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        User: firebase.auth().currentUser.uid,
        Filename: this.state.originalImageFilename,
      }),
    }).then((response) => response.json()).then((responseJson) => {
      console.log("josn");
      console.log(responseJson);
      //console.log("getting images for user");
      this.getImagesForUser(responseJson);
      //console.log("done getting images");

    }).catch((error) => {
      console.log("error");
      console.log(error);
    });
  }

  async getImagesForUser(matchingFilenames) {
    // get all images for user
    userImagesRef = firebase.storage().ref('Images/');
    userImagesRaw = await userImagesRef
      .child(firebase.auth().currentUser.uid)
      .listAll();
    userImagesRefs = [];
    userImagesRaw.items.forEach(item => {
      userImagesRefs.push(item.path);
    })
    console.log("user images refs");
    console.log(userImagesRefs);
    console.log(userImagesRefs.length);

    //matching all user images to the ones received from function
    matchingRefs = []
    console.log("starting");
    userImagesRefs.forEach(itemPath => {
      console.log(itemPath);
      matchingFilenames.forEach(filename => {
        console.log(filename);
        if (itemPath.includes(filename)) {
          console.log("matched");
          matchingRefs.push(itemPath);
        }
      });
    });
    console.log("matching items count");
    console.log(matchingRefs.length);

    // dowloading image urls
    userImagesUrls = [];
    for (const itemPath of matchingRefs) {
      const imageRef = firebase.storage().ref(itemPath);
      url = await imageRef.getDownloadURL();
      if (!(this.state.originalImageItem.src == url)) {
        userImagesUrls.push(url);
      }
    }
    console.log("user image urls");
    console.log(userImagesUrls);

    this.setState({
      isLoading: false,
      dataSource: userImagesUrls,
    }, function(){

    });
  }


  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.mainView}>
          <View style={styles.container}>
            <Text style={{fontSize: 36}}>Selected Clothing</Text>
            <Image style={styles.imageThumbnail} source={{uri: this.state.originalImageItem.src}} />
          </View>

          <Text style={{fontSize: 36, alignSelf: 'center', top: 40}}>
            We recommend
          </Text>
          <View style={styles.container}>
            <ActivityIndicator/>
          </View>
        </View>
      )
    }
    console.log("running alt");
    return (
      <View style={styles.mainView}>
        <View style={styles.container}>
          <Text style={{fontSize: 36}}>Selected Clothing</Text>
          <Image style={styles.imageThumbnail} source={{uri: this.state.originalImageItem.src}} />
        </View>

        <Text style={{fontSize: 36, alignSelf: 'center', top: 40}}>
          We recommend
        </Text>
        <FlatList
          style={styles.flatList}
          data={this.state.dataSource}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'column', margin: 1}}>
              <Image style={styles.imageThumbnail} source={{uri: item}} />
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
  mainView: {
    height: '100%',
    //backgroundColor: 'red',
  },
  container: {
    top: 100,
    //flex: 1,
    //flexDirection: 'column',
    //backgroundColor: 'yellow',
    alignItems: 'center',
    width: '100%',
    height: '30%',
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
  selectedImage: {
    top: 20,
    width: 100,
    height: 100,
  },
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: 130,
  },
  flatList: {
    top: 50,
  },
});
