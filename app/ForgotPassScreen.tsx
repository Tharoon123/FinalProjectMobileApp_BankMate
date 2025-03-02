// Import necessary libraries
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Dimensions, Button, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Mailer from 'react-native-mail';

const { width, height } = Dimensions.get('window');

export default function ForgotPassScreen() {
  const navigation = useNavigation()

  const [name, setName] = useState('');
  const [nic, setNic] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const handleSignUp = () => {
    if (!name || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
    } else if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
    } else {
      Alert.alert('Success', 'Account created successfully!');
    }
  };

  const animateButtonPress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => handleSignUp());
  };
  const handleEmail = () => {
    const email = 'mailto:tharoonnaveedya@gmail.com?subject=Your%20Subject&body=Email%20body';
    Linking.openURL(email).catch((error) => console.error('Error opening email:', error));
  };

  return (
    <View>
      <Button title="Send Email" onPress={handleEmail} />
    </View>
  );
}
/*

<LinearGradient colors={['#00b894', '#ffffff']} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/images/image.png')} // Updated with the provided image
          style={styles.logo}
        />
        <Text style={styles.appTitle}>Change Password</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Full Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name as per in the Bank Account"
          placeholderTextColor="rgba(0, 0, 0, 0.6)"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>ID Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your National Identity Card Number"
          placeholderTextColor="rgba(0, 0, 0, 0.6)"
          autoCapitalize="none"
          value={nic}
          onChangeText={setNic}
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Enter your password"
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.iconContainer}
          >
            <Ionicons
              name={passwordVisible ? 'eye' : 'eye-off'}
              size={24}
              color="#00b894"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirm your password"
          placeholderTextColor="rgba(0, 0, 0, 0.6)"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      <TouchableWithoutFeedback onPress={()=>navigation.navigate("LoginScreen")}>
        <Animated.View style={[styles.loginButton, { transform: [{ scale: scaleValue }] }]}>
          <Text style={styles.loginButtonText}>Save Changes</Text>
        </Animated.View>
      </TouchableWithoutFeedback>

      
    </LinearGradient>

<View style={styles.signupContainer}>
        <Text style={styles.signupText}>Already have an account?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("LoginScreen")}>
          <Text style={styles.signupLink}> Login</Text>
        </TouchableOpacity>
      </View>
*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: width,
    height: height,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 20,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#',
    marginTop: 10,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 30,
  },
  label: {
    color: '#',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#000',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#00b894',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginLeft: -40,
  },
  loginButton: {
    backgroundColor: '#00b894',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#000',
    fontSize: 16,
  },
  signupLink: {
    color: '#00b894',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
