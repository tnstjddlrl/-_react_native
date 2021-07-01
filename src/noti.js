
import PushNotification from "react-native-push-notification";

PushNotification.createChannel(
    {
        channelId: 'com.notify', // (required)
        channelName: 'com.notify', // (required)
        channelDescription: 'com.notify', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);


export const LocalNotification = () => {
    PushNotification.localNotificationSchedule({
        channelId: 'com.notify',
        message: 'My local push notification', // (required)
        date: new Date(Date.now() + 3 * 1000),
        playSound: true, // (optional) default: true
        soundName: 'default',
    });
};