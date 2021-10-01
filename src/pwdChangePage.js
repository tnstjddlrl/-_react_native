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

if (Text.defaultProps == null) Text.defaultProps = {};
Text.defaultProps.allowFontScaling = false;

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';
import { useRecoilState } from 'recoil';
import { darkmode, pid } from '../atoms/atom';

const chwidth = Dimensions.get('window').width


const PwdChangePage = () => {
    return (
        <SafeAreaView>

        </SafeAreaView>
    )
}

export default PwdChangePage;