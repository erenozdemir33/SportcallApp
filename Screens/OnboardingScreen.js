import React from 'react';
import {View, Text, Button, TouchableOpacity, ImageBackground,StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';


export default function OnboardingScreen () {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
          <ImageBackground
            source={require('../assets/demobackground.jpg')}
            style={styles.backgroundImage}
          >
            <Text style={styles.upmid}>Welcome to the SportcallApp</Text>
            <Text style={styles.mid}>Easy way to find your sport mate!</Text>
            <TouchableOpacity style={styles.skipButton} onPress={ () => navigation.navigate("OnboardingScreen2")}>
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
paddingBottom: 20,
},
upmid: {
    flex: 1,
    marginTop: 330,
    marginRight: 90,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'white',
    fontSize: 20,
    fontFamily: 'Cochin',
},
mid: {
  marginBottom: 310,
  marginRight: 65,
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