import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    Dimensions,
    Modal,
} from 'react-native';
import ImageElement from './ImageElement';

export default class Inventory extends Component {
    state = {
        modalVisible: false,
        modalImage: require('./img/img1.jpg'),
        images: [
            require('./img/img1.jpg'),
            require('./img/img2.jpg'),
            require('./img/img3.png'),
            require('./img/img4.png'),
            require('./img/img5.jpg'),
            require('./img/img6.jpg')
        ]
    }

    setModalVisible(visible, imageKey) {
        this.setState({ modalImage: this.state.images[imageKey] });
        this.setState({ modalVisible: visible });
    }

    getImage() {
        return this.state.modalImage;
    }

    render() {
        images = this.state.images.map((val, key) => {
            return <TouchableWithoutFeedback key={key} 
                onPress={() => {this.setModalVisible(true, key)}}>
                <View style={styles.imagewrap}>
                    <ImageElement imgsource={val}></ImageElement>
                </View>
            </TouchableWithoutFeedback>
        });

        return (
            <View style={styles.contianer}>
                <Modal style={styles.modal} animationType={'fade'} transparent={true} visible={this.state.modalVisible} onRequestClose={() => {}}>
                    <View style={styles.modal}>
                        <Text style={styles.text} onPress={() => {this.setModalVisible(false)}}>Close</Text>
                        <ImageElement imgsource={this.state.modalImage}></ImageElement>
                    </View>
                </Modal>

                {images}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#eee',
    },
    imagewrap: {
        margin: 2,
        padding: 2,
        height: (Dimensions.get('window').height/3) - 12,
        width: (Dimensions.get('window').width/2) - 8,
        backgroundColor: '#fff',
    },
    modal: {
        flex: 1,
        padding: 40,
        backgroundColor: 'rgba(0,0,0, 0.9)'
    },
    text: {
        color: '#fff'
    }
});