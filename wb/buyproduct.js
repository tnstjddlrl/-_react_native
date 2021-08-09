import React, { Component, useEffect } from 'react';
import { useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions,
    BackHandler,
    Alert, TouchableWithoutFeedback

} from 'react-native';

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

import { WebView } from 'react-native-webview';

import { useRecoilState } from 'recoil';
import { useNavigation } from '@react-navigation/native';

import { buypname, } from '../atoms/atom';


var rnw
var cbc = false;

const chwidth = Dimensions.get('window').width

const newlogo2 = require('../img/newlogo2.jpg')


const Buyproduct = () => {
    const navigation = useNavigation()

    const [atbuyname, setBuyatname] = useRecoilState(buypname)   //웹뷰 제품 이름

    var uri = 'https://msearch.shopping.naver.com/search/all?query=' + atbuyname


    useEffect(() => {
        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            function () {
                if (cbc && rnw) {
                    rnw.goBack();
                    return true;
                } else {
                    navigation.goBack();
                }
            }
        );
        return () => backHandler.remove();
    }, []);

    return (
        <View style={{ width: '100%', height: '100%' }}>

            <WebView
                ref={wb => { rnw = wb }}
                source={{ uri: uri }}
                style={{ width: '100%', height: '100%' }}
                onNavigationStateChange={(navState) => { cbc = navState.canGoBack; }}
            />


        </View>
    )
}

export default Buyproduct