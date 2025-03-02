import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  Button,
  Linking,
  Alert,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

// height with
const { width, height } = Dimensions.get("window");

// harcode transactions
/*
const transactions = [
  { id: 'TXN123456', amount: '100.00', status: 'Pass', date: '14 Dec 2024, 10:15 AM' },
  { id: 'TXN789012', amount: '200.00', status: 'Fail', date: '13 Dec 2024, 08:20 PM' },
  { id: 'TXN345678', amount: '150.00', status: 'Pass', date: '12 Dec 2024, 02:45 PM' },
  { id: 'TXN901234', amount: '50.00', status: 'Fail', date: '11 Dec 2024, 06:30 PM' },
  { id: 'TXN567890', amount: '75.00', status: 'Pass', date: '10 Dec 2024, 09:00 AM' },
  { id: 'TXN678901', amount: '120.00', status: 'Pass', date: '09 Dec 2024, 03:50 PM' },
  { id: 'TXN789345', amount: '180.00', status: 'Fail', date: '08 Dec 2024, 12:15 PM' },
  { id: 'TXN890123', amount: '90.00', status: 'Pass', date: '07 Dec 2024, 10:20 AM' },
  { id: 'TXN901567', amount: '200.00', status: 'Fail', date: '06 Dec 2024, 05:00 PM' },
  { id: 'TXN123678', amount: '300.00', status: 'Pass', date: '05 Dec 2024, 02:10 PM' },
  { id: 'TXN234890', amount: '80.00', status: 'Pass', date: '04 Dec 2024, 11:40 AM' },
  { id: 'TXN345012', amount: '50.00', status: 'Fail', date: '03 Dec 2024, 06:30 PM' },
  { id: 'TXN456234', amount: '400.00', status: 'Pass', date: '02 Dec 2024, 08:15 AM' },
  { id: 'TXN567456', amount: '25.00', status: 'Fail', date: '01 Dec 2024, 05:45 PM' },
  { id: 'TXN678789', amount: '150.00', status: 'Pass', date: '30 Nov 2024, 10:10 AM' },
  { id: 'TXN789890', amount: '100.00', status: 'Pass', date: '29 Nov 2024, 04:50 PM' },
  { id: 'TXN890567', amount: '200.00', status: 'Fail', date: '28 Nov 2024, 09:30 PM' },
];*/

const TransactionScreen = () => {
  const [transactions2, setTransactions2] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterName, setfilterName] = useState("");

  const navigation = useNavigation();

  // Load Transactions from the backend

  const fetchTransactions = async () => {
    try {
      const userId = await AsyncStorage.getItem("userId");

      if (userId) {
        const response = await axios.get(
          `http://10.0.2.2:5000/getTransactions/${userId}`
        );
        const formattedTransactions = response.data.map((item) => ({
          id: `TXN ${String(item.ID).padStart(6, "0")}`, // Format ID as TXN 000001
          amount: item.AMOUNT,
          status: item.STATUS === 1 ? "Pass" : "Fail", // Assuming 1 is "Pass" and 0 is "Fail"
          date: new Date(item.TIME).toLocaleString(), // Format the timestamp to a readable date/time
          location: item.LOCATION,
        }));
        setTransactions2(formattedTransactions);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ActivityIndicator size="large" color="#004BA0" />
      </SafeAreaView>
    );
  }

  const openGoogleMaps = (qry: String) => {
    //console.log(transactions2)
    const url = `https://www.google.com/maps/search/?api=1&query=${qry}`; // Example for Colombo, Sri Lanka

    // Check if the device can open the URL (i.e., if Google Maps is available)
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert("Error", "Google Maps is not available on this device.");
        }
      })
      .catch((err) => console.error("Error opening Google Maps", err));
  };

  const filterTransactions = () => {
    console.log(filterName);
    if (
      filterName === "Pass" ||
      filterName === "Fail" ||
      filterName === "pass" ||
      filterName === "fail" ||
      filterName === "PASS" ||
      filterName !== ""
    ) {
      if (filterName === "Pass" || filterName === "pass") {
        var filteredTransactions = transactions2.filter(
          (item) => item.status === "Pass"
        );
        setTransactions2(filteredTransactions);
      }
      if (filterName === "Fail" || filterName === "fail") {
        const filteredTransactions = transactions2.filter(
          (item) => item.status === "Fail"
        );
        setTransactions2(filteredTransactions);
      }
    } else {
      console.log("Invalid Filter");
      Alert.alert(
        "Invalid Filter",
        "Please enter Pass or Fail to filter transactions"
      );
    }
  };

  const handleCancelFilter = () => {
    setfilterName("");
    fetchTransactions();
  };


  const handleReport = (item) => {
    Alert.alert( 
      "Transaction Report",
      `Transaction ID: ${item.id}\nDate/Time: ${item.date}\nAmount: LKR ${item.amount} \nStatus: ${item.status}`,
      [{ text: "OK" }]);
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Transaction History</Text>
        <View style={styles.filterContainer}>
          <TextInput
            style={styles.input}
            placeholder="Pass or Fail"
            placeholderTextColor="rgba(0, 0, 0, 0.6)"
            autoCapitalize="none"
            onChangeText={setfilterName}
          />
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => {
              filterTransactions();
            }}
          >
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => {
              handleCancelFilter();
            }}
          >
            <MaterialCommunityIcons
              name="close-circle"
              size={18}
              color="#fff"
            />
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
        >
          {transactions2.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {handleReport(item)}}
            >
              <View style={styles.card}>
                <View style={styles.row}>
                  <Text style={styles.label}>Transaction ID:</Text>
                  <Text style={styles.value}>{item.id}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Amount:</Text>
                  <Text style={styles.value}>LKR {item.amount}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Status:</Text>
                  <Text
                    style={[
                      styles.status,
                      item.status === "Pass"
                        ? styles.statusPass
                        : styles.statusFail,
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Date/Time:</Text>
                  <Text style={styles.value}>{item.date}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Location:</Text>
                  <Text style={styles.value}>{item.location}</Text>
                </View>
                <Button
                  title="Open Google Maps"
                  onPress={() => openGoogleMaps(item.location)}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Navigation Buttons (Non-functional) */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.buttonTransfers]}
            onPress={() => {}}
          >
            <MaterialCommunityIcons
              name="swap-horizontal"
              size={18}
              color="#333"
              style={styles.buttonIcon}
            />
            <Text
              style={styles.buttonText}
              onPress={() => navigation.navigate("DashboardScreen")}
            >
              Dashboard
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonTransactions]}
            onPress={() => {}}
          >
            <MaterialCommunityIcons
              name="history"
              size={18}
              color="#333"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>Transactions</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.buttonSettings]}
            onPress={() => {}}
          >
            <MaterialCommunityIcons
              name="cog"
              size={18}
              color="#333"
              style={styles.buttonIcon}
            />
            <Text
              style={styles.buttonText}
              onPress={() => navigation.navigate("SettingsScreen")}
            >
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  cancelButton: {
    marginLeft: 10,
    backgroundColor: "#dc3545",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    marginLeft: 5,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  filterButton: {
    marginLeft: 10,
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 15,
  },
  filterButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
  },
  buttonTransactions: {
    backgroundColor: "#F5E5C0",
  },
  buttonSettings: {
    backgroundColor: "#D5EFD1",
  },
  buttonTransfers: {
    backgroundColor: "#CFE3FC",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    borderRadius: 10,
    padding: 10,
    fontSize: 16,
    color: "#000",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#00b894",
    width: "30%",
    height: 40,
    marginLeft: 25,
  },
  button: {
    flex: 1,
    flexDirection: "row",
    marginBottom: 10,
    marginHorizontal: 5,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F5F5F5",
    borderColor: "#DDD",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  safeArea: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: width * 0.05, // Adjust padding based on screen width
    paddingBottom: height * 0.02, // Adjust padding based on screen height
  },
  title: {
    fontSize: width * 0.06, // Responsive font size
    fontWeight: "bold",
    color: "#333",
    marginVertical: height * 0.03,
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: width * 0.04, // Responsive padding
    marginBottom: height * 0.02,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    color: "#555",
  },
  value: {
    fontSize: width * 0.04,
    color: "#333",
  },
  status: {
    fontSize: width * 0.04,
    fontWeight: "bold",
  },
  statusPass: {
    color: "green",
  },
  statusFail: {
    color: "red",
  },
});

export default TransactionScreen;
