// App.js
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StripeProvider } from '@stripe/stripe-react-native';

import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import BottomTabNavigator from './screens/BottomTabNavigator';
import { FavoriteProvider } from './screens/FavoriteContext';
import AfterLogin from './screens/AfterLogin';
import ArtDetails from './screens/ArtDetails';


const Stack = createStackNavigator();

export default function App() {
  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    // Simulate a delay for the splash screen
    const splashTimer = setTimeout(() => {
      setSplashVisible(false);
    }, 3000); // Adjust the duration as needed

    return () => clearTimeout(splashTimer);
  }, []);

  return (
    <StripeProvider
      publishableKey="pk_test_51OKVqaHWdYWtkALO6ghTEGviBJWi25YqqKHSvgphCk7TDhRTm1kO8WM19yoLzXzOi2acpuRBfqLcOHVBePA0uf3d0024wSYJDl"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{craftconnect}}" // required for Apple Pay
    >
      <NavigationContainer>
        <FavoriteProvider>
          <Stack.Navigator initialRouteName="Splash">
            {isSplashVisible ? (
              <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            ) : (
              <>
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Signup" component={SignupScreen} />
                <Stack.Screen name="BottomTabNavigator" component={BottomTabNavigator} />
                <Stack.Screen name="AfterLogin" component={AfterLogin} />
                <Stack.Screen name="ArtDetails" component={ArtDetails} />
                {/* Add the RequestForm screen */}
               
              </>
            )}
          </Stack.Navigator>
        </FavoriteProvider>
      </NavigationContainer>
    </StripeProvider>
  );
}
