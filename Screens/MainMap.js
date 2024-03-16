import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, View, Image, Dimensions, Text } from 'react-native';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Callout, CalloutSubview } from 'react-native-maps';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { doc, collection, getDocs, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';
import { useRoute } from '@react-navigation/native';

export default MapScreen = () => {

  const auth = getAuth();
  const currentUser = auth.currentUser;
  const userId = currentUser.uid;


  const [regions, setRegions] = useState([]);
  const navigation = useNavigation();
  

  const handleMarkerPress = (activityId, userId) => {
    // Logic to navigate to the activity details page using the activityId
    console.log("navigated to this: " , activityId);
    navigation.navigate('ActivityDetails', { activityId, userId });
  };

  
    const fetchActivities = async () => {
      const usersSnapshot = await getDocs(collection(db, 'Users'));
      const users = usersSnapshot.docs.map((doc) => ({
        userId: doc.id,
        ...doc.data()
      }));

      const activities = [];

      for (const user of users) {
        const activitiesSnapshot = await getDocs(
          collection(db, 'Users', user.userId, 'Activities')
        );
        const userActivities = activitiesSnapshot.docs.map((doc) => ({
          activityId: doc.id,
          userId: user.userId,
          ...doc.data()
        }));
        activities.push(...userActivities);
      }
      setRegions(activities);
    };

  useEffect(() => {
    fetchActivities();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchActivities();
    }, [])
  );

  const mapIcon = require('../assets/map-icon.png');
  const messagesIcon = require('../assets/messages-icon.png');
  const friendsIcon = require('../assets/friends-icon.png');
  const settingsIcon = require('../assets/settings-icon.png');
  const basketballIcon = require('../assets/basketball-icon.png');


  const zoomLevel = 0.05; // Adjust this value to set the desired zoom level

  const getMarkerImage = (sportType) => {
    switch (sportType) {
      case 'Basketball':
        return require('../assets/basketball-icon2.png');
      case 'Badminton':
        return require('../assets/badminton-icon.png');
      case 'Table Tennis':
        return require('../assets/ping-pong-icon.png');
      case 'Volleyball':
        return require('../assets/volleyball-icon.png');
      case 'Football':
        return require('../assets/football-icon2.png');
      case 'Cycling':
        return require('../assets/cycling-icon3.png');
      case 'Tennis':
        return require('../assets/tennis-icon.png');
      case 'Running':
        return require('../assets/running-icon.png');
      case 'Fitness':
        return require('../assets/gym-icon2.png');
      // Add more cases for other sport types and their respective marker images
      default:
        return null; // Return a default marker image if no match is found
    }
  };
  const data = [
    { label: 'Basketball', value: '1', icon: 'basketball-ball' },
    { label: 'Volleyball', value: '2', icon: 'volleyball-ball' },
    { label: 'Football', value: '3', icon: 'football-ball' },
    { label: 'Cycling', value: '4', icon: 'bicycle' },
    { label: 'Badminton', value: '5', icon: 'badminton' },
    { label: 'Tennis', value: '6', icon: 'tennis-ball' },
    { label: 'Table Tennis', value: '7', icon: 'table-tennis' },
    { label: 'Running', value: '8', icon: 'running' },
    { label: 'Other', value: '9', icon: 'ellipsis-h' },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 38.32611,
          longitude: 26.64803,
          latitudeDelta: zoomLevel,
          longitudeDelta: zoomLevel * (Dimensions.get('window').width / Dimensions.get('window').height),
        }}
      >
        {regions.map((region) => (
          <Marker
            key={region.activityId}
            coordinate={{
              latitude: region.coord.latitude,
              longitude: region.coord.longitude,
            }}
            image={getMarkerImage(region.sport_type)}
          >
            <Callout>
              <View style={styles.calloutF}>
                <Text>
                  <Text style={styles.calloutTitle}>{`${region.sport_type}:`}</Text>
                  <Text>{`${region.attendants.length}/${region.numberOfPeople}`}</Text>
                </Text>
                <Text>
                  <Text style={styles.calloutTitle}>Date:</Text>
                  <Text>{(new Date(region.date_time.toMillis())).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</Text>
                </Text>
                <CalloutSubview
                  onPress={() => handleMarkerPress(region.activityId,region.userId)}
                  style={styles.calloutButton}
                >
                  <Text style={styles.calloutButtonText}>View Details</Text>
                </CalloutSubview>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.button} >
          <Ionicons name="home-outline" size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbox-outline" size={30} color={'white'} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateActivity', {userId : userId})}>
          <Ionicons name="add-circle-outline" size={50} color={'white'}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile', {userId: userId})}>
          <Ionicons name="person-outline" size={32} color={'white'}/>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ApplicationSettings')}>
          <Ionicons name="reorder-four-outline" size={30} color={'white'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    //...StyleSheet.absoluteFillObject,
    flexDirection: 'column',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1A1A1A'
  },
  sportcallText: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  calloutTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    //...StyleSheet.absoluteFillObject,
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    position: 'absolute',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#1f1f39',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderRadius: 30,
    marginBottom: 20,
    marginLeft: 35,
    width: '80%',
    bottom: 15,
  },
  home: {
    size: 30,
  },
  button: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    backgroundColor: '#1f1f39',
    borderRadius: 25,
    color: 'white',
  },
  calloutF: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  middlebutton: {
    width: 60,
    height: 60,
    borderRadius: 25,
    alignItems: 'center',
    borderTopColor: 'black',
  },
  calloutButton: {
    marginTop: 4,
    width: 100,
    height: 30,
    justifyContent: 'center',
    backgroundColor: '#1f1f39',
    alignItems: 'center',
    borderRadius: 8,
  },
  calloutButtonText: {
    color: 'white',
  },
  calloutIcons: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingTop: 15,
  }
});


