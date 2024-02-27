//BottomTabNavigator.js
import React from 'react';
import { createBottomTabNavigator } from   '@react-navigation/bottom-tabs';
import AfterLogin from '../screens/AfterLogin.js';
import ProfileScreen from '../screens/ProfileScreen.js';
import FavoritesScreen from '../screens/FavoritesScreen.js';
import DealsScreen from '../screens/DealsScreen.js';
import CartScreen from '../screens/CartScreen.js';
import ArtDetails from './ArtDetails.js';
import { Ionicons } from 'react-native-vector-icons';


const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({route}) => {
  const { user } = route.params || {};
  // console.log('User in BottomTabNavigator:', user);
//

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'ios-person' : 'ios-person-outline';
          } else if (route.name === 'Favorites') {
            iconName = focused ? 'ios-heart' : 'ios-heart-outline';
          } else if (route.name === 'Deals') {
            iconName = focused ? 'ios-flash' : 'ios-flash-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'ios-cart' : 'ios-cart-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={AfterLogin} />
      <Tab.Screen name="Profile" component={ProfileScreen} initialParams={{ user: user }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Deals" component={DealsScreen} />
      <Tab.Screen name="Cart" component={CartScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
