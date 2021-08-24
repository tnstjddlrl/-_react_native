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

import SelectDropdown from "react-native-select-dropdown";

import {
    BottomSheetModal,
    BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';

import DatePicker from 'react-native-date-picker'
import AutoHeightImage from 'react-native-auto-height-image';
import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { darkmode, pcategory, pexp, pexpDate, pname } from '../atoms/atom';

const back = require('../img/light/back.png')
const dateicon = require('../img/light/date.png')

const select_arrow = require('../newimg/light/select_arrow.png')
const d_select_arrow = require('../newimg/dark/d_select_arrow.png')



const chwidth = Dimensions.get('window').width

const thisday = new Date(Date.now());

const Productregist = () => {

    const navigation = useNavigation()
    const bottomSheetModalRef = useRef(< BottomSheetModal ></BottomSheetModal>);


    const [date, setDate] = useState(new Date(Date.now()));

    const [leftmonth, setLeftmonth] = useState(0)

    const [atname, setAtname] = useRecoilState(pname)
    const [atcategory, setAtcategory] = useRecoilState(pcategory)
    const [atexp, setAtexp] = useRecoilState(pexp)
    const [atexpDate, setAtexpDate] = useRecoilState(pexpDate)

    const [atdarkmode, setAtdarkmode] = useRecoilState(darkmode); //다크모드


    const [name, setName] = useState('')
    const [big, setBig] = useState('')
    const [small, setSmall] = useState('')
    const [dateText, setDateText] = useState('')
    const [expDate, setExpDate] = useState('')


    useEffect(() => {
        console.log(atname)
        setTimeout(() => {
            setName(atname)
        }, 300);
    }, [])





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


    const [onChangeValue, setOnChangeValue] = React.useState(49)
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

    useEffect(() => {
        setDateText(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())
    }, [date])




    function okclick() {
        if (name == '' && big == '' && small == '') {
            Alert.alert('제품명 혹은 종류를 설정해주세요.')
            return
        }

        date.setMonth(date.getMonth() - leftmonth)

        setAtname(name)
        setAtcategory(big + '/' + small)
        setAtexp(dateText)
        setAtexpDate(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate())

        setTimeout(() => {
            navigation.navigate('사진촬영')
        }, 300);
    }

    const [countries, setCountries] = useState([]);
    const [cities, setCities] = useState([]);

    const citiesDropdownRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            setCountries([
                { title: "Egypt", cities: [{ title: "Cairo" }, { title: "Alex" }] },
                {
                    title: "Canada",
                    cities: [{ title: "Toronto" }, { title: "Quebec City" }],
                },
            ]);
        }, 1000);
    }, []);


    return (
        <NativeBaseProvider>
            <BottomSheetModalProvider>
                <SafeAreaView style={{ flex: 1, backgroundColor: atdarkmode === 'light' ? 'rgb(240,240,240)' : 'black' }}>


                    {/* 헤더 시작 */}
                    <View style={{ width: '100%', height: 60, justifyContent: 'center' }}>

                        <View style={{ marginLeft: 20, width: chwidth - 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                            {/* < 시작 */}
                            <TouchableWithoutFeedback onPress={() => { navigation.goBack(); }}>
                                <View style={{ width: 40, height: 40, borderRadius: 25, alignItems: 'center', justifyContent: 'center', }}>
                                    <AutoHeightImage source={back} width={35}></AutoHeightImage>
                                </View>
                            </TouchableWithoutFeedback>
                            {/* < 끝 */}

                            <Text style={{ fontSize: 23, color: atdarkmode === 'light' ? 'black' : 'white', fontWeight: 'bold' }}>등록하기</Text>


                            <View style={{ width: 40, height: 40 }}>

                            </View>

                        </View>

                    </View>
                    {/* 헤더 끝 */}

                    <View style={{ flex: 1 }}>

                        {/* 본문 시작 */}
                        <ScrollView>

                            <View style={{ width: chwidth - 40, borderRadius: 20, marginLeft: 20, backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(48,48,48)', elevation: 10, marginTop: 20, marginBottom: 100 }}>
                                <View style={{ width: chwidth - 80, marginLeft: 20, marginTop: 30, marginBottom: 30 }}>

                                    {/*  */}
                                    <Text style={{ fontSize: 18, color: atdarkmode === 'light' ? 'black' : 'white' }}>제품명</Text>
                                    <View style={{ borderWidth: 1, borderColor: atdarkmode === 'light' ? 'rgb(204,204,204)' : 'rgb(48,48,48)', backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(60,60,60)', height: 45, marginTop: 10, borderRadius: 3 }}>
                                        <TextInput onChangeText={(txt) => setName(txt)} value={name} style={{ height: 45, width: chwidth - 100, marginLeft: 10, color: atdarkmode === 'light' ? 'black' : 'white' }} placeholder={'제품명을 입력해주세요.'} placeholderTextColor={atdarkmode === 'light' ? 'black' : 'white'}></TextInput>
                                    </View>

                                    {/*  */}
                                    <Text style={{ fontSize: 18, marginTop: 25, color: atdarkmode === 'light' ? 'black' : 'white' }}>화장품 종류</Text>

                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>

                                        {/* <View style={{ width: (chwidth - 90) / 2, height: 45, marginTop: 10, borderRadius: 3 }}>

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
                                        </View> */}

                                        <SelectDropdown
                                            data={countries}
                                            onSelect={(selectedItem, index) => {
                                                console.log(selectedItem, index);
                                                citiesDropdownRef.current.reset();
                                                setCities([]);
                                                setCities(selectedItem.cities);
                                            }}
                                            defaultButtonText={"대분류"}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem.title;
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item.title;
                                            }}
                                            buttonStyle={{
                                                flex: 1,
                                                height: 40,
                                                backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(60,60,60)',
                                                borderRadius: 3,
                                                borderWidth: 1,
                                                borderColor: "#444",
                                            }}
                                            buttonTextStyle={{ color: "#444", textAlign: "left", fontSize: 16, color: atdarkmode === 'light' ? 'black' : 'white' }}
                                            renderDropdownIcon={() => {
                                                if (atdarkmode === 'light') {
                                                    return (
                                                        <AutoHeightImage source={select_arrow} width={15}></AutoHeightImage>
                                                    );

                                                } else {
                                                    return (
                                                        <AutoHeightImage source={d_select_arrow} width={15}></AutoHeightImage>
                                                    );

                                                }
                                            }}
                                            dropdownIconPosition={"right"}
                                            dropdownStyle={styles.dropdown1DropdownStyle}
                                            rowStyle={styles.dropdown1RowStyle}
                                            rowTextStyle={styles.dropdown1RowTxtStyle}
                                        />
                                        <View style={{ width: 12 }} />
                                        <SelectDropdown
                                            ref={citiesDropdownRef}
                                            data={cities}
                                            onSelect={(selectedItem, index) => {
                                                console.log(selectedItem, index);
                                            }}
                                            defaultButtonText={"소분류"}
                                            buttonTextAfterSelection={(selectedItem, index) => {
                                                return selectedItem.title;
                                            }}
                                            rowTextForSelection={(item, index) => {
                                                return item.title;
                                            }}
                                            buttonStyle={{
                                                flex: 1,
                                                height: 40,
                                                backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(60,60,60)',
                                                borderRadius: 3,
                                                borderWidth: 1,
                                                borderColor: "#444",
                                            }}
                                            buttonTextStyle={{ color: "#444", textAlign: "left", fontSize: 16, color: atdarkmode === 'light' ? 'black' : 'white' }}
                                            renderDropdownIcon={() => {
                                                if (atdarkmode === 'light') {
                                                    return (
                                                        <AutoHeightImage source={select_arrow} width={15}></AutoHeightImage>
                                                    );

                                                } else {
                                                    return (
                                                        <AutoHeightImage source={d_select_arrow} width={15}></AutoHeightImage>
                                                    );

                                                }
                                            }}
                                            dropdownIconPosition={"right"}
                                            dropdownStyle={styles.dropdown2DropdownStyle}
                                            rowStyle={styles.dropdown2RowStyle}
                                            rowTextStyle={styles.dropdown2RowTxtStyle}
                                        />

                                    </View>

                                    {/*  */}
                                    <Text style={{ fontSize: 18, marginTop: 25, color: atdarkmode === 'light' ? 'black' : 'white' }}>유통기한 설정</Text>

                                    <TouchableWithoutFeedback onPress={() => { handlePresentModalPress() }}>
                                        <View style={{ borderWidth: 1, borderColor: atdarkmode === 'light' ? 'rgb(204,204,204)' : 'rgb(48,48,48)', backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(60,60,60)', height: 40, marginTop: 10, borderRadius: 3, alignItems: 'center', }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center', width: chwidth - 100, height: 40, justifyContent: 'space-between', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <Text style={{ fontSize: 15, color: atdarkmode === 'light' ? 'black' : 'white' }}> {dateText} </Text>
                                                <AutoHeightImage source={dateicon} width={18}></AutoHeightImage>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>

                                    {/*  */}
                                    <Text style={{ fontSize: 18, marginTop: 25, marginBottom: 20, color: atdarkmode === 'light' ? 'black' : 'white' }}>유통기한 알람</Text>

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
                                                <Text style={{ color: atdarkmode === 'light' ? 'black' : 'white' }}>{leftmonth} </Text>
                                            </View>
                                        </Slider.Thumb>
                                    </Slider>

                                    <View style={{ flexDirection: 'row', width: chwidth - 75, justifyContent: 'space-between' }}>
                                        <Text style={{ color: atdarkmode === 'light' ? 'black' : 'white' }}>0개월 전    </Text>
                                        <Text style={{ color: atdarkmode === 'light' ? 'black' : 'white' }}>6개월 전 </Text>
                                        <Text style={{ color: atdarkmode === 'light' ? 'black' : 'white' }}>12개월 전</Text>
                                    </View>

                                </View>
                            </View>

                        </ScrollView>
                        {/* 본문 끝 */}

                    </View>

                    {/* 하단 버튼 시작 */}
                    <View style={{ width: '100%', height: 90, alignItems: 'center', justifyContent: 'center' }}>
                        {/* 파랑버튼 */}
                        <TouchableWithoutFeedback onPress={() => { okclick() }}>
                            <View style={{ borderRadius: 10, backgroundColor: atdarkmode === 'light' ? 'white' : 'black', borderWidth: 1.5, borderColor: atdarkmode === 'light' ? 'black' : 'white', width: chwidth - 40, height: 60, alignItems: 'center', justifyContent: 'center', elevation: 20, }}>
                                <Text style={{ fontSize: 23, color: atdarkmode === 'light' ? 'black' : 'white', fontWeight: 'bold' }}>확인</Text>
                            </View>
                        </TouchableWithoutFeedback>
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
                                    <View style={{ width: chwidth, height: 60, backgroundColor: 'rgb(9,24,255)', alignItems: 'center', justifyContent: 'center' }}>
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
    shadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 10,
    },

    dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
    dropdown1DropdownStyle: { backgroundColor: "#EFEFEF" },
    dropdown1RowStyle: {
        backgroundColor: "#EFEFEF",
        borderBottomColor: "#C5C5C5",
    },
    dropdown1RowTxtStyle: { color: "#444", textAlign: "left" },

    dropdown2BtnStyle: {
        flex: 1,
        height: 50,
        backgroundColor: "#FFF",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#444",
    },
    dropdown2BtnTxtStyle: { color: "#444", textAlign: "left" },
    dropdown2DropdownStyle: { backgroundColor: "#EFEFEF" },
    dropdown2RowStyle: {
        backgroundColor: "#EFEFEF",
        borderBottomColor: "#C5C5C5",
    },
    dropdown2RowTxtStyle: { color: "#444", textAlign: "left" },
});

export default Productregist