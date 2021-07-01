import React, { useRef, useState, useEffect } from 'react';
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

import Geolocation from 'react-native-geolocation-service';
import axios from 'axios';

const Weather = () => {

    const [curTemp, setcurTemp] = useState(0)
    const [curHumi, setcurHumi] = useState(0)

    const [dayMaxTemp, setdayMaxTemp] = useState(0)
    const [dayMinTemp, setdayMinTemp] = useState(0)

    const [dayUv, setdayUv] = useState(0)


    useEffect(() => {

        Geolocation.getCurrentPosition(
            (position) => {
                // console.log(position.coords.latitude);
                // console.log(position.coords.longitude);

                // 

                axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + Math.round(position.coords.latitude * 100) / 100 + '&lon=' + Math.round(position.coords.longitude * 100) / 100 + '&exclude=daily&appid=4c0e7c89ac35917a4adadc0c95b8392c',
                ).then(function (response) {
                    setcurHumi(response.data.current.humidity);
                    setcurTemp(response.data.current.temp - 273.15);
                    // setcurTemp((old) => Math.round(...old * 1000) / 1000)
                })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });


                axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + Math.round(position.coords.latitude * 100) / 100 + '&lon=' + Math.round(position.coords.longitude * 100) / 100 + '&exclude=current&appid=4c0e7c89ac35917a4adadc0c95b8392c',
                ).then(function (response) {
                    setdayUv(response.data.daily[0].uvi)
                    setdayMaxTemp(response.data.daily[0].temp.max - 273.15)
                    setdayMinTemp(response.data.daily[0].temp.min - 273.15)
                })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

    }, [])

    return (
        <View>
            <Text>현재 위치 기온 및 습도 정보 확인</Text>

            <View style={{ marginTop: 50 }}>
                <Text> 현재 온도 : {curTemp.toFixed(1)}</Text>
                <Text> 현재 습도 : {curHumi}</Text>

                <Text> 최고 온도 : {dayMaxTemp.toFixed(1)}</Text>
                <Text> 최저 온도 : {dayMinTemp.toFixed(1)}</Text>

                <Text> 자외선 지수 : {dayUv}</Text>
                {dayUv < 2 && <Text>낮음</Text>}
                {2 < dayUv && dayUv < 5 && <Text>보통</Text>}
                {5 < dayUv && dayUv < 7 && <Text>높음</Text>}
                {7 < dayUv && <Text>매우 높음</Text>}
            </View>
        </View>
    )
}

export default Weather