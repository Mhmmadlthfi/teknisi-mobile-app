import React, { useContext } from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { AuthContext } from "../../utils/AuthContext";

const HomeScreen = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenText}>
        Selamat datang, {user ? user.name : "Pengguna"}!
      </Text>
      <TouchableOpacity onPress={handleLogout} style={styles.tombol}>
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screenText: {
    marginBottom: 10,
    fontSize: 20,
    fontWeight: "bold",
  },
  tombol: {
    backgroundColor: "#007BFF",
    padding: 10,
    width: 270,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
  btnText: {
    color: "#FFFFFF",
    fontSize: 20,
  },
});

export default HomeScreen;
