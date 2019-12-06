/** Day4 laughCloud for Android by DK */
import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    StyleSheet,
    Modal,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import VideoPlayer from 'react-native-video-controls';
//获取设备宽高
const {width, height} =  Dimensions.get('window');
const url = 'https://api.apiopen.top/todayVideo';

export default class LaughScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: '段子',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={{width: 21,height: 21}} source={require('../assets/laugh-light.png')}/>
                );
            }
            return (
                <Image style={{width: 21,height: 21}} source={require('../assets/laugh-hui.png')}/>
            );
        },
    };

    constructor(props){
        super(props);
        this.state={
            isShow: false,
            paused: true,
            playUrl: ''
        },
        this.video = []
    }
    
    componentDidMount() {
        this.setState({isShow: true});
        let opts = {
            method: "POST",
        }
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
            responseJson.result.shift();
            let abc = [];
            responseJson.result.forEach(element => {
                if(element.data.content) {
                    if(element.data.content.data.playUrl) {
                        abc.push(element.data.content.data)
                    }
                }
            });
            this.video = abc;
            //解决安卓真机不显示http视频问题
            this.video.forEach(element => {
                if(element.playUrl.split(':')[0] == 'http') {
                    element.playUrl = 'https:'+ element.playUrl.split(':')[1];
                }
            });
            this.setState(
                this.video
            )
            this.setState({isShow: false});
        })
        .catch((error) => {
            console.error(error);
            this.setState({isShow: false});
        });
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
                <View style={{flex: 1,width:null,padding: 15}}>
                    <Text style={{fontSize: 22}}>每日推荐视频</Text>
                    <FlatList
                    data={this.video}
                    renderItem={({item}) => this.renderItem(item)}
                    />
                </View>
            </View>
        );
    }
    renderItem(item) {
        return (
            <View style={{flex: 1,marginTop: 15}}>
                <Text>{item.description}</Text>
                <VideoPlayer
                    source={{ uri: item.playUrl }}
                    navigator={ this.props.navigator }
                    disableBack={true}
                    paused={this.state.paused}
                    onEnd={this.endVideo.bind(this)}
                /> 
            </View>
        )
    }
    //视频播放结束自动暂停
    endVideo() {
        this.setState({paused: true})
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