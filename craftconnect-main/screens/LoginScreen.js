import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://10.51.223.182:3000/login', { username, password }); //Baymills
      
     // const response = await axios.post('http:/10.51.223.182:3000/login', { username, password }); //cestar

      if (response.data.message === 'Login successful') {
        await AsyncStorage.setItem('username', username);
        console.log("login successful", username, response.data.user);
         // Navigate to the screen with bottom tab navigator
         navigation.navigate('BottomTabNavigator', { user: response.data.user });
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Username"
            placeholderTextColor="#999"
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            placeholderTextColor="#999"
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
          />
        </View>
        <TouchableOpacity style={styles.button1} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff', // Background color for the form container
    borderRadius: 25, // Border radius for the form container
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#262E36',
    marginBottom: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#262E36', // Border color for the text input container
    borderRadius: 8, // Border radius for the text input container
  },
  button1: {
    backgroundColor: '#262E36',
    color: '#fff',
    padding: 10,
    borderRadius: 25,
    fontSize: 20,
    minWidth: 150,
    textAlign: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    padding: 10,
    color: '#262E36',
    fontSize: 16,
    width: '100%',
  },
  logo: {
    height: '20%',
    resizeMode: 'contain',
    marginBottom: 50,
  },
});
