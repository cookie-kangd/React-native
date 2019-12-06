/** Day4 laughCloud for Android by DK */
import React from 'react';
import {
    View,
    Image,
    Text,
    Dimensions,
    StatusBar,
    TextInput,
    Alert,
    StyleSheet,
    Modal,
    ActivityIndicator
} from 'react-native';
//获取设备宽高
const {width} =  Dimensions.get('window');
const url = 'https://api.apiopen.top/developerRegister';

export default class Registered extends React.Component {
  constructor(props){
    super(props);
    this.state={
      account: '',
      password: '',
      email: '',
      isShow: false
    }
  }
  render() {
    return (
      <View style={{flex: 1,position: 'relative',backgroundColor: 'rgb(244, 244, 244)'}}>
        <StatusBar barStyle='light-content' backgroundColor='rgba(0,0,0,0)' translucent={true} />
        {/* Loading组件 */}
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.isShow}
        >
        <View style={styles.container}>
          <View style={styles.load_box}>
            <ActivityIndicator animating={true} color={'#FFF'} size={'large'}
              style={styles.load_progress}/>
              <Text style={styles.load_text}>加载中...</Text>
          </View>
        </View>
        </Modal>
        <Image source={require('../assets/wave.gif')} style={{width: width,height: 100}}></Image>
        <View style={{position:'absolute',right:0,left:0,top:150,bottom:0,justifyContent:'center',flexDirection:'row'}}>
          <Image source={require('../assets/login.png')} style={{width: 50,height: 50}}></Image>
        </View>
        <View style={{position:'absolute',right:0,left:0,top:200,bottom:0,justifyContent:'center',flexDirection:'row'}}>
          <Text style={{fontSize: 19}}>用户注册</Text>
        </View>
        <View style={{position:'absolute',right:0,left:0,top:270,bottom:0,justifyContent:'center',flexDirection: 'row'}}>
          <View>
            <Text style={{fontSize: 18}}>账号:</Text>
            <TextInput
              style={{ width: 200,height: 40, borderColor: 'gray', borderBottomWidth: 1}}
              placeholder='新账号'
              onChangeText={text => this.onChangeAccount(text)}
            />
            <Text style={{fontSize: 18,paddingTop: 10}}>密码:</Text>
            <TextInput
              style={{ width: 200,height: 40, borderColor: 'gray', borderBottomWidth: 1}}
              placeholder='新密码'
              onChangeText={text => this.onChangePassword(text)}
            />
            <Text style={{fontSize: 18,paddingTop: 10}}>邮箱:</Text>
            <TextInput
              style={{ width: 200,height: 40, borderColor: 'gray', borderBottomWidth: 1}}
              placeholder='新邮箱'
              onChangeText={text => this.onChangeEmail(text)}
            />
          </View>
        </View>
        <View style={{position:'absolute',right:0,left:0,top:550,bottom: 100,justifyContent:'center',flexDirection: 'row'}}>
          <Text style={{width: 100,height: 40,backgroundColor: 'rgb(0, 102, 204)',borderWidth: 1,borderRadius: 15,borderColor: 'rgb(0, 102, 204)',textAlign: 'center',lineHeight: 40,color: 'white',fontSize: 16}} onPress={this.registered.bind(this)}>注册</Text>
        </View>
      </View>
    );
  }
  //获取账号
  onChangeAccount(text) {
    this.setState(() => {
      return {
          account: text
      };
    });
  }
  //获取密码
  onChangePassword(text) {
    this.setState(() => {
      return {
          password: text
      };
    });
  }
  //获取邮箱
  onChangeEmail(text) {
    this.setState(() => {
      return {
          email: text
      };
    });
  }
  //注册
  registered() {
    this.setState({isShow: true});
    let formData = new FormData();
    formData.append("name", this.state.account);
    formData.append("passwd", this.state.password);
    formData.append("email", this.state.email);
    let opts = {
      method: "POST",
      body: formData,
    }
    fetch(url, opts)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({isShow: false});
        console.log(responseJson.result.apikey);
        if(responseJson.code !== 200) {
          Alert.alert(responseJson.message)
        }else {
          Alert.alert(
            '提示',
            '恭喜您，注册成功！', //提示内容
            [
                {
                  text: '确定', onPress:  () =>  this.props.navigation.navigate('Login')
                }
            ] 
          )
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
}

const styles = StyleSheet.create({
  load_box: {
      width: 100,
      height: 100,
      backgroundColor: '#000',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10
  },
  load_progress: {
      width: 50,
      height: 50
  },
  //默认字体颜色
  load_text: {
      color: '#FFF',
  },
  container: {
      flex: 1,
      position: 'relative',
      top: 0,
      left: 0,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(178,178,178,0.8)',
  },
});