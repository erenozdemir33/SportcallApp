import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove} from 'firebase/firestore';
import { db, auth } from '../firebase';
import { Ionicons } from '@expo/vector-icons';

export default function ActivityDetails({ route }) {
  const { activityId, userId } = route.params;
  const [user, setUser] = useState(null);
  const [activity, setActivity] = useState(null);
  const [isJoined, setIsJoined] = useState(false);

  useEffect(() => {
    const fetchActivityDetails = async () => {
      // Fetch user data
      const userDocRef = doc(db, 'Users', userId);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.data();

      // Fetch activity data
      const activityDocRef = doc(db, 'Users', userId, 'Activities', activityId);
      const activityDocSnap = await getDoc(activityDocRef);
      const activityData = activityDocSnap.data();

      setUser(userData);
      setActivity(activityData);

      // Check if the current user has already joined the activity
      const currentUser = auth.currentUser;
      if (currentUser && activityData.attendants.includes(currentUser.uid)) {
        setIsJoined(true);
      }
    };

    fetchActivityDetails();
  }, [activityId, userId]);

  const handleJoinActivity = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const activityDocRef = doc(db, 'Users', userId, 'Activities', activityId);

      // Check if the current user has already joined the activity
      if (isJoined) {
        // User already joined, remove them from the Attendants collection
        await updateDoc(activityDocRef, {
          attendants: arrayRemove(currentUser.uid),
        });
        setIsJoined(false);
      } else {
        // User not joined, add them to the Attendants collection
        await updateDoc(activityDocRef, {
          attendants: arrayUnion(currentUser.uid),
        });
        setIsJoined(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      {activity && user ? (
        <>
          <Text style={styles.title}>{user.user_name}'s {activity.sport_type} Activity</Text>
          <Text>
            <Text style={styles.heads}>Time: </Text>
            <Text>{(new Date(activity.date_time.toMillis())).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</Text>
          </Text>
          <Text>
            <Text style={styles.heads}>Player status: </Text>
            <Text>{activity.attendants.length}/{activity.numberOfPeople}</Text>
          </Text>
          <Text>
            <Text style={styles.heads}>Note: </Text>
            <Text>{activity.note}</Text>
          </Text>

          {activity.coord && (
            <View style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: activity.coord.latitude,
                  longitude: activity.coord.longitude,
                  latitudeDelta: 0.03,
                  longitudeDelta: 0.01,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: activity.coord.latitude,
                    longitude: activity.coord.longitude,
                  }}
                  title={activity.title}
                  description={activity.description}
                />
              </MapView>
            </View>
          )}

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, isJoined && styles.joinedButton]}
              onPress={handleJoinActivity}
            >
              <Ionicons name={isJoined ? 'md-checkmark' : 'md-add'} size={24} color="white" />
              <Text style={styles.buttonText}>{isJoined ? 'Joined' : 'Join Activity'}</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heads: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mapContainer: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
  },
  map: {
    width: '90%',
    height: '70%',
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1f1f39',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  joinedButton: {
    backgroundColor: 'green',
  },
  buttonText: {
    marginLeft: 5,
    color: 'white',
    fontWeight: 'bold',
  },
});
