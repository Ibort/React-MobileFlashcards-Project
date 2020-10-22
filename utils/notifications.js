import * as Notifications from 'expo-notifications'
import * as Permissions from 'expo-permissions'
import AsyncStorage from '@react-native-community/async-storage'

const NOTIFICATION_KEY = 'MobileFlashscards:notifications'
const notificationHour = 18
const notificationMinute = 0
export const notificationDate = new Date()
notificationDate.setHours(notificationHour)
notificationDate.setMinutes(notificationMinute)


export function clearLocalNotification () {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
      .then(Notifications.cancelAllScheduledNotificationsAsync)
  }
  
  export function setLocalNotification () {
    AsyncStorage.getItem(NOTIFICATION_KEY)
      .then(JSON.parse)
      .then((data) => {
        if (data === null) {
          Permissions.askAsync(Permissions.NOTIFICATIONS)
            .then(({ status }) => {
              if (status === 'granted') {
                Notifications.cancelAllScheduledNotificationsAsync() 
                Notifications.setNotificationHandler({
                    handleNotification: async () => {
                      return {
                        shouldShowAlert: true,
                        shouldPlaySound: true,
                        shouldSetBadge: true,
                      };
                    },
                  });
                Notifications.scheduleNotificationAsync({
                    content: {title: 'QuizTime!',body: "Don't forget to take your quiz for today!",},                  
                    trigger: {
                        hour: notificationHour,
                        minute: notificationMinute,
                        repeats: true 
                    },                
                })
                
                AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
              }
            })
        }
      })
  }