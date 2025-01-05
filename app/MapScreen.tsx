import { View, Button, Linking, Alert, Text } from 'react-native';
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const MapScreen = () => {
    const [nic, setNic] = useState('');
    const fetchData = async () => {
        try {
          // Get userId from AsyncStorage
          const userId = await AsyncStorage.getItem('userId');
          console.log(userId)
          if (userId) {
            //console.log("Hello")
            // Fetch balance, name, and number from the API
            const response = await fetch(`http://10.0.2.2:5000/getBalance/${userId}`);
            const data = await response.json();
            setNic(data.nic);
            console.log(data.nic)
          } else {
            console.log('User ID not found in AsyncStorage');
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);
      
  return (
    <View>
        <Button title='press me' onPress={fetchData}></Button>
        <Text>{nic}</Text>
    </View>
  )
}

export default MapScreen