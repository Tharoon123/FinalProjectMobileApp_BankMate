import { Text, View } from "react-native";
import LoginScreen from "./LoginScreen";
import { SettingsContext } from "react-native-paper/lib/typescript/core/settings";
import SettingsScreen from "./SettingsScreen";
import ForgotPassScreen from "./ForgotPassScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransactionScreen from "./TransactionScreen";
import DashboardScreen from "./DashboardScreen";
import MapScreen from "./MapScreen";
import EditProfileScreen from "./EditProfileScreen";

const Stack =createNativeStackNavigator();


export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        
      }}
    >   
      
        <Stack.Navigator initialRouteName="LoginScreen" screenOptions={{
          headerShown: false,
          }} >
          <Stack.Screen name="LoginScreen" component={LoginScreen}></Stack.Screen>
          <Stack.Screen name="ForgotPassScreen" component={ForgotPassScreen}></Stack.Screen>
          <Stack.Screen name="SettingsScreen" component={SettingsScreen}></Stack.Screen>
          <Stack.Screen name="TransactionScreen" component={TransactionScreen}></Stack.Screen>
          <Stack.Screen name="DashboardScreen" component={DashboardScreen}></Stack.Screen>
          <Stack.Screen name="MapScreen" component={MapScreen}></Stack.Screen>
          <Stack.Screen name="EditProfileScreen" component={EditProfileScreen}></Stack.Screen>
          
        </Stack.Navigator>
    </View>
  );
}
