import React, { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { Dimensions, StyleProp, Text, TouchableOpacity, View, ViewStyle } from 'react-native';
import { TabView, SceneMap, TabViewProps } from 'react-native-tab-view';
// import { Body, P } from 'app/design/typography';
import { ScrollView } from 'react-native-gesture-handler';
import { SelectionPill } from '../buttons';
import { wp } from '@/utils';
// import { hapticFeedback } from 'app/utils/index';

const SCREEN_WIDTH = Dimensions.get('screen').width;

interface TabRoute {
  key: string;
  title: string;
}

type componentObj = {
  key: string;
  component: any;
  func?: any;
};

interface ITopTabs extends Partial<TabViewProps<TabRoute>> {
  tabRoutes?: TabRoute[];
  tabComponents?: componentObj[];
  tabItems: {
    key: string;
    title: string;
    component: any;
    func?: any;
  }[];
  getCurrentRoute?: (currentRoute: TabRoute) => void;
  setIndex: (index: number) => void;
  useSceneMap?: boolean;
  style?: ViewStyle;
  bottomComponent?: ReactNode;
  sceneContainerStyle?: ViewStyle;
  currentIndex: number;
  disableTabSwitcher?: boolean;
}

const TopTabs = ({
  tabRoutes,
  tabItems,
  tabComponents,
  getCurrentRoute,
  setIndex,
  useSceneMap = false,
  style,
  bottomComponent,
  sceneContainerStyle,
  disableTabSwitcher,
  swipeEnabled = true,
  currentIndex,
  ...props
}: ITopTabs) => {
  const initialLayout = { width: SCREEN_WIDTH };

  const scrollViewRef = useRef<ScrollView>(null);
  const refs = useRef({
    scrollX: 0,
  });

  // const [index, setIndex] = useState(0);
  const [routes] = useState(tabItems);

  const createSceneMap = () => {
    let sceneObj: { [key: string]: any } = {};
    for (let i = 0; i < tabItems.length; i += 1) {
      sceneObj[tabItems[i].key] = tabItems[i].func;
    }
    return sceneObj;
  };

  const averagePillWidth = wp(145);

  const renderScene = useCallback(
    ({ route }: any) => {
      switch (route.key) {
        case route.key:
          const FoundComponent = tabItems.find(component => component.key === route.key);
          if (bottomComponent) {
            return (
              // check if this breaks anything
              <View style={{ flex: 1 }}>
                {FoundComponent?.component}
                {bottomComponent}
              </View>
            );
          }
          return FoundComponent?.component;
        default:
          return null;
      }
    },
    [tabItems],
  );

  const sceneMap = SceneMap(createSceneMap());

  const getRoute = () => {
    getCurrentRoute && getCurrentRoute(routes[currentIndex]);
    setIndex && setIndex(currentIndex);
  };

  useEffect(() => {
    getRoute();
  }, [currentIndex]);

  useEffect(() => {
    // find pill x
    if (currentIndex > 0) {
      const leftPadding = wp(20);
      const gap = wp(10);
      const totalGapWidth = currentIndex * gap;
      const pillX = leftPadding + totalGapWidth + currentIndex * averagePillWidth;
      const scrollX = pillX - SCREEN_WIDTH / 2;
      scrollViewRef.current?.scrollTo({ x: scrollX, y: 0, animated: true });
    }
  }, [currentIndex]);

  const renderTabBar = (props: any) => {
    return (
      <View>
        <ScrollView ref={scrollViewRef} horizontal showsHorizontalScrollIndicator={false} enabled={swipeEnabled}>
          <View className="flex-row px-20 pb-20">
            {props.navigationState.routes.map((route: any, i: number) => (
              <SelectionPill
                key={route.title}
                className={disableTabSwitcher && currentIndex !== i ? 'opacity-20' : ''}
                disabled={disableTabSwitcher}
                onPress={() => {
                  // scrollViewRef?.current?.scrollTo({ x: (i * SCREEN_WIDTH), y: 0, animated: true });
                  setIndex(i);
                }}
                selected={currentIndex === i}
                title={route.title}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <TabView
      navigationState={{ index: currentIndex, routes }}
      renderScene={useSceneMap ? sceneMap : renderScene}
      onIndexChange={(index: number) => {
        setIndex(index);
        // scrollViewRef?.current?.scrollTo({ x: (index * SCREEN_WIDTH) / (tabItems.length - 2), y: 0, animated: true });
      }}
      initialLayout={initialLayout}
      lazy={true}
      renderTabBar={renderTabBar}
      style={{ flex: 1, ...style }}
      className="mt-20"
      sceneContainerStyle={sceneContainerStyle}
      {...props}
    />
  );
};

export default TopTabs;
