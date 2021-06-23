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
    TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';

import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import { useRecoilState } from 'recoil';

import { imagebase64 } from '../atoms/atom';
import { useNavigation } from '@react-navigation/native';

const chwidth = Dimensions.get('screen').width
const chheight = Dimensions.get('screen').height

export default PictureTake = () => {
    const camera = useRef()
    const [barcc, setBarcc] = useState('바코드 탐지중!')
    const [product, setproduct] = useState('')

    const navigation = useNavigation()

    const [atbase64, setatbase64] = useRecoilState(imagebase64)

    const takePicture = async function (camera) {
        const options = { quality: 0.5, base64: true };
        const data = await camera.takePictureAsync(options);
        //  eslint-disable-next-line
        setatbase64(data.base64)
        console.log(data.base64);

        navigation.navigate('사진보기')
    };


    return (
        <View style={{ justifyContent: "center", alignItems: "center", backgroundColor: 'white' }}>
            <RNCamera
                ref={camera}
                style={{ width: chwidth, height: chheight - 200, alignSelf: "center", backgroundColor: 'white' }}
                type={RNCamera.Constants.Type.back}
                flashMode={RNCamera.Constants.FlashMode.auto}
                androidCameraPermissionOptions={{
                    title: '카메라 사용',
                    message: '카메라 권한이 필요합니다!',
                    buttonPositive: '확인',
                    buttonNegative: '취소',
                }}
            // onGoogleVisionBarcodesDetected={({ barcodes }) => {
            //   console.log(barcodes);
            // }}

            >
                {({ camera, status, recordAudioPermissionStatus }) => {
                    if (status !== 'READY') return <PendingView />;
                    return (
                        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
                            <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                                <Text style={{ fontSize: 14 }}> SNAP </Text>
                            </TouchableOpacity>
                        </View>
                    );
                }}
            </RNCamera>

        </View>
    )
}

const PendingView = () => (
    <View
        style={{
            flex: 1,
            backgroundColor: 'lightgreen',
            justifyContent: 'center',
            alignItems: 'center',
        }}
    >
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
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});