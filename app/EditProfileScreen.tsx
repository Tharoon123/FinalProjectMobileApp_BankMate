import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Image} from 'react-native';
import { Avatar } from 'react-native-paper';

export default function EditProfileScreen(){

  const navigation = useNavigation();

  // State for form fields
  const [name, setName] = useState('');
  const [nic, setNic] = useState('');
  const [currPass, setCurrPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  
  // Function to handle form submission
  const handleSubmit = async () => {
    if (!name || !nic || !currPass || !newPass || !confirmPass) {
      Alert.alert('Empty Field', 'Please fill in all fields');
    }else{
      if(newPass !== confirmPass){
        Alert.alert('Password Mismatch', 'New Password and Confirm Password do not match');
      }else{
        try {
          // Send form data to the server
          const response = await fetch(`http://10.0.2.2:5000/editUserServerSide`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name,
              nic,
              currPass,
              newPass,
              confirmPass
            }),
          });
    
          if(response.ok){
            const data = await response.json();
            console.log(data);
            Alert.alert('Password Change Success', 'Your password has been changed successfully');
            navigation.navigate('LoginScreen');
          }else{
            console.log('Error',response.status,response);
          }
          
          // Show success message
          
        } catch (error) {
          console.error(error);
          Alert.alert('Error', 'An error occurred while updating your profile');
        }
      }
    }
    
      

    
    

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
        onChangeText={setNewPass}
      />
      {/* Confirm New Password */}
      <Text style={styles.label}>Confirm New Password</Text>
      <TextInput
        secureTextEntry
        style={styles.input}
        placeholder="Enter your New Password Again"
        value={confirmPass}
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


