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


export default class RecommendedOutfit extends Component {
  state = {
    isLoading: true,
    modalVisible: false,
    modalImage: require('./img/img1.jpg'),
    images: [
      require('./img/img1.jpg'),
      require('./img/img2.jpg'),
      require('./img/img3.png'),
      require('./img/img4.png'),
      require('./img/img5.jpg'),
      require('./img/img6.jpg'),
    ],
  };

  constructor(props) {
    super(props);
    // get url of selected image from flatlist screen
    var originalImageUrl = props.navigation.state.params.imageUrl;
    console.log(originalImageUrl);
    this.state.images[0] = originalImageUrl;
    console.log(this.state.images[0]);

    // get matching colors to current image
    // call harrisons function sending in image url from flatlist

    // get matching images based on returned colors
    // 1. need to call firebase db and get list images with colors for user
    // 2. reduce list to contain only matching colors 
    
  }

  componentDidMount(){
    // return fetch('https://reactnative.dev/movies.json')
    //   .then((response) => response.json())
    //   .then((responseJson) => {

    //     this.setState({
    //       isLoading: false,
    //       images: responseJson.movies,
    //     }, function(){

    //     });

    //   })
    //   .catch((error) =>{
    //     console.error(error);
    //   });
  }

  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.mainView}>
          <View style={styles.container}>
            <Text style={{fontSize: 36}}>Selected Clothing</Text>
            <Image style={styles.imageThumbnail} source={this.state.images[0]} />
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

    return (
      <View style={styles.mainView}>
        <View style={styles.container}>
          <Text style={{fontSize: 36}}>Selected Clothing</Text>
          <Image style={styles.imageThumbnail} source={this.state.images[0]} />
        </View>

        <Text style={{fontSize: 36, alignSelf: 'center', top: 40}}>
          We recommend
        </Text>
        <FlatList
          style={styles.flatList}
          data={this.state.images}
          renderItem={({item}) => (
            <View style={{flex: 1, flexDirection: 'column', margin: 1}}>
              <Image style={styles.imageThumbnail} source={item} />
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
