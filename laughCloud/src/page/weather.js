/** Day4 laughCloud for Android by DK */
import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Alert,
    StyleSheet,
    Modal,
    ActivityIndicator
} from 'react-native';

export default class WeatherScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: '天气',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={{width: 21,height: 21}} source={require('../assets/weather-light.png')}/>
                );
            }
            return (
                <Image style={{width: 21,height: 21}} source={require('../assets/weather-hui.png')}/>
            );
        },
    };

    constructor(props){
        super(props);
        this.state={
          city: '',
          location: '',
          display: false,
          isShow: false
        },
        this.weather = {}
    }

    render() {
        return (
            <View style={{flex: 1,justifyContent: 'center',alignContent: 'center',position: 'relative',borderBottomWidth: 1,borderColor: 'black'}}>
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
                <View style={{position:'absolute',right:0,left:0,top:100,bottom: 0,justifyContent:'center',flexDirection: 'row'}}>
                    <View>
                        <Image source={require('../assets/weatherBander.jpg')} style={{width: 280,height: 40,borderColor: 'transparent', borderWidth: 1,borderRadius: 10}}></Image>
                        <TextInput
                            ref="city"
                            style={{ width: 280,height: 40, borderColor: 'gray', borderWidth: 1,borderRadius: 10}}
                            placeholder='请输入想要查询天气的城市名称'
                            onChangeText={text => this.onChangeWeather(text)}
                            value = {this.state.city}
                            maxLength={8}
                        />
                    </View>
                </View>
                <View style={{position:'absolute',right:0,left:0,top:450,bottom: 0,justifyContent:'center',flexDirection: 'row'}}>
                    <Text style={{width: 100,height: 40,backgroundColor: 'rgb(0, 102, 204)',borderWidth: 1,borderRadius: 15,borderColor: 'rgb(0, 102, 204)',textAlign: 'center',lineHeight: 40,color: 'white',fontSize: 16}} onPress={this.lookFor.bind(this)}>查询</Text>
                </View>
                {this.state.display==true?(
                    <View style={{position:'absolute',right:0,left:0,top:200,bottom: 0,justifyContent:'center',flexDirection: 'row'}}>
                        <View>
                            <Text style={{fontSize: 18}}>{'当前选择城市:  '+this.state.location}</Text>
                            {this.weather.cond_code=='100'?(
                                <Image source={require('../assets/taiyang.png')} style={{width: 50,height: 50}}></Image>
                            ):(null)}
                            {this.weather.cond_code=='101'||this.weather.cond_code=='102'||this.weather.cond_code=='103'?(
                                <Image source={require('../assets/duoyun.png')} style={{width: 50,height: 50}}></Image>
                            ):(null)}
                            {this.weather.cond_code=='305'||this.weather.cond_code=='306'||this.weather.cond_code=='307'||this.weather.cond_code=='308'||this.weather.cond_code=='309'||this.weather.cond_code=='310'||this.weather.cond_code=='311'||this.weather.cond_code=='312'?(
                                <Image source={require('../assets/xiayu.png')} style={{width: 50,height: 50}}></Image>
                            ):(null)}
                            <Text style={{fontSize: 18}}>{'天气:  '+this.weather.cond_txt}</Text>
                            <Text style={{fontSize: 18}}>{'温度:  '+this.weather.tmp+'度'}</Text>
                            <Text style={{fontSize: 18}}>{'风向:  '+this.weather.wind_dir}</Text>
                            <Text style={{fontSize: 18}}>{'风速:  '+this.weather.wind_spd+'/小时'}</Text>
                        </View>
                    </View>
                ):(null)}
            </View>
        );
    }
    //获取城市名称
    onChangeWeather(text) {
        this.setState(() => {
        return {
            city: text
        };
        });
    }
    //查询天气
    lookFor() {
        this.setState({isShow: true})
        let url = 'https://free-api.heweather.net/s6/weather/now?location='+this.state.city+'&key=5c8f736045744c089c4c0571b4c4248b';
        let opts = {
            method: "POST"
        }
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({isShow: false})
            if(responseJson.HeWeather6[0].status == 'ok') {
                this.weather = responseJson.HeWeather6[0].now;
                this.setState(this.weather);
                this.state.location = responseJson.HeWeather6[0].basic.location;
                this.setState({location: this.state.location});
                this.state.display = true;
                this.setState({display: this.state.display});
            }else {
                Alert.alert('抱歉,未查询到天气,请注意输入正确的城市名称噢!')
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