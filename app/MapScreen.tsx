import { View, Button, Linking, Alert, Text } from 'react-native';
import React from 'react'

const MapScreen = () => {
    const openGoogleMaps = () => {
        const url = `https://www.google.com/maps/search/?api=1&query=6.9271,79.8612`; // Example for Colombo, Sri Lanka

        // Check if the device can open the URL (i.e., if Google Maps is available)
        Linking.canOpenURL(url)
            .then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                } else {
                    Alert.alert('Error', 'Google Maps is not available on this device.');
                }
            })
            .catch((err) => console.error('Error opening Google Maps', err));
    };
  return (
    <View style={{ marginTop: 50 }}>
            <Button title="Open Google Maps" onPress={openGoogleMaps} />
    </View>
  )
}

export default MapScreen