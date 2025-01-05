import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Button, List, Switch } from 'react-native-paper';

const SettingsScreen = () => {
  const navigation = useNavigation()

  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = () => setIsEnabled(!isEnabled);

  const { width } = Dimensions.get('window');

  return (
    <ScrollView style={styles.container}>
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
        <List.Item
          title="Theme"
          description="Choose between light and dark mode"
          left={() => <List.Icon icon="theme-light-dark" />}
          style={styles.listItem}
        />
      </View>

      {/* Sign out Button */}
      <Button mode="contained" onPress={()=>navigation.navigate("LoginScreen")} style={styles.signOutButton}>
        Sign Out
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
