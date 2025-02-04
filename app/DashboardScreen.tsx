import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapScreen from './MapScreen';

export default function Dashboard() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [balance, setBalance] = useState(0);
  const [number, setNumber] = useState('');
  const [nic, setNic] = useState('');

  const backgroundUrl = 'https://images.unsplash.com/photo-1541727984615-478cae0653d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=720&q=80';
  const BANK_LOGO_URL = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Bank_of_America_logo.svg/320px-Bank_of_America_logo.svg.png';
  const cardBackgroundUrl = 'https://images.unsplash.com/photo-1605286637612-c2beac0e048f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
  const CARD_BRAND_LOGO_URL = 'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png';

  const fetchData = async () => {
    try {
      // Get userId from AsyncStorage
      const userId = await AsyncStorage.getItem('userId');

      if (userId) {
        // Fetch balance, name, and number from the API
        const response = await fetch(`http://10.0.2.2:5000/getBalance/${userId}`);
        const data = await response.json();

        setName(data.name);
        setBalance(data.balance);
        setNumber(data.number);
        setNic(data.nic)

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

  const totalAssets = 10000 + 25000 + 15000;
  const totalLiabilities = 120000 + 15000 + 1200;
  const netWorth = totalAssets - totalLiabilities;

  return (
      <ImageBackground source={{ uri: backgroundUrl }} style={styles.backgroundImage} resizeMode="cover">
        <ScrollView contentContainerStyle={styles.container}>

          {/* Header Section with Logo, Greeting and Logout */}
          <View style={styles.headerRow}>
            <View style={styles.logoAndGreeting}>
              <Image source={{ uri: BANK_LOGO_URL }} style={styles.bankLogo} />
              <View style={styles.greetingContainer}>
                <Text style={styles.greetingText}>Welcome Back,{'\n'}{name || 'Loading...'}!</Text>
                <Text style={styles.subTitle}>Your Financial Snapshot</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.logoutButton}>
              <MaterialCommunityIcons name="logout" size={24} color="red" onPress={() => navigation.navigate("LoginScreen")} />
            </TouchableOpacity>
          </View>

          {/* Account Card Section with Blue Gradient */}
          <View style={styles.accountCardContainer}>
            <ImageBackground source={{ uri: cardBackgroundUrl }} style={styles.accountCardBackground} imageStyle={{ borderRadius: 12 }}>
              <View style={styles.accountCardOverlay}>

                {/* Top Row: Bank Icon & Title */}
                <View style={styles.cardHeader}>
                  <MaterialCommunityIcons name="bank" size={20} color="black" />
                  <Text style={styles.cardHeaderText}>Your Account</Text>
                </View>

                {/* Card Body with Chip and Account Number */}
                <View style={styles.cardBody}>
                  <View style={styles.chipContainer}>
                    <View style={styles.chip} />
                  </View>
                  <Text style={styles.accountNumber}>{number || 'Loading...'}</Text>
                  <Text style={styles.accountNoLabel}>Account No</Text>
                </View>

                {/* Bottom Right: Card Brand Logo */}
                <View style={styles.cardFooter}>
                  <Image source={{ uri: CARD_BRAND_LOGO_URL }} style={styles.cardBrandLogo} resizeMode="contain" />
                </View>
              </View>
            </ImageBackground>
          </View>

          {/* Net Worth Overview Card */}
          <View style={styles.netWorthContainer}>
            <Text style={styles.netWorthTitle}>Net Worth</Text>
            <Text style={styles.netWorthValue}>LKR {balance}</Text>
            <Text style={styles.netWorthSubtitle}>
              Based on your current assets & liabilities             
            </Text>
            
          </View>

          {/* Assets Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="bank" size={24} color="#004BA0" style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Assets</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.label}>Savings Account</Text>
              <Text style={styles.value}>{balance}</Text>
            </View>

            <View style={styles.dataRow}>
              <Text style={styles.label}>Fixed Deposits</Text>
              <Text style={styles.value}>LKR 15,000</Text>
            </View>
          </View>

          {/* Liabilities Section */}
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <MaterialCommunityIcons name="finance" size={24} color="#8B0000" style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Liabilities</Text>
            </View>
            <View style={styles.dataRow}>
              <Text style={styles.label}>Home Loan</Text>
              <Text style={styles.value}>LKR 120,000</Text>
            </View>

            <View style={styles.dataRow}>
              <Text style={styles.label}>Credit Card</Text>
              <Text style={styles.value}>LKR 1,200</Text>
            </View>
          </View>

          

        </ScrollView>
        {/* Navigation Buttons (Non-functional) */}
        <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonTransfers]} onPress={() => {}}>
              <MaterialCommunityIcons name="swap-horizontal" size={18} color="#333" style={styles.buttonIcon} />
              <Text style={styles.buttonText} >Dashboard</Text>
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
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1
  },
  container: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent: 'space-between'
  },
  logoAndGreeting: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  bankLogo: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 10,
  },
  greetingContainer: {
    flexDirection: 'column',
    flexShrink: 1,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#004BA0',
    flexWrap: 'wrap'
  },
  subTitle: {
    fontSize: 14,
    color: '#333',
    marginTop: 2,
  },
  logoutButton: {
    padding: 6,
    marginLeft: 10,
  },
  accountCardContainer: {
    marginBottom: 20,
  },
  accountCardBackground: {
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
  },
  accountCardOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 12,
    padding: 20,
    justifyContent: 'space-between'
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    marginLeft: 8,
  },
  cardBody: {
    marginTop: 15,
  },
  chipContainer: {
    width: 50,
    height: 35,
    marginBottom: 12,
  },
  chip: {
    flex: 1,
    backgroundColor: '#FFD700',
    borderRadius: 4,
  },
  accountNumber: {
    fontSize: 22,
    fontWeight: '700',
    color: '#033392',
    letterSpacing: 3,
    marginBottom: 5,
  },
  accountNoLabel: {
    fontSize: 12,
    color: 'black',
  },
  cardFooter: {
    alignSelf: 'flex-end',
  },
  cardBrandLogo: {
    width: 40,
    height: 20,
  },
  netWorthContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginBottom: 20,
  },
  netWorthTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#004BA0',
  },
  netWorthValue: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 5,
    color: '#333',
  },
  netWorthSubtitle: {
    fontSize: 14,
    color: '#888',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
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
  buttonIcon: {
    marginRight: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  buttonTransactions: {
    backgroundColor: '#F5E5C0',
  },
  buttonTransfers: {
    backgroundColor: '#CFE3FC',
  },
  buttonSettings: {
    backgroundColor: '#D5EFD1',
  },
});
