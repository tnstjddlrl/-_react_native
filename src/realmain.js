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

import AutoHeightImage from 'react-native-auto-height-image';

const chwidth = Dimensions.get('window').width

const Realmain = () => {

    const logo = require('../img/light/logo.png');
    const tuto = require('../img/light/tuto.png');



    return (
        <SafeAreaView style={{ width: '100%', height: '100%' }}>

            {/* 헤더 시작 */}
            <View style={{ width: '100%', justifyContent: 'center', marginBottom: 10, elevation: 15, backgroundColor: 'white' }}>
                <View style={{ width: chwidth - 40, marginLeft: 20, marginTop: 20, marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <AutoHeightImage source={logo} width={chwidth / 3}></AutoHeightImage>
                    <AutoHeightImage source={tuto} width={chwidth / 12}></AutoHeightImage>
                </View>
            </View>
            {/* 헤더 끝 */}

            <View style={{ flex: 1 }}>


            </View>


            <View style={{ width: '100%', height: 100, borderTopLeftRadius: 40, borderTopRightRadius: 40, backgroundColor: 'gray' }}>


            </View>


        </SafeAreaView>
    )
}

export default Realmain;