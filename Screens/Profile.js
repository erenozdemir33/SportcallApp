import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, TextInput } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/app';
import { db, auth } from '../firebase';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, doc, onSnapshot, getDoc, updateDoc, setDoc } from 'firebase/firestore';
import { FontAwesome5 } from '@expo/vector-icons';



export default function Profile() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [aboutMe, setAboutMe] = useState('');
  const [favoriteSports, setFavoriteSports] = useState([]);
  const [sportsSelectionOpen, setSportsSelectionOpen] = useState(false);
  const navigation = useNavigation();
  const [characterCount, setCharacterCount] = useState(0);
  const maxCharacterLimit = 150;
  const [userData, setUserData] = useState({});

  const auth = getAuth();
  const currentUser = auth.currentUser;
  const userId = currentUser.uid;

  useEffect(() => {
    let unsubscribe = null;

    if (userId) {
      const userDocRef = doc(db, 'Users', userId);
      unsubscribe = onSnapshot(userDocRef, (doc) => {
        if (doc.exists()) {
          setUserData(doc.data());
          setFavoriteSports(doc.data().favoriteSports || []);
        } else {
          console.log('No such document!');
        }
      });
    }

    fetchUserData(); // Fetch user data on initial load

    return unsubscribe ? unsubscribe : undefined;
  }, [userId]);
  


  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const fetchUserData = async () => {
    try {
      const userId = currentUser.uid;
      const usersRef = collection(db, 'Users'); // Update collection reference here
      const userDocRef = doc(usersRef, userId);
      const userSnapshot = await getDoc(userDocRef);


      if (userSnapshot.exists()) {
        const userData = userSnapshot.data();
        setUserData(userData);
        setAboutMe(userData.aboutMe || '');
        setFavoriteSports(userData.favoriteSports || []);  // <-- Set favorite sports here
      }
    } catch (error) {
      console.log('Error fetching user data:', error);
    }
  };

  const profilePicture = (
    <View style={styles.profilePicture}>
      <FontAwesome name="user" size={100} color="white" />
    </View>
  );


  const handleAboutMeChange = async (text) => {
    if (text.length <= maxCharacterLimit) {
      setCharacterCount(text.length);
      setAboutMe(text);

      const usersRef = collection(db, 'Users');
      const userDocRef = doc(usersRef, userId);
      await updateDoc(userDocRef, {
        aboutMe: text
      });
    }
  };

  const handleFavoriteSportsPress = () => {
    setSportsSelectionOpen(!sportsSelectionOpen);
  };

  const handleSportSelection = async (sport) => {
    const updatedSports = [...favoriteSports];

    if (updatedSports.includes(sport)) {
      const index = updatedSports.indexOf(sport);
      updatedSports.splice(index, 1);
    } else {
      if (updatedSports.length < 3) {
        updatedSports.push(sport);
      }
    }

    setFavoriteSports(updatedSports);

    try {
      const usersRef = collection(db, 'Users');
      const userDocRef = doc(usersRef, userId);
      await setDoc(userDocRef, {
        favoriteSports: updatedSports
      }, { merge: true });
      console.log(`Updated favorite sports for user ${userId}: `, updatedSports);
    } catch (error) {
      console.error('Error updating favorite sports: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileContainer}>
          {profilePicture}
        </View>
        <View style={styles.userInfoContainer}>
          <View style={styles.fullNameContainer}>
            <Text style={styles.fullNameText}>{userData.user_name}</Text>
          </View>
          <View style={styles.emailContainer}>
            <Text style={styles.emailText}>{userData.user_email}</Text>
          </View>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <TextInput
            style={[
              styles.aboutMeInput,
              { height: Math.max(35, characterCount * 2.5) }
            ]}
            placeholder="Tell us about yourself"
            onChangeText={handleAboutMeChange}
            value={aboutMe}
            multiline
          />
          <Text style={styles.charCounter}>
            {characterCount}/{maxCharacterLimit}
          </Text>
        </View>
        <TouchableOpacity style={styles.section} onPress={handleFavoriteSportsPress}>
          <Text style={styles.sectionTitle}>Favorite Sports</Text>
          {favoriteSports.length > 0 ? (
            <View style={styles.favoriteSportsContainer}>
              {favoriteSports.map((sport, index) => (     // <-- Here it is
                <Text key={index} style={styles.favoriteSport}>
                  {sport}
                </Text>
              ))}
            </View>
          ) : (
            <View>
              <Text style={styles.sectionText}>Select favorite sports</Text>
            </View>
          )}
          {sportsSelectionOpen && (
            <View style={styles.sportsSelectionContainer}>
              <TouchableOpacity
                style={[styles.sportIcon, favoriteSports.includes('Football') && styles.selectedSportIcon]}
                onPress={() => handleSportSelection('Football')}
              >
                <Ionicons name="football" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sportIcon, favoriteSports.includes('Golf') && styles.selectedSportIcon]}
                onPress={() => handleSportSelection('Golf')}
              >
                <Ionicons name="golf" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sportIcon, favoriteSports.includes('Basketball') && styles.selectedSportIcon]}
                onPress={() => handleSportSelection('Basketball')}
              >
                <Ionicons name="basketball" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sportIcon, favoriteSports.includes('Tennis') && styles.selectedSportIcon]}
                onPress={() => handleSportSelection('Tennis')}
              >
                <Ionicons name="tennisball" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sportIcon, favoriteSports.includes('Cycling') && styles.selectedSportIcon]}
                onPress={() => handleSportSelection('Cycling')}
              >
                <Ionicons name="bicycle" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sportIcon, favoriteSports.includes('Swimming') && styles.selectedSportIcon]}
                onPress={() => handleSportSelection('Swimming')}
              >
                <FontAwesome5 name="swimmer" size={20} color="black" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.sportIcon, favoriteSports.includes('Running') && styles.selectedSportIcon]}
                onPress={() => handleSportSelection('Running')}
              >
                <Ionicons name="ios-walk" size={20} color="black" />
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.sportIcon, favoriteSports.includes('Fitness') && styles.selectedSportIcon]}
                onPress={() => handleSportSelection('Fitness')}
              >
                <FontAwesome5 name="dumbbell" size={20} color="black" />
              </TouchableOpacity>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Activities')}>
          <Ionicons name="time" size={32} color="white" />
          <Text style={[styles.buttonText, { flex: 1, textAlign: 'center', fontSize: 15 }]}>My Activities</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleButtonPress('Login')}>
          <Ionicons name="exit" size={32} color="white" />
          <Text style={[styles.buttonText, { flex: 1, textAlign: 'center', fontSize: 18 }]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 80,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  profileContainer: {
    marginRight: 20,
  },
  profilePicture: {
    backgroundColor: '#1f1f37',
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 2,
  },
  userInfoContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: 30,
  },
  fullNameContainer: {
    alignItems: 'flex-end',
    marginBottom: 2,
  },
  fullNameText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f1f37',
  },
  emailContainer: {
    alignItems: 'flex-end',
  },
  emailText: {
    fontSize: 16,
    color: '#1f1f37',
  },
  profileCircle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 10,
    backgroundColor: '#f2f2f2',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#1f1f37',
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  content: {
    marginTop: 20,
    marginBottom: 30,
    width: '100%',
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 50,
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f1f37',
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 14,
    color: '#1f1f37',
  },
  emptyInput: {
    fontSize: 14,
    color: '#1f1f37',
    paddingTop: 8,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    width: '48%',
    backgroundColor: '#1f1f37',
    padding: 14,
    borderRadius: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#ffffff',
  },
  favoriteSportsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  favoriteSport: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 14,
    color: '#1f1f37',
  },
  sportsSelectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 8,
  },
  sportIcon: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  selectedSportIcon: {
    backgroundColor: '#f2f2f2',
  },
  charCounter: {
    fontSize: 12,
    color: '#888',
    textAlign: 'right',
  },
  aboutMeTextInput: {
    height: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 8,
    fontSize: 14,
    color: '#1f1f37',
  },
});
