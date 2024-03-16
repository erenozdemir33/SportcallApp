import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { auth, db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { Input, Button, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getAuth, updateProfile, reauthenticateWithCredential, EmailAuthProvider, updatePassword } from "firebase/auth";


export default function AccountSettings() {
    const navigation = useNavigation();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [showNewUsernameInput, setShowNewUsernameInput] = useState(false);
    const [showNewPasswordInput, setShowNewPasswordInput] = useState(false);

    const handleUsernameChange = async () => {
        const user = auth.currentUser;
        const credentials = EmailAuthProvider.credential(user.email, currentPassword);

        try {
            await reauthenticateWithCredential(user, credentials);
            setShowNewUsernameInput(true);
        } catch (error) {
            console.log('Error re-authenticating: ', error);
            Alert.alert('Incorrect password. Please try again.');
        }
    };

    const handlePasswordChange = async () => {
        const user = auth.currentUser;
        const credentials = EmailAuthProvider.credential(user.email, currentPassword);

        try {
            await reauthenticateWithCredential(user, credentials);
            setShowNewPasswordInput(true);
        } catch (error) {
            console.log('Error re-authenticating: ', error);
            Alert.alert('Incorrect password. Please try again.');
        }
    };

    const submitUsernameChange = async () => {
        const user = auth.currentUser;

        try {
            await updateProfile(user, { displayName: newUsername });

            const userDocRef = doc(db, 'Users', user.uid);
            await updateDoc(userDocRef, {
                user_name: newUsername
            });

            Alert.alert('Username updated successfully');
            navigation.navigate('MainMap');
        } catch (error) {
            console.log('Error updating username: ', error);
        }
    };

    const submitPasswordChange = async () => {
        if (newPassword.length > 8) {
            Alert.alert('Password must be 8 characters or less');
            return;
        }
    
        const user = getAuth().currentUser;
    
        try {
            await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, currentPassword));
            await updatePassword(user, newPassword);
            Alert.alert('Password updated successfully');
            navigation.navigate('MainMap');
        } catch (error) {
            console.log('Error updating password: ', error);
        }
    };
    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Account Settings</Text>
            <Text style={styles.description}>Here you can change your username and password. First, please verify your current password.</Text>

            {!showNewUsernameInput && !showNewPasswordInput && (
                <Input
                    placeholder='Current Password'
                    onChangeText={setCurrentPassword}
                    value={currentPassword}
                    secureTextEntry
                    leftIcon={
                        <Icon
                            name='lock'
                            size={24}
                            color='black'
                        />
                    }
                />
            )}

            {!showNewUsernameInput && !showNewPasswordInput && (
                <Button
                    buttonStyle={{ backgroundColor: '#1f1f37' }}
                    title="Verify Your Password"
                    onPress={() => { handleUsernameChange(); handlePasswordChange(); }}
                />
            )}

            {showNewUsernameInput && (
                <View style={styles.inputSection}>
                    <Input
                        placeholder='New Username'
                        value={newUsername}
                        onChangeText={setNewUsername}

                        leftIcon={
                            <Icon
                                name='user'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    <Button
                        buttonStyle={{ backgroundColor: '#1f1f37' }}
                        title="Submit New Username"
                        onPress={submitUsernameChange}
                    />
                </View>
            )}

            {showNewPasswordInput && (
                <View style={styles.inputSection}>
                    <Input
                        placeholder='New Password'
                        value={newPassword}
                        onChangeText={setNewPassword}
                        secureTextEntry
                        leftIcon={
                            <Icon
                                name='lock'
                                size={24}
                                color='black'
                            />
                        }
                    />
                    <Button
                        buttonStyle={{ backgroundColor: '#1f1f37' }}
                        title="Submit New Password"
                        onPress={submitPasswordChange}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        padding: 20,
        justifyContent: 'center', 
        
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#888',
        marginBottom: 30,
        textAlign: 'center',
    },
    section: {
        marginBottom: 20,
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
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
