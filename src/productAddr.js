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
                        <Text style={{ fontSize: 18 }}>제품 놓을 위치 터치</Text>
                    </View>

                    <View style={{ width: chwidth - 40, height: 100, borderRadius: 15, backgroundColor: 'white', marginLeft: 20, marginTop: 20, elevation: 15, marginBottom: 20 }}>

                    </View>

                    <View style={{ width: chwidth - 40, height: 100, borderRadius: 15, backgroundColor: 'white', marginLeft: 20, marginTop: 10, elevation: 15, marginBottom: 20 }}>

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