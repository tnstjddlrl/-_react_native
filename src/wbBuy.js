import React, { useRef, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    Dimensions
} from 'react-native';
import WebView from 'react-native-webview';

const WbBuy = () => {
    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>
            <WebView
                source={{ uri: 'https://msearch.shopping.naver.com/search/all?query=부케가르니%20핸드크림&bt=2&frm=MOSCPRO' }}
                style={{}}
            />
        </SafeAreaView>
    )
}

export default WbBuy