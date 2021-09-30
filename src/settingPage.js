import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    Dimensions,
    BackHandler,
    Alert,
    View,
    TouchableWithoutFeedback
} from 'react-native';

import { useNavigation } from '@react-navigation/core';

import AsyncStorage from '@react-native-async-storage/async-storage';
import AutoHeightImage from 'react-native-auto-height-image';
import ToggleSwitch from 'toggle-switch-react-native'

import { useRecoilState } from 'recoil';
import { darkmode, floor3rd } from '../atoms/atom';

const back = require('../img/light/back.png')

const chwidth = Dimensions.get('window').width

const rightarrow = require('../newimg/all/rightarrow.png')
const settingAxe_light = require('../newimg/light/settingAxe.png')
const settingAxe_dark = require('../newimg/dark/settingAxe.png')



const SettingPage = () => {
    const navigation = useNavigation()

    // 백핸들러
    const backAction = () => {
        navigation.goBack()
        return true;
    };
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);

        return () =>
            BackHandler.removeEventListener("hardwareBackPress", backAction);
    }, []);
    // 백핸들러 끝

    const [atdarkmode, setAtdarkmode] = useRecoilState(darkmode); //다크모드
    const [atfloor3rd, setatfloor3rd] = useRecoilState(floor3rd); //3층 설정

    const [expAlert, setExpAlert] = useState(true);



    const setfloor3rd = async (value) => {
        try {
            await AsyncStorage.setItem('@floor3rd', value)
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <SafeAreaView style={{ backgroundColor: 'white', width: '100%', height: '100%' }}>
            {/* 헤더 시작 */}
            <View style={{ width: '100%', height: 60, justifyContent: 'center' }}>

                <View style={{ marginLeft: 20, width: chwidth - 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <View style={{ width: 40, height: 40 }}>
                    </View>

                    <Text style={{ fontSize: 21, color: atdarkmode === 'light' ? 'black' : 'white', fontWeight: 'bold' }}>설정</Text>

                    {/* < 시작 */}
                    <TouchableWithoutFeedback onPress={() => { navigation.goBack(); }}>
                        <View style={{ width: 40, height: 40, borderRadius: 25, alignItems: 'center', justifyContent: 'center', }}>
                            <AutoHeightImage source={settingAxe_light} width={18}></AutoHeightImage>
                        </View>
                    </TouchableWithoutFeedback>
                    {/* < 끝 */}

                </View>

            </View>
            {/* 헤더 끝 */}

            {/* 본문 시작 */}
            <View style={{ flex: 1 }}>

                {/*  */}
                <View style={{ width: chwidth - 60, height: 60, marginLeft: 30, marginTop: 20, }}>
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>비밀번호 변경</Text>
                        <AutoHeightImage source={rightarrow} width={10}></AutoHeightImage>
                    </View>
                </View>
                <View style={{ width: '100%', borderWidth: 0.2, borderColor: 'gray' }}></View>
                {/* // */}

                {/*  */}
                <View style={{ width: chwidth - 60, height: 80, marginLeft: 30 }}>
                    <View style={{ flex: 1, alignItems: 'flex-start', justifyContent: 'space-evenly' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>냉장고 칸수 설정</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>냉장고 칸수 설정</Text>

                    </View>

                </View>
                <View style={{ width: '100%', borderWidth: 0.2, borderColor: 'gray' }}></View>
                {/* // */}

                <View style={{ width: chwidth - 60, height: 60, marginLeft: 30 }}>
                    <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>유통기한 알림</Text>
                        <ToggleSwitch
                            isOn={expAlert}
                            onColor="blue"
                            offColor="gray"
                            size="small"
                            onToggle={isOn => {
                                console.log("changed to : ", isOn)
                                setExpAlert(isOn);
                            }}
                        />
                    </View>
                </View>

            </View>
            {/* 본문 끝 */}


        </SafeAreaView>
    )
}

export default SettingPage