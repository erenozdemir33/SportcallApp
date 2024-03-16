import React, { useState, useContext, useEffect } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Keyboard, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import DateTimePicker from '@react-native-community/datetimepicker';
import { collection, getDocs, doc, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import DropdownComponent from '../Components/DropdownComponent';
import {firebase, auth} from 'firebase/app';
import { getAuth } from 'firebase/auth';


export default function CreateActivity() {

  const auth = getAuth();
  const currentUser = auth.currentUser;
  const navigation = useNavigation();

  const [ activityCreated, setActivityCreated] = useState(false);
  
  const [region, setRegion] = useState({
    latitude: 38.32611,
    longitude: 26.64803,
    latitudeDelta: 0.0322,
    longitudeDelta: 0.0221,
  });
  
  const [draggableMarkerCoord, setDraggableMarkerCoord] = useState({
    latitude: 38.32611,
    longitude: 26.64803,
  })

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [selectedSport, setSelectedSport] = useState(null);
  const [numberOfParticipants, setNumberOfParticipants] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [activityNote, setActivityNote] = useState('');


  const setData = async () => {

    if ( !numberOfParticipants || !activityNote) {
      alert('Please fill in all fields');
      return;
    }

    const userId = currentUser.uid;
    console.log("Added");
    const userDocRef = doc(db, 'Users', userId);

    await addDoc(collection(userDocRef, 'Activities'), {
      attendants: [],
      sport_type: selectedSport,
      date_time: date,
      note: activityNote,
      coord: draggableMarkerCoord,
      numberOfPeople: numberOfParticipants,
    });

    setActivityCreated(true);

  };

  useEffect(() => {
    if (activityCreated) {
      const timeout = setTimeout(() => {
        navigation.navigate('MainMap');
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [activityCreated, navigation]);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    
  };

  const handleNumberInputChange = (value) => {
    setNumberOfParticipants(value);
    Keyboard.dismiss();
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const handleDropdownChange = (item) => {
    setSelectedSport(item.label);
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} onRegionChangeComplete={setRegion}>
        <Marker 
          draggable
          coordinate={draggableMarkerCoord}
          onDragEnd={(e) => setDraggableMarkerCoord(e.nativeEvent.coordinate)}
          //image={require('../assets/marker-icon.png')}
        />
      </MapView>
      <View style={styles.bottomContainer}>
        <View style={styles.inputContainer}>
        <DropdownComponent selectedSport={selectedSport}onChange={handleDropdownChange} />
          <TextInput
            style={styles.numberOfParticipantsInput}
            placeholder="Required mates"
            value={numberOfParticipants}
            onChangeText={handleNumberInputChange}
            keyboardType="numeric"
          />
         <View style={styles.dateTimeContainer}>
          <View style={styles.datePickerContainer}>
            <Button title="Event Date" color="black" onPress={() => showMode('date')} />
            <Text>{eventDate}</Text>
          </View>
          {show && (
          <DateTimePicker
            style={styles.picker1}
            testID="DateTime"
            value={date}
            mode={mode}
            is24Hour={true}
            display="true"
            onChange={onChange}
          />
        )}
          <View style={styles.timePickerContainer}>
            <Button title="Event Time" color="black" onPress={() => showMode('time')} />
            <Text>{eventTime}</Text>
          </View>
          </View>
          
          <TextInput
            style={styles.activityNoteInput}
            placeholder="Activity Note"
            value={activityNote}
            onChangeText={setActivityNote}
          />
          <TouchableOpacity style={[styles.button, activityCreated && styles.buttong]} onPress={setData}>
            <Text style={styles.buttonText}>{activityCreated ? 'Created! ' : 'Create Activity'}</Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    marginBottom: 10,
  },
  map: {
    flex: 1,
    marginBottom: 120,
  },
  bottomContainer: {
    position: 'absolute',
    top: 350,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderTopColor: '#ECECEC',
  },
  sportTypeButton: {
    backgroundColor: '#1f1f39',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sportTypeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  numberOfParticipantsInput: { 
    fontSize: 17,
    color: 'black', 
    height: 40,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'flex-start',
  },
  inputContainer: {
    marginBottom: 0,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    width: '95%',

  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  datePickerContainer: {
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  timePickerContainer: {
    flex: 1,
    marginLeft: 10,
    alignItems: 'center',
  },
  dateText: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'flex-start',
  },
  timeText: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
    alignItems: 'flex-start',
  },
  picker1: {
    marginTop: 0,
  },
  buttong: {
    marginTop: 30,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    marginLeft: 87,
    zIndex: 0,
    width: '50%',
    backgroundColor: 'green',
  },
  input: {
    fontSize: 17,
    height: 40,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    marginTop: 30,
    backgroundColor:  '#1f1f39',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    marginLeft: 87,
    zIndex: 0,
    width: '50%',

  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    alignItems: 'center',
  },
  activityNoteInput: {
    height: 70,
    fontSize: 17,
    borderWidth: 1,
    borderColor: '#ECECEC',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#DCDCE4',
    width: '100%',
  },
});
