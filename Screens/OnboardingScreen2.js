import React from 'react';
import {View, Text, Button, TouchableOpacity, ImageBackground,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function OnboardingScreen2 () {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
          <ImageBackground
            source={require('../assets/onboard1.jpg')}
            style={styles.backgroundImage}
          >
            <Text style={styles.mid}>You are no longer alone when you do sports!</Text>
            <TouchableOpacity style={styles.skipButton} onPress={ () => navigation.navigate("Login")}>
              <Text style={styles.skipButtonText} >Skip</Text>
            </TouchableOpacity>
          </ImageBackground>
        </View>
      );
    };


    const styles = StyleSheet.create({
        container: {
        flex: 1,
        },
        backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingBottom: 40,
        },
        upmid: {
            flex: 1,
            marginTop: 270,
            marginRight: 70,
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: 20,
            fontFamily: 'Cochin',
        },
        mid: {
            marginBottom: 290,
            marginRight: 30,
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: 20,
            fontFamily: 'Cochin', 
        },
        skipButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
        },
        skipButtonText: {
        color: '#000000',
        fontWeight: 'bold',
        },
        });