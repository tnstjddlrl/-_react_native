import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
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

import database from '@react-native-firebase/database';


import AutoHeightImage from 'react-native-auto-height-image';
import { useRecoilState } from 'recoil';
import { imagebase64, pcategory, pexp, pexpDate, placation, pname, plist, pid, darkmode, floor3rd } from '../atoms/atom';

const chwidth = Dimensions.get('window').width

const loca_img = require('../img/light/location_icon.png')
const back = require('../img/light/back.png')

const check_img = require('../newimg/all/check.png')



const ProductAddr = () => {

    const navigation = useNavigation()

    const [u1, setu1] = useState('a');


    const [atid, setAtid] = useRecoilState(pid); //사용자 아이디
    const [atname, setAtname] = useRecoilState(pname)   //제품이름
    const [atcategory, setAtcategory] = useRecoilState(pcategory) //제품카테고리
    const [atexp, setAtexp] = useRecoilState(pexp)  //제품 유통기한
    const [atexpDate, setAtexpDate] = useRecoilState(pexpDate) //제품유통기한 알람일
    const [atlocation, setatlocation] = useRecoilState(placation) //위 아래 칸 설정
    const [atbase64, setatbase64] = useRecoilState(imagebase64) //베이스64로 묶은 이미지

    const [atlist, setatlist] = useRecoilState(plist) //제품 리스트

    const [atdarkmode, setAtdarkmode] = useRecoilState(darkmode); //다크모드

    const [atfloor3rd, setatfloor3rd] = useRecoilState(floor3rd); //3층 설정


    // 상태 불러오기!
    useEffect(() => {

    }, [])


    // 각각 클릭이벤트 통합
    function clickOK() {
        if (u1 === 'a') {
            Alert.alert('칸 선택이 되지 않았습니다.')
            return
        } else {
            setatlocation(u1)

            setTimeout(() => {
                try {
                    axios.post('https://ip0154.cafe24.com/restapi/post.php', {
                        type: 'new_product',
                        id: atid,
                        name: atname,
                        category: atcategory,
                        expiration: atexp,
                        alert_config: atexp == atexpDate ? 0 : 1,
                        alert_date: atexpDate,
                        location: u1,
                        img: atbase64
                        ,
                        headers: {
                            'Content-Type': 'application/json'
                        }

                    }).then(async (res) => {
                        console.log(res)
                        console.log(res.data)

                        if (res.data == 'register_suc') {
                            setAtname('')
                            setAtcategory('')
                            setAtexp('')
                            setAtexpDate('')
                            setatlocation('')
                            setatbase64('')

                            database()
                                .ref('/users/' + atid)
                                .set('yes')
                                .then(() => {
                                    console.log('Data set.')
                                    // Alert.alert('요청완료', '냉장고에 내부사진 촬영을 요청하였습니다!')
                                    navigation.navigate('실제 메인')
                                });

                        } else {
                            Alert.alert('서버 오류입니다.', '잠시후 다시 시도해주세요.')
                        }
                    })

                } catch (error) {
                    console.log(error)
                }
            }, 300);
            return
        }
    }


    const ImageItem = (prop) => {
        return (
            <View style={{ width: chwidth / 9, height: 110, borderRadius: 10, backgroundColor: 'rgb(204,204,204)' }}>
                <Image source={{ uri: 'http://ip1004.hostingbox.co.kr' + prop.img }} style={{ width: chwidth / 9, height: 110, borderRadius: 10 }} ></Image>
            </View>
        )
    }



    const ImageUPush = () => {
        var list = []
        var pushs = 0

        for (var i = 0; i < atlist.length; i++) {
            if (atlist[i].location == 'u' && pushs < 6) {
                list.push(<ImageItem key={i} img={atlist[i].img}></ImageItem>)
                pushs++
            }
        }

        for (var i = 0; i < 6 - pushs; i++) {
            list.push(<ImageItem key={i} img={'none'}></ImageItem>)
        }

        return list
    }


    const ImageDPush = () => {
        var list = []
        var pushs = 0

        for (var i = 0; i < atlist.length; i++) {
            if (atlist[i].location == 'd' && pushs < 6) {
                list.push(<ImageItem key={i} img={atlist[i].img}></ImageItem>)
                pushs++
            }
        }

        for (var i = 0; i < 6 - pushs; i++) {
            list.push(<ImageItem key={i} img={'none'}></ImageItem>)
        }

        return list
    }

    const ImageTPush = () => {
        var list = []
        var pushs = 0

        for (var i = 0; i < atlist.length; i++) {
            if (atlist[i].location == 't' && pushs < 6) {
                list.push(<ImageItem key={i} img={atlist[i].img}></ImageItem>)
                pushs++
            }
        }

        for (var i = 0; i < 6 - pushs; i++) {
            list.push(<ImageItem key={i} img={'none'}></ImageItem>)
        }

        return list
    }

    return (

        <SafeAreaView style={{ flex: 1, backgroundColor: atdarkmode === 'light' ? 'rgb(240,240,240)' : 'black' }}>

            {/* 헤더 시작 */}
            <View style={{ width: '100%', height: 60, justifyContent: 'center' }}>
                <View style={{ marginLeft: 20, width: chwidth - 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* < 시작 */}
                    <TouchableWithoutFeedback onPress={() => { navigation.goBack() }}>
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

                <ScrollView style={{}} showsVerticalScrollIndicator={false}>
                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <Text style={{ fontSize: 18, marginTop: 10, color: atdarkmode === 'light' ? 'black' : 'white' }}>화장품을 냉장고 안에 넣어주세요.</Text>
                        <Text style={{ fontSize: 18, marginTop: 10, color: atdarkmode === 'light' ? 'black' : 'white' }}>보관한 층을 선택해주세요.</Text>

                    </View>

                    {/* 3층! */}
                    {atfloor3rd == 'on' &&
                        <TouchableWithoutFeedback onPress={() => setu1('t')}>
                            {atdarkmode === 'light' ?

                                <View style={{ width: chwidth - 40, borderRadius: 15, borderColor: u1 == 't' ? 'black' : 'white', borderWidth: 2.5, backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(26,26,26)', marginLeft: 20, marginTop: 40, elevation: 10, marginBottom: 0 }}>
                                    <View style={{ width: chwidth - 60, marginLeft: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center', }}>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            {u1 == 't' ?
                                                <AutoHeightImage source={check_img} width={20}></AutoHeightImage>
                                                :
                                                <View></View>
                                            }
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, color: atdarkmode === 'light' ? 'black' : 'white' }}>3층</Text>

                                        </View>

                                        {/* 개별 화장품 부분 */}
                                        <View style={{ width: chwidth - 100, flexDirection: 'row', marginBottom: 20, marginTop: 30, justifyContent: 'space-between' }}>
                                            <ImageTPush></ImageTPush>
                                        </View>
                                        {/* 개별 화장품 부분  끝*/}

                                    </View>
                                </View>

                                :

                                <View style={{ width: chwidth - 40, borderRadius: 15, borderColor: u1 == 't' ? 'white' : 'black', borderWidth: 2.5, backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(26,26,26)', marginLeft: 20, marginTop: 40, elevation: 10, marginBottom: 0 }}>
                                    <View style={{ width: chwidth - 60, marginLeft: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center', }}>

                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            {u1 == 't' ?
                                                <AutoHeightImage source={check_img} width={20}></AutoHeightImage>
                                                :
                                                <View></View>

                                            }
                                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, color: atdarkmode === 'light' ? 'black' : 'white' }}>3층</Text>

                                        </View>

                                        {/* 개별 화장품 부분 */}
                                        <View style={{ width: chwidth - 100, flexDirection: 'row', marginBottom: 20, marginTop: 30, justifyContent: 'space-between' }}>
                                            <ImageUPush></ImageUPush>
                                        </View>
                                        {/* 개별 화장품 부분  끝*/}

                                    </View>
                                </View>
                            }
                        </TouchableWithoutFeedback>
                    }

                    {/* 윗칸 끝 */}

                    {/* 윗칸 */}
                    <TouchableWithoutFeedback onPress={() => setu1('u')}>
                        {atdarkmode === 'light' ?

                            <View style={{ width: chwidth - 40, borderRadius: 15, borderColor: u1 == 'u' ? 'black' : 'white', borderWidth: 2.5, backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(26,26,26)', marginLeft: 20, marginTop: 20, elevation: 10, marginBottom: 20 }}>
                                <View style={{ width: chwidth - 60, marginLeft: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center', }}>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {u1 == 'u' ?
                                            <AutoHeightImage source={check_img} width={20}></AutoHeightImage>
                                            :
                                            <View></View>

                                        }
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, color: atdarkmode === 'light' ? 'black' : 'white' }}>2층</Text>

                                    </View>

                                    {/* 개별 화장품 부분 */}
                                    <View style={{ width: chwidth - 100, flexDirection: 'row', marginBottom: 20, marginTop: 30, justifyContent: 'space-between' }}>
                                        <ImageUPush></ImageUPush>
                                    </View>
                                    {/* 개별 화장품 부분  끝*/}

                                </View>
                            </View>

                            :

                            <View style={{ width: chwidth - 40, borderRadius: 15, borderColor: u1 == 'u' ? 'white' : 'black', borderWidth: 2.5, backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(26,26,26)', marginLeft: 20, marginTop: 20, elevation: 10, marginBottom: 20 }}>
                                <View style={{ width: chwidth - 60, marginLeft: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center', }}>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {u1 == 'u' ?
                                            <AutoHeightImage source={check_img} width={20}></AutoHeightImage>
                                            :
                                            <View></View>

                                        }
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, color: atdarkmode === 'light' ? 'black' : 'white' }}>2층</Text>

                                    </View>

                                    {/* 개별 화장품 부분 */}
                                    <View style={{ width: chwidth - 100, flexDirection: 'row', marginBottom: 20, marginTop: 30, justifyContent: 'space-between' }}>
                                        <ImageUPush></ImageUPush>
                                    </View>
                                    {/* 개별 화장품 부분  끝*/}

                                </View>
                            </View>
                        }
                    </TouchableWithoutFeedback>
                    {/* 윗칸 끝 */}


                    {/* 아래 칸 */}
                    <TouchableWithoutFeedback onPress={() => setu1('d')}>


                        {atdarkmode === 'light' ?
                            <View style={{ width: chwidth - 40, borderRadius: 15, backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(26,26,26)', borderColor: u1 == 'd' ? 'black' : 'white', borderWidth: 2.5, marginLeft: 20, marginTop: 5, elevation: 10, marginBottom: 20 }}>

                                <View style={{ width: chwidth - 60, marginLeft: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {u1 == 'd' ?
                                            <AutoHeightImage source={check_img} width={20}></AutoHeightImage>
                                            :
                                            <View></View>

                                        }
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, color: atdarkmode === 'light' ? 'black' : 'white' }}>1층</Text>

                                    </View>

                                    <View style={{ width: chwidth - 100, flexDirection: 'row', marginBottom: 20, marginTop: 30, justifyContent: 'space-between' }}>

                                        <ImageDPush></ImageDPush>

                                    </View>
                                </View>

                            </View>
                            :
                            <View style={{ width: chwidth - 40, borderRadius: 15, backgroundColor: atdarkmode === 'light' ? 'white' : 'rgb(26,26,26)', borderColor: u1 == 'd' ? 'white' : 'black', borderWidth: 2.5, marginLeft: 20, marginTop: 5, elevation: 10, marginBottom: 20 }}>

                                <View style={{ width: chwidth - 60, marginLeft: 10, marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        {u1 == 'd' ?
                                            <AutoHeightImage source={check_img} width={20}></AutoHeightImage>
                                            :
                                            <View></View>

                                        }
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 10, color: atdarkmode === 'light' ? 'black' : 'white' }}>1층</Text>

                                    </View>

                                    <View style={{ width: chwidth - 100, flexDirection: 'row', marginBottom: 20, marginTop: 30, justifyContent: 'space-between' }}>

                                        <ImageDPush></ImageDPush>

                                    </View>
                                </View>

                            </View>
                        }

                    </TouchableWithoutFeedback>
                    {/* 아래칸 끝 */}

                </ScrollView>

            </View>

            {/* 하단 버튼 시작 */}
            <View style={{ width: '100%', height: 90, alignItems: 'center', justifyContent: 'center' }}>
                {/* 파랑버튼 */}
                <TouchableWithoutFeedback onPress={() => {
                    Alert.alert(
                        "등록",
                        "화장품을 냉장고 내부에 보관하고 있는지 확인하여 주세요.\n확인 버튼을 누르면 등록과 동시에 내부 사진을 촬영합니다!",
                        [
                            {
                                text: "취소",
                                onPress: () => console.log("Cancel Pressed"),
                                style: "cancel"
                            },
                            { text: "확인", onPress: () => clickOK() }
                        ]
                    );
                }}>
                    <View style={{ borderRadius: 10, backgroundColor: atdarkmode === 'light' ? 'white' : 'black', borderWidth: 1.5, borderColor: atdarkmode === 'light' ? 'black' : 'white', width: chwidth - 40, height: 60, alignItems: 'center', justifyContent: 'center', elevation: 10, }}>
                        <Text style={{ fontSize: 23, color: atdarkmode === 'light' ? 'black' : 'white', fontWeight: 'bold' }}>확인</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            {/* 하단 버튼 끝 */}

        </SafeAreaView >
    )
}

export default ProductAddr