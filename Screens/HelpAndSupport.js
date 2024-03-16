import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function HelpAndSupport() {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
      <Text style={styles.sectionText}>
        Q: How do I create a new activity?
        {'\n'}
        A: You can create a new activity by navigating to the Create Activity page and providing the necessary details.
        {'\n'}
        {'\n'}
        Q: How can I invite friends to join my activity?
        {'\n'}
        A: After creating the activity, you can share the activity details with your friends through the app's messaging feature or by copying the activity link and sharing it through other communication channels.
        {'\n'}
        {'\n'}
        {/* Add more frequently asked questions and answers as needed */}
      </Text>
      <Text style={styles.sectionTitle}>Contact Us</Text>
      <Text style={styles.sectionText}>
        If you have any further questions or need assistance, please contact our support team at sportcallapp@info.com
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    alignSelf: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  sectionText: {
    fontSize: 16,
    marginBottom: 16,
  },
});
