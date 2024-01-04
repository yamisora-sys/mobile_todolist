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