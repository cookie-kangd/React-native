/** Day4 laughCloud for Android by DK */
import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    AsyncStorage
} from 'react-native';

export default class MineScreen extends Component {
    static navigationOptions = {
        tabBarLabel: '我的',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={{width: 21,height: 21}} source={require('../assets/mine-light.png')}/>
                );
            }
            return (
                <Image style={{width: 21,height: 21}} source={require('../assets/mine-hui.png')}/>
            );
        },
    };

    constructor(props){
        super(props);
        this.state={
          account: ''
        }
    }

    componentWillMount = async (key) => {
        this.state.account = await AsyncStorage.getItem('account');
        this.setState({account: this.state.account});
    }

    render() {
        return (
            <View style={{flex: 1,position: 'relative',borderBottomWidth: 1,borderColor: 'black'}}>
                <View style={{position:'absolute',right:0,left:0,top:50,bottom:0,justifyContent:'center',flexDirection: 'row'}}>
                    <View>
                        <Image source={require('../assets/login.png')} style={{width: 50,height: 50}}></Image>
                        <Text>{this.state.account}</Text>
                    </View>
                </View>
                <View style={{position:'absolute',right:0,left:0,top:200,bottom:0,justifyContent:'center',flexDirection: 'row'}}>
                    <View style={{width: 200}}>
                        <Text style={{fontSize: 20,textAlign: 'center',marginBottom: 10}}>Made by DK</Text>
                        <Text>此项目是自己学习react-native的时候花费时间做的，其中运用了很多RN项目基础必备的东西，比如路由navigation,缓存AsyncStorage等等，适合新手小伙伴们借鉴学习，如果有小伙伴觉得还不错有帮助的话，记得给我的项目点个star噢!</Text>
                    </View>
                </View>
                <View style={{position:'absolute',right:0,left:0,top:450,bottom: 0,justifyContent:'center',flexDirection: 'row'}}>
                    <Text style={{width: 100,height: 40,backgroundColor: 'rgb(0, 102, 204)',borderWidth: 1,borderRadius: 15,borderColor: 'rgb(0, 102, 204)',textAlign: 'center',lineHeight: 40,color: 'white',fontSize: 16}} onPress={this.againLogin.bind(this)}>注销</Text>
                </View>
            </View>
        );
    }
    //注销
    againLogin() {
        this.props.navigation.navigate('Login')
    }
}