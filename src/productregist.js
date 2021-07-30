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
import { TextInput } from 'react-native-gesture-handler';

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

import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import DatePicker from 'react-native-date-picker'
import AutoHeightImage from 'react-native-auto-height-image';

const back = require('../img/light/back.png')
const dateicon = require('../img/light/date.png')

const chwidth = Dimensions.get('window').width

const Productregist = () => {

    const [onChangeValue, setOnChangeValue] = React.useState(49)

    const [date, setDate] = useState(new Date(Date.now()));

    const [leftmonth, setLeftmonth] = useState(0)

    const [big, setBig] = useState('')
    const [small, setSmall] = useState('')

    const [dateText, setDateText] = useState('')

    const bottomSheetModalRef = useRef(< BottomSheetModal ></BottomSheetModal>);

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);

    const handlePresentModalcancel = useCallback(() => {
        bottomSheetModalRef.current?.dismiss();
    }, []);


    const handleSheetChanges = useCallback((index) => {
        console.log('handleSheetChanges', index);
    }, []);

    useEffect(() => {
        setDateText(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
    }, [date])


    useEffect(() => {
        console.log(onChangeValue)
        switch (onChangeValue) {
            case 0:
                setLeftmonth(0)
                break;
            case 9:
                setLeftmonth(1)
                break;
            case 17:
                setLeftmonth(2)
                break;
            case 25:
                setLeftmonth(3)
                break;
            case 34:
                setLeftmonth(4)
                break;
            case 41:
                setLeftmonth(5)
                break;
            case 49:
                setLeftmonth(6)
                break;
            case 57:
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
            <BottomSheetModalProvider>
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

                        {/* 본문 시작 */}
                        <ScrollView>

                            <View style={{ width: chwidth - 40, borderRadius: 20, marginLeft: 20, backgroundColor: 'white', elevation: 10, marginTop: 20, marginBottom: 100 }}>
                                <View style={{ width: chwidth - 80, marginLeft: 20, marginTop: 30, marginBottom: 30 }}>

                                    {/*  */}
                                    <Text style={{ fontSize: 18 }}>제품명</Text>
                                    <View style={{ borderWidth: 1, borderColor: 'rgb(204,204,204)', height: 40, marginTop: 10, borderRadius: 3 }}>
                                        <TextInput style={{ height: 40, width: chwidth - 100, marginLeft: 10 }} placeholder={'제품명을 입력해주세요.'}></TextInput>
                                    </View>

                                    {/*  */}
                                    <Text style={{ fontSize: 18, marginTop: 25 }}>화장품 종류</Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>

                                        <View style={{ width: (chwidth - 90) / 2, height: 45, marginTop: 10, borderRadius: 3 }}>

                                            <Select
                                                selectedValue={big}
                                                accessibilityLabel="대분류"
                                                placeholder="대분류"
                                                onValueChange={(itemValue) => setBig(itemValue)}
                                                _selectedItem={{
                                                    bg: "cyan.600",
                                                    endIcon: <CheckIcon size={4} />,
                                                }}
                                            >
                                                <Select.Item label="기초화장" value="기초화장" />

                                            </Select>
                                        </View>

                                        <View style={{ width: (chwidth - 90) / 2, height: 45, marginTop: 10, borderRadius: 3 }}>

                                            {(big == '기초화장') &&
                                                <Select
                                                    selectedValue={small}
                                                    accessibilityLabel="소분류"
                                                    placeholder="소분류"
                                                    onValueChange={(itemValue) => setSmall(itemValue)}
                                                    _selectedItem={{
                                                        bg: "cyan.600",
                                                        endIcon: <CheckIcon size={4} />,
                                                    }}
                                                >
                                                    <Select.Item label="스킨" value="스킨" />
                                                    <Select.Item label="토너" value="토너" />
                                                    <Select.Item label="로션" value="로션" />
                                                </Select>
                                            }
                                        </View>

                                    </View>

                                    {/*  */}
                                    <Text style={{ fontSize: 18, marginTop: 25 }}>유통기한 설정</Text>

                                    <TouchableWithoutFeedback onPress={() => { console.log("날짜 선택"), handlePresentModalPress() }}>
                                        <View style={{ borderWidth: 1, borderColor: 'rgb(204,204,204)', height: 40, marginTop: 10, borderRadius: 3, alignItems: 'center', }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', width: chwidth - 100, height: 40, justifyContent: 'space-between', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Text style={{ fontSize: 15 }}> {dateText} </Text>
                                                <AutoHeightImage source={dateicon} width={18}></AutoHeightImage>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>

                                    {/*  */}
                                    <Text style={{ fontSize: 18, marginTop: 25, marginBottom: 20 }}>유통기한 알람</Text>

                                    <Slider
                                        defaultValue={49}
                                        colorScheme="cyan"
                                        onChange={(v) => {
                                            setOnChangeValue(Math.floor(v))
                                        }}>
                                        <Slider.Track bg='gray.100' borderWidth={3} borderColor={'rgb(216,216,216)'}>
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


                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={1}
                        snapPoints={snapPoints}
                        onChange={handleSheetChanges}>
                        <View style={{ flex: 1, }}>
                            <DatePicker
                                style={{ width: chwidth, marginTop: 50 }}
                                date={date}
                                onDateChange={(date) => { setDate(date), console.log(date) }}
                                mode={'date'}
                                locale='ko_KR'
                            />
                            <View style={{ justifyContent: 'flex-end', flex: 1 }}>
                                <TouchableWithoutFeedback onPress={() => handlePresentModalcancel()}>
                                    <View style={{ width: chwidth, height: 60, backgroundColor: 'gray', alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ fontSize: 18, color: 'white' }}>완료</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                        </View>

                    </BottomSheetModal>

                </SafeAreaView>
            </BottomSheetModalProvider>
        </NativeBaseProvider>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: 'grey',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
});

export default Productregist