import axios from 'axios';
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

const Reservation = () => {
    let date1 = new Date(Date.now());
    let date2 = new Date(Date.now());

    date1.setHours(16, 30, 0, 0)
    date1.setDate(date1.getDate() + 1)


    console.log(date1.valueOf())
    console.log(date1.valueOf() - date2.valueOf())


    return (
        <View>
            <Text>예약알림 테스트</Text>
        </View>
    )
}

export default Reservation