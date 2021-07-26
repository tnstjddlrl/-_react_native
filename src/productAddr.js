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

                                <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                </View>

                                <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                </View>

                                <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                </View>

                                <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                </View>

                                <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                </View>

                                <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                </View>


                            </View>
                        </View>
                    </View>

                    <View style={{ width: chwidth - 40, borderRadius: 15, backgroundColor: 'white', marginLeft: 20, marginTop: 20, elevation: 15, marginBottom: 20 }}>
                        <View style={{ width: chwidth - 60, marginLeft: 10, marginTop: 10, alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>아래 칸</Text>

                            <View style={{ width: chwidth - 100, flexDirection: 'row', marginBottom: 20, marginTop: 30, justifyContent: 'space-between' }}>

                                <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                </View>

                                <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                </View>

                                <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                </View>

                                <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                </View>

                                <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                </View>

                                <View style={{ width: chwidth / 9, height: 110, borderRadius: 50, backgroundColor: 'gray' }}>

                                </View>


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