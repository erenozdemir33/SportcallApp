import React, { useState } from 'react';
import { View, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function ApplicationSettings() {
  const [language, setLanguage] = useState('English');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const navigation = useNavigation();

  const toggleNotifications = () => {
    setNotificationsEnabled((prevValue) => !prevValue);
  };

  const handleButtonPress = (screenName) => {
    navigation.navigate(screenName);
  };

  const changeLanguage = () => {
    // duruma göre doldurulacak
    setLanguage('Turkish');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={changeLanguage} style={styles.settingItem}>
        <Text style={styles.settingLabel}>Language:</Text>
        <Text style={styles.settingValue}>{language}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem}>
        <Text style={styles.settingLabel}>Notifications:</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={toggleNotifications}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.settingItem} onPress={() => handleButtonPress('PrivacyPolicy')}>
        <Text style={[styles.buttonText, { fontSize: 18 }]}>Privacy & Policy</Text>
        <Ionicons name="ios-chevron-forward" size={24} color="black" />
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={() => handleButtonPress('HelpAndSupport')}>
        <Text style={styles.settingLabel}>Help & Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={() => handleButtonPress('AccountSettings')}>
        <Text style={styles.settingLabel}>Account Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginBottom: 10,
    elevation: 2,
  },
  settingLabel: {
    fontSize: 16,
  },
  settingValue: {
    fontSize: 16,
    color: '#888',
  },
});

//  document icon for privacy 
// <Ionicons name="document" size={32} color="black" />
