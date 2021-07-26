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
    StyleSheet
} from 'react-native';


import {
    Slider,
    Stack,
    Box,
    Center,
    NativeBaseProvider,
    Select,
    CheckIcon,
    ChevronLeftIcon
} from "native-base"

const chwidth = Dimensions.get('window').width


const ProductAddr = () => {

    const [u1, setu1] = useState(false);
    const [u2, setu2] = useState(false);
    const [u3, setu3] = useState(false);
    const [u4, setu4] = useState(false);
    const [u5, setu5] = useState(false);
    const [u6, setu6] = useState(false);

    const [d1, setd1] = useState(false);
    const [d2, setd2] = useState(false);
    const [d3, setd3] = useState(false);
    const [d4, setd4] = useState(false);
    const [d5, setd5] = useState(false);
    const [d6, setd6] = useState(false);


    function touchpd(who) {
        setu1(false)
        setu2(false)
        setu3(false)
        setu4(false)
        setu5(false)
        setu6(false)
        setd1(false)
        setd2(false)
        setd3(false)
        setd4(false)
        setd5(false)
        setd6(false)

        switch (who) {
            case 'u1':
                console.log('u1')
                setu1(true)

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
                    <View style={{ width: 40, height: 40, borderRadius: 25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{}}>뒤</Text>
                        </View>
                    </View>
                    {/* < 끝 */}
                    <Text style={{ fontSize: 23, color: 'black', fontWeight: 'bold' }}>등록하기</Text>
                    <View style={{ width: 40, height: 40 }}>
                    </View>

                </View>
            </View>
            {/* 헤더 끝 */}

            <View style={{ flex: 1 }}>

                <ScrollView style={{}}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                        <Text style={{}}>아이콘</Text>
                        <Text style={{ fontSize: 18 }}>화장품을 놓은 위치를 터치해주세요.</Text>
                    </View>

                    <View style={{ width: chwidth - 40, borderRadius: 15, backgroundColor: 'white', marginLeft: 20, marginTop: 40, elevation: 15, marginBottom: 20 }}>
                        <View style={{ width: chwidth - 60, marginLeft: 10, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>위 칸</Text>

                            <View style={{ width: chwidth - 100, flexDirection: 'row', marginBottom: 20, marginTop: 30, justifyContent: 'space-between' }}>

                                <TouchableWithoutFeedback onPress={() => touchpd('u1')}>
                                    {u1 ?
                                        <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'black', boderwidth: 1, borderColor: 'skyblue' }}>

                                        </View>
                                        :
                                        <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                        </View>
                                    }
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('u2')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('u3')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('u4')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('u5')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('u6')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                    </View>
                                </TouchableWithoutFeedback>


                            </View>
                        </View>
                    </View>

                    <View style={{ width: chwidth - 40, borderRadius: 15, backgroundColor: 'white', marginLeft: 20, marginTop: 20, elevation: 15, marginBottom: 20 }}>
                        <View style={{ width: chwidth - 60, marginLeft: 10, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>아래 칸</Text>

                            <View style={{ width: chwidth - 100, flexDirection: 'row', marginBottom: 20, marginTop: 30, justifyContent: 'space-between' }}>

                                <TouchableWithoutFeedback onPress={() => touchpd('d1')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('d2')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('d3')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('d4')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('d5')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => touchpd('d6')}>
                                    <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

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