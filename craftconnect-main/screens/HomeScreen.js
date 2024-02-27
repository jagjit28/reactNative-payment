//HomeScreen.js
import React from 'react';
import { View, Text, Button,StyleSheet,Image } from 'react-native';
import welcomelogo from '../assets/logo1.png'
const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
            {/* <Image style={styles.patternbg} source={pattern} /> */}

            <View style={styles.container1}>

                <Image style={styles.logo} source={welcomelogo} />
                <Text style={styles.button1}
                    onPress={() => navigation.navigate('Login')}
                >Login</Text>
                <Text style={styles.button1}
                    onPress={() => navigation.navigate('Signup')}
                >Signup</Text>
            </View>
           
        </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        display: 'flex',
    },
    patternbg: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
    },
    head: {
        fontSize: 30,
        color: '#fff',
    },
    container1: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
    },button1: {
        backgroundColor:'#262E36',
        color: '#fff',
        padding: 10,
        borderRadius: 25,
        fontSize: 20,
        minWidth: 150,
        textAlign: 'center',
        margin: 10,
    },
    logo: {
        height: '40%',
        resizeMode: 'contain',
    }
})

