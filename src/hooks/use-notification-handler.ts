import React, { useCallback, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import { navigate, navigationRef } from 'src/navigation';
import { Linking } from 'react-native';
import { delay } from 'src/assets/utils/js';
import { NOTIFICATION_TYPE } from 'catlog-shared';

// Define the structure of notification data
export interface NotificationData {
  type: string;
  [key: string]: any;
}

interface NavigationParams {
  screen: string;
  params: { [key: string]: any };
}

// mapping of notification types to screen names
const NOTIFICATION_TYPE_TO_SCREEN: Record<string, string> = {
  NEW_ORDER: 'OrderInfo',
  PAYMENT_RECEIVED_ORDER: 'Payments',
  PAYMENT_RECEIVED_BANK: 'Payments',
  PAYMENT_RECEIVED_INVOICE: 'Payments',
  KYC_APPROVED: 'Payments',
  KYC_DECLINED: 'Payments',
  WITHDRAWAL: null,
  SUBSCRIPTION_EXPIRING: 'ManageSubscription',
  TRIAL_EXPIRING: 'ManageSubscription',
  SUBSCRIPTION_CANCELLED: 'ManageSubscription',
  MILESTONE_PAYMENT: 'Payments',
  MILESTONE_VISIT: null,
  MILESTONE_ORDER: null,
  DELIVERY_STATUS: 'DeliveryDetails',
  CONVERSION: null,
  FUNDS_REVERSED: null,
};

// Additional params type for navigation
type NotificationNavigationParams = { notificationId?: string; [key: string]: any };

// Hook for handling notification navigation
const useNotificationHandler = () => {
  function getNavigationForNotification(notificationData: NotificationData): NavigationParams | null {
    const { type, ...rest } = notificationData;

    const screenName = NOTIFICATION_TYPE_TO_SCREEN[type];

    if (!screenName) {
      return null;
    }

    return { screen: screenName, params: rest };
  }

  // Handle navigation based on notification type
  const handleNotificationNavigation = async (
    notificationData: NotificationData,
    delayRoute = true,
    delayTime = 2000,
  ) => {
    
    if (notificationData?.type === NOTIFICATION_TYPE.GENERIC && notificationData.url !== undefined) {
      Linking.openURL(notificationData.url);
      return;
    }

    const screenParams = getNavigationForNotification(notificationData);

    if (delayRoute) await delay(delayTime);

    if (screenParams === null) {
      console.warn(`No screen mapped for notification type: ${notificationData.type}`);
      return;
    }

    // Linking.openURL(`catlog://order/${screenParams?.params?.id}`);

    // Navigate to the screen
    navigate(screenParams.screen, screenParams.params);
  };

  const handleForegroundNotification = async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
    if (remoteMessage) {
      try {
        // Optionally show a local notification
        await handleLocalNotification(remoteMessage);
      } catch (error) {
        console.error('Error handling foreground notification:', error);
      }
    }
  };

  // Handle local notification display
  const handleLocalNotification = async (notificationData: FirebaseMessagingTypes.RemoteMessage) => {
    // Use Expo Notifications to show a local notification
    await Notifications.scheduleNotificationAsync({
      content: {
        title: notificationData.notification?.title || 'New Notification',
        body: notificationData.notification?.body || '',
        data: notificationData,
      },
      trigger: null, // Show immediately
    });
  };

  const handleBackgroundNotification = async (remoteMessage: any, isBackground: boolean = false) => {
    if (remoteMessage?.data) {
      try {
      } catch (error) {
        console.error('Error handling background notification:', error);
      }
    }
  };

  const handleNotificationOpenApp = async (remoteMessage: any) => {
    if (remoteMessage?.data) {
      try {
        if (Object.keys(remoteMessage?.data ?? {}).length > 0) {
          const notificationData: NotificationData = remoteMessage?.data;
          handleNotificationNavigation(notificationData, true, 1500);
        }
      } catch (error) {
        console.error('Error handling background notification:', error);
      }
    }
  };

  const handleNotificationOpenAppFromQuitState = async (remoteMessage: any) => {
    if (remoteMessage?.data) {
      try {
        if (Object.keys(remoteMessage?.data ?? {}).length > 0) {
          const notificationData: NotificationData = remoteMessage?.data;
          handleNotificationNavigation(notificationData, true, 5000);
        }
      } catch (error) {
        console.error('Error handling background notification:', error);
      }
    }
  };

  return {
    handleNotificationNavigation,
    handleForegroundNotification,
    handleBackgroundNotification,
    handleNotificationOpenApp,
    handleNotificationOpenAppFromQuitState,
  };
};

export default useNotificationHandler;
