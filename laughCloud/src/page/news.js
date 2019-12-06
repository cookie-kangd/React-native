/** Day4 laughCloud for Android by DK */
import React from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    Dimensions,
    Linking,
    TouchableOpacity,
    Alert
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator  } from 'react-navigation-tabs';
//获取设备宽高
const {width, height} =  Dimensions.get('window');

class Games extends React.Component {
    static navigationOptions = {
        tabBarLabel: '游戏'
    };
    constructor(props){
        super(props);
        this.state={
          page: 0
        },
        this.news = []
    }
    componentDidMount() {
        let url = "https://pacaio.match.qq.com/irs/rcd?cid=56&ext=games&token=c786875b8e04da17b24ea5e332745e0f&num=20&expIds=20190106A13PFT%7C20190108A04MLS&page="+this.state.page;
        let opts = {
            method: "POST"
        }
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
            this.news = responseJson.data;
            this.setState(
                this.news
            )
        })
        .catch((error) => {
            console.error(error);
        });
    }
    render() {
      return (
        <View style={{flex: 1,width:null,padding: 15,borderBottomWidth: 1,borderColor: 'black'}}>
            <FlatList
              data={this.news}
              renderItem={({item}) => this.renderItem(item)}
              onEndReached={this.loadMore.bind(this)}
              onEndReachedThreshold={0.2}
            />
        </View>
      );
    }
    //FlatList渲染组件
    renderItem(item) {
        return(
            <TouchableOpacity onPress={() => {this.gotoDetail(item)}}>
                <View style={{borderWidth: 1,borderColor: '#000000',borderRadius: 5,marginTop: 5}}>
                    <Image source={{uri: item.bimg}} style={{width: null, height: 200,borderWidth: 1,borderColor: 'transparent',borderRadius: 5}}></Image>
                    <Text style={{padding: 3,paddingLeft: 0}}>{item.title}</Text>
                    <Text style={{padding: 3,paddingLeft: 0}}>{item.intro}</Text>
                    <Text style={{padding: 10,paddingLeft: 0,paddingTop: 5}}>{item.publish_time}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    //调用系统浏览器查看详情
    gotoDetail(item) {
        Alert.alert(
            '提示',
            '是否调用系统默认浏览器浏览新闻详情？', //提示内容
            [
                { text: '取消', onPress:  () =>  {}
                },
                {
                  text: '确定', onPress:  () =>  this.via(item.url)
                }
            ] 
          )
    }
    //Link
    via(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                Alert.alert('抱歉，访问新闻详情失败。');
            } else {
                return Linking.openURL(url);
            }
            }).catch(err => 
                console.error('An error occurred',url));
    }
    //下拉加载更多
    loadMore() {
        this.state.page++;
        this.setState({page: this.state.page});
        let url = "https://pacaio.match.qq.com/irs/rcd?cid=56&ext=games&token=c786875b8e04da17b24ea5e332745e0f&num=20&expIds=20190106A13PFT%7C20190108A04MLS&page="+this.state.page;
        let opts = {
            method: "POST"
        }
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
            let more = [];
            more = responseJson.data;
            this.news = this.news.concat(more);
            this.setState(
            this.news
            )
        })
        .catch((error) => {
            console.error(error);
        });
    }
  }
  
  class World extends React.Component {
    static navigationOptions = {
        tabBarLabel: '国际'
    };
    constructor(props){
        super(props);
        this.state={
          page: 0
        },
        this.news = []
    }
    componentDidMount() {
        let url = "https://pacaio.match.qq.com/irs/rcd?cid=56&ext=world&token=c786875b8e04da17b24ea5e332745e0f&num=20&expIds=20190106A13PFT%7C20190108A04MLS&page="+this.state.page;
        let opts = {
            method: "POST"
        }
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
            this.news = responseJson.data;
            this.setState(
                this.news
            )
        })
        .catch((error) => {
            console.error(error);
        });
    }
    render() {
      return (
        <View style={{flex: 1,width:null,padding: 15,borderBottomWidth: 1,borderColor: 'black'}}>
            <FlatList
              data={this.news}
              renderItem={({item}) => this.renderItem(item)}
              onEndReached={this.loadMore.bind(this)}
              onEndReachedThreshold={0.2}
            />
        </View>
      );
    }
    //FlatList渲染组件
    renderItem(item) {
        return(
            <TouchableOpacity onPress={() => {this.gotoDetail(item)}}>
                <View style={{borderWidth: 1,borderColor: '#000000',borderRadius: 5,marginTop: 5}}>
                    <Image source={{uri: item.bimg}} style={{width: null, height: 200,borderWidth: 1,borderColor: 'transparent',borderRadius: 5}}></Image>
                    <Text style={{padding: 3,paddingLeft: 0}}>{item.title}</Text>
                    <Text style={{padding: 3,paddingLeft: 0}}>{item.intro}</Text>
                    <Text style={{padding: 10,paddingLeft: 0,paddingTop: 5}}>{item.publish_time}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    //调用系统浏览器查看详情
    gotoDetail(item) {
        Alert.alert(
            '提示',
            '是否调用系统默认浏览器浏览新闻详情？', //提示内容
            [
                { text: '取消', onPress:  () =>  {}
                },
                {
                  text: '确定', onPress:  () =>  this.via(item.url)
                }
            ] 
          )
    }
    //Link
    via(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                Alert.alert('抱歉，访问新闻详情失败。');
            } else {
                return Linking.openURL(url);
            }
            }).catch(err => 
                console.error('An error occurred',url));
    }
    //下拉加载更多
    loadMore() {
        this.state.page++;
        this.setState({page: this.state.page});
        let url = "https://pacaio.match.qq.com/irs/rcd?cid=56&ext=world&token=c786875b8e04da17b24ea5e332745e0f&num=20&expIds=20190106A13PFT%7C20190108A04MLS&page="+this.state.page;
        let opts = {
            method: "POST"
        }
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
            let more = [];
            more = responseJson.data;
            this.news = this.news.concat(more);
            this.setState(
            this.news
            )
        })
        .catch((error) => {
            console.error(error);
        });
    }
  }

  class Tech extends React.Component {
    static navigationOptions = {
        tabBarLabel: '科技'
    };
    constructor(props){
        super(props);
        this.state={
          page: 0
        },
        this.news = []
    }
    componentDidMount() {
        let url = "https://pacaio.match.qq.com/irs/rcd?cid=56&ext=tech&token=c786875b8e04da17b24ea5e332745e0f&num=20&expIds=20190106A13PFT%7C20190108A04MLS&page="+this.state.page;
        let opts = {
            method: "POST"
        }
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
            this.news = responseJson.data;
            this.setState(
                this.news
            )
        })
        .catch((error) => {
            console.error(error);
        });
    }
    render() {
      return (
        <View style={{flex: 1,width:null,padding: 15,borderBottomWidth: 1,borderColor: 'black'}}>
            <FlatList
              data={this.news}
              renderItem={({item}) => this.renderItem(item)}
              onEndReached={this.loadMore.bind(this)}
              onEndReachedThreshold={0.2}
            />
        </View>
      );
    }
    //FlatList渲染组件
    renderItem(item) {
        return(
            <TouchableOpacity onPress={() => {this.gotoDetail(item)}}>
                <View style={{borderWidth: 1,borderColor: '#000000',borderRadius: 5,marginTop: 5}}>
                    <Image source={{uri: item.bimg}} style={{width: null, height: 200,borderWidth: 1,borderColor: 'transparent',borderRadius: 5}}></Image>
                    <Text style={{padding: 3,paddingLeft: 0}}>{item.title}</Text>
                    <Text style={{padding: 3,paddingLeft: 0}}>{item.intro}</Text>
                    <Text style={{padding: 10,paddingLeft: 0,paddingTop: 5}}>{item.publish_time}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    //调用系统浏览器查看详情
    gotoDetail(item) {
        Alert.alert(
            '提示',
            '是否调用系统默认浏览器浏览新闻详情？', //提示内容
            [
                { text: '取消', onPress:  () =>  {}
                },
                {
                  text: '确定', onPress:  () =>  this.via(item.url)
                }
            ] 
          )
    }
    //Link
    via(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                Alert.alert('抱歉，访问新闻详情失败。');
            } else {
                return Linking.openURL(url);
            }
            }).catch(err => 
                console.error('An error occurred',url));
    }
    //下拉加载更多
    loadMore() {
        this.state.page++;
        this.setState({page: this.state.page});
        let url = "https://pacaio.match.qq.com/irs/rcd?cid=56&ext=tech&token=c786875b8e04da17b24ea5e332745e0f&num=20&expIds=20190106A13PFT%7C20190108A04MLS&page="+this.state.page;
        let opts = {
            method: "POST"
        }
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
            let more = [];
            more = responseJson.data;
            this.news = this.news.concat(more);
            this.setState(
            this.news
            )
        })
        .catch((error) => {
            console.error(error);
        });
    }
  }

  class Fashion extends React.Component {
    static navigationOptions = {
        tabBarLabel: '时尚'
    };
    constructor(props){
        super(props);
        this.state={
          page: 0
        },
        this.news = []
    }
    componentDidMount() {
        let url = "https://pacaio.match.qq.com/irs/rcd?cid=56&ext=fashion&token=c786875b8e04da17b24ea5e332745e0f&num=20&expIds=20190106A13PFT%7C20190108A04MLS&page="+this.state.page;
        let opts = {
            method: "POST"
        }
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
            this.news = responseJson.data;
            this.setState(
                this.news
            )
        })
        .catch((error) => {
            console.error(error);
        });
    }
    render() {
      return (
        <View style={{flex: 1,width:null,padding: 15,borderBottomWidth: 1,borderColor: 'black'}}>
            <FlatList
              data={this.news}
              renderItem={({item}) => this.renderItem(item)}
              onEndReached={this.loadMore.bind(this)}
              onEndReachedThreshold={0.2}
            />
        </View>
      );
    }
    //FlatList渲染组件
    renderItem(item) {
        return(
            <TouchableOpacity onPress={() => {this.gotoDetail(item)}}>
                <View style={{borderWidth: 1,borderColor: '#000000',borderRadius: 5,marginTop: 5}}>
                    <Image source={{uri: item.bimg}} style={{width: null, height: 200,borderWidth: 1,borderColor: 'transparent',borderRadius: 5}}></Image>
                    <Text style={{padding: 3,paddingLeft: 0}}>{item.title}</Text>
                    <Text style={{padding: 3,paddingLeft: 0}}>{item.intro}</Text>
                    <Text style={{padding: 10,paddingLeft: 0,paddingTop: 5}}>{item.publish_time}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    //调用系统浏览器查看详情
    gotoDetail(item) {
        Alert.alert(
            '提示',
            '是否调用系统默认浏览器浏览新闻详情？', //提示内容
            [
                { text: '取消', onPress:  () =>  {}
                },
                {
                  text: '确定', onPress:  () =>  this.via(item.url)
                }
            ] 
          )
    }
    //Link
    via(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                Alert.alert('抱歉，访问新闻详情失败。');
            } else {
                return Linking.openURL(url);
            }
            }).catch(err => 
                console.error('An error occurred',url));
    }
    //下拉加载更多
    loadMore() {
        this.state.page++;
        this.setState({page: this.state.page});
        let url = "https://pacaio.match.qq.com/irs/rcd?cid=56&ext=fashion&token=c786875b8e04da17b24ea5e332745e0f&num=20&expIds=20190106A13PFT%7C20190108A04MLS&page="+this.state.page;
        let opts = {
            method: "POST"
        }
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
            let more = [];
            more = responseJson.data;
            this.news = this.news.concat(more);
            this.setState(
            this.news
            )
        })
        .catch((error) => {
            console.error(error);
        });
    }
  }

  class Finance extends React.Component {
    static navigationOptions = {
        tabBarLabel: '财经'
    };
    constructor(props){
        super(props);
        this.state={
          page: 0
        },
        this.news = []
    }
    componentDidMount() {
        let url = "https://pacaio.match.qq.com/irs/rcd?cid=56&ext=finance&token=c786875b8e04da17b24ea5e332745e0f&num=20&expIds=20190106A13PFT%7C20190108A04MLS&page="+this.state.page;
        let opts = {
            method: "POST"
        }
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
            this.news = responseJson.data;
            this.setState(
                this.news
            )
        })
        .catch((error) => {
            console.error(error);
        });
    }
    render() {
      return (
        <View style={{flex: 1,width:null,padding: 15,borderBottomWidth: 1,borderColor: 'black'}}>
            <FlatList
              data={this.news}
              renderItem={({item}) => this.renderItem(item)}
              onEndReached={this.loadMore.bind(this)}
              onEndReachedThreshold={0.2}
            />
        </View>
      );
    }
    //FlatList渲染组件
    renderItem(item) {
        return(
            <TouchableOpacity onPress={() => {this.gotoDetail(item)}}>
                <View style={{borderWidth: 1,borderColor: '#000000',borderRadius: 5,marginTop: 5}}>
                    <Image source={{uri: item.bimg}} style={{width: null, height: 200,borderWidth: 1,borderColor: 'transparent',borderRadius: 5}}></Image>
                    <Text style={{padding: 3,paddingLeft: 0}}>{item.title}</Text>
                    <Text style={{padding: 3,paddingLeft: 0}}>{item.intro}</Text>
                    <Text style={{padding: 10,paddingLeft: 0,paddingTop: 5}}>{item.publish_time}</Text>
                </View>
            </TouchableOpacity>
        )
    }
    //调用系统浏览器查看详情
    gotoDetail(item) {
        Alert.alert(
            '提示',
            '是否调用系统默认浏览器浏览新闻详情？', //提示内容
            [
                { text: '取消', onPress:  () =>  {}
                },
                {
                  text: '确定', onPress:  () =>  this.via(item.url)
                }
            ] 
          )
    }
    //Link
    via(url) {
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
                Alert.alert('抱歉，访问新闻详情失败。');
            } else {
                return Linking.openURL(url);
            }
            }).catch(err => 
                console.error('An error occurred',url));
    }
    //下拉加载更多
    loadMore() {
        this.state.page++;
        this.setState({page: this.state.page});
        let url = "https://pacaio.match.qq.com/irs/rcd?cid=56&ext=finance&token=c786875b8e04da17b24ea5e332745e0f&num=20&expIds=20190106A13PFT%7C20190108A04MLS&page="+this.state.page;
        let opts = {
            method: "POST"
        }
        fetch(url, opts)
        .then((response) => response.json())
        .then((responseJson) => {
            let more = [];
            more = responseJson.data;
            this.news = this.news.concat(more);
            this.setState(
            this.news
            )
        })
        .catch((error) => {
            console.error(error);
        });
    }
  }

  const TabNavigator = createMaterialTopTabNavigator({
    Games: Games,
    World: World,
    Tech: Tech,
    Fashion: Fashion,
    Finance: Finance,
  },{
    tabBarOptions: {
        initialRouteName: 'Games',
        //当前选中的tab bar的文本颜色和图标颜色
        activeTintColor: '#4BC1D2',
        //当前未选中的tab bar的文本颜色和图标颜色
        inactiveTintColor: '#000',
        //showLabel - 是否显示tab bar的文本，默认是true
        showLabel: true,
        //是否将文本转换为大小，默认是true
        upperCaseLabel: false,
        //material design中的波纹颜色(仅支持Android >= 5.0)
        pressColor: '#788493',
        //按下tab bar时的不透明度(仅支持iOS和Android < 5.0).
        pressOpacity: 0.8,
        //tab bar的样式
        style: {
            backgroundColor: '#fff',
            paddingBottom: 1,
            borderTopWidth: 0.2,
            paddingTop:10,
            borderTopColor: '#ccc',
        },
        //tab bar的文本样式
        labelStyle: {
            fontSize: 11,
            margin: 1
        },
        //tab 页指示符的样式 (tab页下面的一条线).
        indicatorStyle: {height: 0},
        },
        //tab bar的位置, 可选值： 'top' or 'bottom'
        tabBarPosition: 'top',
        //是否允许滑动切换tab页
        swipeEnabled: true,
        //是否在切换tab页时使用动画
        animationEnabled: false,
        //是否懒加载
        lazy: true,
        //返回按钮是否会导致tab切换到初始tab页？ 如果是，则设置为initialRoute，否则为none。 缺省为initialRoute。
        backBehavior: 'none',
  });
  
  export default createAppContainer(TabNavigator);