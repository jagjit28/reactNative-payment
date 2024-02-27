import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions, Animated } from 'react-native';

const SplashScreen = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }
    ).start(() => {
      // Animation completed, notify the parent component
      onFinish && onFinish();
    });
  }, [fadeAnim, onFinish]);

  // Log width and height for debugging
  const { width, height } = Dimensions.get('window');
  console.log('Window Width:', width, 'Height:', height);
  console.log('Container Styles:', styles.container);

  return (
    <View style={styles.container}>
      {/* Customize the splash screen with your logo or image */}
      <Animated.Image
        source={require('../assets/splash.png')}
        style={[styles.logo, { opacity: fadeAnim }]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
