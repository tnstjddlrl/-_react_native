import React, { useRef, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';

import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import { useRecoilState } from 'recoil';

import { imagebase64 } from '../atoms/atom';
import { useNavigation } from '@react-navigation/native';
import AutoHeightImage from 'react-native-auto-height-image';
import axios from 'axios';

const chwidth = Dimensions.get('screen').width
const chheight = Dimensions.get('screen').height

const cameras = require('../img/light/camera.png')
const back = require('../img/light/back.png')

export default PictureTake = () => {

    const camera = useRef()
    const navigation = useNavigation()

    const [atbase64, setatbase64] = useRecoilState(imagebase64)

    const takePicture = async function (camera) {
        const options = { quality: 0.3, base64: true, width: 800, fixOrientation: true };
        const data = await camera.takePictureAsync(options);
        //  eslint-disable-next-line
        setatbase64(data.base64);
        console.log(data.pictureOrientation);

        // imgpost(data.base64);
        setTimeout(() => {
            navigation.navigate('μ νμμΉ')

        }, 300);
    };

    function imgpost(img) {
        try {
            axios.post('http://ip1004.hostingbox.co.kr/post.php', {
                params: {
                    type: 'imgtest',
                    img: img

                }
            }).then(async (res) => {
                console.log(res)
            })
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <SafeAreaView style={{ width: '100%', height: '100%', alignItems: "center", backgroundColor: 'white' }}>
            <RNCamera
                ref={camera}
                style={{ width: chwidth, height: '100%', alignSelf: "center", backgroundColor: 'white' }}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.auto}
                androidCameraPermissionOptions={{
                    title: 'μΉ΄λ©λΌ μ¬μ©',
                    message: 'μΉ΄λ©λΌ κΆνμ΄ νμν©λλ€!',
                    buttonPositive: 'νμΈ',
                    buttonNegative: 'μ·¨μ',
                }}>

                {({ camera, status, recordAudioPermissionStatus }) => {
                    if (status !== 'READY') return <PendingView />;
                    return (
                        <View style={{ alignItems: 'center', justifyContent: 'flex-end', flex: 1 }}>
                            <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                                {/* <View style={{ width: 50, height: 50, borderRadius: 40, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{}}>μ΄¬μ</Text>
                                </View> */}
                                <AutoHeightImage source={cameras} width={110}></AutoHeightImage>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            </RNCamera>

            {/* ν€λ μμ */}
            <View style={{ width: '100%', height: 60, justifyContent: 'center', position: 'absolute', backgroundColor: 'rgba(51, 51, 51,0.6)' }}>

                <View style={{ marginLeft: 20, width: chwidth - 40, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    {/* < μμ */}
                    <TouchableWithoutFeedback onPress={() => { console.log('λ€ν΄λ¦­'), navigation.goBack() }}>
                        <View style={{ width: 40, height: 40, borderRadius: 25, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center', }}>
                            <AutoHeightImage source={back} width={30}></AutoHeightImage>
                        </View>
                    </TouchableWithoutFeedback>
                    {/* < λ */}

                    <Text style={{ fontSize: 20, color: 'black', fontWeight: 'bold' }}>νμ₯νμ μ°μ΄μ£ΌμΈμ</Text>


                    <View style={{ width: 40, height: 40 }}>

                    </View>


                </View>

            </View>
            {/* ν€λ λ */}




        </SafeAreaView>
    )
}

const PendingView = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: 'lightgreen',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
        <Text>Waiting</Text>
    </View>
);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        width: 60,
        height: 60,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'white',
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 30
    },
});