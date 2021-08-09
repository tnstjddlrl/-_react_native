import PushNotification, { Importance } from "react-native-push-notification";

import PushNotificationIOS from "@react-native-community/push-notification-ios";

PushNotification.configure({
    onRegister: function (token) {
        console.log("TOKEN:", token);
    },
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);

        notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onAction: function (notification) {
        console.log("ACTION:", notification.action);
        console.log("NOTIFICATION:", notification);

        // process the action
    },
    onRegistrationError: function (err) {
        console.error(err.message, err);
    },
    permissions: {
        alert: true,
        badge: true,
        sound: true,
    },
    popInitialNotification: true,

    requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel(
    {
        channelId: 'com.notify', // (required)
        channelName: 'com.notify', // (required)
        channelDescription: 'com.notify', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
    },
    (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);



export const LocalNotification = () => {
    PushNotification.localNotificationSchedule({
        channelId: 'com.notify',
        title: '테스트',
        message: '안녕하세요! 테스트 알림입니다!', // (required)
        date: new Date(Date.now() + 1 * 1000),
        playSound: true, // (optional) default: true
        soundName: 'default',
    });
};