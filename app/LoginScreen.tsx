// Import necessary libraries
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert, Dimensions, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { TouchableWithoutFeedback, Animated } from 'react-native';
import { Link } from 'expo-router';
import { useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');

export default function LoginScreen() {
  
  const navigation = useNavigation()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const handleLogin = () => {
    if (email === '' || password === '') {
      Alert.alert('Error', 'Please fill in all fields.');
    } else {
      // Placeholder for authentication logic
      Alert.alert('Login', 'You have successfully logged in!');
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
    ]).start(() => handleLogin());
  };

  return (
    <LinearGradient colors={['#00b894', '#ffffff']} style={styles.container}>
      
      <View style={styles.logoContainer}>
      
        <Image 
          source={require('../assets/images/image.png')} // Replace with your logo
          style={styles.logo}
        />
        <Text style={styles.appTitle}>BankMate</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="rgba(0, 0, 0, 0.6)"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
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
      </View>
      
      <TouchableWithoutFeedback onPress={()=>navigation.navigate("DashboardScreen")}>
        <Animated.View style={[styles.loginButton, { transform: [{ scale: scaleValue }] }]}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    

      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don’t have an account?</Text>
        <TouchableOpacity onPress={()=>navigation.navigate("SignUpScreen")}>
          <Text style={styles.signupLink}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

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
    marginLeft: 10,
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
  forgotPasswordButton: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#00b894',
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#000',
    fontSize: 14,
  },
  signupLink: {
    color: '#00b894',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
