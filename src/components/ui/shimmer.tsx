// Shimmer.tsx
import React, { useEffect } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { cx } from 'src/assets/utils/js';

interface ShimmerProps {
  width: number;
  height: number;
  borderRadius?: number;
  marginTop?: number;
  className?: string;
  classes?: string;
}

const Shimmer = ({ width, height, borderRadius = 0, marginTop, className, classes }: ShimmerProps) => {
  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }),
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [-width, width],
  });

  return (
    <View className={`${className} ${classes}`} style={[styles.container, { width, height, borderRadius, marginTop }]}>
      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        <LinearGradient
          colors={['#F8F5F5', '#f0f0f0', '#F8F5F5']}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradient}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#F8F5F5',
  },
  gradient: {
    flex: 1,
    width: '200%',
  },
});

export default Shimmer;
