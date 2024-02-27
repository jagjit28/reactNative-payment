// ProfileScreen.js
import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';

const ProfileScreen = ({ route }) => {
  const { user } = route.params || {};
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ alignItems: 'center', padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 10 }}>
          {user.username}'s Profile
        </Text>
        <Image
          source={{ uri: user.profileImage }}
          style={styles.profileImage}
        />
        {/* Other profile data */}
        <View style={styles.card}>
          <Text style={styles.cardText}>Email: {user.email}</Text>
          <Text style={styles.cardText}>Date of Birth: {formatDate(user.dob)}</Text>
          <Text style={styles.cardText}>Location: {user.location}</Text>
          {/* Add more profile data fields as needed */}
        </View>
        {/* Gallery of Work section */}
        <Text style={{ fontSize: 18, marginVertical: 10 }}>Gallery of Work:</Text>
        {/* Render user's gallery images here */}
        <Text style={{ fontSize: 18, marginVertical: 10 }}>Bio:</Text>
        <Text>{user.bio}</Text>
        {/* Add more sections as needed, such as contact information */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 20,
  },card: {
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ProfileScreen;