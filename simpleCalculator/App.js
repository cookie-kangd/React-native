/** Day1 a simple calculator for Android by DK */
import React, { Component } from 'react';
import {
    AppRegistry,
    View,
    Text,
    FlatList,
    Alert
} from 'react-native';

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      hour: 0,
      minutes: 0,
      seconds: 0,
      ms: 0
    },
    this.countList = []
  }
  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <View style={{flex: 1,alignItems: "center",justifyContent:'center'}}>
          <Text style={{fontSize:38}}>{this.state.hour}:{this.state.minutes}:{this.state.seconds}</Text>
        </View>
        <View style={{flex: 1,alignItems: "center",justifyContent:'center',flexDirection: 'row',borderTopWidth: 1,borderBottomWidth: 1,borderColor: '#000000'}}>
          <View style={{flex:.5,alignItems: "center",justifyContent:'center'}}>
            <Text style={{width: 50,height: 50,padding: 10,borderRadius: 50,paddingTop: 14,borderColor: '#000000',borderWidth: 1}} onPress={this.countTime.bind(this)}>计时</Text>
          </View>
          <View style={{flex:.5,alignItems: "center",justifyContent:'center'}}>
            <Text style={{width: 50,height: 50,padding: 10,borderRadius: 50,paddingTop: 14,borderColor: '#000000',borderWidth: 1}} onPress={this.overTime.bind(this)}>停止</Text>
          </View>
          <View style={{flex:.5,alignItems: "center",justifyContent:'center'}}>
            <Text style={{width: 50,height: 50,padding: 10,borderRadius: 50,paddingTop: 14,borderColor: '#000000',borderWidth: 1}} onPress={this.clearCount.bind(this)}>清空</Text>
          </View>
        </View>
        <View style={{flex: 2,alignItems: "center",justifyContent:'center'}}>
          <Text style={{fontSize: 16}}>计时记录</Text>
          <FlatList
            style={{padding: 10,fontSize: 30,borderBottomWidth: 1,borderColor: '#000000'}}
            data={this.countList}
            renderItem={({item}) => <Text>{item.hour}:{item.minutes}:{item.seconds}</Text>}
          />
        </View>
      </View>
    );
  }
  //开始计时
  countTime(){
    this.Timer=setInterval(()=>{
      this.state.seconds++;
      this.setState({seconds:this.state.seconds});
      if(this.state.seconds >= 60) {
        this.state.seconds = 0;
        this.setState({seconds:this.state.seconds});
        this.state.minutes++;
        this.setState({minutes:this.state.minutes});
        if(this.state.minutes >= 60) {
          this.state.minutes = 0;
          this.setState({minutes:this.state.minutes});
          this.state.hour++;
          this.setState({hour:this.state.hour});
          if(this.state.hour >= 90) {
            Alert.alert('宁可真闲，90个小时了自动停止');
            clearInterval(this.Timer);
            let abc = {};
            abc.seconds = this.state.seconds;
            abc.minutes = this.state.minutes;
            abc.hour = this.state.hour;
            this.countList.push(abc);
            this.setState(this.countList);
          }
        }
      }
    },1000);
  }
  //停止计时
  overTime() {
    clearInterval(this.Timer);
    let abc = {};
    abc.seconds = this.state.seconds;
    abc.minutes = this.state.minutes;
    abc.hour = this.state.hour;
    this.countList.push(abc);
    this.setState(this.countList);
    this.state.seconds = 0;
    this.state.minutes = 0;
    this.state.hour = 0;
    this.setState({seconds:this.state.seconds});
    this.setState({minutes:this.state.minutes});
    this.setState({hour:this.state.hour});
  }
  //清空记录
  clearCount() {
    this.countList = [];
    this.setState(this.countList);
  }
}

AppRegistry.registerComponent('Login', () => Login);