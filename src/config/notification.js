import * as Notifications from 'expo-notifications';

export async function schedulePushNotification(title, body, seconds) {
    await Notifications.scheduleNotificationAsync({
        content: {
        title: title,
        body: body,
        data: { data: 'goes here' },
        },
        trigger: { seconds: seconds},
    });
}

export async function nowPushNotification(title, body) {
    await Notifications.scheduleNotificationAsync({
        content: {
        title: title,
        body: body,
        data: { data: 'goes here' },
        },
        trigger: null,
    });
}

export async function customPushNotification(title, body, trigger){
    await Notifications.scheduleNotificationAsync({
        content: {
        title: title,
        body: body,
        data: { data: 'goes here' },
        },
        trigger: trigger,
    });
}