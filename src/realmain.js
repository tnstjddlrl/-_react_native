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

const chwidth = Dimensions.get('window').width

const Realmain = () => {

    const logo = require('../img/light/logo.png');
    const tuto = require('../img/light/tuto.png');
    const text1 = require('../img/light/menu1_2.png')
    const dark = require('../img/light/menu2_1.png')
    const menu = require('../img/light/menu3.png')
    const plus = require('../img/light/plus.png')

    const info1 = require('../img/light/info1.png');
    const info2 = require('../img/light/info2.png');
    const info3 = require('../img/light/info3.png');


    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>

            {/* 헤더 시작 */}
            <View style={{ width: '100%', justifyContent: 'center', marginBottom: 10, elevation: 15, backgroundColor: 'white' }}>
                <View style={{ width: chwidth - 40, marginLeft: 20, marginTop: 20, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <AutoHeightImage source={logo} width={chwidth / 3}></AutoHeightImage>
                    <AutoHeightImage source={tuto} width={chwidth / 12}></AutoHeightImage>
                </View>
            </View>
            {/* 헤더 끝 */}

            {/* 본문 시작 */}
            <View style={{ flex: 1 }}>


            </View>
            {/* 본문 끝 */}


            {/* 날씨 정보 시작 */}
            <View style={{ flexDirection: 'row', marginBottom: -40 }}>
                <View style={{ width: chwidth / 4, height: 150 }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.7 }} colors={['rgba(192,192,192,0)', 'rgba(192,192,192,1)']} style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ height: 100, justifyContent: 'space-around', alignItems: 'center', marginTop: 5 }}>
                            <Text>자외선</Text>
                            <AutoHeightImage source={info1} width={chwidth / 9}></AutoHeightImage>
                            <Text style={{ fontSize: 12, color: '#666666' }}>6 높음</Text>
                        </View>
                    </LinearGradient>
                </View>

                <View style={{ width: chwidth / 4, height: 150, backgroundColor: 'rgba(242,242,242,0)', alignItems: 'center' }}>
                    <View style={{ height: 100, justifyContent: 'space-around', alignItems: 'center', marginTop: 5 }}>
                        <Text>습도</Text>
                        <AutoHeightImage source={info2} width={chwidth / 11}></AutoHeightImage>
                        <Text style={{ fontSize: 12, color: '#666666' }}>60%</Text>
                    </View>
                </View>

                <View style={{ width: chwidth / 4, height: 150 }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.7 }} colors={['rgba(192,192,192,0)', 'rgba(192,192,192,1)']} style={{ flex: 1, alignItems: 'center' }}>
                        <View style={{ height: 100, justifyContent: 'space-around', alignItems: 'center', marginTop: 5 }}>
                            <Text>미세먼지</Text>
                            <AutoHeightImage source={info3} width={chwidth / 10}></AutoHeightImage>
                            <Text style={{ fontSize: 12, color: '#666666', letterSpacing: -0.8 }}>19㎍/m³ 좋음</Text>
                        </View>
                    </LinearGradient>
                </View>

                <View style={{ width: chwidth / 4, height: 150, backgroundColor: 'rgba(242,242,242,0)', alignItems: 'center' }}>
                    <View style={{ height: 100, justifyContent: 'space-around', alignItems: 'center', marginTop: 5 }}>
                        <Text>오늘의 날씨</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ color: 'skyblue', fontSize: 13 }}>18°</Text>
                            <Text>/</Text>
                            <Text style={{ color: 'red', fontSize: 13 }}>25°</Text>
                        </View>
                        <Text style={{ fontSize: 12, color: '#666666' }}>구름 많음</Text>

                    </View>
                </View>

            </View>
            {/* 날씨 정보 끝 */}



            {/* 푸터 시작 */}
            <View style={{ width: '100%', height: 100, borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: 'rgb(9,24,255)' }}>
                <View style={{ width: chwidth - 20, height: '100%', marginLeft: 10, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '75%' }}>
                        <View style={{ alignItems: 'center' }}>
                            <AutoHeightImage source={text1} width={chwidth / 15}></AutoHeightImage>
                            <Text style={{ color: 'white', marginTop: 10, fontSize: 12 }}>텍스트 버전</Text>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <AutoHeightImage source={dark} width={chwidth / 15}></AutoHeightImage>
                            <Text style={{ color: 'white', marginTop: 10, fontSize: 12 }}>다크 모드</Text>
                        </View>

                        <View style={{ alignItems: 'center' }}>
                            <AutoHeightImage source={menu} width={chwidth / 15}></AutoHeightImage>
                            <Text style={{ color: 'white', marginTop: 10, fontSize: 12 }}>환경설정</Text>
                        </View>
                    </View>

                    <View style={{ alignItems: 'center' }}>
                        <AutoHeightImage source={plus} width={chwidth / 3.5}></AutoHeightImage>
                    </View>

                </View>

            </View>
            {/* 푸터 끝 */}


        </SafeAreaView>
    )
}

export default Realmain;