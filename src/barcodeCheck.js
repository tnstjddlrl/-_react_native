import axios from 'axios';
import React, { useRef, useState } from 'react';
const cheerio = require('cheerio');
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions,
    Alert,
    TouchableWithoutFeedback
} from 'react-native';

import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import AutoHeightImage from 'react-native-auto-height-image';

const chwidth = Dimensions.get('screen').width
const chheight = Dimensions.get('screen').height

const back = require('../img/light/back.png')



export default BarcodeCheck = () => {
    const camera = useRef()
    const [barcc, setBarcc] = useState('바코드 탐지중!')
    const [product, setproduct] = useState('')



    function barcodeCheck(pp) {
        // 8809482500662
        axios.get('http://www.koreannet.or.kr/home/hpisSrchGtin.gs1?gtin=' + pp,
        ).then(function (response) {
            // console.log(response);
            const $ = cheerio.load(response.data);

            var test = $('div.productDetailView').find('div.productTit').text().replace(/(\s*)/g, "");

            console.log(test.substring(13, test.length))
            setproduct(test.substring(13, test.length))
        }).catch(function (error) {
            Alert.alert('인터넷 연결을 확인')
            console.log(error);
        })
    }


    return (
        <SafeAreaView style={{ width: '100%', height: '100%', alignItems: "center", backgroundColor: 'white' }}>
            <RNCamera
                ref={camera}
                style={{ width: chwidth, height: chheight - 230, alignSelf: "center", backgroundColor: 'white', marginBottom: -40 }}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.auto}
                androidCameraPermissionOptions={{
                    title: '카메라 사용 권한',
                    message: '카메라 사용 권한 허용이 필요합니다.',
                    buttonPositive: '확인',
                    buttonNegative: '거절',
                }}

                onBarCodeRead={(data) => {
                    setTimeout(() => {
                        barcodeCheck(data.data)
                    }, 500);
                }}>
                <BarcodeMask
                    width={300} height={200} showAnimatedLine={true} outerMaskOpacity={0.4} animatedLineColor={'red'}
                />
            </RNCamera>

            {/* <Text>{barcc}</Text>
            <Text>{product}</Text> */}

            {/* 푸터 시작  */}
            <View style={{ width: '100%', borderTopLeftRadius: 40, borderTopRightRadius: 50, backgroundColor: 'white' }}>
                <View style={{ width: chwidth - 20, height: '100%', marginLeft: 10, alignItems: 'center', marginTop: 20 }}>
                    <Text style={{ width: chwidth - 100, textAlign: 'center', fontSize: 15, }}>인식이 안되거나 바코드가 없는 경우 아래에 {'\n'} 직접등록 버튼을 이용해주세요</Text>

                    <TouchableWithoutFeedback onPress={() => { }}>
                        <View style={{ width: chwidth - 40, marginLeft: 10, marginTop: 20, marginBottom: 20, borderRadius: 50, backgroundColor: 'rgb(9,24,255)', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', margin: 15 }}>직접등록</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>

            </View>
            {/* 푸터 끝 */}

            {/* 헤더 시작 */}
            <View style={{ width: '100%', height: 60, justifyContent: 'center', position: 'absolute', backgroundColor: 'rgba(255, 255, 255,0.4)' }}>

                <View style={{ marginLeft: 20, width: chwidth - 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    {/* < 시작 */}
                    <TouchableWithoutFeedback onPress={() => { console.log('뒤클릭') }}>
                        <View style={{ width: 40, height: 40, borderRadius: 25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }}>
                            <AutoHeightImage source={back} width={30}></AutoHeightImage>
                        </View>
                    </TouchableWithoutFeedback>
                    {/* < 끝 */}

                    <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>바코드를 찍어주세요</Text>


                    <View style={{ width: 40, height: 40 }}>

                    </View>


                </View>

            </View>
            {/* 헤더 끝 */}

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
});