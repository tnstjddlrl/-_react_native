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
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.7 }} colors={['rgba(192,192,192,0)', 'rgba(192,192,192,1)']} style={{ flex: 1 }}>


                    </LinearGradient>
                </View>

                <View style={{ width: chwidth / 4, height: 150, backgroundColor: 'rgba(242,242,242,0)' }}>

                </View>

                <View style={{ width: chwidth / 4, height: 150 }}>
                    <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.7 }} colors={['rgba(192,192,192,0)', 'rgba(192,192,192,1)']} style={{ flex: 1 }}>


                    </LinearGradient>
                </View>

                <View style={{ width: chwidth / 4, height: 150, backgroundColor: 'rgba(242,242,242,0)' }}>

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