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
//获取设备宽高
const {width, height} =  Dimensions.get('window');
const url = 'https://api.apiopen.top/getImages';

export default class ImageScreen extends React.Component {
    static navigationOptions = {
        tabBarLabel: '美图',
        tabBarIcon: ({focused}) => {
            if (focused) {
                return (
                    <Image style={{width: 21,height: 21}} source={require('../assets/image-light.png')}/>
                );
            }
            return (
                <Image style={{width: 21,height: 21}} source={require('../assets/image-hui.png')}/>
            );
        },
    };

    constructor(props){
        super(props);
        this.state={
          page: 1,
          display: false,
          isShow: false,
          index: 0,
          modalVisible: true
        },
        this.image = []
    }
    
    componentDidMount() {
        let formData = new FormData();
        formData.append("page", this.state.page.toString());
        formData.append("count", '10');
        let opts = {
            method: "POST",
            body: formData,
        }
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
            let abc = [];
            abc = responseJson.result;
            //解决安卓真机不显示http图片问题
            abc.forEach(element => {
                if(element.img.split(':')[0] == 'http') {
                    element.img = 'https:'+ element.img.split(':')[1];
                }
                this.image.push({url: element.img});
            });
            this.setState(
                this.image
            )
        })
        .catch((error) => {
            console.error(error);
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
                <View style={{flex: 1,width:null,padding: 15}}>
                    <Text style={{fontSize: 22}}>推荐美图</Text>
                    <FlatList
                    data={this.image}
                    numColumns={2}
                    renderItem={({item,index}) => this.renderItem(item,index)}
                    onEndReached={this.loadMore.bind(this)}
                    onEndReachedThreshold={0.2}
                    />
                </View>
            </View>
        );
    }
    //FlatList渲染组件
    renderItem(item,index) {
        return(
            <TouchableOpacity onPress={() => {this.props.navigation.navigate('ImageViewer', {images: this.image,index: index})}}>
                <View style={{flex: 1}}>
                    <Image source={{uri: item.url}} style={{width: width/2.2, height: 250,borderWidth: 1,borderRadius: 10,marginBottom: 5}}></Image>
                </View>
            </TouchableOpacity>
        )
    }
    //下拉加载更多
    loadMore() {
        this.setState({isShow: true})
        this.state.page++;
        this.setState({page: this.state.page});
        let formData = new FormData();
        formData.append("page", this.state.page.toString());
        formData.append("count", '10');
        let opts = {
        method: "POST",
        body: formData,
        }
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({isShow: false})
            let more1 = [];
            let more2 = [];
            more1 = responseJson.result;
            //解决安卓真机不显示http图片问题
            more1.forEach(element => {
                if(element.img.split(':')[0] == 'http') {
                    element.img = 'https:'+ element.img.split(':')[1];
                }
                more2.push({url: element.img});
            });
            this.image = this.image.concat(more2);
            this.setState(
            this.image
            )
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