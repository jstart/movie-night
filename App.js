import React, { Component } from 'react';
import { StyleSheet, Text, Image, View, Modal, Button, StatusBar, TouchableOpacity, SafeAreaView } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';
import { HomeIndicator } from 'react-native-home-indicator';
import Orientation from 'react-native-orientation-locker';

export default class App extends React.Component {

  state = {
    activeIndex: 0,
    carouselItems: [
      {
          title:"Captain Phillips",
          text: "",
          image: "https://images-us-az.crackle.com/profiles/channels/5791/ChannelArt_520x790.jpg?ts=20191106140453"
      },
      {
          title:"Patriot Games",
          text: "",
          image: "https://images-us-az.crackle.com/profiles/channels/6130/ChannelArt_520x790.jpg?ts=20200107165304"
      },
      {
          title:"Clue",
          text: "",
          image: "https://images-us-az.crackle.com/profiles/channels/6373/ChannelArt_520x790.jpg?ts=20200302111934"
      },
      {
          title:"10 Cloverfield Lane",
          text: "",
          image: "https://images-us-az.crackle.com/profiles/channels/6551/ChannelArt_520x790.jpg?ts=20200430195700"
      },
      {
          title:"A.C.O.D - Adult Children of Divorce",
          text: "",
          image: "https://images-us-az.crackle.com/profiles/channels/6613/ChannelArt_520x790.jpg?ts=20200515150621"
      },
      {
          title:"What's Eating Gilbert Grape",
          text: "",
          image: "https://images-us-az.crackle.com/profiles/channels/5644/ChannelArt_520x790.jpg?ts=20200515150621"
      },
      {
          title:"Teenage Mutant Ninja Turtles",
          text: "",
          image: "https://images-us-az.crackle.com/profiles/channels/6621/ChannelArt_520x790.jpg?ts=20200515150621"
      },
    ]
  }
    constructor(props){
        super(props);
    }

    componentDidMount() {
      Orientation.lockToPortrait();
    }

    _renderItem({item,index}){
        return (
            <MovieCard itemName={item.title} itemImage={item.image}/>
        )
    }

    render() {
        return (
          <SafeAreaView style={{flex: 1, backgroundColor:'#3F2469', paddingTop: 50, }}>
          <HomeIndicator autoHidden />
            <StatusBar barStyle="light-content"/>
            <Text style={{fontSize: 30, marginLeft: 25, marginTop: 10, color: 'white', fontFamily: 'Avenir-Book', }}>{"Movie Night"}</Text>
            <Text style={{fontSize: 20, marginLeft: 25, marginTop: 10, marginBottom: 25, color: 'white', fontFamily: 'Avenir-Light', }}>{"7 movies a week, every week"}</Text>
              <View style={{ flex: 1, flexDirection:'row',}}>
                  <Carousel
                    layout={"default"}
                    ref={ref => this.carousel = ref}
                    data={this.state.carouselItems}
                    sliderWidth={300}
                    itemWidth={300}
                    renderItem={this._renderItem}
                    onSnapToItem = { index => this.setState({activeIndex:index}) }
                    on/>
              </View>
          </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  container: {
    aspectRatio: 520 / 790,
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#B695E8',
  },
  backdrop: {
    flex: 1,
    flexDirection: 'column'
  },
  headline: {
    margin: 24,
    fontSize: 24,
    fontFamily: 'Avenir-Book',
    textAlign: 'center',
    backgroundColor: '#B695E8',
    borderColor: '#B695E8',
    borderWidth: 8,
    color: 'white',
  },
  backgroundVideo: {
    backgroundColor: 'black',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

class MovieCard extends Component {
  constructor() {
      super();
      this.state = {
        modalVisible: false,
      };
    }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
    Orientation.lockToLandscapeLeft();
  }

  render() {
    return (
      <View>
        <Modal
        animationType="slide"
        supportedOrientations={['landscape-left']}
        transparent={false}
        visible={this.state.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}>
          <View style={styles.backgroundVideo}>
            <Video source={{uri: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"}} fullscreen={true} fullscreenOrientation="landscape"
            style={styles.backgroundVideo}>
            <View>
            </View>
            </Video>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={() => {
            this.setModalVisible(!this.state.modalVisible);
          }} underlayColor="white">
          <View style={styles.container}>
            <View style= {styles.backgroundContainer}>
              <Image source={{ uri: this.props.itemImage }} resizeMode='cover' style={styles.backdrop} />
            </View>
          </View>
          <Text style={styles.headline}>{this.props.itemName}</Text>
          </TouchableOpacity>
      </View>
    );
  }
}
