import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import * as Font from 'expo-font';

const SignupScreen = ({ navigation }) => {
const [fontsLoaded, setFontsLoaded] = useState(false);
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [email, setEmail] = useState('');
const [dob, setDob] = useState(new Date());
const [showDatePicker, setShowDatePicker] = useState(false);
const [maximumDate, setMaximumDate] = useState(new Date());


  useEffect(() => {
    setMaximumDate(new Date());
  }, []);

  const validateUsername = (inputUsername) => {
    return inputUsername.length >= 8;
  };

  const validateEmail = (inputEmail) => {
    const emailRegex = /^[a-zA-Z][a-zA-Z0-9._-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(inputEmail);
  };

  const validateDOB = (inputDOB) => {
    // Check if inputDOB is a valid Date object
    if (inputDOB instanceof Date && !isNaN(inputDOB)) {
      // Add your custom validation for Date of Birth (e.g., YYYY-MM-DD format)
      // For simplicity, let's assume any non-empty string is valid for demonstration
      return true;
    }
  
    // Return false if inputDOB is not a valid Date object
    return false;
  };
  
  

  const handleSignup = async () => {
    try {
      await axios.post('http://10.51.223.182:3000/signup', { username, password });//Baymills
      //await axios.post('http://10.51.223.182:3000/signup', {username, password ,email, dob }); //Cestar
      if (!validateUsername(username)) {
        Alert.alert('Invalid Username', 'Username should be at least 8 characters long.');
        return;
      }

      if (!validateEmail(email)) {
        Alert.alert('Invalid Email', 'Please enter a valid email address.');
        return;
      }

      if (!validateDOB(dob)) {
        Alert.alert('Invalid Date of Birth', 'Please enter a valid Date of Birth.');
        return;
      }

      const formattedDOB = dob.toISOString().split('T')[0];

      await axios.post('http://10.51.223.182:3000/signup', { username, password, email, dob: formattedDOB });

      Alert.alert('Signup Successful', 'You have successfully signed up!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.error('Signup failed:', error);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dob;
    setShowDatePicker(Platform.OS === 'ios');
    setDob(currentDate);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Sign Up</Text>

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
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={(text) => setEmail(text)}
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
        
        <View style={styles.inputContainer}>
          <Button onPress={showDatepicker} title="Select Date of Birth" />
          {showDatePicker && (
            <DateTimePicker
              value={dob}
              mode="date"
              display="default"
              onChange={onDateChange}
              maximumDate={maximumDate}
              style={styles.dateTimePicker}
            />
          )}
        </View>
        {/* Already a member? Log on */}
        <Text style={styles.logOnText} onPress={() => navigation.navigate('Login')}>
          Already a member? Log In
        </Text>

        <Text style={styles.button1} onPress={handleSignup}>
          Sign up
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  text: {
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'Cormorant', // Use San Francisco on iOS, fallback to a system font on Android
    color: '#262E36',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderColor: '#262E36',
    borderRadius: 8,
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
  textInput: {
    height: 40,
    padding: 10,
    color: '#262E36',
    fontSize: 16,
    width: '100%',
  },
  logOnText: {
    fontFamily: Platform.OS === 'ios' ? 'Avenir-Book' : 'sans-serif', // Example fonts, replace with your desired fonts
    color: '#262E36',
    fontSize: 16,
    textAlign: 'center',
    margin: 10,
  },
  dateTimePicker: {
    width: '100%',
    textAlign: 'center',
    backgroundColor: '#000000',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default SignupScreen
