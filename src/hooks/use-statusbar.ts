import { useFocusEffect } from "@react-navigation/native";
import * as StatusBar from "expo-status-bar";
import { useCallback } from "react";
import { Platform } from "react-native";

const useStatusbar = (
  style: StatusBar.StatusBarStyle,
  backgroundColor = "#fff",
  translucent: boolean = false
) => {
  useFocusEffect(
    useCallback(() => {
      StatusBar.setStatusBarStyle(style, true);
      if (Platform.OS === "android") {
        StatusBar.setStatusBarTranslucent(translucent);
        StatusBar.setStatusBarBackgroundColor(backgroundColor, true);
      }
    }, [backgroundColor, style, translucent])
  );

  const setStatusBar = (
    style: StatusBar.StatusBarStyle = "dark",
    backgroundColor = "#fff",
    translucent: boolean = false
  ) => {
    StatusBar.setStatusBarStyle(style, true);
    if (Platform.OS === "android") {
      StatusBar.setStatusBarTranslucent(translucent);
      StatusBar.setStatusBarBackgroundColor(backgroundColor, true);
    }
  };

  const setStatusBarStyle = (
    style: StatusBar.StatusBarStyle = "dark",
    animated: boolean
  ) => {
    StatusBar.setStatusBarStyle(style, true);
  };

  return { setStatusBar, setStatusBarStyle };
};

export default useStatusbar;
