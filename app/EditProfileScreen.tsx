import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Image} from 'react-native';
import { Avatar } from 'react-native-paper';

const EditProfileScreen = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [nic, setNic] = useState('');
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  
  // Function to handle form submission
  const handleSubmit = () => {
    if (!name) {
      Alert.alert('Name is required');
    }
    
    if (!nic) {
      Alert.alert('NIC is required');
    }
    
    //Alert.alert('Profile Updated', `Your profile has been updated successfully!`);
    // Add your logic to send data to the backend API
  
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.avatarContainer}>
      <Image
          source={require('../assets/images/image.png')} // Updated with the provided image
          style={styles.logo}
        />
        
        <Text style={styles.changePhotoText}>Change Account Password</Text>
      </View>

      {/* Full Name */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={name}
        onChangeText={setName}
      />

      {/* NIC Number */}
      <Text style={styles.label}>National Identity Card Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your NIC Number"
        value={nic}
        keyboardType="email-address"
        onChangeText={setNic}
      />

      {/* Current Password */}
      <Text style={styles.label}>Current Password</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Enter your Current Password"
        value={currPass}
        onChangeText={setCurrPass}
      />

      {/* New Password */}
      <Text style={styles.label}>New Password</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Enter your New Password"
        value={newPass}
        multiline
        onChangeText={setNewPass}
      />
      {/* Confirm New Password */}
      <Text style={styles.label}>Confirm New Password</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Enter your New Password Again"
        value={confirmPass}
        multiline
        onChangeText={setConfirmPass}
      />

      {/* Save Button */}
      <View style={styles.buttonContainer}>
        <Button title="Save Changes" onPress={handleSubmit} color="green" />
      </View>
    </ScrollView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f9f9f9', // Light background
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  changePhotoText: {
    color: 'black', // Bootstrap-like primary color
    marginTop: 10,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#ccc', // Light grey border
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    marginBottom: 20,
    backgroundColor: '#fff', // White background for inputs
  },
  buttonContainer: {
    backgroundColor: '#007bff', // Bootstrap-like primary color
    borderRadius: 8,
    overflow: 'hidden', // To ensure the button color fills the entire container
    marginTop: 20,
  },
});

export default EditProfileScreen;
