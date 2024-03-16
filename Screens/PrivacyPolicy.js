import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function PrivacyPolicy() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sportcall </Text>
            <Text style={styles.title}>Privacy & Policy </Text>
            <Text style={styles.text}>

                At Sportcall, we prioritize the privacy and security of our users. This Privacy & Policy document outlines how we collect, use, and protect your personal information when you use our sports app.
                Information Collection and Use:

                - Personal Information: When you create an account on our app, we may collect personal information such as your name, email address, and profile picture. This information is used to personalize your experience, provide services, and communicate with you.

                - Usage Data: We may collect usage data such as the features you interact with, the content you view, and your app preferences. This information helps us improve our app and provide a better user experience.

                Information Sharing and Disclosure:

                - Third-Party Service Providers: We may share your personal information with trusted third-party service providers to facilitate app functionality, data analysis, and customer support. These service providers are bound by confidentiality agreements and are prohibited from using your information for any other purpose.

                - Legal Requirements: We may disclose your personal information if required by law or in response to a valid legal request, such as a court order or government investigation.

                Data Security:

                - We employ industry-standard security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, please note that no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security of your information.

                - User Responsibilities: You are responsible for maintaining the confidentiality of your account login credentials. Please do not share your password or access information with anyone. If you believe your account has been compromised, please contact us immediately.

                Updates to Privacy & Policy:

                - We may update this Privacy & Policy document from time to time to reflect changes in our practices or legal requirements. We encourage you to review this document periodically for any updates.

                Contact Us:

                If you have any questions, concerns, or requests regarding our Privacy & Policy, please contact us at [contact email or support page].

                By using our sports app, you agree to the terms outlined in this Privacy & Policy document.
            </Text>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 13,
        marginBottom: 20,
    },
});
