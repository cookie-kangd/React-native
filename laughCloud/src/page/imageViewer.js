import React from 'react';
import {
    View,
    Modal,
    Dimensions,
    ActivityIndicator,
    PermissionsAndroid,
    Alert
} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';
import CameraRoll from "@react-native-community/cameraroll";
import RNFS from "react-native-fs";
const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export default class ImageZoomViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            animating: true,
            images: [],
            index: Number
        };
        this.renderLoad = this.renderLoad.bind(this);
        this.savePhoto = this.savePhoto.bind(this);
    }
    componentWillMount() {
        this.state.images = this.props.navigation.state.params.images;
        this.state.index = this.props.navigation.state.params.index;
    }
    //申请权限
    async requestReadPermission(url) {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    //第一次请求拒绝后提示用户你为什么要这个权限
                    'title': '我要读写权限',
                    'message': '没权限不能保存图片，同意就好了'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("你已获取了读写权限")
                this.savePhoto(url);
            } else {
                Alert.alert("获取读写权限失败,将无法使用保存图片功能")
            }
        } catch (err) {
            Alert.alert(err.toString())
        }
    }
    //图片未加载适合Loading
    renderLoad() {
        return (
            <View style={{ marginTop: (screenHeight / 2) - 20 }}>
                <ActivityIndicator animating={this.state.animating} size={"large"} />
            </View>
        )
    }
    //保存图片
    savePhoto(url) {
        var that = this;
        const storeLocation = `${RNFS.DocumentDirectoryPath}`;
        let pathName = new Date().getTime() + ".png";
        let downloadDest = `${storeLocation}/${pathName}`;
        const ret = RNFS.downloadFile({
            fromUrl: url,
            toFile: downloadDest
        })

        ret.promise.then(res => {
            if(res && res.statusCode === 200) {
                var promise = CameraRoll.saveToCameraRoll("file://"+ downloadDest);
                promise.then(function (result) {
                    Alert.alert("已保存到系统相册")
                 }).catch(function (error) {
                    Alert.alert('保存失败！\n' + error);
                 });
            }
        })    
    }

    render() {
        return (
            <View style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0 }}>
                <Modal
                    animationType={"slide"}
                    transparent={true}
                    visible={this.props.modalVisible}
                >
                    <ImageViewer
                        index={this.state.index}
                        imageUrls={this.state.images} // 照片路径
                        enableImageZoom={true} // 是否开启手势缩放
                        saveToLocalByLongPress={true} //是否开启长按保存
                        loadingRender={this.renderLoad}
                        enableSwipeDown={false}
                        menuContext={{ "saveToLocal": "保存图片", "cancel": "取消" }}
                        onClick={() => { // 图片单击事件
                            this.props.navigation.navigate('Index')
                        }}
                        onSave={(url) => { this.requestReadPermission(url) }}
                    />
                </Modal>
            </View>
        );
    }
}