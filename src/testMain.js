import { useNavigation } from '@react-navigation/native';
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
    TouchableWithoutFeedback
} from 'react-native';
import { LocalNotification } from './noti';


export default TestMain = () => {

    const navigation = useNavigation()

    LocalNotification()

    return (
        <View>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('바코드체크')}>
                <Text style={{ fontSize: 20 }}>바코드 스캔</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('사진촬영')}>
                <Text style={{ fontSize: 20 }}>사진 촬영</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('스크롤메인')}>
                <Text style={{ fontSize: 20 }}>스크롤 메인</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => navigation.navigate('날씨테스트')}>
                <Text style={{ fontSize: 20 }}>날씨 테스트</Text>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('구매테스트')}>
                <Text style={{ fontSize: 20 }}>구매 테스트</Text>
            </TouchableWithoutFeedback>
        </View>
    )
}