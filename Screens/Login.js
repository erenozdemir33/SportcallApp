import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, ImageBackground, Text, Image, TextInput, TouchableOpacity, View, Navigation, Dimensions,Keyboard } from 'react-native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, getDocs } from 'firebase/firestore';


const demoback = require('../assets/demobackground.jpg')

export default function Login() {

  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleSignIn = async () => {

    Keyboard.dismiss();

    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if the user already exists in the Users table
      const db = getFirestore();
      const usersCollection = collection(db, 'Users');
      const querySnapshot = await getDocs(usersCollection);
      const existingUser = querySnapshot.docs.find((doc) => doc.data().user_email === user.email);
      
      setSuccess('Successfully signed in.');

      console.log('User signed in:', user.uid, existingUser.id);
      navigation.navigate('MainMap', { userId: existingUser.id});
    } catch (error) {
      // Handle the error, e.g., display an error message
      setError('Invalid email or password.');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={demoback} style={styles.background}>
      <View style={styles.card}>
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}

        <Text style={styles.phoneNumber}>E-mail</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="E-mail"
          autoCapitalize="none"
        />
        <Text style={styles.password}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={setPassword}
          autoCapitalize="none"
          value={password}
          placeholder="Password"
          secureTextEntry
        />
        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.signInButton} onPress={handleSignIn}>
          <Text style={styles.signInButtonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.bottom}>
        <Text style={styles.donthave}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupsingle}>Sign up</Text>
        </TouchableOpacity>
        </View>
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
    marginTop: 300,

  },

  forgotPassword: {
    color: '#3E39A1',
    textDecorationLine: 'underline',
    marginTop: 11,
    marginLeft: 30,
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
  signInButton: {
    backgroundColor: '#1f1f39',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 50,
    marginLeft: 60,
    marginTop: 20,
    width: '65%',
  },
  signInButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
    alignSelf: 'center',
    
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 30,
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    marginTop: 10,
    marginLeft: 30,
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
    borderColor: '#ccc',
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