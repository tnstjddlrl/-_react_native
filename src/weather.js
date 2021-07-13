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
    const [uvString, setUvString] = useState('')

    const [pm10, setPm10] = useState(0)
    const [pm25, setPm25] = useState(0)

    const [totalAir, setTotalAir] = useState('측정중')

    useEffect(() => {

        Geolocation.getCurrentPosition(
            (position) => {

                //현재 온도 받아오기
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


                //오늘 최고 최저 온도 받아오기 및 자외선 지수
                axios.get('https://api.openweathermap.org/data/2.5/onecall?lat=' + Math.round(position.coords.latitude * 100) / 100 + '&lon=' + Math.round(position.coords.longitude * 100) / 100 + '&exclude=current&appid=4c0e7c89ac35917a4adadc0c95b8392c',
                ).then(function (response) {

                    setdayUv(response.data.daily[0].uvi)
                    setdayMaxTemp(response.data.daily[0].temp.max - 273.15)
                    setdayMinTemp(response.data.daily[0].temp.min - 273.15)

                    if (response.data.daily[0].uvi < 2) {
                        setUvString('낮음')
                    } else if (response.data.daily[0].uvi >= 2 && response.data.daily[0].uvi < 5) {
                        setUvString('보통')
                    } else if (response.data.daily[0].uvi >= 5 && response.data.daily[0].uvi <= 7) {
                        setUvString('높음')
                    } else if (response.data.daily[0].uvi > 7) {
                        setUvString('매우 높음')
                    } else {
                        setUvString('서버 오류')
                    }

                }).catch(function (error) {
                    // handle error
                    console.log(error);
                }).then(function () {
                    // always executed
                });

                //미세먼지 및 종합대기상황
                axios.get('http://api.openweathermap.org/data/2.5/air_pollution?lat=' + Math.round(position.coords.latitude * 100) / 100 + '&lon=' + Math.round(position.coords.longitude * 100) / 100 + '&appid=4c0e7c89ac35917a4adadc0c95b8392c',
                ).then(function (response) {
                    console.log(response.data.list[0].components.pm10)
                    console.log(response.data.list[0].components.pm2_5)
                    console.log(response.data.list[0].main.aqi)

                    setPm10(response.data.list[0].components.pm10)
                    setPm25(response.data.list[0].components.pm2_5)


                    switch (response.data.list[0].main.aqi) {
                        case 1:
                            setTotalAir('매우 좋음')
                            break;
                        case 2:
                            setTotalAir('좋음')
                            break;
                        case 3:
                            setTotalAir('보통')
                            break;
                        case 4:
                            setTotalAir('나쁨')
                            break;
                        case 5:
                            setTotalAir('매우 나쁨')
                            break;

                        default:
                            setTotalAir('서버 오류')
                            break;
                    }

                }).catch(function (error) {
                    // handle error
                    console.log(error);
                }).then(function () {
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

                <Text> 자외선 지수 : {dayUv} ( {uvString} )</Text>
                <Text></Text>
                <Text> 미세먼지 : {pm10.toFixed(0)} </Text>
                <Text > 초미세먼지 : {pm25.toFixed(0)} </Text>
                <Text> 종합 대기상황 : {totalAir} </Text>
            </View>
        </View>
    )
}

export default Weather