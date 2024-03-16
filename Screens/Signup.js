import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, ImageBackground, Text, Image, TextInput, TouchableOpacity, View, Navigation, Dimensions } from 'react-native';
import { db, auth } from '../firebase';
import { collection, addDoc, doc, setDoc} from 'firebase/firestore';
import { createUserWithEmailAndPassword } from "firebase/auth";

const demoback = require('../assets/demobackground.jpg')

export default function Singup() {


  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [confirm, setConfirm] = useState('');
  const [buttonText, setButtonText] = useState('Sign Up');

  const navigation = useNavigation();

  const handleSignUp = async () => {
    try {
      if (!fullname) {
        setError('Full name is required.');
        return;
      }
  
      if (!email) {
        setError('Email is required.');
        return;
      }
  
      if (!validateEmail(email)) {
        setError('Invalid email format.');
        return;
      }
  
      if (!password) {
        setError('Password is required.');
        return;
      }

      if (password !== confirm) {
        setError('Passwords do not match.');
        return;
      }

  
      if (password.length < 8) {
        setError('Password should be at least 8 characters long.');
        return;
      }
  
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const uid = user.uid;
  
      // Add user data to the Firestore collection
      const userRef = doc(collection(db, "Users"), uid);
      await setDoc(userRef, {
        user_email: email,
        user_name: fullname,
        user_password: password
      });
  
      // Navigate to the desired page after successful signup
      navigation.navigate('MainMap');
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    }
  };
  
  const validateEmail = (email) => {
    // Regular expression pattern for email validation
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

    return (
        <View style={styles.container}>
          <ImageBackground source={demoback} style={styles.background}>
          <View style={styles.card}>
            <Text style={styles.fullName}>Your full name</Text>
            <TextInput
              style={styles.input}
              onChangeText={setFullname}
              value={fullname}
              placeholder="E.g Eren Özdemir"
              autoCapitalize="none"
            />
            <Text style={styles.phoneNumber}>E mail</Text>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
              placeholder="Your email here"
              autoCapitalize="none"
            />
            <Text style={styles.password}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
            />
            <Text style={styles.repassword}>Retype your password</Text>
            <TextInput
              style={styles.input}
              onChangeText={setConfirm}
              value={confirm}
              placeholder="Password"
              secureTextEntry
              autoCapitalize="none"
            />
            
            <TouchableOpacity style={styles.signInButton} onPress={handleSignUp}>
              <Text style={styles.signInButtonText}>{buttonText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.haveAcc} onPress={() => navigation.navigate('Login')}>
              <Text style={{color: '#3E39A1'}}>Already have an account.</Text>
            </TouchableOpacity>
            {error && <Text style={styles.error}>{error}</Text>}

          </View>
          </ImageBackground>
        </View>
      );
    }
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
        alignItems: 'flex-start',
      },
      card: {
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        padding: 25,
        width: '80%',
        alignItems: 'flex-start',
        marginLeft: 40,
        paddingLeft: -14,
        marginTop: 295,
    
      },
      haveAcc: {
        color: 'blue',
        textDecorationLine: 'underline',
        marginTop: 11,
        marginLeft: 30,

       },

      error: {
        color: 'red',
        fontSize: 12,
        marginBottom: 10,
        marginLeft: 30,
      },
      forgotPassword: {
        color: '#3E39A1',
        textDecorationLine: 'underline',
        marginTop: 11,
        marginLeft: 30,
      },
      fullName: {
        color: 'black',
        fontWeight: 'bold',
        fontSize:12,
        marginBottom:10,
        marginTop: 10,
        marginLeft: 30,
        borderRadius: 40,
      },
      phoneNumber: {
        color: 'black',
        fontWeight: 'bold',
        fontSize:12,
        marginBottom:10,
        marginTop: 10,
        marginLeft: 30,
    
      },
      password: {
        color: 'black',
        fontWeight: 'bold',
        fontSize:12,
        marginBottom:10,
        marginTop: 10,
        marginLeft: 30,
    
      },
      repassword: {
        color: 'black',
        fontWeight: 'bold',
        fontSize:12,
        marginBottom:10,
        marginTop: 10,
        marginLeft: 30,
    
      },
      signInButton: {
        backgroundColor: '#1f1f39',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 50,
        marginLeft: 50,
        marginTop: 20,
        width: '70%',
      },
      signInButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: 'bold',
        alignSelf: 'center',
        
      },
      heading: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 50,
        color: 'black',
      },
      sportcall: {
        marginBottom:120,
        height: 70,
        width: 400,
        resizeMode: 'contain',
      },
      background: {
        flex:1,
        resizeMode: 'cover', // or 'stretch' or 'contain'
        position: 'absolute',
        width: '100%',
        height: '100%',
        zIndex: 1,
      },
      input: {
        borderWidth: 1,
        borderColor: '#DFDFDF',
        padding: 10,
        borderRadius: 15,
        width: '90%',
        marginBottom: 0,
        marginLeft: 30,
        marginRight: 0,
        backgroundColor: '#DFDFDF',
      },
      button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        width: '80%',
        marginTop: 20,
        alignItems: 'center',
      },
      buttonText: {
        color: '#1a1a1a',
        fontWeight: 'bold',
      },
      bottomButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        position: 'absolute',
        bottom: 20,
      },
      bottomButton: {
        paddingHorizontal: 20,
      },
      bottomButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
      circleButton: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 50,
        width: 70,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
      },
      circleButtonText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold',
      },
      
      bottom: {
        flexDirection: 'row',
        marginTop: 10,
        
      },
      donthave: {
        color: 'black',
        marginLeft: 60,
        fontSize: 12,
        paddingBottom: 10,
      },
      signupsingle: {
        color: '#3E39A1',
        marginLeft: 5,
        fontSize: 12,
      },
    });