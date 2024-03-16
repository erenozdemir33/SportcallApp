import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth } from 'firebase/auth';

const Activities = () => {

  const [activities, setActivities] = useState([]);

  const auth = getAuth();
  const currentUser = auth.currentUser;

  

  
  useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Replace 'userId' with the actual user ID you want to fetch activities for
        const userId = currentUser.uid;

        // Create a query to fetch activities for the specified user
        const q = query(collection(db, 'Users', userId, 'Activities'));

        // Fetch the activities from the database
        const querySnapshot = await getDocs(q);

        // Map the activities from the query snapshot to an array
        const activitiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Set the fetched activities in the state
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

  const handleRemoveActivity = async (activityId) => {
    try {
      const userId = currentUser.uid;

      // Delete the activity document from the database
      await deleteDoc(doc(db, 'Users', userId, 'Activities', activityId));

      // Remove the activity from the activities state
      setActivities((prevActivities) =>
        prevActivities.filter((activity) => activity.id !== activityId)
      );
    } catch (error) {
      console.error('Error removing activity:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {activities.map((activity) => (
        <View key={activity.id} style={styles.activityBox}>
          <Text style={styles.sportTypeText}>Sport Type: {activity.sport_type}</Text>
          <Text style={styles.noteText}>Note: {activity.note}</Text>
          <Text style={styles.noteText}>Date: {(new Date(activity.date_time.toMillis())).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</Text>
          <Text style={styles.numberOfPeopleText}>Number of People: {activity.numberOfPeople}</Text>
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => handleRemoveActivity(activity.id)}
          >
            <Text style={styles.buttonText}>Remove</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  activityBox: {
    backgroundColor: '#1f1f39',
    shadowColor: 'gray',
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.7,
    shadowRadius: 3.84,
    elevation: 10, // for Android
    padding: 20, // Adjust the padding to change the size of the box
    marginVertical: 8, // Adjust the vertical margin to change the spacing between boxes
    borderRadius: 6, // Adjust the borderRadius to change the shape of the box
    // ... other styles
  },
  sportTypeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  noteText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  numberOfPeopleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  removeButton: {
    backgroundColor: '#ff5252',
    borderRadius: 3,
    padding: 10,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Activities;



/*
useEffect(() => {
    const fetchActivities = async () => {
      try {
        // Replace 'userId' with the actual user ID you want to fetch activities for
        const userId = '1IS3wIG0EJvUMNJTdMvu';

        // Create a query to fetch activities for the specified user
        const q = query(collection(db, 'Users', userId, 'Activities'));

        // Fetch the activities from the database
        const querySnapshot = await getDocs(q);

        // Map the activities from the query snapshot to an array
        const activitiesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Set the fetched activities in the state
        setActivities(activitiesData);
      } catch (error) {
        console.error('Error fetching activities:', error);
      }
    };

    fetchActivities();
  }, []);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  activityBox: {
    backgroundColor: '#f1f1f1',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 10, // for Android
    padding: 20, // Adjust the padding to change the size of the box
    marginVertical: 3, // Adjust the vertical margin to change the spacing between boxes
    borderRadius: 5, // Adjust the borderRadius to change the shape of the box
    // ... other styles
  },
  noteText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
  },
  sportTypeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  numberOfPeopleText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#ff5252',
    borderRadius: 3,
    padding: 10,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Activities;
*/
