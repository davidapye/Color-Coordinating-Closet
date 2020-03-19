import React, {Component} from 'react';
//import rect in our project
import {
  StyleSheet,
  View,
  FlatList,
  Image,
  Text,
} from 'react-native';
//import all the components we will need


export default class RecommendedOutfit extends Component {
  state = {
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

  render() {
    return (
      <View style={styles.mainView}>
        <View style={styles.container}>
          <Text style={{fontSize: 36}}>Selected Clothing</Text>
          <Image source={this.state.images[0]} style={styles.selectedImage} />
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
