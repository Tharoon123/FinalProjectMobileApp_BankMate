import { Text, View } from "react-native";
import LoginScreen from "./LoginScreen";
import { SettingsContext } from "react-native-paper/lib/typescript/core/settings";
import SettingsScreen from "./SettingsScreen";
import SignUpScreen from "./SignUpScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransactionScreen from "./TransactionScreen";
import Dashboard from "./DashboardScreen";

const Stack =createNativeStackNavigator();

//hellooo
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
          <Stack.Screen name="SignUpScreen" component={SignUpScreen}></Stack.Screen>
          <Stack.Screen name="SettingsScreen" component={SettingsScreen}></Stack.Screen>
          <Stack.Screen name="TransactionScreen" component={TransactionScreen}></Stack.Screen>
          <Stack.Screen name="Dashboard" component={Dashboard}></Stack.Screen>
          
        </Stack.Navigator>
    </View>
  );
}
