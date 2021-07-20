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

import {
    Slider,
    Stack,
    Box,
    Center,
    NativeBaseProvider,
} from "native-base"

const chwidth = Dimensions.get('window').width

const Productregist = () => {

    const [onChangeValue, setOnChangeValue] = React.useState(48)

    const [leftmonth, setLeftmonth] = useState(0)

    useEffect(() => {
        console.log(onChangeValue)
        switch (onChangeValue) {
            case 0:
                setLeftmonth(0)
                break;
            case 8:
                setLeftmonth(1)
                break;
            case 16:
                setLeftmonth(2)
                break;
            case 24:
                setLeftmonth(3)
                break;
            case 33:
                setLeftmonth(4)
                break;
            case 40:
                setLeftmonth(5)
                break;
            case 48:
                setLeftmonth(6)
                break;
            case 56:
                setLeftmonth(7)
                break;
            case 64:
                setLeftmonth(8)
                break;
            case 73:
                setLeftmonth(9)
                break;
            case 80:
                setLeftmonth(10)
                break;
            case 88:
                setLeftmonth(11)
                break;
            case 96:
                setLeftmonth(12)
                break;
        }

    }, [onChangeValue])

    return (
        <NativeBaseProvider>
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
                            <View style={{ width: chwidth - 80, marginLeft: 20, marginTop: 30, marginBottom: 30 }}>

                                {/*  */}
                                <Text style={{ fontSize: 18 }}>제품명</Text>

                                <TextInput style={{ borderWidth: 1, borderColor: 'rgb(204,204,204)', height: 40, marginTop: 10, borderRadius: 3 }} placeholder={'제품명을 입력해주세요.'}></TextInput>


                                {/*  */}
                                <Text style={{ fontSize: 18, marginTop: 25 }}>화장품 종류</Text>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                    <View style={{ borderWidth: 1, borderColor: 'rgb(204,204,204)', width: (chwidth - 90) / 2, height: 40, marginTop: 10, borderRadius: 3 }}>

                                    </View>

                                    <View style={{ borderWidth: 1, borderColor: 'rgb(204,204,204)', width: (chwidth - 90) / 2, height: 40, marginTop: 10, borderRadius: 3 }}>

                                    </View>

                                </View>



                                {/*  */}
                                <Text style={{ fontSize: 18, marginTop: 25 }}>유통기한 설정</Text>

                                <View style={{ borderWidth: 1, borderColor: 'rgb(204,204,204)', height: 40, marginTop: 10, borderRadius: 3 }}>

                                </View>


                                {/*  */}
                                <Text style={{ fontSize: 18, marginTop: 25, marginBottom: 20 }}>유통기한 알람</Text>

                                <Slider
                                    defaultValue={48}
                                    colorScheme="cyan"
                                    onChange={(v) => {
                                        setOnChangeValue(Math.floor(v))
                                    }}
                                >
                                    <Slider.Track bg='gray.100' borderWidth={3} borderColor={'rgb(216,216,216)'}>
                                        {/* <Slider.FilledTrack /> */}
                                    </Slider.Track>
                                    <Slider.Thumb bg='rgb(233,31,54)'>
                                        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: -20 }}>
                                            <Text style={{}}>{leftmonth} </Text>
                                        </View>
                                    </Slider.Thumb>
                                </Slider>

                                <View style={{ flexDirection: 'row', width: chwidth - 75, justifyContent: 'space-between' }}>
                                    <Text>0개월 전    </Text>
                                    <Text>6개월 전 </Text>
                                    <Text>12개월 전</Text>
                                </View>

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
        </NativeBaseProvider>
    )
}

export default Productregist