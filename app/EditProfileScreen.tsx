import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert, Image, TouchableOpacity} from 'react-native';
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
          const response = await fetch(`http://13.127.178.202:5000/editUserServerSide`, {
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
            Alert.alert('Check Credentials', 'No user found with the provided credentials');
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
    <View >
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
          placeholder="Enter your User ID"
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
        <TouchableOpacity style={[styles.button, styles.buttonSettings]}>
          <MaterialCommunityIcons name="content-save" size={18} color="#333" style={styles.buttonIcon} />   
          <Text style={styles.buttonText} onPress={handleSubmit} >Save Changes</Text>   
        </TouchableOpacity>
      </ScrollView>
      {/* Navigation Buttons (Non-functional) */}
      <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonTransfers]} onPress={() => {}}>
              <MaterialCommunityIcons name="swap-horizontal" size={18} color="#333" style={styles.buttonIcon} />
              <Text style={styles.buttonText} onPress={() => navigation.navigate("DashboardScreen")} >Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonTransactions]} onPress={() => {}}>
              <MaterialCommunityIcons name="history" size={18} color="#333" style={styles.buttonIcon} />
              <Text style={styles.buttonText} onPress={() => navigation.navigate("TransactionScreen")}>Transactions</Text>
            </TouchableOpacity>

            

            <TouchableOpacity style={[styles.button, styles.buttonSettings]} onPress={() => {}}>
              <MaterialCommunityIcons name="cog" size={18} color="#333" style={styles.buttonIcon} />
              <Text style={styles.buttonText} onPress={() => navigation.navigate("SettingsScreen")}>Settings</Text>
            </TouchableOpacity>
          </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  buttonTransactions: {
    backgroundColor: '#F5E5C0',
  },
  buttonSettings: {
    backgroundColor: '#D5EFD1',
  },
  buttonTransfers: {
    backgroundColor: '#CFE3FC',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    marginBottom:10,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F5F5F5',
    borderColor: '#DDD',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
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


