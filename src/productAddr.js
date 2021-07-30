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

const chwidth = Dimensions.get('window').width

const check_img = require('../img/light/check.png')
const loca_img = require('../img/light/location_icon.png')
const back = require('../img/light/back.png')


const ProductAddr = () => {

    const [u1, setu1] = useState('f');
    const [u2, setu2] = useState('f');
    const [u3, setu3] = useState('f');
    const [u4, setu4] = useState('f');
    const [u5, setu5] = useState('f');
    const [u6, setu6] = useState('f');

    const [d1, setd1] = useState('f');
    const [d2, setd2] = useState('f');
    const [d3, setd3] = useState('f');
    const [d4, setd4] = useState('f');
    const [d5, setd5] = useState('f');
    const [d6, setd6] = useState('f');

    // 상태 불러오기!
    useEffect(() => {

    }, [])

    // 각각 클릭이벤트 통합
    function touchpd(who) {
        setu1('f')
        setu2('f')
        setu3('f')
        setu4('f')
        setu5('f')
        setu6('f')
        setd1('f')
        setd2('f')
        setd3('f')
        setd4('f')
        setd5('f')
        setd6('f')

        switch (who) {
            case 'u1':
                console.log('u1')
                if (u1 !== 'i') {
                    setu1('t')
                }
                break;
            case 'u2':
                console.log('u2')

                break;
            case 'u3':
                console.log('u3')

                break;
            case 'u4':
                console.log('u4')

                break;
            case 'u5':
                console.log('u5')

                break;
            case 'u6':
                console.log('u6')

                break;
            case 'd1':
                console.log('d1')

                break;
            case 'd2':
                console.log('d2')

                break;
            case 'd3':
                console.log('d3')

                break;
            case 'd4':
                console.log('d4')

                break;
            case 'd5':
                console.log('d5')

                break;
            case 'd6':
                console.log('d6')

                break;

        }
    }





    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(240,240,240)' }}>

            {/* 헤더 시작 */}
            <View style={{ width: '100%', height: 60, justifyContent: 'center' }}>
                <View style={{ marginLeft: 20, width: chwidth - 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* < 시작 */}
                    <TouchableWithoutFeedback onPress={() => { console.log('뒤클릭') }}>
                        <View style={{ width: 40, height: 40, borderRadius: 25, alignItems: 'center', justifyContent: 'center', }}>
                            <AutoHeightImage source={back} width={35}></AutoHeightImage>
                        </View>
                    </TouchableWithoutFeedback>
                    {/* < 끝 */}
                    <Text style={{ fontSize: 23, color: 'black', fontWeight: 'bold' }}>등록하기</Text>
                    <View style={{ width: 40, height: 40 }}>
                    </View>

                </View>
            </View>
            {/* 헤더 끝 */}

            <View style={{ flex: 1 }}>

                <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <AutoHeightImage source={loca_img} width={30}></AutoHeightImage>
                        <Text style={{ fontSize: 18, marginTop: 10 }}>화장품을 놓은 위치를 터치해주세요.</Text>
                    </View>

                    <View style={{ width: chwidth - 40, borderRadius: 15, backgroundColor: 'white', marginLeft: 20, marginTop: 40, elevation: 10, marginBottom: 20 }}>
                        <View style={{ width: chwidth - 60, marginLeft: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>위 칸</Text>

                            <View style={{ width: chwidth - 100, flexDirection: 'row', marginBottom: 20, marginTop: 30, justifyContent: 'space-between' }}>

                                <TouchableWithoutFeedback onPress={() => touchpd('u1')}>
                                    {u1 == 't' ?
                                        <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'black', borderWidth: 4, borderColor: 'rgb(30,40,245)', alignItems: 'center', justifyContent: 'center' }}>
                                            <AutoHeightImage source={check_img} width={25}></AutoHeightImage>
                                        </View>
                                        :
                                        <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'rgb(204,204,204)' }}>

                                        </View>
                                    }
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('u2')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'rgb(204,204,204)' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('u3')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'rgb(204,204,204)' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('u4')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'rgb(204,204,204)' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('u5')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'rgb(204,204,204)' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('u6')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'rgb(204,204,204)' }}>

                                    </View>
                                </TouchableWithoutFeedback>


                            </View>
                        </View>
                    </View>

                    <View style={{ width: chwidth - 40, borderRadius: 15, backgroundColor: 'white', marginLeft: 20, marginTop: 5, elevation: 10, marginBottom: 20 }}>
                        <View style={{ width: chwidth - 60, marginLeft: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>아래 칸</Text>

                            <View style={{ width: chwidth - 100, flexDirection: 'row', marginBottom: 20, marginTop: 30, justifyContent: 'space-between' }}>

                                <TouchableWithoutFeedback onPress={() => touchpd('d1')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'rgb(204,204,204)' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('d2')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'rgb(204,204,204)' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('d3')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'rgb(204,204,204)' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('d4')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'rgb(204,204,204)' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('d5')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'rgb(204,204,204)' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('d6')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'rgb(204,204,204)' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                            </View>
                        </View>
                    </View>

                </ScrollView>

            </View>

            {/* 하단 버튼 시작 */}
            <View style={{ width: '100%', height: 90, alignItems: 'center', justifyContent: 'center' }}>
                {/* 파랑버튼 */}
                <View style={{ borderRadius: 10, backgroundColor: 'rgb(30,40,245)', width: chwidth - 40, height: 60, alignItems: 'center', justifyContent: 'center', elevation: 10, }}>
                    <Text style={{ fontSize: 23, color: 'white', fontWeight: 'bold' }}>확인</Text>
                </View>
            </View>

            {/* 하단 버튼 끝 */}

        </SafeAreaView>
    )
}

export default ProductAddr