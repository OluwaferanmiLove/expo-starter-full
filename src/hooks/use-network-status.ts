import { useEffect, useState } from 'react';
import * as Network from 'expo-network';
import { AppState } from 'react-native';

interface NetworkStatus {
  isConnected?: boolean;
  isInternetReachable?: boolean | null;
  type?: string | null;
}

export const useNetworkStatus = (): NetworkStatus => {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isConnected: true,
    isInternetReachable: true,
    type: 'unknown',
  });

  const checkNetworkStatus = async () => {
    try {
      const networkState = await Network.getNetworkStateAsync();
      setNetworkStatus({
        isConnected: networkState.isConnected,
        isInternetReachable: networkState.isInternetReachable,
        type: networkState.type,
      });
    } catch (error) {
      console.error('Failed to check network status:', error);
    }
  };

  useEffect(() => {
    // Initial check
    checkNetworkStatus();
    
    // Set up interval to check network status
    const intervalId = setInterval(checkNetworkStatus, 10000);
    
    // Check when app comes to foreground
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'active') {
        checkNetworkStatus();
      }
    });
    
    return () => {
      clearInterval(intervalId);
      subscription.remove();
    };
  }, []);

  return networkStatus;
};

export default useNetworkStatus;
