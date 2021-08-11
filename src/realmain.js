import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import {
    Alert,
    View,
    BackHandler,
    SafeAreaView,
    ScrollView,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    Image,
    Modal,
    PermissionsAndroid
} from 'react-native';

import AutoHeightImage from 'react-native-auto-height-image';

import LinearGradient from 'react-native-linear-gradient';

import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useNavigation } from '@react-navigation/native';
import { buypname, darkmode, pid, plist, repcategory, repexp, repexpDate, repname, repNo } from '../atoms/atom';
import { useRecoilState } from 'recoil';


const chwidth = Dimensions.get('window').width

var now = new Date();

var year = now.getFullYear();   // 연도
var month = now.getMonth() + 1;   // 월    
var day = now.getDate();        // 일

var endDate = new Date(year, month, day);



const logo = require('../img/light/logo.png');
const tuto = require('../img/light/tuto.png');
const text1 = require('../img/light/menu1_2.png')
const img1 = require('../img/light/menu1.png')

const dark = require('../img/light/menu2_1.png')
const menu = require('../img/light/menu3.png')
const plus = require('../img/light/plus.png')

const info1 = require('../img/light/info1.png');
const info2 = require('../img/light/info2.png');
const info3 = require('../img/light/info3.png');

const close = require('../img/light/close.png');


const edit = require('../img/light/edit.png');

const category = require('../img/light/category.png');
const date_icon = require('../img/light/date_icon.png');
const cart_icon = require('../img/light/cart_icon.png');
const review_icon = require('../img/light/review_icon.png');

const d_category = require('../img/dark/d_category.png');
const d_date_icon = require('../img/dark/d_date_icon.png');
const d_cart_icon = require('../img/dark/d_cart.png');
const d_review_icon = require('../img/dark/d_review.png');
const d_del = require('../img/dark/d_del.png');

const d_menu2_2 = require('../img/dark/d_menu2_2.png');



const icon3 = require('../img/light/icon3.png');


const Realmain = () => {

    const navigation = useNavigation()

    const [version, setversion] = useState(true)
    const [modalView, setModalView] = useState(false)

    // 날씨 관련 변수들
    const [curHumi, setcurHumi] = useState(0)

    const [dayMaxTemp, setdayMaxTemp] = useState(0)
    const [dayMinTemp, setdayMinTemp] = useState(0)

    const [dayUv, setdayUv] = useState(0)
    const [uvString, setUvString] = useState('')

    const [pm10, setPm10] = useState(0)
    const [pm25, setPm25] = useState(0)

    const [totalAir, setTotalAir] = useState('측정중')

    const [description, setdescription] = useState('')
    // 

    const [atid, setAtid] = useRecoilState(pid); //사용자 아이디

    const [atlist, setatlist] = useRecoilState(plist)

    const [atdarkmode, setAtdarkmode] = useRecoilState(darkmode);

    const storeDark = async (value) => {
        try {
            await AsyncStorage.setItem('@is_dark', value)
        } catch (e) {
            console.log(e)
        }
    }

    function darkbtn() {
        if (atdarkmode == 'light') {
            setAtdarkmode('dark')
            storeDark('dark')

            console.log('다크')

        } else {
            setAtdarkmode('light')
            storeDark('light')

            console.log('라이트')
        }
    }



    const backAction = () => {
        Alert.alert("앱 종료", "앱을 종료하시겠습니까?", [
            {
                text: "취소",
                onPress: () => null,
                style: "cancel"
            },
            { text: "확인", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);


    async function requestPermission() {
        try {
            if (Platform.OS === "ios") {
                return await Geolocation.requestAuthorization("always");
            } // 안드로이드 위치 정보 수집 권한 요청 
            if (Platform.OS === "android") {
                return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,);
            }
        } catch (e) {
            console.log(e);
        }
    }


    useEffect(() => {
        requestPermission().then(result => {
            console.log({ result });
            if (result === "granted") {
                Geolocation.getCurrentPosition(
                    (position) => {

                        //오늘 최고 최저 온도 받아오기 및 자외선 지수
                        axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + Math.round(position.coords.latitude * 100) / 100 + '&lon=' + Math.round(position.coords.longitude * 100) / 100 + '&exclude=current&appid=4c0e7c89ac35917a4adadc0c95b8392c',
                        ).then(function (response) {
                            // console.log(response.data.daily[0])
                            // console.log(response.data.daily[0].weather[0].icon)
                            setdayUv(response.data.daily[0].uvi)
                            setcurHumi(response.data.daily[0].humidity)
                            setdayMaxTemp(response.data.daily[0].temp.max - 273.15)
                            setdayMinTemp(response.data.daily[0].temp.min - 273.15)
                            // setdescription(response.data.daily[0].weather[0].icon)

                            if (response.data.daily[0].uvi < 2) {
                                setUvString('낮음')
                            } else if (response.data.daily[0].uvi >= 2 && response.data.daily[0].uvi < 5) {
                                setUvString('보통')
                            } else if (response.data.daily[0].uvi >= 5 && response.data.daily[0].uvi <= 7) {
                                setUvString('높음')
                            } else if (response.data.daily[0].uvi > 7) {
                                setUvString('매우 높음')
                            } else {
                                setUvString('서버 오류')
                            }

                            switch (response.data.daily[0].weather[0].icon) {
                                case '01d':
                                case '01n':
                                    setdescription('맑음')
                                    break;

                                case '02d':
                                case '02n':
                                    setdescription('구름 조금')
                                    break;

                                case '03d':
                                case '03n':
                                    setdescription('구름 많음')
                                    break;

                                case '04d':
                                case '04n':
                                    setdescription('구름 많음')
                                    break;

                                case '09d':
                                case '09n':
                                    setdescription('소나기')
                                    break;

                                case '10d':
                                case '10n':
                                    setdescription('비')
                                    break;

                                case '11d':
                                case '11n':
                                    setdescription('뇌우')
                                    break;

                                case '13d':
                                case '13n':
                                    setdescription('눈')
                                    break;

                                case '50d':
                                case '50n':
                                    setdescription('안개')
                                    break;

                            }

                        }).catch(function (error) {
                            // handle error
                            console.log(error);
                        }).then(function () {
                            // always executed
                        });

                        //미세먼지 및 종합대기상황
                        axios.get('http://api.openweathermap.org/data/2.5/air_pollution?lat=' + Math.round(position.coords.latitude * 100) / 100 + '&lon=' + Math.round(position.coords.longitude * 100) / 100 + '&appid=4c0e7c89ac35917a4adadc0c95b8392c',
                        ).then(function (response) {
                            console.log(response.data.list[0].components.pm10)
                            console.log(response.data.list[0].components.pm2_5)
                            console.log(response.data.list[0].main.aqi)

                            setPm10(response.data.list[0].components.pm10)
                            setPm25(response.data.list[0].components.pm2_5)


                            switch (response.data.list[0].main.aqi) {
                                case 1:
                                    setTotalAir('매우 좋음')
                                    break;
                                case 2:
                                    setTotalAir('좋음')
                                    break;
                                case 3:
                                    setTotalAir('보통')
                                    break;
                                case 4:
                                    setTotalAir('나쁨')
                                    break;
                                case 5:
                                    setTotalAir('매우 나쁨')
                                    break;
                                default:
                                    setTotalAir('서버 오류')
                                    break;
                            }

                        }).catch(function (error) {
                            // handle error
                            console.log(error);
                        }).then(function () {
                            // always executed
                        });


                    },
                    (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );

            }
        });

    }, [])


    //화면 감지 될때마다 제품 목록 받아오기
    const unsubscribe = navigation.addListener('focus', () => {
        getproduct()
    });
    useEffect(() => {
        return () => unsubscribe();
    });

    //제품 불러오기
    function getproduct() {
        axios.get('http://ip1004.hostingbox.co.kr/', {
            params: {
                type: 'load_product',
                id: atid,
            }
        }).then(async (res) => {

            if (res.data == 'empty') {
                setatlist([])
                Alert.alert('화장품을 등록해보세요!')
            } else {
                setatlist(res.data)
            }

        })

    }

    //제품 삭제
    function delprod(no) {
        axios.get('http://ip1004.hostingbox.co.kr/', {
            params: {
                type: 'del_product',
                no: no,
            }
        }).then(async (res) => {

            if (res.data == 'del_suc') {
                Alert.alert('삭제완료!')
                setModalView(false)
                getproduct()
            } else {
                Alert.alert('서버오류', '잠시후 다시 시도해주세요.')
                setModalView(false)
                getproduct()
            }

        })
    }

    //로컬 알림 함수
    const LocalNotification = () => {
        PushNotification.localNotificationSchedule({
            channelId: 'com.notify',
            title: '테스트',
            message: '안녕하세요! 테스트 알림입니다!', // (required)
            date: new Date(Date.now() + 1 * 1000),
            playSound: true, // (optional) default: true
            soundName: 'default',
        });
    };

    const [reatnno, setreAtno] = useRecoilState(repNo)
    const [reatname, setreAtname] = useRecoilState(repname)
    const [reatcategory, setreAtcategory] = useRecoilState(repcategory)
    const [reatexp, setreAtexp] = useRecoilState(repexp)
    const [reatexpDate, setreAtexpDate] = useRecoilState(repexpDate)

    function reproduct_f() {

        setreAtno(modalno)
        setreAtname(modalname)
        setreAtcategory(modalcategory)
        setreAtexp(modaldate)

        setTimeout(() => {

            navigation.navigate('제품수정')

        }, 200);
    }



    //모달용 usestate
    const [modalno, setModalno] = useState('')
    const [modalname, setModalname] = useState('')
    const [modalcategory, setModalcategory] = useState('')
    const [modaldate, setModaldate] = useState('')
    const [modalexpLeft, setModalexpLeft] = useState('')

    const [atbuyname, setBuyatname] = useRecoilState(buypname)   //웹뷰 제품 이름

    const TextItem = (prop) => {

        var exp = prop.expiration.split('-')

        var stDate = new Date(exp[0], exp[1], exp[2]);

        var btMs = stDate.getTime() - endDate.getTime();
        var btDay = btMs / (1000 * 60 * 60 * 24);

        function clickpp() {
            setModalno(prop.no)
            setModalname(prop.name)
            setModalcategory(prop.category)
            setModaldate(prop.expiration)
            setModalexpLeft(btDay)

            setBuyatname(prop.name)

            setModalView(true)
            console.log(modalno)

        }

        return (
            <TouchableWithoutFeedback onPress={() => { console.log('클릭'), clickpp() }}>
                <View style={{ alignItems: 'center', }}>
                    <View style={{ width: chwidth - 100, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                        <Text style={{ width: chwidth - 190, color: atdarkmode === 'light' ? 'black' : 'white' }} numberOfLines={1}>{prop.name}</Text>
                        <Text style={{ color: 'rgb(13,120,159)' }}>{btDay}일 남음</Text>
                    </View>
                    <View style={{ width: chwidth - 60, borderWidth: 1, borderColor: atdarkmode === 'light' ? 'rgb(233,233,233)' : 'rgb(47,47,47)' }}></View>
                </View>
            </TouchableWithoutFeedback >
        )
    }

    const TextuPush = () => {
        var list = [];

        for (var i = 0; i < atlist.length; i++) {
            if (atlist[i].location == 'u') {
                list.push(<TextItem
                    key={i}
                    no={atlist[i].no}
                    name={atlist[i].name}
                    expiration={atlist[i].expiration}
                    alert_config={atlist[i].alert_config}
                    alert_date={atlist[i].alert_date}

                    category={atlist[i].category}
                    img={atlist[i].img}>
                </TextItem>)
            }
        }

        return list
    }

    const TextdPush = () => {
        var list = [];

        for (var i = 0; i < atlist.length; i++) {
            if (atlist[i].location == 'd') {
                list.push(<TextItem
                    key={i}
                    no={atlist[i].no}
                    name={atlist[i].name}
                    expiration={atlist[i].expiration}
                    alert_config={atlist[i].alert_config}
                    alert_date={atlist[i].alert_date}

                    category={atlist[i].category}
                    img={atlist[i].img}>
                </TextItem>)
            }
        }

        return list
    }

    const ImageItem = (prop) => {
        var exp = prop.expiration.split('-')

        var stDate = new Date(exp[0], exp[1], exp[2]);

        var btMs = stDate.getTime() - endDate.getTime();
        var btDay = btMs / (1000 * 60 * 60 * 24);

        function clickpp() {
            setModalno(prop.no)
            setModalname(prop.name)
            setModalcategory(prop.category)
            setModaldate(prop.expiration)
            setModalexpLeft(btDay)

            setBuyatname(prop.name)

            setModalView(true)

            console.log(modalno)
        }
        return (
            <TouchableWithoutFeedback onPress={() => { clickpp() }}>
                <View style={{ height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ width: chwidth / 3.3, height: '80%', borderRadius: 200, backgroundColor: 'rgb(204,204,204)', marginLeft: 8, marginRight: 8, elevation: 10, }}>
                        <Image source={{ uri: 'http://ip1004.hostingbox.co.kr' + prop.img }} style={{ width: chwidth / 3.3, height: '100%', borderRadius: 200, }} ></Image>
                    </View>
                    <View style={{ borderRadius: 100, backgroundColor: 'blue', marginTop: -20, elevation: 10 }}>
                        <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={['rgba(36,175,248,1)', 'rgba(30,45,245,0)']} style={{ borderRadius: 100 }}>
                            <Text style={{ color: 'white', margin: 8, fontSize: 15, fontWeight: 'bold' }}>{btDay}일 남음</Text>
                        </LinearGradient>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    const ImageuPush = () => {
        var list = [];

        for (var i = 0; i < atlist.length; i++) {
            if (atlist[i].location == 'u') {
                list.push(<ImageItem
                    key={i}
                    no={atlist[i].no}
                    name={atlist[i].name}
                    expiration={atlist[i].expiration}
                    alert_config={atlist[i].alert_config}
                    alert_date={atlist[i].alert_date}

                    category={atlist[i].category}
                    img={atlist[i].img}>

                </ImageItem>)
            }
        }

        return list
    }


    const ImagedPush = () => {
        var list = [];
        for (var i = 0; i < atlist.length; i++) {
            if (atlist[i].location == 'd') {
                list.push(<ImageItem
                    key={i}
                    no={atlist[i].no}
                    name={atlist[i].name}
                    expiration={atlist[i].expiration}
                    alert_config={atlist[i].alert_config}
                    alert_date={atlist[i].alert_date}

                    category={atlist[i].category}
                    img={atlist[i].img}>

                </ImageItem>)
            }
        }

        return list
    }

    return (
        <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: atdarkmode === 'light' ? 'white' : 'black' }}>

            {/* 헤더 시작 */}
            <View style={{ width: '100%', justifyContent: 'center', marginBottom: 10, elevation: 15, backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(34,34,34)' }}>
                <View style={{ width: chwidth - 40, marginLeft: 20, marginTop: 20, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <AutoHeightImage source={logo} width={140}></AutoHeightImage>
                    <AutoHeightImage source={tuto} width={35}></AutoHeightImage>
                </View>
            </View>
            {/* 헤더 끝 */}

            {/* 본문 시작 */}
            <View style={{ flex: 1, backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(49,49,49)' }}>

                {version ?
                    <View style={{ flex: 1 }}>

                        <View style={{ width: chwidth, height: '49%', backgroundColor: atdarkmode === 'light' ? 'white' : 'black' }}>
                            <ScrollView style={{}} horizontal showsHorizontalScrollIndicator={false} pagingEnabled={true}>
                                <ImageuPush></ImageuPush>
                            </ScrollView>
                        </View>

                        <View style={{ width: chwidth, height: '2%', backgroundColor: atdarkmode === 'light' ? 'rgb(236,236,236)' : 'rgb(34,34,34)' }}></View>


                        <View style={{ width: chwidth, height: '49%', backgroundColor: atdarkmode === 'light' ? 'white' : 'black' }}>
                            <ScrollView style={{}} horizontal showsHorizontalScrollIndicator={false}>
                                <ImagedPush></ImagedPush>
                            </ScrollView>
                        </View>

                    </View>

                    :

                    <View style={{ flex: 1, backgroundColor: atdarkmode === 'light' ? 'white' : 'black', alignItems: 'center', justifyContent: 'space-around' }}>
                        <View style={{ width: chwidth - 60, height: '45%', borderRadius: 18, elevation: 6, margin: 10 }}>
                            <View style={{ backgroundColor: atdarkmode === 'light' ? 'black' : 'rgb(81,81,81)', borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
                                <Text style={{ color: '#ffffff', margin: 10, marginLeft: 20, fontSize: 17, fontWeight: 'bold' }}>위 칸 화장품 목록</Text>
                            </View>

                            <ScrollView style={{ backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(39,39,39)', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }} showsVerticalScrollIndicator={false}>

                                <TextuPush></TextuPush>


                            </ScrollView>

                        </View>


                        <View style={{ width: chwidth - 60, height: '45%', borderRadius: 18, elevation: 6, margin: 10 }}>
                            <View style={{ backgroundColor: atdarkmode === 'light' ? 'black' : 'rgb(81,81,81)', borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
                                <Text style={{ color: 'white', margin: 10, marginLeft: 20, fontSize: 17, fontWeight: 'bold' }}>아래 칸 화장품 목록</Text>
                            </View>

                            <ScrollView style={{ backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(39,39,39)', borderBottomLeftRadius: 18, borderBottomRightRadius: 18 }} showsVerticalScrollIndicator={false}>

                                <TextdPush></TextdPush>


                            </ScrollView>

                        </View>

                    </View>

                }


            </View>
            {/* 본문 끝 */}

            {/* 날씨 정보 시작 */}
            <View style={{ flexDirection: 'row', marginBottom: -40 }}>

                {
                    atdarkmode === 'light' ?
                        <View style={{ width: chwidth / 4, height: 150 }}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.7 }} colors={['rgba(192,192,192,0)', 'rgba(192,192,192,1)']} style={{ flex: 1, alignItems: 'center' }}>
                                <View style={{ height: 100, justifyContent: 'space-around', alignItems: 'center', marginTop: 5 }}>
                                    <Text style={{ color: atdarkmode === 'light' ? 'black' : 'white' }}>자외선</Text>
                                    <AutoHeightImage source={info1} width={chwidth / 9}></AutoHeightImage>
                                    <Text style={{ fontSize: 12, color: atdarkmode === 'light' ? 'rgb(49,49,49)' : 'white' }}>{Math.round(dayUv)} {uvString}</Text>
                                </View>
                            </LinearGradient>
                        </View>
                        :
                        <View style={{ width: chwidth / 4, height: 150 }}>
                            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgb(39,39,40)' }}>
                                <View style={{ height: 100, justifyContent: 'space-around', alignItems: 'center', marginTop: 5 }}>
                                    <Text style={{ color: atdarkmode === 'light' ? 'black' : 'white' }}>자외선</Text>
                                    <AutoHeightImage source={info1} width={chwidth / 9}></AutoHeightImage>
                                    <Text style={{ fontSize: 12, color: atdarkmode === 'light' ? 'rgb(49,49,49)' : 'white' }}>{Math.round(dayUv)} {uvString}</Text>
                                </View>
                            </View>
                        </View>

                }

                <View style={{ width: chwidth / 4, height: 150, backgroundColor: 'rgba(242,242,242,0)', alignItems: 'center' }}>
                    <View style={{ height: 100, justifyContent: 'space-around', alignItems: 'center', marginTop: 5 }}>
                        <Text style={{ color: atdarkmode === 'light' ? 'black' : 'white' }}>습도</Text>
                        <AutoHeightImage source={info2} width={chwidth / 11}></AutoHeightImage>
                        <Text style={{ fontSize: 12, color: atdarkmode === 'light' ? 'rgb(49,49,49)' : 'white' }}>{curHumi}%</Text>
                    </View>
                </View>

                {
                    atdarkmode === 'light' ?
                        <View style={{ width: chwidth / 4, height: 150 }}>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.7 }} colors={['rgba(192,192,192,0)', 'rgba(192,192,192,1)']} style={{ flex: 1, alignItems: 'center' }}>
                                <View style={{ height: 100, justifyContent: 'space-around', alignItems: 'center', marginTop: 5 }}>
                                    <Text style={{ color: atdarkmode === 'light' ? 'black' : 'white' }}>미세먼지</Text>
                                    <AutoHeightImage source={info3} width={chwidth / 10}></AutoHeightImage>
                                    <Text style={{ fontSize: 12, color: atdarkmode === 'light' ? 'rgb(49,49,49)' : 'white', letterSpacing: -0.8 }}>{Math.round(pm10)}㎍/m³ {totalAir}</Text>
                                </View>
                            </LinearGradient>
                        </View>
                        :
                        <View style={{ width: chwidth / 4, height: 150 }}>
                            <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'rgb(39,39,40)' }}>
                                <View style={{ height: 100, justifyContent: 'space-around', alignItems: 'center', marginTop: 5 }}>
                                    <Text style={{ color: atdarkmode === 'light' ? 'black' : 'white' }}>미세먼지</Text>
                                    <AutoHeightImage source={info3} width={chwidth / 10}></AutoHeightImage>
                                    <Text style={{ fontSize: 12, color: atdarkmode === 'light' ? 'rgb(49,49,49)' : 'white', letterSpacing: -0.8 }}>{Math.round(pm10)}㎍/m³ {totalAir}</Text>
                                </View>
                            </View>
                        </View>
                }

                <View style={{ width: chwidth / 4, height: 150, backgroundColor: 'rgba(242,242,242,0)', alignItems: 'center' }}>
                    <View style={{ height: 100, justifyContent: 'space-around', alignItems: 'center', marginTop: 5 }}>
                        <Text style={{ color: atdarkmode === 'light' ? 'black' : 'white' }}>오늘의 날씨</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'skyblue', fontSize: 13 }}>{Math.round(dayMinTemp)}°</Text>
                            <Text style={{ color: atdarkmode === 'light' ? 'black' : 'white' }}>/</Text>
                            <Text style={{ color: 'red', fontSize: 13 }}>{Math.round(dayMaxTemp)}°</Text>
                        </View>
                        <Text style={{ fontSize: 12, color: atdarkmode === 'light' ? 'rgb(49,49,49)' : 'white' }}>{description}</Text>

                    </View>
                </View>

            </View>
            {/* 날씨 정보 끝 */}



            {/* 푸터 시작 */}
            <View style={{ width: '100%', height: 100, borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: atdarkmode === 'light' ? 'rgb(9,24,255)' : 'rgb(28,37,178)' }}>
                <View style={{ width: chwidth - 20, height: '100%', marginLeft: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '75%' }}>
                        <TouchableWithoutFeedback onPress={() => {
                            if (version)
                                setversion(false);
                            else
                                setversion(true);
                        }}>
                            {version ?

                                <View style={{ alignItems: 'center' }}>
                                    <AutoHeightImage source={text1} width={chwidth / 15}></AutoHeightImage>
                                    <Text style={{ color: 'white', marginTop: 10, fontSize: 12 }}>텍스트 버전</Text>
                                </View>

                                :

                                <View style={{ alignItems: 'center' }}>
                                    <AutoHeightImage source={img1} width={chwidth / 15}></AutoHeightImage>
                                    <Text style={{ color: 'white', marginTop: 10, fontSize: 12 }}>이미지 버전</Text>
                                </View>

                            }
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => { darkbtn() }}>
                            <View style={{ alignItems: 'center' }}>
                                <AutoHeightImage source={atdarkmode === 'light' ? dark : d_menu2_2} width={chwidth / 15}></AutoHeightImage>
                                <Text style={{ color: 'white', marginTop: 10, fontSize: 12 }}>{atdarkmode === 'light' ? '다크 모드' : '라이트 모드'}</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={{ alignItems: 'center' }}>
                                <AutoHeightImage source={menu} width={chwidth / 15}></AutoHeightImage>
                                <Text style={{ color: 'white', marginTop: 10, fontSize: 12 }}>환경설정</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <TouchableWithoutFeedback onPress={() => { navigation.navigate('바코드체크') }}>
                        <View style={{ alignItems: 'center' }}>
                            <AutoHeightImage source={plus} width={chwidth / 3.5}></AutoHeightImage>
                        </View>
                    </TouchableWithoutFeedback>

                </View>

            </View>
            {/* 푸터 끝 */}

            {/* 화장품 상세보기 모달 시작 */}
            <Modal visible={modalView} animationType={'slide'} transparent={true}>
                <TouchableWithoutFeedback onPress={() => { console.log('클릭'), setModalView(false) }}>
                    <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(64, 64, 64,0.5)', position: 'absolute' }}></View>
                </TouchableWithoutFeedback>


                <View style={{ width: '100%', height: '100%', justifyContent: 'flex-end', marginBottom: -1 }}>
                    <View style={{ width: chwidth, backgroundColor: 'white', borderTopRightRadius: 45, borderTopLeftRadius: 45 }}>

                        {/* 모달 헤더 시작 */}
                        <View style={{ backgroundColor: 'rgb(30,43,245)', borderTopRightRadius: 45, borderTopLeftRadius: 45 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, marginTop: 25, marginLeft: 25, marginBottom: 18 }}>제품상세 보기</Text>
                                <TouchableWithoutFeedback onPress={() => { setModalView(false) }}>
                                    <AutoHeightImage source={close} width={30} style={{ marginRight: 25 }}></AutoHeightImage>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>
                        {/* 모달 헤더 끝 */}

                        <View style={{ alignItems: 'center', backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(36,36,36)' }}>

                            <View style={{ width: chwidth - 50, marginTop: 15, marginBottom: 30 }}>

                                <Text style={{ fontWeight: 'bold', fontSize: 16, color: atdarkmode === 'light' ? 'black' : 'white' }}>{modalname}</Text>

                                <View style={{ width: chwidth - 50, borderWidth: 0.5, marginTop: 15, marginBottom: 15, borderColor: 'rgb(153,153,153)' }}></View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <AutoHeightImage source={atdarkmode == 'light' ? category : d_category} width={18}></AutoHeightImage>
                                        <Text style={{ fontSize: 15, color: atdarkmode === 'light' ? 'black' : 'white' }}>  분류 : {modalcategory}</Text>
                                    </View>

                                    <TouchableWithoutFeedback onPress={() => { reproduct_f() }}>
                                        <View style={{ backgroundColor: 'rgb(236,236,236)', borderRadius: 3 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', margin: 5, marginLeft: 10, marginright: 10 }}>
                                                <AutoHeightImage source={edit} width={15}></AutoHeightImage>
                                                <Text style={{ color: 'gray' }}>  수정 </Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>

                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 5 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <AutoHeightImage source={atdarkmode == 'light' ? date_icon : d_date_icon} width={18}></AutoHeightImage>
                                        <Text style={{ fontSize: 15, color: atdarkmode === 'light' ? 'black' : 'white' }}>  유통기한 : {modaldate}/</Text>
                                        <Text style={{ color: 'red', fontSize: 15 }}>남은 일수 {modalexpLeft}일</Text>
                                    </View>
                                </View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>

                                    <TouchableWithoutFeedback onPress={() => { navigation.navigate('웹뷰') }}>
                                        <View style={{ borderWidth: 1, borderColor: atdarkmode === 'light' ? 'rgb(30,43,245)' : 'rgb(180, 180, 180)', marginTop: 10, borderRadius: 6, width: chwidth / 3.8 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 13 }}>
                                                <AutoHeightImage source={atdarkmode == 'light' ? cart_icon : d_cart_icon} width={18}></AutoHeightImage>
                                                <Text style={{ fontSize: 16, color: atdarkmode === 'light' ? 'rgb(30,43,245)' : 'rgb(180, 180, 180)', fontWeight: 'bold', marginTop: -3 }}> 구매하기</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback onPress={() => { }}>
                                        <View style={{ borderWidth: 1, borderColor: atdarkmode === 'light' ? 'rgb(30,43,245)' : 'rgb(180, 180, 180)', marginTop: 10, borderRadius: 6, width: chwidth / 3.8 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 13 }}>
                                                <AutoHeightImage source={atdarkmode == 'light' ? review_icon : d_review_icon} width={18}></AutoHeightImage>
                                                <Text style={{ fontSize: 16, color: atdarkmode === 'light' ? 'rgb(30,43,245)' : 'rgb(180, 180, 180)', fontWeight: 'bold', marginTop: -3 }}> 후기보기</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>

                                    <TouchableWithoutFeedback onPress={() => { delprod(modalno) }}>
                                        <View style={{ borderWidth: 1, borderColor: atdarkmode === 'light' ? 'rgb(30,43,245)' : 'rgb(180, 180, 180)', marginTop: 10, borderRadius: 6, width: chwidth / 3.8 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: 13 }}>
                                                <AutoHeightImage source={atdarkmode == 'light' ? icon3 : d_del} width={18}></AutoHeightImage>
                                                <Text style={{ fontSize: 16, color: atdarkmode === 'light' ? 'rgb(30,43,245)' : 'rgb(180, 180, 180)', fontWeight: 'bold', marginTop: -3 }}> 삭제</Text>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>

                                </View>

                            </View>


                        </View>

                    </View>
                </View>
            </Modal>
            {/* 화장품 상세보기 모달 끝 */}


        </SafeAreaView >
    )
}

export default Realmain;