/** Day4 laughCloud for Android by DK */
import React from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
    StatusBar,
    TouchableOpacity
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Login from "./src/page/logIn";
import Registered from "./src/page/registered";
import Index from "./src/page/index";
import ImageViewer from "./src/page/imageViewer";
//获取设备宽高
const {width} =  Dimensions.get('window');

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state={
      time: 5,
    }
  }
  componentDidMount() {
    this.Timer = setInterval(() => {
      this.state.time--;
      this.setState({time: this.state.time});
      if(this.state.time <= 0) {
        clearInterval(this.Timer)
        this.props.navigation.navigate('Login')
      }
    }, 1000); 
  }
  render() {
    return (
      <View style={{flex: 1,justifyContent: 'center',alignContent: 'center',position: 'relative'}}>
        {/* 沉浸状态栏 */}
        <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent={true}/>
        <Image source={require('./src/assets/start.jpg')} style={{flex: 1,justifyContent: 'center',alignContent: 'center',width:width}}></Image>
        <Text style={{width: 100,height: 20,borderColor: 'black',borderRadius: 10,borderWidth: 2,position: 'absolute',top: 40,right: 10,textAlign: 'center'}} onPress={this.passWait.bind(this)}>{this.state.time}秒后自动跳过</Text>
      </View>
    );
  }
  //跳过
  passWait() {
    clearInterval(this.Timer)
    this.props.navigation.navigate('Login')
  }
}

let AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => ({
      header: null,
    })
  },
  Login: {
    screen: Login,
    navigationOptions: () => ({
      header: null,
    })
  },
  Registered: {
    screen: Registered,
    navigationOptions: () => ({
      header: null,
    })
  },
  Index: {
    screen: Index,
    navigationOptions: () => ({
      headerTitle: '笑云',
      headerTitleStyle:{flex: .7,textAlign:'center'},
      headerRight: 
      <TouchableOpacity onPress={()=>{alert('点击了分享')}}>
        <Image source={require('./src/assets/share.png')} style={{width: 20,height: 20,marginRight: 30}}></Image>
      </TouchableOpacity>,
    })
  },
  ImageViewer: {
    screen: ImageViewer,
    navigationOptions: () => ({
      header: null,
    })
  }
},{
  swipeEnabled: true,//是否可以滑动切换
  animationEnabled: true,//切换是否有动画
  initialRouteName: 'Home', //进入App的首页面
  backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
  tabBarOptions: { //对于导航的设置
    indicatorStyle: {height: 0},  //android特有下划线的颜色1
    inactiveTintColor: '#a9a9a9', // 文字和图片默认颜色
    activeTintColor: '#a9a9a9',
    labelStyle: {     //文字的样式
      fontSize: 10,
      textAlign: 'center',
    },
    style: {    //对于导航的stytles
      backgroundColor: 'white', // TabBar 背景色
      borderTopColor: '#ebebeb',
      borderTopWidth: 1,
      height: Dimensions.get('window').height * 0.08,
      height: 50
    }
  }
});

export default createAppContainer(AppNavigator);