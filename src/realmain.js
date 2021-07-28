import React, { useCallback, useMemo, useRef, useEffect, useState } from 'react';
import {
    Alert,
    View,
    BackHandler,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    StyleSheet,
    Image,
} from 'react-native';

import AutoHeightImage from 'react-native-auto-height-image';

import LinearGradient from 'react-native-linear-gradient';

import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';


const chwidth = Dimensions.get('window').width



const logo = require('../img/light/logo.png');
const tuto = require('../img/light/tuto.png');
const text1 = require('../img/light/menu1_2.png')
const dark = require('../img/light/menu2_1.png')
const menu = require('../img/light/menu3.png')
const plus = require('../img/light/plus.png')

const info1 = require('../img/light/info1.png');
const info2 = require('../img/light/info2.png');
const info3 = require('../img/light/info3.png');

const Realmain = () => {

    const [version, setversion] = useState(true)

    const [curHumi, setcurHumi] = useState(0)

    const [dayMaxTemp, setdayMaxTemp] = useState(0)
    const [dayMinTemp, setdayMinTemp] = useState(0)

    const [dayUv, setdayUv] = useState(0)
    const [uvString, setUvString] = useState('')

    const [pm10, setPm10] = useState(0)
    const [pm25, setPm25] = useState(0)

    const [totalAir, setTotalAir] = useState('측정중')

    const [description, setdescription] = useState('')



    useEffect(() => {

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

    }, [])

    return (
        <SafeAreaView style={{ width: '100%', height: '100%', backgroundColor: 'white' }}>

            {/* 헤더 시작 */}
            <View style={{ width: '100%', justifyContent: 'center', marginBottom: 10, elevation: 20, backgroundColor: 'white' }}>
                <View style={{ width: chwidth - 40, marginLeft: 20, marginTop: 20, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <AutoHeightImage source={logo} width={chwidth / 3}></AutoHeightImage>
                    <AutoHeightImage source={tuto} width={chwidth / 12}></AutoHeightImage>
                </View>
            </View>
            {/* 헤더 끝 */}

            {/* 본문 시작 */}
            <View style={{ flex: 1 }}>

                {version ?
                    <View style={{}}>

                        <View style={{}}>
                            <ScrollView style={{}} horizontal>

                            </ScrollView>
                        </View>


                        <View style={{}}>

                        </View>

                    </View>

                    :
                    <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'space-around' }}>
                        <View style={{ width: chwidth - 60, height: '45%', backgroundColor: 'rgb(245,245,245)', borderRadius: 18, elevation: 20, margin: 10 }}>
                            <View style={{ backgroundColor: 'black', borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
                                <Text style={{ color: 'white', margin: 10, marginLeft: 20, fontSize: 18, fontWeight: 'bold' }}>2층 화장품 목록</Text>
                            </View>

                            <ScrollView style={{}} showsVerticalScrollIndicator={false}>

                                {/* 맨위가 본체 */}
                                <View style={{ alignItems: 'center', }}>
                                    <View style={{ width: chwidth - 100, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                                        <Text style={{ width: chwidth - 190 }} numberOfLines={1}>화장품</Text>
                                        <Text style={{ color: 'rgb(13,120,159)' }}>150일 남음</Text>
                                    </View>
                                    <View style={{ width: chwidth - 60, borderWidth: 1, borderColor: 'rgb(233,233,233)' }}></View>
                                </View>

                                <View style={{ alignItems: 'center', }}>
                                    <View style={{ width: chwidth - 100, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                                        <Text style={{}}>화장품</Text>
                                        <Text style={{ color: 'rgb(13,120,159)' }}>150일 남음</Text>
                                    </View>
                                    <View style={{ width: chwidth - 60, borderWidth: 1, borderColor: 'rgb(233,233,233)' }}></View>
                                </View>

                                <View style={{ alignItems: 'center', }}>
                                    <View style={{ width: chwidth - 100, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                                        <Text style={{}}>화장품</Text>
                                        <Text style={{ color: 'rgb(13,120,159)' }}>150일 남음</Text>
                                    </View>
                                    <View style={{ width: chwidth - 60, borderWidth: 1, borderColor: 'rgb(233,233,233)' }}></View>
                                </View>

                                <View style={{ alignItems: 'center', }}>
                                    <View style={{ width: chwidth - 100, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                                        <Text style={{}}>화장품</Text>
                                        <Text style={{ color: 'rgb(13,120,159)' }}>150일 남음</Text>
                                    </View>
                                    <View style={{ width: chwidth - 60, borderWidth: 1, borderColor: 'rgb(233,233,233)' }}></View>
                                </View>

                                <View style={{ alignItems: 'center', }}>
                                    <View style={{ width: chwidth - 100, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                                        <Text style={{}}>화장품</Text>
                                        <Text style={{ color: 'rgb(13,120,159)' }}>150일 남음</Text>
                                    </View>
                                    <View style={{ width: chwidth - 60, borderWidth: 1, borderColor: 'rgb(233,233,233)' }}></View>
                                </View>

                                <View style={{ alignItems: 'center', }}>
                                    <View style={{ width: chwidth - 100, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                                        <Text style={{}}>화장품</Text>
                                        <Text style={{ color: 'rgb(13,120,159)' }}>150일 남음</Text>
                                    </View>
                                    <View style={{ width: chwidth - 60, borderWidth: 1, borderColor: 'rgb(233,233,233)' }}></View>
                                </View>


                            </ScrollView>

                        </View>


                        <View style={{ width: chwidth - 60, height: '45%', backgroundColor: 'rgb(245,245,245)', borderRadius: 18, elevation: 20, margin: 10 }}>
                            <View style={{ backgroundColor: 'black', borderTopLeftRadius: 18, borderTopRightRadius: 18 }}>
                                <Text style={{ color: 'white', margin: 10, marginLeft: 20, fontSize: 18, fontWeight: 'bold' }}>1층 화장품 목록</Text>
                            </View>

                            <ScrollView style={{}} showsVerticalScrollIndicator={false}>

                                <View style={{ alignItems: 'center', }}>
                                    <View style={{ width: chwidth - 100, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                                        <Text style={{}}>화장품</Text>
                                        <Text style={{ color: 'rgb(13,120,159)' }}>150일 남음</Text>
                                    </View>
                                    <View style={{ width: chwidth - 60, borderWidth: 1, borderColor: 'rgb(233,233,233)' }}></View>
                                </View>

                                <View style={{ alignItems: 'center', }}>
                                    <View style={{ width: chwidth - 100, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                                        <Text style={{}}>화장품</Text>
                                        <Text style={{ color: 'rgb(13,120,159)' }}>150일 남음</Text>
                                    </View>
                                    <View style={{ width: chwidth - 60, borderWidth: 1, borderColor: 'rgb(233,233,233)' }}></View>
                                </View>

                                <View style={{ alignItems: 'center', }}>
                                    <View style={{ width: chwidth - 100, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                                        <Text style={{}}>화장품</Text>
                                        <Text style={{ color: 'rgb(13,120,159)' }}>150일 남음</Text>
                                    </View>
                                    <View style={{ width: chwidth - 60, borderWidth: 1, borderColor: 'rgb(233,233,233)' }}></View>
                                </View>

                                <View style={{ alignItems: 'center', }}>
                                    <View style={{ width: chwidth - 100, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                                        <Text style={{}}>화장품</Text>
                                        <Text style={{ color: 'rgb(13,120,159)' }}>150일 남음</Text>
                                    </View>
                                    <View style={{ width: chwidth - 60, borderWidth: 1, borderColor: 'rgb(233,233,233)' }}></View>
                                </View>

                                <View style={{ alignItems: 'center', }}>
                                    <View style={{ width: chwidth - 100, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                                        <Text style={{}}>화장품</Text>
                                        <Text style={{ color: 'rgb(13,120,159)' }}>150일 남음</Text>
                                    </View>
                                    <View style={{ width: chwidth - 60, borderWidth: 1, borderColor: 'rgb(233,233,233)' }}></View>
                                </View>

                                <View style={{ alignItems: 'center', }}>
                                    <View style={{ width: chwidth - 100, flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, marginBottom: 5 }}>
                                        <Text style={{}}>화장품</Text>
                                        <Text style={{ color: 'rgb(13,120,159)' }}>150일 남음</Text>
                                    </View>
                                    <View style={{ width: chwidth - 60, borderWidth: 1, borderColor: 'rgb(233,233,233)' }}></View>
                                </View>


                            </ScrollView>

                        </View>

                    </View>

                }


            </View>
            {/* 본문 끝 */}

            {/* 날씨 정보 시작 */}
            <View style={{ flexDirection: 'row', marginBottom: -40 }}>
                <View style={{ width: chwidth / 4, height: 150 }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.7 }} colors={['rgba(192,192,192,0)', 'rgba(192,192,192,1)']} style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ height: 100, justifyContent: 'space-around', alignItems: 'center', marginTop: 5 }}>
                            <Text>자외선</Text>
                            <AutoHeightImage source={info1} width={chwidth / 9}></AutoHeightImage>
                            <Text style={{ fontSize: 12, color: '#666666' }}>{Math.round(dayUv)} {uvString}</Text>
                        </View>
                    </LinearGradient>
                </View>

                <View style={{ width: chwidth / 4, height: 150, backgroundColor: 'rgba(242,242,242,0)', alignItems: 'center' }}>
                    <View style={{ height: 100, justifyContent: 'space-around', alignItems: 'center', marginTop: 5 }}>
                        <Text>습도</Text>
                        <AutoHeightImage source={info2} width={chwidth / 11}></AutoHeightImage>
                        <Text style={{ fontSize: 12, color: '#666666' }}>{curHumi}%</Text>
                    </View>
                </View>

                <View style={{ width: chwidth / 4, height: 150 }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.7 }} colors={['rgba(192,192,192,0)', 'rgba(192,192,192,1)']} style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ height: 100, justifyContent: 'space-around', alignItems: 'center', marginTop: 5 }}>
                            <Text>미세먼지</Text>
                            <AutoHeightImage source={info3} width={chwidth / 10}></AutoHeightImage>
                            <Text style={{ fontSize: 12, color: '#666666', letterSpacing: -0.8 }}>{Math.round(pm10)}㎍/m³ {totalAir}</Text>
                        </View>
                    </LinearGradient>
                </View>

                <View style={{ width: chwidth / 4, height: 150, backgroundColor: 'rgba(242,242,242,0)', alignItems: 'center' }}>
                    <View style={{ height: 100, justifyContent: 'space-around', alignItems: 'center', marginTop: 5 }}>
                        <Text>오늘의 날씨</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'skyblue', fontSize: 13 }}>{Math.round(dayMinTemp)}°</Text>
                            <Text>/</Text>
                            <Text style={{ color: 'red', fontSize: 13 }}>{Math.round(dayMaxTemp)}°</Text>
                        </View>
                        <Text style={{ fontSize: 12, color: '#666666' }}>{description}</Text>

                    </View>
                </View>

            </View>
            {/* 날씨 정보 끝 */}



            {/* 푸터 시작 */}
            <View style={{ width: '100%', height: 100, borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: 'rgb(9,24,255)' }}>
                <View style={{ width: chwidth - 20, height: '100%', marginLeft: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '75%' }}>
                        <TouchableWithoutFeedback onPress={() => {
                            if (version)
                                setversion(false);
                            else
                                setversion(true);
                        }}>
                            <View style={{ alignItems: 'center' }}>
                                <AutoHeightImage source={text1} width={chwidth / 15}></AutoHeightImage>
                                <Text style={{ color: 'white', marginTop: 10, fontSize: 12 }}>텍스트 버전</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={{ alignItems: 'center' }}>
                                <AutoHeightImage source={dark} width={chwidth / 15}></AutoHeightImage>
                                <Text style={{ color: 'white', marginTop: 10, fontSize: 12 }}>다크 모드</Text>
                            </View>
                        </TouchableWithoutFeedback>

                        <TouchableWithoutFeedback onPress={() => { }}>
                            <View style={{ alignItems: 'center' }}>
                                <AutoHeightImage source={menu} width={chwidth / 15}></AutoHeightImage>
                                <Text style={{ color: 'white', marginTop: 10, fontSize: 12 }}>환경설정</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={{ alignItems: 'center' }}>
                            <AutoHeightImage source={plus} width={chwidth / 3.5}></AutoHeightImage>
                        </View>
                    </TouchableWithoutFeedback>

                </View>

            </View>
            {/* 푸터 끝 */}


        </SafeAreaView>
    )
}

export default Realmain;