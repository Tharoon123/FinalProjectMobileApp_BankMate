import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Button, List, Switch } from 'react-native-paper';

const SettingsScreen = () => {
  const navigation = useNavigation()

  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  const { width } = Dimensions.get('window');

  return (
    <View style={styles.container}>
      <ScrollView >
        <Text style={styles.header}>Settings</Text>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <List.Item
            title="Profile"
            description="Edit your profile details"
            left={() => <List.Icon icon="account-circle" />}
            style={styles.listItem}
            onPress={()=>navigation.navigate("EditProfileScreen")}/>
          <List.Item
            title="Privacy"
            description="Manage privacy settings"
            left={() => <List.Icon icon="lock" />}
            style={styles.listItem}
          />
        </View>

        {/* Notifications Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <List.Item
            title="Push Notifications"
            right={() => (
              <Switch value={isEnabled} onValueChange={toggleSwitch} />
            )}
            style={styles.listItem}
          />
          <List.Item
            title="Email Notifications"
            right={() => (
              <Switch value={isEnabled} onValueChange={toggleSwitch} />
            )}
            style={styles.listItem}
          />
        </View>

        {/* App Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>App Settings</Text>
          <List.Item
            title="Language"
            description="Change app language"
            left={() => <List.Icon icon="translate" />}
            style={styles.listItem}
          />
          
        </View>

        {/* Sign out Button */}
        <Button mode="contained" onPress={()=>navigation.navigate("LoginScreen")} style={styles.signOutButton}>
          Sign Out
        </Button>
      </ScrollView>
      {/* Navigation Buttons (Non-functional) */}
      <View style={styles.buttonsContainer}>
            <TouchableOpacity style={[styles.button, styles.buttonTransfers]} onPress={() => {}}>
              <MaterialCommunityIcons name="swap-horizontal" size={18} color="#333" style={styles.buttonIcon} />
              <Text style={styles.buttonText} onPress={()=>navigation.navigate("DashboardScreen")}>Dashboard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.buttonTransactions]} onPress={() => {}}>
              <MaterialCommunityIcons name="history" size={18} color="#333" style={styles.buttonIcon} />
              <Text style={styles.buttonText} onPress={() => navigation.navigate("TransactionScreen")}>Transactions</Text>
            </TouchableOpacity>

            

            <TouchableOpacity style={[styles.button, styles.buttonSettings]} onPress={() => {}}>
              <MaterialCommunityIcons name="cog" size={18} color="#333" style={styles.buttonIcon} />
              <Text style={styles.buttonText} >Settings</Text>
            </TouchableOpacity>
          </View>
    </View>
  );
};

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
    flex: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: '5%',  // Added padding to make the layout responsive
  },
  header: {
    fontSize: Dimensions.get('window').width * 0.08,  // Adjusted for screen size
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#388E3C',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#388E3C',
    marginBottom: 10,
  },
  listItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    elevation: 1,
    paddingHorizontal: '2%',  // Adjusted padding for list items
  },
  signOutButton: {
    marginTop: 20,
    backgroundColor: '#388E3C',
    paddingVertical: '3%',
    marginHorizontal: '5%',
  },
});

export default SettingsScreen;
