import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList } from 'react-native';

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [messageText, setMessageText] = useState('');

    const sendMessage = (text) => {
        const newMessage = {
            id: Math.random().toString(),
            text,
            sender: 'user',
            timestamp: new Date().getTime(),
        };

        setMessages([...messages, newMessage]);
        setMessageText('');
    };

    const renderMessage = ({ item }) => (
        <View style={{ marginVertical: 10, paddingHorizontal: 16 }}>
            <Text>{item.text}</Text>
        </View>
    );

    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ flexGrow: 1, paddingVertical: 16 }}
                inverted
            />
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }}>
                <TextInput
                    style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, marginRight: 8 }}
                    onChangeText={(text) => setMessageText(text)}
                    value={messageText}
                    placeholder="Mesajınızı girin..."
                />
                <TouchableOpacity
                    style={{ backgroundColor: 'blue', padding: 10, borderRadius: 2 }}
                    onPress={() => sendMessage(messageText)}
                >
                    <Text style={{ color: 'white' }}>Gönder</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
