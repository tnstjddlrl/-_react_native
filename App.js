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

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import barcodeCheck from './src/barcodeCheck';
import pictureTake from './src/pictureTake';
import testMain from './src/testMain';
import PictureCheck from './src/pictureCheck';
import ScrollMain from './src/scrollMain';

const Stack = createStackNavigator();


export default APP = () => {
  return (
    <RecoilRoot>
      <NavigationContainer>
        <Stack.Navigator headerMode={'none'}>
          <Stack.Screen name="메인" component={testMain} />
          <Stack.Screen name="바코드체크" component={barcodeCheck} />
          <Stack.Screen name="사진촬영" component={pictureTake} />
          <Stack.Screen name="사진보기" component={PictureCheck} />
          <Stack.Screen name="스크롤메인" component={ScrollMain} />
        </Stack.Navigator>
      </NavigationContainer>
    </RecoilRoot>
  )
}


