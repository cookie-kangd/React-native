/** Day3 a waterfalls flow imageApp for Android by DK */
import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Image,
    Text,
    FlatList,
    Dimensions,
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
    this.image = []
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
        let url = "https://api.apiopen.top/getImages";
        let opts = {
          method: "POST",
          body: formData,
        }
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
          this.image = responseJson.result;
          this.setState(
            this.image
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
          {this.state.display==true?(<Image source={require('./src/assets/start.jpg')} style={{flex: 1,justifyContent: 'center',alignContent: 'center',width:null}}></Image>):(null)}
          {this.state.display==true?(<Text style={{width: 100,height: 20,borderColor: 'black',borderRadius: 10,borderWidth: 2,position: 'absolute',top: 20,right: 10,textAlign: 'center'}} onPress={this.passWait.bind(this)}>{this.state.time}秒后自动跳过</Text>):(null)}
          {this.state.display==false?(<View style={{flex: 1,width:null,padding: 15}}>
            <Text style={{fontSize: 22}}>推荐美图</Text>
            <FlatList
              data={this.image}
              numColumns={2}
              renderItem={({item,index}) =>
                <View style={{flex: 1}}>
                  {index%2!==0?(<Image source={{uri: item.img}} style={{width: width/2.2, height: 250,borderWidth: 1,borderRadius: 10,marginBottom: 5}}></Image>):(null)}
                  {index%2==0?(<Image source={{uri: item.img}} style={{width: width/2.2, height: 250,borderWidth: 1,borderRadius: 10,marginBottom: 5}}></Image>):(null)}
                </View>
              }
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
    let url = "https://api.apiopen.top/getImages";
    let opts = {
      method: "POST",
      body: formData,
    }
    fetch(url, opts)
    .then((response) => response.json())
    .then((responseJson) => {
      this.image = responseJson.result;
      this.setState(
        this.image
      )
    })
    .catch((error) => {
      console.error(error);
    });
  }
  //下拉加载更多
  loadMore() {
    this.state.page++;
    this.setState({page: this.state.page});
    let formData = new FormData();
    formData.append("page", this.state.page.toString());
    formData.append("count", '10');
    let url = "https://api.apiopen.top/getImages";
    let opts = {
      method: "POST",
      body: formData,
    }
    fetch(url, opts)
      .then((response) => response.json())
      .then((responseJson) => {
        let more = [];
        more = responseJson.result;
        this.image = this.image.concat(more);
        this.setState(
          this.image
        )
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

AppRegistry.registerComponent('Home', () => Home);