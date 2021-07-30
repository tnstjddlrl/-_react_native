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
    TextInput,
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
import AutoHeightImage from 'react-native-auto-height-image';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const chwidth = Dimensions.get('window').width

const check_img = require('../img/light/check.png')
const loca_img = require('../img/light/location_icon.png')
const back = require('../img/light/back.png')


const Login = () => {

    const navigation = useNavigation()

    const [id, setid] = useState('');
    const [pwd, setpwd] = useState('');

    const request = async () => {
        console.log(id + pwd)
        await axios.get('http://ip1004.hostingbox.co.kr/', {
            params: {
                type: 'login',
                id: id,
                pw: pwd
            }
        }).then(async (res) => {

            console.log('리턴 : ' + res.data)
            if (res.data == 'login_fail') {
                Alert.alert('아이디 혹은 비밀번호 오류입니다!')
            } else if (res.data == 'login_suc') {
                navigation.navigate('실제 메인')
            }

        })
    }

    return (
        <NativeBaseProvider>
            <SafeAreaView style={{ flex: 1, backgroundColor: 'rgb(240,240,240)' }}>

                {/* 헤더 시작 */}
                <View style={{ width: '100%', height: 60, justifyContent: 'center' }}>
                    <View style={{ width: chwidth, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <Text style={{ fontSize: 23, color: 'black', fontWeight: 'bold' }}>로그인</Text>
                    </View>

                </View>
                {/* 헤더 끝 */}


                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                    <Text style={{ fontSize: 18, marginTop: 10 }}>로그인을 진행해 주세요.</Text>
                </View>

                <View style={{ width: chwidth - 40, borderRadius: 15, backgroundColor: 'white', marginLeft: 20, marginTop: 40, elevation: 10, marginBottom: 20 }}>
                    <View style={{ width: chwidth - 80, marginLeft: 20, marginTop: 20, justifyContent: 'center' }}>

                        {/* 아이디 */}
                        <Text style={{ fontSize: 18, marginTop: 10, color: 'black' }}>아이디</Text>
                        <View style={{ borderWidth: 1, borderColor: 'rgb(204,204,204)', height: 40, marginTop: 10, borderRadius: 3 }}>
                            <TextInput onChangeText={setid} value={id} style={{ height: 40, width: chwidth - 100, marginLeft: 10 }} placeholder={'아이디를 입력해주세요.'}></TextInput>
                        </View>

                        {/* 아이디끝 */}

                        {/* 비밀번호 */}
                        <Text style={{ fontSize: 18, marginTop: 20 }}>비밀번호</Text>
                        <View style={{ borderWidth: 1, borderColor: 'rgb(204,204,204)', height: 40, marginTop: 10, borderRadius: 3, marginBottom: 30 }}>
                            <TextInput onChangeText={setpwd} value={pwd} style={{ height: 40, width: chwidth - 100, marginLeft: 10 }} placeholder={'비밀번호를 입력해주세요.'}></TextInput>
                        </View>

                        {/* 비밀번호끝 */}

                    </View>
                </View>


                {/* 하단 버튼 시작 */}
                <View style={{ width: chwidth - 40, marginLeft: 20, height: 90, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <View style={{ borderRadius: 10, borderWidth: 1, borderColor: 'rgb(30,40,245)', backgroundColor: 'white', width: chwidth / 2 - 30, height: 60, alignItems: 'center', justifyContent: 'center', elevation: 10, }}>
                        <Text style={{ fontSize: 23, color: 'rgb(30,40,245)', fontWeight: 'bold' }}>회원가입</Text>
                    </View>

                    {/* 파랑버튼 */}
                    <TouchableWithoutFeedback onPress={() => { request() }}>
                        <View style={{ borderRadius: 10, backgroundColor: 'rgb(30,40,245)', width: chwidth / 2 - 30, height: 60, alignItems: 'center', justifyContent: 'center', elevation: 10, }}>
                            <Text style={{ fontSize: 23, color: 'white', fontWeight: 'bold' }}>로그인</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

                {/* 하단 버튼 끝 */}

            </SafeAreaView>
        </NativeBaseProvider >
    )
}

export default Login