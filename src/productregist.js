import React, { useRef, useEffect, useState } from 'react';
import {
    Alert,
    View,
    BackHandler,
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Text,
    Dimensions
} from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const chwidth = Dimensions.get('window').width

const Productregist = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(240,240,240)' }}>


            {/* 헤더 시작 */}
            <View style={{ width: '100%', height: 60, justifyContent: 'center' }}>

                <View style={{ marginLeft: 20, width: chwidth - 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    {/* < 시작 */}
                    <View style={{ width: 40, height: 40, borderRadius: 25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                        <Text>뒤</Text>
                    </View>
                    {/* < 끝 */}

                    <Text style={{ fontSize: 23, color: 'black', fontWeight: 'bold' }}>등록하기</Text>


                    <View style={{ width: 40, height: 40 }}>

                    </View>


                </View>

            </View>
            {/* 헤더 끝 */}

            <View style={{ flex: 1 }}>

                {/* 본문 시작 */}
                <ScrollView>
                    <View style={{ width: chwidth - 40, borderRadius: 20, marginLeft: 20, backgroundColor: 'white', elevation: 10, marginTop: 20, marginBottom: 100 }}>
                        <View style={{ width: chwidth - 70, marginLeft: 15, marginTop: 30, marginBottom: 30 }}>

                            <Text style={{ fontSize: 18 }}>제품명</Text>

                            <TextInput style={{ borderWidth: 0.5, borderColor: 'gray', height: 40, marginTop: 10 }} placeholder={'제품명을 입력해주세요.'}></TextInput>

                            <Text style={{ fontSize: 18, marginTop: 25 }}>화장품 종류</Text>




                        </View>
                    </View>
                </ScrollView>
                {/* 본문 끝 */}

            </View>

            {/* 하단 버튼 시작 */}
            <View style={{ width: '100%', height: 90, alignItems: 'center', justifyContent: 'center' }}>
                {/* 파랑버튼 */}
                <View style={{ borderRadius: 10, backgroundColor: 'rgb(30,40,245)', width: chwidth - 40, height: 60, alignItems: 'center', justifyContent: 'center', elevation: 20, }}>
                    <Text style={{ fontSize: 23, color: 'white', fontWeight: 'bold' }}>확인</Text>
                </View>
            </View>
            {/* 하단 버튼 끝 */}



        </SafeAreaView>
    )
}

export default Productregist