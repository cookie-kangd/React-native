/** Day2 a newsApp for Android by DK */
import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Image,
    Text,
    FlatList,
    Modal,
    Dimensions,
    ActivityIndicator
} from 'react-native';
//获取设备宽高
var {width, height} =  Dimensions.get('window');

export default class Home extends Component {
  constructor(props){
    super(props);
    this.state={
      time: 5,
      display: true,
      page: 1,
      isMore: true
    },
    this.news = []
  }
  componentDidMount() {
    this.Timer = setInterval(() => {
      this.state.time--;
      this.setState({time: this.state.time});
      if(this.state.time <= 0) {
        clearInterval(this.Timer)
        this.state.display = false;
        this.setState({display: this.state.display});
        let formData = new FormData();
        formData.append("page", this.state.page.toString());
        formData.append("count", '10');
        let url = "https://api.apiopen.top/getWangYiNews";
        let opts = {
          method: "POST",
          body: formData,
        }
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
          this.news = responseJson.result;
          this.setState(
            this.news
          )
        })
        .catch((error) => {
          console.error(error);
        });
      }
    }, 1000); 
  }
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center',alignContent: 'center',position: 'relative'}}>
          {/* <View style={{width: width,height: height,position: 'absolute',top: 0,left: 0,backgroundColor: 'rgba(0,0,0,0.2)',zIndex: 999}}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.isMore}
            >
              
            </Modal>
            <ActivityIndicator size="large" color="black" style={{width: width,height: height,position: 'absolute',right: 0,marginLeft: "auto",marginRight:"auto",marginTop: "auto",marginBottom: "auto",zIndex: 9999}}/>
          </View> */}
          {this.state.display==true?(<Image source={require('./src/assets/start.jpg')} style={{flex: 1,justifyContent: 'center',alignContent: 'center',width:null}}></Image>):(null)}
          {this.state.display==true?(<Text style={{width: 100,height: 20,borderColor: 'black',borderRadius: 10,borderWidth: 2,position: 'absolute',top: 20,right: 10,textAlign: 'center'}} onPress={this.passWait.bind(this)}>{this.state.time}秒后自动跳过</Text>):(null)}
          {this.state.display==false?(<View style={{flex: 1,width:null,padding: 15}}>
            <Text style={{fontSize: 22}}>推荐新闻</Text>
            <FlatList
              data={this.news}
              renderItem={({item}) => 
              <View>
                <Image source={{uri: item.image}} style={{width: null, height: 200}} ></Image>
                <Text style={{padding: 3,paddingLeft: 0}}>{item.title}</Text>
                <Text style={{padding: 10,borderBottomWidth: 1,borderColor: '#000000',paddingLeft: 0,paddingTop: 5}}>{item.passtime}</Text>
              </View>}
              onEndReached={this.loadMore.bind(this)}
              onEndReachedThreshold={0.2}
            />
          </View>):(null)}
      </View>
    );
  }
  //跳过
  passWait() {
    clearInterval(this.Timer)
    this.state.display = false;
    this.setState({display: this.state.display});
    let formData = new FormData();
    formData.append("page", '1');
    formData.append("count", '10');
    let url = "https://api.apiopen.top/getWangYiNews";
    let opts = {
      method: "POST",
      body: formData,
    }
    fetch(url, opts)
    .then((response) => response.json())
    .then((responseJson) => {
      this.news = responseJson.result;
      this.setState(
        this.news
      )
    })
    .catch((error) => {
      console.error(error);
    });
  }
  //下拉加载更多
  loadMore() {
    // this.state.isMore = false;
    // this.setState({isMore: this.state.isMore});
    this.state.page++;
    this.setState({page: this.state.page});
    let formData = new FormData();
    formData.append("page", this.state.page.toString());
    formData.append("count", '10');
    let url = "https://api.apiopen.top/getWangYiNews";
    let opts = {
      method: "POST",
      body: formData,
    }
    fetch(url, opts)
      .then((response) => response.json())
      .then((responseJson) => {
        let more = [];
        more = responseJson.result;
        this.news = this.news.concat(more);
        this.setState(
          this.news
        )
        // this.state.isMore = true;
        // this.setState({isMore: this.state.isMore});
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

AppRegistry.registerComponent('Home', () => Home);